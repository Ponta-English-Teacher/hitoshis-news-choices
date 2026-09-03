/**
 * Dependency-free pixel-dimension readers for JPEG/PNG buffers, so image
 * dimensions can be obtained without any OS-specific tool (no `sips`, no
 * ImageMagick) — works identically on macOS and a Linux CI runner. Mirrors
 * the project's existing preference for hand-rolled, no-new-dependency
 * image handling (see scripts/generate-placeholder-image.mjs).
 */

export function getJpegDimensions(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error("Not a JPEG file (missing SOI marker).");
  }
  let offset = 2;
  while (offset < buffer.length - 1) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buffer[offset + 1];
    // Markers with no length-prefixed payload: skip 2 bytes only.
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    // SOF0-SOF15 except DHT(C4)/JPG(C8)/DAC(CC), which carry width/height.
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isStartOfFrame) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += 2 + length;
  }
  throw new Error("Could not find a Start-Of-Frame marker in JPEG data.");
}

export function getPngDimensions(buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!buffer.subarray(0, 8).equals(signature)) {
    throw new Error("Not a PNG file (bad signature).");
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

/**
 * WebP: a RIFF container. Handles all three payload chunk types Commons
 * can serve: VP8 (lossy), VP8L (lossless), VP8X (extended/canvas).
 */
export function getWebpDimensions(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("Not a WebP file (bad RIFF/WEBP header).");
  }
  const chunkType = buffer.toString("ascii", 12, 16);
  const chunkStart = 20; // after the 8-byte RIFF header + 4-byte "WEBP" + 4-byte chunk FourCC + 4-byte chunk size = offset 20

  if (chunkType === "VP8X") {
    const width = (buffer.readUIntLE(chunkStart + 4, 3) + 1) & 0xffffff;
    const height = (buffer.readUIntLE(chunkStart + 7, 3) + 1) & 0xffffff;
    return { width, height };
  }
  if (chunkType === "VP8 ") {
    // 3-byte frame tag, then a 3-byte start code (0x9D 0x01 0x2A), then
    // width/height as 16-bit little-endian values with the top 2 bits
    // reserved for a scale factor.
    const width = buffer.readUInt16LE(chunkStart + 6) & 0x3fff;
    const height = buffer.readUInt16LE(chunkStart + 8) & 0x3fff;
    return { width, height };
  }
  if (chunkType === "VP8L") {
    // 1-byte signature (0x2F), then a 32-bit little-endian bitstream: bits
    // 0-13 = width-1, bits 14-27 = height-1.
    const bits = buffer.readUInt32LE(chunkStart + 1);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return { width, height };
  }
  throw new Error(`Unrecognized WebP chunk type: "${chunkType}"`);
}

export function getImageDimensions(buffer, format) {
  const normalized = (format || "jpeg").toLowerCase();
  if (normalized === "png") return getPngDimensions(buffer);
  if (normalized === "webp") return getWebpDimensions(buffer);
  return getJpegDimensions(buffer);
}
