/**
 * Publication-preparation gate: proves an edition is safe to publish by
 * running, in strict order, stopping at the first failure:
 *   1. generation  (scripts/generate-real-edition.mjs)
 *   2. validation  (scripts/validate-edition.mjs)
 *   3. lint        (npm run lint)
 *   4. build       (npm run build)
 *
 * This script NEVER runs `git add`/`commit`/`push` — it only proves
 * readiness. Committing and pushing are a later step's responsibility
 * (GitHub Actions, not yet implemented).
 *
 * Each stage is a plain shell command, inherited stdio (so the real
 * generation/validation/lint/build output streams live), checked only by
 * exit code. The four commands are individually overridable via env vars
 * specifically so this orchestration can be tested with cheap stubs
 * instead of a real ~9-minute GDELT+OpenAI generation run — see
 * scripts/test-prepare-weekly-edition.mjs.
 *
 * Transaction safety (unchanged from Step 6): if generation fails, nothing
 * publishable was written (scripts/lib/edition-image-pipeline.mjs's
 * staging/cleanup still applies unmodified). If generation succeeds but a
 * later stage fails, the generated edition file/images/credits are left
 * on disk for diagnosis — this script never deletes them.
 *
 * Usage:
 *   EDITION_DATE=2026-09-11 node scripts/prepare-weekly-edition.mjs
 *   npm run prepare:edition -- (EDITION_DATE must still be set in env)
 *
 * Optional environment variables:
 *   SKIP_GENERATION=1           Skip stage 1 (e.g. when testing against an
 *                               edition that already exists on disk).
 *   PREPARE_GENERATION_CMD=...  Override the generation command.
 *   PREPARE_VALIDATION_CMD=...  Override the validation command.
 *   PREPARE_LINT_CMD=...        Override the lint command.
 *   PREPARE_BUILD_CMD=...       Override the build command.
 *   (Any other env var, e.g. EDITION_OUTPUT_DIR/IMAGE_OUTPUT_DIR/
 *   IMAGE_CREDITS_PATH/EDITIONS_DIR/PUBLIC_DIR/ALLOW_OVERWRITE, is passed
 *   through unchanged to every stage, same as this process's own env.)
 */

import { spawnSync } from "node:child_process";

const EDITION_DATE = process.env.EDITION_DATE;
if (!EDITION_DATE) {
  console.error("EDITION_DATE is required, e.g.: EDITION_DATE=2026-09-11 node scripts/prepare-weekly-edition.mjs");
  process.exitCode = 1;
  process.exit(1);
}

const SKIP_GENERATION = process.env.SKIP_GENERATION === "1";

const GENERATION_CMD = process.env.PREPARE_GENERATION_CMD || "node scripts/generate-real-edition.mjs";
const VALIDATION_CMD = process.env.PREPARE_VALIDATION_CMD || "node scripts/validate-edition.mjs";
const LINT_CMD = process.env.PREPARE_LINT_CMD || "npm run lint";
const BUILD_CMD = process.env.PREPARE_BUILD_CMD || "npm run build";

const stages = [];
if (!SKIP_GENERATION) {
  stages.push({ name: "Generation", command: GENERATION_CMD });
} else {
  console.log("(Generation skipped: SKIP_GENERATION=1)");
}
stages.push({ name: "Validation", command: VALIDATION_CMD });
stages.push({ name: "Lint", command: LINT_CMD });
stages.push({ name: "Build", command: BUILD_CMD });

console.log(`Preparing edition ${EDITION_DATE} — running ${stages.map((s) => s.name).join(" -> ")}...\n`);

const results = [];
let failedStage = null;

for (const stage of stages) {
  console.log(`--- Running: ${stage.name} (${stage.command}) ---`);
  const res = spawnSync(stage.command, { shell: true, stdio: "inherit", env: process.env });
  const passed = res.status === 0;
  results.push({ name: stage.name, passed });
  console.log(`--- ${stage.name}: ${passed ? "PASS" : "FAIL"} ---\n`);
  if (!passed) {
    failedStage = stage.name;
    break;
  }
}

console.log("Weekly edition preparation");
console.log(`Edition: ${EDITION_DATE}`);
console.log("");
for (const r of results) {
  console.log(`${r.name}: ${r.passed ? "PASS" : "FAIL"}`);
}
console.log("");
console.log(`RESULT: ${failedStage ? "NOT READY TO PUBLISH" : "READY TO PUBLISH"}`);

process.exitCode = failedStage ? 1 : 0;
