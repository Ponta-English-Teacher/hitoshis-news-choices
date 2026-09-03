/**
 * Helpers for avoiding image reuse and formatting IMAGE_CREDITS.md entries.
 * Read-only lookups + pure string formatting — never writes to
 * IMAGE_CREDITS.md itself (the caller decides when/whether to append).
 */

import fs from "node:fs";
import path from "node:path";

export function normalizeCommonsTitle(title) {
  const raw = title || "";
  // Titles pulled from a URL (e.g. IMAGE_CREDITS.md's "Original file page")
  // are percent-encoded and need decoding; titles straight from the
  // Commons API's `title`/`ObjectName` fields are already plain text and
  // may legitimately contain a literal "%" (e.g. "10% tariff...jpg") that
  // is NOT a valid escape sequence — decodeURIComponent throws on that, so
  // fall back to the raw string rather than crashing the whole pipeline
  // over a cosmetic normalization step.
  let decoded;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }
  return decoded
    .replace(/^File:/i, "")
    .replace(/_/g, " ")
    .toLowerCase()
    .trim();
}

/**
 * Parses IMAGE_CREDITS.md for every Commons filename / original file page
 * already recorded, so a newly sourced image can be checked against images
 * already in use by any prior edition — independent of which local
 * filename it was saved under.
 */
export function loadUsedCommonsFiles(creditsPath) {
  const used = new Set();
  if (!fs.existsSync(creditsPath)) return used;

  const text = fs.readFileSync(creditsPath, "utf8");

  for (const m of text.matchAll(/\*\*Commons filename:\*\* `(File:[^`]+)`/g)) {
    used.add(normalizeCommonsTitle(m[1]));
  }
  for (const m of text.matchAll(/\*\*Original file page:\*\* (\S+)/g)) {
    const url = m[1];
    const fileMatch = /\/wiki\/(File:.+)$/.exec(url);
    if (fileMatch) used.add(normalizeCommonsTitle(fileMatch[1]));
  }

  return used;
}

/**
 * Parses every src/data/editions/*.ts file (excluding index.ts) for local
 * imageUrl paths already in use, so a sourced image isn't saved under a
 * filename that collides with (or visually duplicates) one already
 * referenced by an archived edition.
 */
export function loadUsedLocalImageFilenames(editionsDir) {
  const used = new Set();
  if (!fs.existsSync(editionsDir)) return used;

  const files = fs.readdirSync(editionsDir).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  for (const file of files) {
    const text = fs.readFileSync(path.join(editionsDir, file), "utf8");
    for (const m of text.matchAll(/imageUrl: "\/images\/stories\/([^"]+)"/g)) {
      used.add(m[1]);
    }
  }
  return used;
}

/**
 * Deterministically picks a local image filename that doesn't collide with
 * anything in `usedFilenames` (already-referenced-by-an-archived-edition
 * filenames, plus whatever the caller has assigned so far in the current
 * run) or with a file that physically already exists in `imagesDir`. Never
 * random — first tries the plain slug, then `<slug>-<editionDate>`, then a
 * numbered suffix, up to a small bounded number of attempts before
 * throwing (failing safely rather than silently overwriting something).
 */
export function chooseSafeLocalFilename({ baseSlug, extension, editionDate, usedFilenames, imagesDir }) {
  const candidates = [
    `${baseSlug}.${extension}`,
    `${baseSlug}-${editionDate}.${extension}`,
    ...[2, 3, 4, 5].map((n) => `${baseSlug}-${editionDate}-${n}.${extension}`),
  ];

  for (const candidate of candidates) {
    const collides = usedFilenames.has(candidate) || (imagesDir && fs.existsSync(path.join(imagesDir, candidate)));
    if (!collides) return candidate;
  }

  throw new Error(
    `chooseSafeLocalFilename: could not find a non-colliding filename for base "${baseSlug}" after ${candidates.length} attempts.`
  );
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['’"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats one licensed (real or contextual) image entry in the exact shape
 * already used throughout IMAGE_CREDITS.md. Returns Markdown text only —
 * the caller decides if/when to append it to the real file.
 */
export function formatLicensedCreditEntry({
  number,
  storyLabel,
  localFilename,
  subject,
  creator,
  sourcePageUrl,
  licenseDisplayName,
  attributionRequired,
  attributionText,
}) {
  const attributionLine = attributionRequired
    ? `"${attributionText}"`
    : `None (public domain). Credited here as a courtesy: "${creator}".`;

  return `### ${number}. \`${localFilename}\`
- **Story:** ${storyLabel}
- **Subject:** ${subject}
- **Photographer / creator:** ${creator}
- **Original file page:** ${sourcePageUrl}
- **License:** ${licenseDisplayName}
- **Attribution wording required:** ${attributionLine}
`;
}

/**
 * Formats one AI-generated illustration entry, per the record shape
 * IMAGE_POLICY.md specifies for this tier (story, that it's AI-generated,
 * generation date, purpose/context, alt text) — deliberately a different
 * shape from the licensed-image record above (no creator/license/source
 * page, since none apply).
 */
export function formatAiGeneratedCreditEntry({ number, storyLabel, localFilename, generationDate, generationModel, purpose, altText }) {
  return `### ${number}. \`${localFilename}\`
- **Story:** ${storyLabel}
- **Type:** AI-generated editorial illustration (not a real photograph)
- **Generated:** ${generationDate}
- **Model:** ${generationModel}
- **Purpose:** ${purpose}
- **Alt text:** ${altText}
`;
}

/**
 * Finds the highest `### N.` entry number already used anywhere in
 * IMAGE_CREDITS.md, so a new section's entries can continue the running
 * numbering rather than restarting or colliding.
 */
export function nextCreditEntryNumber(creditsPath) {
  if (!fs.existsSync(creditsPath)) return 1;
  const text = fs.readFileSync(creditsPath, "utf8");
  let max = 0;
  for (const m of text.matchAll(/^### (\d+)\./gm)) {
    max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

/**
 * Appends a new "## <heading>" section (a set of already-formatted entries
 * from formatLicensedCreditEntry/formatAiGeneratedCreditEntry) to the end
 * of IMAGE_CREDITS.md, skipping any entry whose local filename is already
 * present in the file (defensive — avoids ever duplicating an entry).
 * Creates the file with a minimal header if it doesn't exist yet (only
 * relevant for scratch/test paths; the real IMAGE_CREDITS.md always
 * exists).
 */
export function appendCreditsSection(creditsPath, { sectionHeading, entries }) {
  const existing = fs.existsSync(creditsPath) ? fs.readFileSync(creditsPath, "utf8") : "# Image Credits\n";

  const newEntries = entries.filter((e) => !existing.includes(`### ${e.number}. \`${e.localFilename}\``) && !existing.includes(`\`${e.localFilename}\``));
  if (newEntries.length === 0) return { appended: 0 };

  const sectionBody = newEntries.map((e) => e.markdown).join("\n");
  const section = `\n## ${sectionHeading}\n\n${sectionBody}\n---\n`;

  fs.writeFileSync(creditsPath, existing.replace(/\s*$/, "\n") + section);
  return { appended: newEntries.length };
}
