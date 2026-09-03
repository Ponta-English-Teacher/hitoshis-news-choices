/**
 * Regression check for scripts/prepare-weekly-edition.mjs's fail-fast
 * ordering (scenarios A-E). Each stage command is stubbed with a tiny
 * `node -e` snippet that writes a marker file before exiting with a chosen
 * code — proving not just "the printed PASS/FAIL text looks right" but
 * that a later stage's command was literally never invoked (no marker
 * file appears) when an earlier stage fails. No real GDELT/OpenAI call,
 * no real lint/build — this tests the ORCHESTRATOR, not the underlying
 * scripts (those are proven separately, including against the real
 * September 4 edition — see the Step 7 report).
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

function runScenario({ generationCode, validationCode, lintCode, buildCode }) {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "prepare-edition-test-"));
  const markers = {
    Generation: path.join(scratch, "ran-generation"),
    Validation: path.join(scratch, "ran-validation"),
    Lint: path.join(scratch, "ran-lint"),
    Build: path.join(scratch, "ran-build"),
  };

  const env = {
    ...process.env,
    EDITION_DATE: "2099-02-01",
    PREPARE_GENERATION_CMD: stub(markers.Generation, generationCode),
    PREPARE_VALIDATION_CMD: stub(markers.Validation, validationCode),
    PREPARE_LINT_CMD: stub(markers.Lint, lintCode),
    PREPARE_BUILD_CMD: stub(markers.Build, buildCode),
  };

  const res = spawnSync("node", [SCRIPT_PATH], { env, encoding: "utf8" });
  const ran = {};
  for (const [name, markerPath] of Object.entries(markers)) {
    ran[name] = fs.existsSync(markerPath);
  }
  fs.rmSync(scratch, { recursive: true, force: true });

  return { exitCode: res.status, stdout: res.stdout, ran };
}

console.log("=== Scenario A: all stages pass ===");
{
  const r = runScenario({ generationCode: 0, validationCode: 0, lintCode: 0, buildCode: 0 });
  report("Exit code is 0", r.exitCode === 0, `got ${r.exitCode}`);
  report("All four stages ran", r.ran.Generation && r.ran.Validation && r.ran.Lint && r.ran.Build);
  report("Output reports all four as PASS", /Generation: PASS/.test(r.stdout) && /Validation: PASS/.test(r.stdout) && /Lint: PASS/.test(r.stdout) && /Build: PASS/.test(r.stdout));
  report("Output reports READY TO PUBLISH", /RESULT: READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario B: generation fails ===");
{
  const r = runScenario({ generationCode: 1, validationCode: 0, lintCode: 0, buildCode: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Only Generation ran", r.ran.Generation && !r.ran.Validation && !r.ran.Lint && !r.ran.Build);
  report("Output reports Generation: FAIL", /Generation: FAIL/.test(r.stdout));
  report("Output does not mention Validation/Lint/Build results", !/Validation: (PASS|FAIL)/.test(r.stdout) && !/Lint: (PASS|FAIL)/.test(r.stdout) && !/Build: (PASS|FAIL)/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario C: validation fails ===");
{
  const r = runScenario({ generationCode: 0, validationCode: 1, lintCode: 0, buildCode: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Generation and Validation ran, Lint and Build did not", r.ran.Generation && r.ran.Validation && !r.ran.Lint && !r.ran.Build);
  report("Output reports Generation: PASS then Validation: FAIL", /Generation: PASS/.test(r.stdout) && /Validation: FAIL/.test(r.stdout));
  report("Output does not mention Lint/Build results", !/Lint: (PASS|FAIL)/.test(r.stdout) && !/Build: (PASS|FAIL)/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario D: lint fails ===");
{
  const r = runScenario({ generationCode: 0, validationCode: 0, lintCode: 1, buildCode: 0 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("Generation, Validation, Lint ran; Build did not", r.ran.Generation && r.ran.Validation && r.ran.Lint && !r.ran.Build);
  report("Output reports Generation/Validation: PASS, Lint: FAIL", /Generation: PASS/.test(r.stdout) && /Validation: PASS/.test(r.stdout) && /Lint: FAIL/.test(r.stdout));
  report("Output does not mention Build result", !/Build: (PASS|FAIL)/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

console.log("\n=== Scenario E: build fails ===");
{
  const r = runScenario({ generationCode: 0, validationCode: 0, lintCode: 0, buildCode: 1 });
  report("Exit code is non-zero", r.exitCode !== 0, `got ${r.exitCode}`);
  report("All four stages ran", r.ran.Generation && r.ran.Validation && r.ran.Lint && r.ran.Build);
  report("Output reports Generation/Validation/Lint: PASS, Build: FAIL", /Generation: PASS/.test(r.stdout) && /Validation: PASS/.test(r.stdout) && /Lint: PASS/.test(r.stdout) && /Build: FAIL/.test(r.stdout));
  report("Output reports NOT READY TO PUBLISH", /RESULT: NOT READY TO PUBLISH/.test(r.stdout));
}

if (failures > 0) process.exitCode = 1;
console.log(`\n${total - failures}/${total} checks passed.`);
