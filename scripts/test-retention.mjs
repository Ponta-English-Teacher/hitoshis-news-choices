/**
 * Regression tests for the 8-week archive retention backend
 * (scripts/lib/retention.mjs, scripts/retain-editions.mjs, and the
 * removeEditionsFromIndex() addition to scripts/lib/editions-index.mjs).
 *
 * Everything here operates against scratch tmpdirs only — never the real
 * src/data/editions/, public/images/stories/, or IMAGE_CREDITS.md.
 *
 * Run: node scripts/test-retention.mjs
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  computeCutoffDate,
  isEditionRetained,
  computeRetentionPlan,
  removeCreditEntriesForFilenames,
  RetentionPlanError,
  DEFAULT_RETENTION_WINDOW_DAYS,
} from "./lib/retention.mjs";
import { serializeIndexFile, parseExistingEntries } from "./lib/editions-index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const RETAIN_SCRIPT = path.join(PROJECT_ROOT, "scripts", "retain-editions.mjs");

let failures = 0;
let total = 0;
function report(label, pass, detail) {
  total++;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

// ---------------------------------------------------------------------
// Scratch-archive helpers
// ---------------------------------------------------------------------

function makeScratchArchive() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "retention-test-"));
  const editionsDir = path.join(root, "editions");
  const imagesDir = path.join(root, "images");
  const creditsPath = path.join(root, "IMAGE_CREDITS.md");
  fs.mkdirSync(editionsDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });
  return { root, editionsDir, imagesDir, creditsPath };
}

function cleanupScratch(root) {
  fs.rmSync(root, { recursive: true, force: true });
}

/** Synthetic fixture — not a real NewsStory shape, just enough for the imageUrl regex scan. */
function writeEditionFile(editionsDir, date, imageFilenames, { raw } = {}) {
  if (raw !== undefined) {
    fs.writeFileSync(path.join(editionsDir, `${date}.ts`), raw);
    return;
  }
  const varName = `stories_${date.replace(/-/g, "_")}`;
  const body = imageFilenames
    .map((f, i) => `  {\n    id: "story-${date}-${i}",\n    imageUrl: "/images/stories/${f}",\n  },`)
    .join("\n");
  fs.writeFileSync(
    path.join(editionsDir, `${date}.ts`),
    `// Synthetic fixture for scripts/test-retention.mjs — not a real NewsStory shape.\nexport const ${varName} = [\n${body}\n];\nexport const stories = ${varName};\n`
  );
}

function writeIndexFile(editionsDir, dates) {
  const entries = [...dates]
    .sort()
    .reverse()
    .map((date) => ({
      date,
      dateRangeLabelLiteral: JSON.stringify(`${date} label`),
      varName: `stories_${date.replace(/-/g, "_")}`,
    }));
  fs.writeFileSync(path.join(editionsDir, "index.ts"), serializeIndexFile(entries));
}

function writeImage(imagesDir, filename) {
  fs.writeFileSync(path.join(imagesDir, filename), "not a real image, just a marker file\n");
}

function creditEntryBlock(number, filename) {
  return `### ${number}. \`${filename}\`
- **Story:** Test story for ${filename}
- **Subject:** Test subject
- **Photographer / creator:** Test Creator
- **Original file page:** https://commons.wikimedia.org/wiki/File:Test_${filename}
- **License:** CC BY-SA 4.0
- **Attribution wording required:** "Test Creator / Wikimedia Commons / CC BY-SA 4.0"

`;
}

function writeCreditsFile(creditsPath, sections) {
  let text = "# Image Credits\n\nTest fixture.\n";
  for (const section of sections) {
    text += `\n## ${section.heading}\n\n`;
    for (const entry of section.entries) {
      text += creditEntryBlock(entry.number, entry.filename);
    }
    text += "---\n";
  }
  fs.writeFileSync(creditsPath, text);
}

function snapshotDir(dir) {
  if (!fs.existsSync(dir)) return {};
  const snap = {};
  for (const f of fs.readdirSync(dir)) {
    snap[f] = fs.readFileSync(path.join(dir, f)).toString("base64");
  }
  return snap;
}

function runCli(env) {
  const res = spawnSync("node", [RETAIN_SCRIPT], {
    env: { ...process.env, ...env },
    encoding: "utf8",
  });
  return { status: res.status, stdout: res.stdout, stderr: res.stderr };
}

// =======================================================================
// A/B/C — boundary: newer retained, exactly 56 days retained, 57 removed
// =======================================================================
console.log("=== A/B/C: 56-day boundary ===");
{
  report("DEFAULT_RETENTION_WINDOW_DAYS is documented as 56", DEFAULT_RETENTION_WINDOW_DAYS === 56);
  const ref = "2026-10-30";
  report("A. 10 days old -> retained", isEditionRetained("2026-10-20", ref) === true);
  report("B. exactly 56 days old -> retained", isEditionRetained("2026-09-04", ref) === true, `cutoff=${computeCutoffDate(ref)}`);
  report("C. 57 days old -> removed", isEditionRetained("2026-09-03", ref) === false, `cutoff=${computeCutoffDate(ref)}`);
  report("cutoffDate(2026-10-30, 56) === 2026-09-04", computeCutoffDate(ref, 56) === "2026-09-04");
}

// =======================================================================
// D — month boundary
// =======================================================================
console.log("\n=== D: month boundary ===");
{
  // Ground truth cross-checked independently via Python: date(2026,3,1) - timedelta(days=56) == 2026-01-04
  const ref = "2026-03-01";
  report("cutoffDate(2026-03-01, 56) === 2026-01-04", computeCutoffDate(ref, 56) === "2026-01-04");
  report("2026-01-04 (exactly cutoff) -> retained", isEditionRetained("2026-01-04", ref) === true);
  report("2026-01-03 (one day older) -> removed", isEditionRetained("2026-01-03", ref) === false);
}

// =======================================================================
// E — year boundary
// =======================================================================
console.log("\n=== E: year boundary ===");
{
  // Ground truth cross-checked independently via Python: date(2027,1,15) - timedelta(days=56) == 2026-11-20
  const ref = "2027-01-15";
  report("cutoffDate(2027-01-15, 56) === 2026-11-20", computeCutoffDate(ref, 56) === "2026-11-20");
  report("2026-11-20 (exactly cutoff) -> retained", isEditionRetained("2026-11-20", ref) === true);
  report("2026-11-19 (one day older) -> removed", isEditionRetained("2026-11-19", ref) === false);
}

// =======================================================================
// F — multiple old editions removed correctly (+ G/H shared-image protection)
// =======================================================================
console.log("\n=== F/G/H: multiple removals, shared-image protection ===");
{
  const { root, editionsDir, imagesDir } = makeScratchArchive();
  const ref = "2026-10-30";
  // Kept: 2026-10-30 (0d), 2026-10-01 (29d), 2026-09-04 (56d, boundary)
  // Removed: 2026-09-03 (57d), 2026-06-01 (~151d), 2026-01-01 (very old)
  writeEditionFile(editionsDir, "2026-10-30", ["shared.jpg", "only-in-new.jpg"]);
  writeEditionFile(editionsDir, "2026-10-01", ["mid.jpg"]);
  writeEditionFile(editionsDir, "2026-09-04", ["boundary.jpg"]);
  writeEditionFile(editionsDir, "2026-09-03", ["shared.jpg", "only-in-old.jpg"]); // shares "shared.jpg" with a RETAINED edition
  writeEditionFile(editionsDir, "2026-06-01", ["june.jpg"]);
  writeEditionFile(editionsDir, "2026-01-01", ["january.jpg"]);
  writeIndexFile(editionsDir, ["2026-10-30", "2026-10-01", "2026-09-04", "2026-09-03", "2026-06-01", "2026-01-01"]);
  for (const f of ["shared.jpg", "only-in-new.jpg", "mid.jpg", "boundary.jpg", "only-in-old.jpg", "june.jpg", "january.jpg"]) {
    writeImage(imagesDir, f);
  }

  const plan = computeRetentionPlan({
    editionsDir,
    editionsIndexPath: path.join(editionsDir, "index.ts"),
    referenceDate: ref,
  });

  report("F. kept dates are exactly the 3 within window", JSON.stringify(plan.keptDates) === JSON.stringify(["2026-10-30", "2026-10-01", "2026-09-04"]), JSON.stringify(plan.keptDates));
  report("F. removed dates are exactly the 3 outside window", JSON.stringify(plan.removedDates) === JSON.stringify(["2026-09-03", "2026-06-01", "2026-01-01"]), JSON.stringify(plan.removedDates));
  report("G. shared.jpg is NOT scheduled for deletion (still used by a retained edition)", !plan.imagesToDelete.includes("shared.jpg"), JSON.stringify(plan.imagesToDelete));
  report("H. only-in-old.jpg (removed edition only) IS scheduled for deletion", plan.imagesToDelete.includes("only-in-old.jpg"));
  report("H. june.jpg and january.jpg (removed editions only) ARE scheduled for deletion", plan.imagesToDelete.includes("june.jpg") && plan.imagesToDelete.includes("january.jpg"));
  report("only-in-new.jpg, mid.jpg, boundary.jpg (retained editions) are NOT scheduled for deletion", !plan.imagesToDelete.some((f) => ["only-in-new.jpg", "mid.jpg", "boundary.jpg"].includes(f)));

  // Now actually apply it via the real CLI and prove the filesystem effects.
  const res = runCli({
    EDITION_DATE: ref,
    EDITION_OUTPUT_DIR: editionsDir,
    IMAGE_OUTPUT_DIR: imagesDir,
    IMAGE_CREDITS_PATH: path.join(root, "IMAGE_CREDITS.md"), // doesn't exist; script must tolerate that
    RETENTION_OUTPUT_DIR: path.join(root, "output"),
  });
  report("CLI exits 0 on a valid plan", res.status === 0, res.stderr);

  report("Removed edition files deleted from disk", !fs.existsSync(path.join(editionsDir, "2026-09-03.ts")) && !fs.existsSync(path.join(editionsDir, "2026-06-01.ts")) && !fs.existsSync(path.join(editionsDir, "2026-01-01.ts")));
  report("Retained edition files still present", fs.existsSync(path.join(editionsDir, "2026-10-30.ts")) && fs.existsSync(path.join(editionsDir, "2026-10-01.ts")) && fs.existsSync(path.join(editionsDir, "2026-09-04.ts")));
  report("shared.jpg still exists on disk (protected)", fs.existsSync(path.join(imagesDir, "shared.jpg")));
  report("only-in-old.jpg deleted from disk", !fs.existsSync(path.join(imagesDir, "only-in-old.jpg")));
  report("june.jpg and january.jpg deleted from disk", !fs.existsSync(path.join(imagesDir, "june.jpg")) && !fs.existsSync(path.join(imagesDir, "january.jpg")));
  report("only-in-new.jpg/mid.jpg/boundary.jpg still on disk", fs.existsSync(path.join(imagesDir, "only-in-new.jpg")) && fs.existsSync(path.join(imagesDir, "mid.jpg")) && fs.existsSync(path.join(imagesDir, "boundary.jpg")));

  // K/L/M — registry stays valid after removal.
  const finalIndexText = fs.readFileSync(path.join(editionsDir, "index.ts"), "utf8");
  const finalEntries = parseExistingEntries(finalIndexText);
  report("K. registry is strict newest-first after removal", JSON.stringify(finalEntries.map((e) => e.date)) === JSON.stringify(["2026-10-30", "2026-10-01", "2026-09-04"]));
  report("L. latestEdition literal present (editions[0] semantics unchanged)", /export const latestEdition = editions\[0\];/.test(finalIndexText));
  report("M. findEditionByDate/findStoryById function bodies present unchanged", /export function findEditionByDate/.test(finalIndexText) && /export function findStoryById/.test(finalIndexText));

  cleanupScratch(root);
}

// =======================================================================
// I/J — IMAGE_CREDITS.md entry removal precision
// =======================================================================
console.log("\n=== I/J: IMAGE_CREDITS.md entry removal precision ===");
{
  const creditsText =
    "# Image Credits\n\n" +
    "## Original six (development placeholders, currently unused by any live story)\n\n" +
    creditEntryBlock(1, "orphaned-legacy.jpg") +
    "---\n" +
    "## Second edition\n\n" +
    creditEntryBlock(2, "kept-image.jpg") +
    creditEntryBlock(3, "to-be-removed.jpg") +
    creditEntryBlock(4, "also-kept.jpg") +
    "---\n";

  const { text: newText, removedFilenames } = removeCreditEntriesForFilenames(creditsText, new Set(["to-be-removed.jpg"]));

  report("I. exactly one entry removed", removedFilenames.length === 1 && removedFilenames[0] === "to-be-removed.jpg");
  report("I. removed entry's heading/body gone", !newText.includes("to-be-removed.jpg"));
  report("J. unrelated orphaned entry (orphaned-legacy.jpg) left byte-for-byte untouched", newText.includes(creditEntryBlock(1, "orphaned-legacy.jpg")));
  report("J. surviving entries in the same section left byte-for-byte untouched", newText.includes(creditEntryBlock(2, "kept-image.jpg")) && newText.includes(creditEntryBlock(4, "also-kept.jpg")));
  report("Section dividers ('---') still present (not eaten by the removed entry's block)", (newText.match(/^---$/gm) || []).length === 2);
  report("No-op when filenamesToRemove is empty", removeCreditEntriesForFilenames(creditsText, new Set()).text === creditsText);
}

// =======================================================================
// N — malformed edition aborts with ZERO filesystem changes
// =======================================================================
console.log("\n=== N: malformed edition aborts with zero changes ===");
{
  const { root, editionsDir, imagesDir, creditsPath } = makeScratchArchive();
  writeEditionFile(editionsDir, "2026-10-30", ["good.jpg"]);
  writeEditionFile(editionsDir, "not-a-date", ["bad.jpg"], { raw: "export const stories = [];\n" }); // malformed filename shape
  writeIndexFile(editionsDir, ["2026-10-30"]);
  writeImage(imagesDir, "good.jpg");
  writeImage(imagesDir, "bad.jpg");
  writeCreditsFile(creditsPath, []);

  const before = { editions: snapshotDir(editionsDir), images: snapshotDir(imagesDir), credits: fs.readFileSync(creditsPath, "utf8") };

  let threw = false;
  try {
    computeRetentionPlan({ editionsDir, editionsIndexPath: path.join(editionsDir, "index.ts"), referenceDate: "2026-10-30" });
  } catch (err) {
    threw = err instanceof RetentionPlanError;
  }
  report("N. computeRetentionPlan throws RetentionPlanError on malformed filename", threw);

  const res = runCli({
    EDITION_DATE: "2026-10-30",
    EDITION_OUTPUT_DIR: editionsDir,
    IMAGE_OUTPUT_DIR: imagesDir,
    IMAGE_CREDITS_PATH: creditsPath,
    RETENTION_OUTPUT_DIR: path.join(root, "output"),
  });
  report("N. CLI exits non-zero", res.status !== 0);

  const after = { editions: snapshotDir(editionsDir), images: snapshotDir(imagesDir), credits: fs.readFileSync(creditsPath, "utf8") };
  report("N. ZERO filesystem changes (editions dir byte-identical)", JSON.stringify(before.editions) === JSON.stringify(after.editions));
  report("N. ZERO filesystem changes (images dir byte-identical)", JSON.stringify(before.images) === JSON.stringify(after.images));
  report("N. ZERO filesystem changes (credits file byte-identical)", before.credits === after.credits);

  cleanupScratch(root);
}

// =======================================================================
// O — invalid plan (registry/disk inconsistency) aborts with ZERO changes
// =======================================================================
console.log("\n=== O: invalid plan (registry/disk mismatch) aborts with zero changes ===");
{
  const { root, editionsDir, imagesDir, creditsPath } = makeScratchArchive();
  writeEditionFile(editionsDir, "2026-10-30", ["a.jpg"]);
  writeEditionFile(editionsDir, "2026-10-01", ["b.jpg"]);
  // index.ts only knows about one of the two on-disk files — an inconsistent registry.
  writeIndexFile(editionsDir, ["2026-10-30"]);
  writeImage(imagesDir, "a.jpg");
  writeImage(imagesDir, "b.jpg");
  writeCreditsFile(creditsPath, []);

  const before = { editions: snapshotDir(editionsDir), images: snapshotDir(imagesDir) };

  let threw = false;
  try {
    computeRetentionPlan({ editionsDir, editionsIndexPath: path.join(editionsDir, "index.ts"), referenceDate: "2026-10-30" });
  } catch (err) {
    threw = err instanceof RetentionPlanError;
  }
  report("O. computeRetentionPlan throws RetentionPlanError on disk/registry mismatch", threw);

  const res = runCli({
    EDITION_DATE: "2026-10-30",
    EDITION_OUTPUT_DIR: editionsDir,
    IMAGE_OUTPUT_DIR: imagesDir,
    IMAGE_CREDITS_PATH: creditsPath,
    RETENTION_OUTPUT_DIR: path.join(root, "output"),
  });
  report("O. CLI exits non-zero", res.status !== 0);

  const after = { editions: snapshotDir(editionsDir), images: snapshotDir(imagesDir) };
  report("O. ZERO filesystem changes", JSON.stringify(before.editions) === JSON.stringify(after.editions) && JSON.stringify(before.images) === JSON.stringify(after.images));

  cleanupScratch(root);
}

// =======================================================================
// P — plan that would remove every edition aborts with ZERO changes
// =======================================================================
console.log("\n=== P: plan removing every edition aborts with zero changes ===");
{
  const { root, editionsDir, imagesDir, creditsPath } = makeScratchArchive();
  writeEditionFile(editionsDir, "2026-01-01", ["old1.jpg"]);
  writeEditionFile(editionsDir, "2026-01-05", ["old2.jpg"]);
  writeIndexFile(editionsDir, ["2026-01-01", "2026-01-05"]);
  writeImage(imagesDir, "old1.jpg");
  writeImage(imagesDir, "old2.jpg");
  writeCreditsFile(creditsPath, []);

  const before = { editions: snapshotDir(editionsDir), images: snapshotDir(imagesDir) };

  let threw = false;
  try {
    // referenceDate far in the future -> both editions are > 56 days old -> would remove everything.
    computeRetentionPlan({ editionsDir, editionsIndexPath: path.join(editionsDir, "index.ts"), referenceDate: "2026-10-30" });
  } catch (err) {
    threw = err instanceof RetentionPlanError;
  }
  report("P. computeRetentionPlan throws when the plan would remove every edition", threw);

  const res = runCli({
    EDITION_DATE: "2026-10-30",
    EDITION_OUTPUT_DIR: editionsDir,
    IMAGE_OUTPUT_DIR: imagesDir,
    IMAGE_CREDITS_PATH: creditsPath,
    RETENTION_OUTPUT_DIR: path.join(root, "output"),
  });
  report("P. CLI exits non-zero", res.status !== 0);

  const after = { editions: snapshotDir(editionsDir), images: snapshotDir(imagesDir) };
  report("P. ZERO filesystem changes", JSON.stringify(before.editions) === JSON.stringify(after.editions) && JSON.stringify(before.images) === JSON.stringify(after.images));

  cleanupScratch(root);
}

// =======================================================================
// No-op case: nothing old enough to remove yet — manifest still written,
// exit 0, zero deletions.
// =======================================================================
console.log("\n=== No-op: nothing to remove yet ===");
{
  const { root, editionsDir, imagesDir, creditsPath } = makeScratchArchive();
  writeEditionFile(editionsDir, "2026-10-30", ["a.jpg"]);
  writeEditionFile(editionsDir, "2026-10-01", ["b.jpg"]);
  writeIndexFile(editionsDir, ["2026-10-30", "2026-10-01"]);
  writeImage(imagesDir, "a.jpg");
  writeImage(imagesDir, "b.jpg");
  writeCreditsFile(creditsPath, []);
  const outputDir = path.join(root, "output");

  const res = runCli({
    EDITION_DATE: "2026-10-30",
    EDITION_OUTPUT_DIR: editionsDir,
    IMAGE_OUTPUT_DIR: imagesDir,
    IMAGE_CREDITS_PATH: creditsPath,
    RETENTION_OUTPUT_DIR: outputDir,
  });
  report("No-op run exits 0", res.status === 0, res.stderr);
  report("No-op run deletes nothing", fs.existsSync(path.join(editionsDir, "2026-10-30.ts")) && fs.existsSync(path.join(editionsDir, "2026-10-01.ts")));
  const manifestPath = path.join(outputDir, "retention-report-2026-10-30.json");
  report("Manifest still written on a no-op run", fs.existsSync(manifestPath));
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    report("Manifest reports zero removed editions/images", manifest.removedEditionDates.length === 0 && manifest.removedEditionFiles.length === 0 && manifest.removedImages.length === 0);
  }

  cleanupScratch(root);
}

// =======================================================================
// Manifest shape check (used by the GitHub Actions allowlist step)
// =======================================================================
console.log("\n=== Manifest shape ===");
{
  const { root, editionsDir, imagesDir, creditsPath } = makeScratchArchive();
  writeEditionFile(editionsDir, "2026-10-30", ["new.jpg"]);
  writeEditionFile(editionsDir, "2026-06-01", ["old.jpg"]);
  writeIndexFile(editionsDir, ["2026-10-30", "2026-06-01"]);
  writeImage(imagesDir, "new.jpg");
  writeImage(imagesDir, "old.jpg");
  writeCreditsFile(creditsPath, [{ heading: "old edition", entries: [{ number: 1, filename: "old.jpg" }] }]);
  const outputDir = path.join(root, "output");

  const res = runCli({
    EDITION_DATE: "2026-10-30",
    EDITION_OUTPUT_DIR: editionsDir,
    IMAGE_OUTPUT_DIR: imagesDir,
    IMAGE_CREDITS_PATH: creditsPath,
    RETENTION_OUTPUT_DIR: outputDir,
  });
  report("CLI exits 0", res.status === 0, res.stderr);

  const manifest = JSON.parse(fs.readFileSync(path.join(outputDir, "retention-report-2026-10-30.json"), "utf8"));
  report("Manifest removedEditionFiles uses real repo-relative prefix", manifest.removedEditionFiles.includes("src/data/editions/2026-06-01.ts"), JSON.stringify(manifest.removedEditionFiles));
  report("Manifest removedImages uses real repo-relative prefix", manifest.removedImages.includes("public/images/stories/old.jpg"), JSON.stringify(manifest.removedImages));
  report("Manifest reports creditsModified true", manifest.creditsModified === true);

  cleanupScratch(root);
}

// =======================================================================
// T — a retained edition missing an image -> the (extended) validator's
// new "Archive images" check must FAIL. Proves scripts/validate-edition.mjs
// would catch the exact mistake retention must never make, independent of
// retention's own protection.
// =======================================================================
console.log("\n=== T: retained edition missing an image -> validator FAILs ===");
{
  const { root, editionsDir } = makeScratchArchive();
  writeEditionFile(editionsDir, "2026-10-30", ["current.jpg"]);
  writeEditionFile(editionsDir, "2026-10-01", ["missing-on-disk.jpg"]); // retained, but its image is absent
  writeIndexFile(editionsDir, ["2026-10-30", "2026-10-01"]);
  const publicDir = path.join(root, "public");
  fs.mkdirSync(path.join(publicDir, "images", "stories"), { recursive: true });
  fs.writeFileSync(path.join(publicDir, "images", "stories", "current.jpg"), "marker\n");
  // deliberately do NOT create missing-on-disk.jpg

  const res = spawnSync("node", [path.join(PROJECT_ROOT, "scripts", "validate-edition.mjs")], {
    env: { ...process.env, EDITION_DATE: "2026-10-30", EDITIONS_DIR: editionsDir, PUBLIC_DIR: publicDir },
    encoding: "utf8",
  });
  report("T. validator exits non-zero", res.status !== 0);
  report("T. reports 'Archive images: FAIL'", /Archive images: FAIL/.test(res.stdout), res.stdout);
  report("T. failure message names the missing file", /missing-on-disk\.jpg/.test(res.stdout));
  report("T. overall RESULT: FAIL", /RESULT: FAIL/.test(res.stdout));

  cleanupScratch(root);
}

console.log(`\n${total - failures}/${total} checks passed.`);
if (failures > 0) process.exitCode = 1;
