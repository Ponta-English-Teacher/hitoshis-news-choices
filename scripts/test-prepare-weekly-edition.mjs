/**
 * Regression check for scripts/prepare-weekly-edition.mjs's fail-fast
 * ordering across the full 6-stage gate: Generation -> Validation ->
 * Retention -> Post-retention Validation -> Lint -> Build. Each stage
 * command is stubbed with a tiny `node -e` snippet that writes a marker
 * file before exiting with a chosen code — proving not just "the printed
 * PASS/FAIL text looks right" but that a later stage's command was
 * literally never invoked (no marker file appears) when an earlier stage
 * fails. No real GDELT/OpenAI call, no real retention/lint/build — this
 * tests the ORCHESTRATOR, not the underlying scripts (those are proven
 * separately: retention in scripts/test-retention.mjs, the rest in the
 * Step 6-8 reports).
 *
 * Run: node scripts/test-prepare-weekly-edition.mjs
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SCRIPT_PATH = path.join(PROJECT_ROOT, "scripts", "prepare-weekly-edition.mjs");

let failures = 0;
let total = 0;
function report(label, pass, detail) {
  total++;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

/** A stub stage command: writes `markerPath` then exits with `code`. */
function stub(markerPath, code) {
  const escaped = markerPath.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  return `node -e "require('fs').writeFileSync('${escaped}', '1'); process.exit(${code})"`;
}

const STAGE_NAMES = ["Generation", "Validation", "Retention", "PostRetentionValidation", "Lint", "Build"];

function runScenario(codes) {
  // codes: { Generation, Validation, Retention, PostRetentionValidation, Lint, Build } -> exit code (0 = pass)
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "prepare-edition-test-"));
  const markers = {};
  for (const name of STAGE_NAMES) markers[name] = path.join(scratch, `ran-${name}`);

  const env = {
    ...process.env,
    EDITION_DATE: "2099-02-01",
    PREPARE_GENERATION_CMD: stub(markers.Generation, codes.Generation),
    PREPARE_VALIDATION_CMD: stub(markers.Validation, codes.Validation),
    PREPARE_RETENTION_CMD: stub(markers.Retention, codes.Retention),
    PREPARE_POST_RETENTION_VALIDATION_CMD: stub(markers.PostRetentionValidation, codes.PostRetentionValidation),
    PREPARE_LINT_CMD: stub(markers.Lint, codes.Lint),
    PREPARE_BUILD_CMD: stub(markers.Build, codes.Build),
  };

  const res = spawnSync("node", [SCRIPT_PATH], { env, encoding: "utf8" });
  const ran = {};
  for (const name of STAGE_NAMES) ran[name] = fs.existsSync(markers[name]);
  fs.rmSync(scratch, { recursive: true, force: true });

  return { exitCode: res.status, stdout: res.stdout, ran };
}

function allTrue(ran, names) {
  return names.every((n) => ran[n]);
}
function allFalse(ran, names) {
  return names.every((n) => !ran[n]);
}

console.log("=== Scenario A: all six stages pass ===");
{
  const r = runScenario({ Generation: 0, Validation: 0, Retention: 0, PostRetentionValidation: 0, Lint: 0, Build: 0 });
  report("Exit code is 0", r.exitCode === 0, `got ${r.exitCode}`);
  report("All six stages ran", allTrue(r.ran, STAGE_NAMES));
  report(
    "Output reports all six as PASS",
    /Generation: PASS/.test(r.stdout) &&
      /Validation: PASS/.test(r.stdout) &&
      /Retention: PASS/.test(r.stdout) &&
      /Post-retention Validation: PASS/.test(r.stdout) &&
      /Lint: PASS/.test(r.stdout) &&
      /Build: PASS/.test(r.stdout)
  );
  report("Output reports READY TO PUBLISH", /RESULT: READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario B: generation fails ===");
{
  const r = runScenario({ Generation: 1, Validation: 0, Retention: 0, PostRetentionValidation: 0, Lint: 0, Build: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Only Generation ran", r.ran.Generation && allFalse(r.ran, STAGE_NAMES.slice(1)));
  report("Output reports Generation: FAIL", /Generation: FAIL/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario C (Q): first validation fails -> retention never runs ===");
{
  const r = runScenario({ Generation: 0, Validation: 1, Retention: 0, PostRetentionValidation: 0, Lint: 0, Build: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Generation and Validation ran", r.ran.Generation && r.ran.Validation);
  report("Retention/PostRetentionValidation/Lint/Build never ran", allFalse(r.ran, ["Retention", "PostRetentionValidation", "Lint", "Build"]));
  report("Output reports Generation: PASS then Validation: FAIL", /Generation: PASS/.test(r.stdout) && /Validation: FAIL/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario D (R): retention fails -> post-retention validation/lint/build never run ===");
{
  const r = runScenario({ Generation: 0, Validation: 0, Retention: 1, PostRetentionValidation: 0, Lint: 0, Build: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Generation, Validation, Retention ran", r.ran.Generation && r.ran.Validation && r.ran.Retention);
  report("PostRetentionValidation/Lint/Build never ran", allFalse(r.ran, ["PostRetentionValidation", "Lint", "Build"]));
  report("Output reports Retention: FAIL", /Retention: FAIL/.test(r.stdout));
  report("Output does not mention Post-retention Validation/Lint/Build results", !/Post-retention Validation: (PASS|FAIL)/.test(r.stdout) && !/Lint: (PASS|FAIL)/.test(r.stdout) && !/Build: (PASS|FAIL)/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario E (S): post-retention validation fails -> lint/build never run ===");
{
  const r = runScenario({ Generation: 0, Validation: 0, Retention: 0, PostRetentionValidation: 1, Lint: 0, Build: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Generation, Validation, Retention, PostRetentionValidation ran", r.ran.Generation && r.ran.Validation && r.ran.Retention && r.ran.PostRetentionValidation);
  report("Lint/Build never ran", allFalse(r.ran, ["Lint", "Build"]));
  report("Output reports Post-retention Validation: FAIL", /Post-retention Validation: FAIL/.test(r.stdout));
  report("Output does not mention Lint/Build results", !/Lint: (PASS|FAIL)/.test(r.stdout) && !/Build: (PASS|FAIL)/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario F: lint fails -> build never runs ===");
{
  const r = runScenario({ Generation: 0, Validation: 0, Retention: 0, PostRetentionValidation: 0, Lint: 1, Build: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Everything up to and including Lint ran", allTrue(r.ran, ["Generation", "Validation", "Retention", "PostRetentionValidation", "Lint"]));
  report("Build never ran", !r.ran.Build);
  report("Output reports Lint: FAIL", /Lint: FAIL/.test(r.stdout));
  report("Output does not mention Build result", !/Build: (PASS|FAIL)/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario G: build fails ===");
{
  const r = runScenario({ Generation: 0, Validation: 0, Retention: 0, PostRetentionValidation: 0, Lint: 0, Build: 1 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("All six stages ran", allTrue(r.ran, STAGE_NAMES));
  report("Output reports Build: FAIL", /Build: FAIL/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

if (failures > 0) process.exitCode = 1;
console.log(`\n${total - failures}/${total} checks passed.`);
