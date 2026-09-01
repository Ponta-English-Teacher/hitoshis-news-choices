/**
 * Development proof-of-concept: retrieve real current-news candidates from
 * the approved GDELT source pool (see TECHNICAL_DECISIONS.md) and have
 * OpenAI select six stories following EDITORIAL_POLICY.md.
 *
 * Development test only — does NOT touch the homepage, mock data, or any
 * app code. Output is printed to the console and saved to
 * scripts/output/gdelt-selection-test.json for inspection, kept entirely
 * separate from src/data/mock-news-stories.ts.
 *
 * Run manually (needs OPENAI_API_KEY from .env.local in the environment):
 *   set -a && source .env.local && set +a && node scripts/gdelt-openai-selection-test.mjs
 *
 * Pipeline logic lives in scripts/lib/gdelt-pipeline.mjs, shared with
 * scripts/generate-real-edition.mjs.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverCandidates, selectSixStories, cleanupHeadlines } from "./lib/gdelt-pipeline.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const MODEL = "gpt-5.5"; // stronger reasoning model than the mini tier used for Translate/Listen — this task is editorial judgment across many candidates, not a mechanical text transform
const CLEANUP_MODEL = "gpt-5.4-mini"; // conservative mechanical text-fix pass, same tier as Translate/Listen

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in the environment. Load .env.local first.");
    process.exitCode = 1;
    return;
  }

  const { finalCandidates, totalRaw } = await discoverCandidates({ lookbackDays: 7, maxRecordsPerSource: 50 });

  console.log(`\nAsking ${MODEL} to select six stories from ${finalCandidates.length} candidates...\n`);
  const policyPath = path.join(PROJECT_ROOT, "EDITORIAL_POLICY.md");
  const { selections: rawSelections, usage: selectionUsage } = await selectSixStories(finalCandidates, { model: MODEL, policyPath });

  console.log(`\nRunning conservative headline cleanup (${CLEANUP_MODEL}) on the six selected headlines...\n`);
  const { cleaned: selections, usage: cleanupUsage } = await cleanupHeadlines(rawSelections, { model: CLEANUP_MODEL });

  console.log("=== SELECTED SIX STORIES ===\n");
  for (const s of selections) {
    console.log(`[${s.category}] ${s.headline}`);
    if (s.headlineChanged) console.log(`  (cleanup changed: "${s.originalHeadline}" -> "${s.headline}")`);
    console.log(`  Source: ${s.source} | Date: ${s.publicationDate} | Level: ${s.estimatedLevel} | ~${s.estimatedReadingMinutes} min`);
    console.log(`  URL: ${s.url}`);
    console.log(`  Why: ${s.whyWeChoseThis}`);
    console.log(`  Key English: ${s.keyVocabulary.join(", ")}`);
    console.log("");
  }

  const categoryCounts = {};
  for (const s of selections) categoryCounts[s.category] = (categoryCounts[s.category] ?? 0) + 1;
  console.log("Category counts:", JSON.stringify(categoryCounts));

  if (selectionUsage) console.log(`Selection token usage: ${JSON.stringify(selectionUsage)}`);
  if (cleanupUsage) console.log(`Cleanup token usage: ${JSON.stringify(cleanupUsage)}`);

  const outDir = path.join(PROJECT_ROOT, "scripts", "output");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "gdelt-selection-test.json");
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalRawCandidates: totalRaw,
        poolSize: finalCandidates.length,
        selectionModel: MODEL,
        cleanupModel: CLEANUP_MODEL,
        selectionUsage,
        cleanupUsage,
        categoryCounts,
        selections,
      },
      null,
      2
    )
  );
  console.log(`Saved full result to ${path.relative(PROJECT_ROOT, outPath)}`);
}

main().catch((err) => {
  console.error("GDELT + OpenAI selection test failed:", err);
  process.exitCode = 1;
});
