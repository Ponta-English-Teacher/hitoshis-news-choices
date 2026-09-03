/**
 * Archive retention: removes editions older than the retention window
 * (default 56 days / ~8 weeks), relative to EDITION_DATE — the edition
 * just published this run, never the machine's wall-clock date.
 *
 * Safety model:
 *   1. scripts/lib/retention.mjs computes the ENTIRE plan in memory first
 *      (which editions/images to remove, cross-checked against index.ts)
 *      and throws RetentionPlanError, with NOTHING written, if the plan
 *      cannot be trusted (malformed input, inconsistent registry, or a
 *      plan that would remove every edition).
 *   2. Only once a plan validates does this script perform writes, in an
 *      order chosen to minimize damage from a mid-operation crash:
 *        a. index.ts (registry) updated FIRST — removing the reference
 *           before the file disappears, so a crash right after this step
 *           leaves an orphaned-but-harmless .ts file, never a dangling
 *           import.
 *        b. Old edition .ts files deleted.
 *        c. IMAGE_CREDITS.md pruned (only entries for images actually
 *           being deleted — never a general orphan sweep).
 *        d. Now-unused images deleted (only ones NOT referenced by any
 *           retained edition).
 *        e. A precise JSON manifest is written last, recording exactly
 *           which repo-relative paths were removed — this is what lets
 *           the GitHub Actions workflow's artifact-safety step accept
 *           these specific, intentional deletions without weakening its
 *           allowlist to a blanket glob (see .github/workflows/weekly-edition.yml).
 *   3. Retained edition files are never opened for writing — only read,
 *      to collect their image references.
 *
 * If this script exits non-zero, scripts/prepare-weekly-edition.mjs stops
 * the whole publish (no commit, no push) — the same fail-fast contract
 * every other stage already has, so even an imperfect mid-write crash
 * here can never reach a real, persisted commit.
 *
 * Usage:
 *   EDITION_DATE=2026-10-30 node scripts/retain-editions.mjs
 *
 * Optional environment variables:
 *   RETENTION_WINDOW_DAYS=56    Override the retention window (days).
 *   EDITION_OUTPUT_DIR=...      Override src/data/editions/ (testing only).
 *   IMAGE_OUTPUT_DIR=...        Override public/images/stories/ (testing only).
 *   IMAGE_CREDITS_PATH=...      Override IMAGE_CREDITS.md (testing only).
 *   RETENTION_OUTPUT_DIR=...    Override where the manifest is written
 *                               (defaults to the real scripts/output/).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeRetentionPlan, removeCreditEntriesForFilenames, RetentionPlanError, DEFAULT_RETENTION_WINDOW_DAYS } from "./lib/retention.mjs";
import { removeEditionsFromIndex } from "./lib/editions-index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const EDITIONS_DIR = process.env.EDITION_OUTPUT_DIR
  ? path.resolve(process.env.EDITION_OUTPUT_DIR)
  : path.join(PROJECT_ROOT, "src", "data", "editions");
const EDITIONS_INDEX_PATH = path.join(EDITIONS_DIR, "index.ts");
const IMAGES_DIR = process.env.IMAGE_OUTPUT_DIR
  ? path.resolve(process.env.IMAGE_OUTPUT_DIR)
  : path.join(PROJECT_ROOT, "public", "images", "stories");
const CREDITS_PATH = process.env.IMAGE_CREDITS_PATH
  ? path.resolve(process.env.IMAGE_CREDITS_PATH)
  : path.join(PROJECT_ROOT, "IMAGE_CREDITS.md");
const OUTPUT_DIR = process.env.RETENTION_OUTPUT_DIR
  ? path.resolve(process.env.RETENTION_OUTPUT_DIR)
  : path.join(PROJECT_ROOT, "scripts", "output");

const EDITION_DATE = process.env.EDITION_DATE;
if (!EDITION_DATE) {
  console.error("EDITION_DATE is required, e.g.: EDITION_DATE=2026-10-30 node scripts/retain-editions.mjs");
  process.exitCode = 1;
  process.exit(1);
}

const WINDOW_DAYS = process.env.RETENTION_WINDOW_DAYS
  ? Number(process.env.RETENTION_WINDOW_DAYS)
  : DEFAULT_RETENTION_WINDOW_DAYS;

// Fixed logical repo-relative prefixes for the manifest — always these,
// regardless of EDITION_OUTPUT_DIR/IMAGE_OUTPUT_DIR overrides used for
// testing, since the manifest describes the real repo shape the GitHub
// Actions workflow's `git status` will see.
const EDITIONS_REPO_PREFIX = "src/data/editions";
const IMAGES_REPO_PREFIX = "public/images/stories";

function writeManifest(plan, { creditsModified }) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const manifestPath = path.join(OUTPUT_DIR, `retention-report-${EDITION_DATE}.json`);
  const manifest = {
    generatedAt: new Date().toISOString(),
    referenceDate: plan.referenceDate,
    windowDays: plan.windowDays,
    cutoffDate: plan.cutoffDate,
    keptEditionDates: plan.keptDates,
    removedEditionDates: plan.removedDates,
    removedEditionFiles: plan.removedEditionFiles.map((f) => `${EDITIONS_REPO_PREFIX}/${f}`),
    removedImages: plan.imagesToDelete.map((f) => `${IMAGES_REPO_PREFIX}/${f}`),
    creditsModified,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  return manifestPath;
}

let plan;
try {
  plan = computeRetentionPlan({
    editionsDir: EDITIONS_DIR,
    editionsIndexPath: EDITIONS_INDEX_PATH,
    referenceDate: EDITION_DATE,
    windowDays: WINDOW_DAYS,
  });
} catch (err) {
  if (err instanceof RetentionPlanError) {
    console.error(`::error::Retention plan invalid, nothing was written: ${err.message}`);
  } else {
    console.error(`::error::Unexpected error while planning retention, nothing was written: ${err.stack || err.message}`);
  }
  process.exitCode = 1;
  process.exit(1);
}

console.log(`Retention: reference date ${plan.referenceDate}, window ${plan.windowDays} days, cutoff ${plan.cutoffDate}`);
console.log(`Kept editions (${plan.keptDates.length}): ${plan.keptDates.join(", ") || "(none)"}`);
console.log(`Removed editions (${plan.removedDates.length}): ${plan.removedDates.join(", ") || "(none)"}`);

if (plan.removedDates.length === 0) {
  console.log("Nothing to retire this run.");
  const manifestPath = writeManifest(plan, { creditsModified: false });
  console.log(`Wrote retention manifest: ${path.relative(PROJECT_ROOT, manifestPath)}`);
  console.log("RESULT: PASS (no-op)");
  process.exit(0);
}

try {
  // (a) Registry updated first.
  removeEditionsFromIndex(EDITIONS_INDEX_PATH, plan.removedDates);
  console.log(`Removed ${plan.removedDates.length} entr${plan.removedDates.length === 1 ? "y" : "ies"} from index.ts`);

  // (b) Old edition files deleted.
  for (const filename of plan.removedEditionFiles) {
    fs.unlinkSync(path.join(EDITIONS_DIR, filename));
    console.log(`Deleted edition file: ${filename}`);
  }

  // (c) Credits pruned — only entries for images actually being deleted.
  let creditsModified = false;
  if (plan.imagesToDelete.length > 0 && fs.existsSync(CREDITS_PATH)) {
    const existingCredits = fs.readFileSync(CREDITS_PATH, "utf8");
    const { text: newCredits, removedFilenames } = removeCreditEntriesForFilenames(existingCredits, new Set(plan.imagesToDelete));
    if (newCredits !== existingCredits) {
      fs.writeFileSync(CREDITS_PATH, newCredits);
      creditsModified = true;
      console.log(`Removed ${removedFilenames.length} credit entr${removedFilenames.length === 1 ? "y" : "ies"} from IMAGE_CREDITS.md`);
    }
  }

  // (d) Now-unused images deleted.
  for (const filename of plan.imagesToDelete) {
    const imagePath = path.join(IMAGES_DIR, filename);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Deleted image: ${filename}`);
    } else {
      console.log(`Image already absent, nothing to delete: ${filename}`);
    }
  }

  // (e) Manifest written last — purely informational at this point, since
  // every real change above already succeeded.
  const manifestPath = writeManifest(plan, { creditsModified });
  console.log(`Wrote retention manifest: ${path.relative(PROJECT_ROOT, manifestPath)}`);
  console.log("RESULT: PASS");
  process.exit(0);
} catch (err) {
  console.error(`::error::Retention failed partway through applying an already-validated plan: ${err.stack || err.message}`);
  console.error("::error::The working tree may now be partially modified. This run's failure exit code will stop the publish before any commit/push occurs.");
  process.exitCode = 1;
  process.exit(1);
}
