/**
 * Lightweight, low-cost regression check for scripts/lib/duplicate-check.mjs
 * (the cross-edition duplicate-prevention logic used by
 * generate-real-edition.mjs). Loads the REAL published stories from
 * src/data/editions/ (read-only — never writes anything) and runs known
 * test cases against:
 *   - the deterministic exact-match filters (zero API calls), and
 *   - the semantic/event duplicate classifier (a single batched OpenAI
 *     call covering all test cases together, not a full GDELT discovery +
 *     selection run).
 *
 * Safe to re-run any time to sanity-check the duplicate-check module after
 * changing it. Does not touch any edition file or the candidate-generation
 * pipeline.
 *
 * Run: set -a && source .env.local && set +a && node scripts/test-duplicate-check.mjs
 * (the OPENAI_API_KEY-dependent semantic test is skipped, with the
 * deterministic tests still running, if the key isn't loaded)
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadPublishedStories,
  filterExactDuplicateCandidates,
  findExactDuplicatesInFinal,
  classifyFinalDuplicates,
} from "./lib/duplicate-check.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const EDITIONS_DIR = path.join(PROJECT_ROOT, "src", "data", "editions");

let failures = 0;

function report(label, pass, detail) {
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

async function main() {
  const publishedStories = loadPublishedStories(EDITIONS_DIR);
  const editionCount = new Set(publishedStories.map((s) => s.editionDate)).size;
  console.log(`Loaded ${publishedStories.length} published stories from ${editionCount} edition file(s).\n`);

  // --- 1. Deterministic exact-URL rejection (candidate pre-filter) ---
  const exactUrlCandidate = {
    title: "A totally different headline reusing an already-published link",
    source: "BBC",
    domain: "bbc.com",
    url: "https://www.bbc.com/news/articles/c2e074nn8eko", // real, already-published Afghanistan-deportees URL
    publicationDate: "2026-09-05",
  };
  const { filtered: f1, excluded: e1 } = filterExactDuplicateCandidates([exactUrlCandidate], publishedStories);
  report("Exact URL match excluded from candidate pool", e1.length === 1 && f1.length === 0);

  // --- 2. Deterministic exact-headline rejection (candidate pre-filter) ---
  const exactHeadlineCandidate = {
    title: "Nepal-Tibet toll tops 1,000 as tunnel rescue offers last hope",
    source: "Some Other Outlet",
    domain: "example.com",
    url: "https://example.com/completely-different-url",
    publicationDate: "2026-09-05",
  };
  const { filtered: f2, excluded: e2 } = filterExactDuplicateCandidates([exactHeadlineCandidate], publishedStories);
  report("Exact normalized-headline match excluded from candidate pool", e2.length === 1 && f2.length === 0);

  // --- 3. Final-selection deterministic exact check (defense in depth) ---
  const finalExactCheck = findExactDuplicatesInFinal(
    [
      {
        headline: "ChatGPT becomes first AI chatbot to face tougher EU rules",
        url: "https://example.com/y",
        category: "Technology & AI",
        source: "Some Outlet",
        publicationDate: "2026-09-05",
      },
    ],
    publishedStories
  );
  report("Final-selection safety check catches an exact headline repeat", finalExactCheck.length === 1);

  // --- 4. Semantic/event duplicate classification (ONE batched OpenAI call) ---
  if (!process.env.OPENAI_API_KEY) {
    console.log(
      "\nOPENAI_API_KEY not set — skipping the semantic-classification test (steps 1-3 above are the zero-cost deterministic checks)."
    );
    if (failures > 0) process.exitCode = 1;
    return;
  }

  const semanticTestSelections = [
    {
      headline: "US watchdog and states sue Amazon over hidden ad-pricing surcharges",
      source: "Reuters (hypothetical, for this test only)",
      publicationDate: "2026-09-05",
      category: "Business & Economy",
    },
    {
      headline: "EU adds ChatGPT to list of platforms facing stricter digital rules",
      source: "Politico (hypothetical, for this test only)",
      publicationDate: "2026-09-05",
      category: "Technology & AI",
    },
    {
      headline: "Nepal flood death toll passes 1,000 as rescuers search collapsed tunnel",
      source: "Al Jazeera (hypothetical, for this test only)",
      publicationDate: "2026-09-05",
      category: "World & Conflict",
    },
    {
      // A hypothetical LATER escalation beyond both the already-published
      // "exchange fire" (2026-08-31) and "launches strikes" (2026-09-04)
      // Iran stories — deliberately worded as a further, materially new
      // development, not a restatement of either, to test the ALLOW branch.
      headline: "Iran fires missile barrage at US Gulf bases after week of strikes, officials say",
      source: "CNN (hypothetical, for this test only)",
      publicationDate: "2026-09-06",
      category: "World & Conflict",
    },
  ];
  const expectations = ["REJECT", "REJECT", "REJECT", "ALLOW"];

  console.log(`\nRunning semantic/event duplicate classification (1 OpenAI call, ${semanticTestSelections.length} test stories)...\n`);
  const { results } = await classifyFinalDuplicates(semanticTestSelections, publishedStories, { model: "gpt-5.5" });

  results.forEach((r, i) => {
    const s = semanticTestSelections[i];
    const pass = r.verdict === expectations[i];
    report(`Semantic check: "${s.headline}"`, pass, `expected ${expectations[i]}, got ${r.verdict} (${r.reason})`);
  });

  if (failures > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error("test-duplicate-check failed:", err);
  process.exitCode = 1;
});
