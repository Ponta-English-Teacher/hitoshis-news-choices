/**
 * One-time asset generator: writes public/images/stories/placeholder.png,
 * a plain solid-color PNG (the app's own --accent-soft tone) used as a
 * neutral placeholder for real stories that don't yet have a licensed
 * photograph. No external image library — hand-built PNG via Node's
 * built-in zlib, so no new dependency is added just for this.
 *
 * Run manually: node scripts/generate-placeholder-image.mjs
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, "..", "public", "images", "stories", "placeholder.png");

const WIDTH = 1200;
const HEIGHT = 675;
// --accent-soft from globals.css (#e8f1ee)
const [R, G, B] = [0xe8, 0xf1, 0xee];

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(WIDTH, 0);
ihdrData.writeUInt32BE(HEIGHT, 4);
ihdrData[8] = 8; // bit depth
ihdrData[9] = 2; // color type: truecolor RGB
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;
const ihdr = chunk("IHDR", ihdrData);

const rowLength = 1 + WIDTH * 3;
const raw = Buffer.alloc(rowLength * HEIGHT);
for (let y = 0; y < HEIGHT; y++) {
  const rowStart = y * rowLength;
  raw[rowStart] = 0; // filter type: none
  for (let x = 0; x < WIDTH; x++) {
    const px = rowStart + 1 + x * 3;
    raw[px] = R;
    raw[px + 1] = G;
    raw[px + 2] = B;
  }
}
const idat = chunk("IDAT", zlib.deflateSync(raw));
const iend = chunk("IEND", Buffer.alloc(0));

const png = Buffer.concat([signature, ihdr, idat, iend]);
fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, png);
console.log(`Wrote ${path.relative(path.join(__dirname, ".."), OUT_PATH)} (${png.length} bytes, ${WIDTH}x${HEIGHT})`);
