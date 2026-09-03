/**
 * Regression test for scripts/lib/editions-index.mjs's updateEditionsIndex():
 * proves the registry is kept in strict newest-first DATE order regardless
 * of generation order (the bug the real 2026-09-03 GitHub Actions test
 * exposed — see the Step 8/10 test report), not just insertion order.
 *
 * Operates entirely against a scratch index.ts in a tmpdir — never touches
 * the real src/data/editions/index.ts, and never imports/runs the real
 * generate-real-edition.mjs pipeline.
 *
 * Run: node scripts/test-editions-index.mjs
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { updateEditionsIndex } from "./lib/editions-index.mjs";

let failures = 0;
let total = 0;
function report(label, pass, detail) {
  total++;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

/** Builds a scratch index.ts seeded with the given (already newest-first) entries. */
function seedScratchIndex(entries) {
  const scratchDir = fs.mkdtempSync(path.join(os.tmpdir(), "editions-index-test-"));
  const indexPath = path.join(scratchDir, "index.ts");
  const importLines = entries
    .map((e) => `import { stories as stories_${e.date.replace(/-/g, "_")} } from "./${e.date}";`)
    .join("\n");
  const arrayLines = entries
    .map((e) => `  { date: "${e.date}", dateRangeLabel: ${JSON.stringify(e.dateRangeLabel)}, stories: stories_${e.date.replace(/-/g, "_")} },`)
    .join("\n");
  fs.writeFileSync(
    indexPath,
    `import type { NewsStory } from "@/types/news-story";
${importLines}

export interface EditionMeta {
  date: string;
  dateRangeLabel: string;
  stories: NewsStory[];
}

export const editions: EditionMeta[] = [
${arrayLines}
];

export const latestEdition = editions[0];

export function findEditionByDate(date: string): EditionMeta | undefined {
  return editions.find((edition) => edition.date === date);
}

export function findStoryById(id: string): NewsStory | undefined {
  for (const edition of editions) {
    const found = edition.stories.find((story) => story.id === id);
    if (found) return found;
  }
  return undefined;
}
`
  );
  return { scratchDir, indexPath };
}

/** Parses the written index.ts back into an ordered list of dates, plus the latestEdition literal. */
function parseWrittenIndex(indexPath) {
  const text = fs.readFileSync(indexPath, "utf8");
  const entryPattern = /\{ date: "([\d-]+)", dateRangeLabel: (?:"(?:[^"\\]|\\.)*"), stories: (\w+) \},/g;
  const dates = [...text.matchAll(entryPattern)].map((m) => m[1]);
  const importedVarNames = [...text.matchAll(/import \{ stories as (\w+) \} from "\.\/([\d-]+)";/g)].map((m) => ({
    varName: m[1],
    date: m[2],
  }));
  const hasLatestEditionLine = /export const latestEdition = editions\[0\];/.test(text);
  return { dates, importedVarNames, hasLatestEditionLine, text };
}

function cleanup(scratchDir) {
  fs.rmSync(scratchDir, { recursive: true, force: true });
}

console.log("=== Scenario A: append a newer edition ===");
{
  const { scratchDir, indexPath } = seedScratchIndex([
    { date: "2026-09-04", dateRangeLabel: "September 4, 2026" },
    { date: "2026-08-31", dateRangeLabel: "August 31, 2026" },
  ]);
  updateEditionsIndex(indexPath, { date: "2026-09-11", dateRangeLabel: "September 11, 2026" });
  const { dates } = parseWrittenIndex(indexPath);
  report("Order is [2026-09-11, 2026-09-04, 2026-08-31]", JSON.stringify(dates) === JSON.stringify(["2026-09-11", "2026-09-04", "2026-08-31"]), JSON.stringify(dates));
  report("latestEdition resolves to 2026-09-11 (editions[0])", dates[0] === "2026-09-11");
  cleanup(scratchDir);
}

console.log("\n=== Scenario B: insert a middle/backfill edition ===");
{
  const { scratchDir, indexPath } = seedScratchIndex([
    { date: "2026-09-04", dateRangeLabel: "September 4, 2026" },
    { date: "2026-08-31", dateRangeLabel: "August 31, 2026" },
  ]);
  updateEditionsIndex(indexPath, { date: "2026-09-03", dateRangeLabel: "September 3, 2026" });
  const { dates } = parseWrittenIndex(indexPath);
  report("Order is [2026-09-04, 2026-09-03, 2026-08-31]", JSON.stringify(dates) === JSON.stringify(["2026-09-04", "2026-09-03", "2026-08-31"]), JSON.stringify(dates));
  report("latestEdition resolves to 2026-09-04, NOT the just-generated 2026-09-03", dates[0] === "2026-09-04");
  cleanup(scratchDir);
}

console.log("\n=== Scenario C: insert the oldest edition ===");
{
  const { scratchDir, indexPath } = seedScratchIndex([
    { date: "2026-09-04", dateRangeLabel: "September 4, 2026" },
    { date: "2026-08-31", dateRangeLabel: "August 31, 2026" },
  ]);
  updateEditionsIndex(indexPath, { date: "2026-08-20", dateRangeLabel: "August 20, 2026" });
  const { dates } = parseWrittenIndex(indexPath);
  report("Order is [2026-09-04, 2026-08-31, 2026-08-20]", JSON.stringify(dates) === JSON.stringify(["2026-09-04", "2026-08-31", "2026-08-20"]), JSON.stringify(dates));
  report("latestEdition resolves to 2026-09-04", dates[0] === "2026-09-04");
  cleanup(scratchDir);
}

console.log("\n=== Scenario D: duplicate edition date is rejected, not inserted twice ===");
{
  const { scratchDir, indexPath } = seedScratchIndex([
    { date: "2026-09-04", dateRangeLabel: "September 4, 2026" },
    { date: "2026-08-31", dateRangeLabel: "August 31, 2026" },
  ]);
  let threw = false;
  let message = "";
  try {
    updateEditionsIndex(indexPath, { date: "2026-09-04", dateRangeLabel: "Duplicate attempt" });
  } catch (err) {
    threw = true;
    message = err.message;
  }
  report("Throws on duplicate date", threw, message);
  const { dates } = parseWrittenIndex(indexPath);
  report("File left unmodified: still exactly one 2026-09-04 entry", dates.filter((d) => d === "2026-09-04").length === 1, JSON.stringify(dates));
  report("File left unmodified: still exactly 2 entries total", dates.length === 2, JSON.stringify(dates));
  cleanup(scratchDir);
}

console.log("\n=== Sanity: findEditionByDate/findStoryById exports and import lines unaffected by sort ===");
{
  const { scratchDir, indexPath } = seedScratchIndex([
    { date: "2026-09-04", dateRangeLabel: "September 4, 2026" },
    { date: "2026-08-31", dateRangeLabel: "August 31, 2026" },
  ]);
  updateEditionsIndex(indexPath, { date: "2026-09-03", dateRangeLabel: "September 3, 2026" });
  const { importedVarNames, hasLatestEditionLine, text } = parseWrittenIndex(indexPath);
  report("Every date has a matching import line", importedVarNames.map((e) => e.date).sort().join(",") === ["2026-08-31", "2026-09-03", "2026-09-04"].sort().join(","), JSON.stringify(importedVarNames));
  report("latestEdition = editions[0] literal is present unchanged", hasLatestEditionLine);
  report("findEditionByDate function body unchanged", /export function findEditionByDate\(date: string\): EditionMeta \| undefined \{\n  return editions\.find\(\(edition\) => edition\.date === date\);\n\}/.test(text));
  report("findStoryById function body unchanged", /export function findStoryById\(id: string\): NewsStory \| undefined \{\n  for \(const edition of editions\) \{\n    const found = edition\.stories\.find\(\(story\) => story\.id === id\);\n    if \(found\) return found;\n  \}\n  return undefined;\n\}/.test(text));
  cleanup(scratchDir);
}

if (failures > 0) process.exitCode = 1;
console.log(`\n${total - failures}/${total} checks passed.`);
