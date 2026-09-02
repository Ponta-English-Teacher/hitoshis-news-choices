/**
 * Cross-edition duplicate prevention, shared by scripts/generate-real-edition.mjs
 * (the permanent weekly generator) and scripts/test-duplicate-check.mjs (a
 * lightweight, low-cost regression check for this module).
 *
 * Three layers, matching how a duplicate can slip in:
 *   1. Exact match (URL or normalized headline) — deterministic, no API cost.
 *      Used both to pre-filter the candidate pool before selection, and as
 *      a final defense-in-depth check on the selected six.
 *   2. Semantic/event match — the same underlying event reported by a
 *      different publisher or under a reworded headline. Requires an LLM
 *      judgment call, so it's applied only to the small selected set
 *      (candidates never all get sent through this).
 *   3. Repair — if the final six contain a rejected story, ask the
 *      selection model for one replacement from the remaining candidate
 *      pool, respecting the same duplicate-avoidance rule.
 *
 * No article text is ever fetched here — only headline/source/URL/date,
 * consistent with the rest of the pipeline.
 */

import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import { normalizeTitleForDedup, cleanupHeadlines, DUPLICATE_AVOIDANCE_POLICY } from "./gdelt-pipeline.mjs";

function stripJsonFences(raw) {
  return raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
}

export function normalizeUrlForDedup(url) {
  return (url || "").split("?")[0].toLowerCase();
}

/**
 * Reads every archived edition file in src/data/editions/ (excluding
 * index.ts) and regex-parses the fields needed for duplicate checking.
 * Read-only — never writes to any edition file. Node can't `import` these
 * .ts files directly (no ts-node/tsx in this project), so this follows the
 * same plain-text-regex pattern already used elsewhere in scripts/.
 */
export function loadPublishedStories(editionsDir) {
  const files = fs.readdirSync(editionsDir).filter((f) => f.endsWith(".ts") && f !== "index.ts");
  const published = [];

  for (const file of files) {
    const editionDate = file.replace(/\.ts$/, "");
    const text = fs.readFileSync(path.join(editionsDir, file), "utf8");
    const blocks = text.split(/^\s{2}\{/m).slice(1);

    for (const block of blocks) {
      const headline = /headline: "((?:[^"\\]|\\.)*)"/.exec(block)?.[1];
      if (!headline) continue;
      published.push({
        editionDate,
        headline,
        sourceUrl: /sourceUrl: "([^"]*)"/.exec(block)?.[1] ?? "",
        sourceName: /sourceName: "([^"]*)"/.exec(block)?.[1] ?? "",
        category: /category: "([^"]*)"/.exec(block)?.[1] ?? "",
        publicationDate: /publicationDate: "([^"]*)"/.exec(block)?.[1] ?? "",
      });
    }
  }

  return published;
}

/**
 * Deterministic pre-filter applied to the raw candidate pool BEFORE
 * selection, so obvious repeats never reach (and never cost) the OpenAI
 * selection step.
 */
export function filterExactDuplicateCandidates(candidates, publishedStories) {
  const publishedUrls = new Set(publishedStories.map((s) => normalizeUrlForDedup(s.sourceUrl)));
  const publishedTitles = new Set(publishedStories.map((s) => normalizeTitleForDedup(s.headline)));

  const filtered = [];
  const excluded = [];
  for (const c of candidates) {
    const isDuplicate =
      publishedUrls.has(normalizeUrlForDedup(c.url)) || publishedTitles.has(normalizeTitleForDedup(c.title));
    (isDuplicate ? excluded : filtered).push(c);
  }
  return { filtered, excluded };
}

/**
 * Compact context block for the selection/classification prompts:
 * headline, source, publication date, and category only — never the full
 * Reading Support object — to keep token use reasonable.
 */
export function buildPublishedContextBlock(publishedStories) {
  if (publishedStories.length === 0) return "";
  return publishedStories
    .map((s, i) => `P${i + 1} | ${s.editionDate} | ${s.category || "?"} | ${s.sourceName || "?"} | ${s.headline}`)
    .join("\n");
}

/**
 * Deterministic defense-in-depth check on the FINAL six, run again right
 * before writing the edition in case anything upstream (a reworded
 * headline, a URL variant) slipped past the candidate-pool pre-filter.
 */
export function findExactDuplicatesInFinal(selections, publishedStories) {
  const publishedUrls = new Set(publishedStories.map((s) => normalizeUrlForDedup(s.sourceUrl)));
  const publishedTitles = new Set(publishedStories.map((s) => normalizeTitleForDedup(s.headline)));

  const rejects = [];
  selections.forEach((s, index) => {
    if (publishedUrls.has(normalizeUrlForDedup(s.url))) {
      rejects.push({ index, reason: "Exact source URL already published in a previous edition." });
      return;
    }
    if (publishedTitles.has(normalizeTitleForDedup(s.headline))) {
      rejects.push({ index, reason: "Normalized headline already published in a previous edition." });
    }
  });
  return rejects;
}

/**
 * Semantic/event duplicate check: one batched OpenAI call classifying all
 * selections at once (not one call per story) against the previously
 * published stories, applying the ALLOW-follow-up / REJECT-same-event rule.
 */
export async function classifyFinalDuplicates(selections, publishedStories, { model }) {
  if (publishedStories.length === 0) {
    return {
      results: selections.map((_, index) => ({
        index,
        verdict: "ALLOW",
        matchedPublished: null,
        reason: "No previously published stories exist yet.",
      })),
      usage: null,
    };
  }

  const publishedBlock = buildPublishedContextBlock(publishedStories);
  const selectedBlock = selections
    .map((s, i) => `S${i + 1} | ${s.category} | ${s.source} | ${s.publicationDate} | ${s.headline}`)
    .join("\n");

  const instructions = `You are an editorial duplicate-detection checker for Hitoshi's News Choices, an English-learning news app.

${DUPLICATE_AVOIDANCE_POLICY}

PREVIOUSLY PUBLISHED STORIES (P#):
${publishedBlock}

NEWLY SELECTED STORIES TO CHECK (S1-S${selections.length}):
${selectedBlock}

For EACH newly selected story, decide:
- "ALLOW": a genuinely new story, or a materially new follow-up development on an ongoing situation.
- "REJECT": the same underlying event as one of the previously published stories (same event, just a different publisher, or a reworded/restated headline, with no materially new development).

Reply with ONLY valid JSON (no markdown fences, no commentary):
{ "verdicts": [ { "id": "S1", "verdict": "ALLOW", "matchedPublished": null, "reason": "one short sentence" } ] }
If "verdict" is "REJECT", set "matchedPublished" to the P# id it duplicates. One entry per input story, same order, same ids.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({ model, instructions, input: selectedBlock });
  const parsed = JSON.parse(stripJsonFences(response.output_text));

  const results = selections.map((_, i) => {
    const v = parsed.verdicts.find((x) => x.id === `S${i + 1}`);
    return {
      index: i,
      verdict: v?.verdict === "REJECT" ? "REJECT" : "ALLOW",
      matchedPublished: v?.matchedPublished ?? null,
      reason: v?.reason ?? "",
    };
  });
  return { results, usage: response.usage };
}

/**
 * Selects exactly one replacement candidate to take the place of a story
 * rejected by the duplicate checks, respecting the same editorial policy
 * and the same duplicate-avoidance rule (both against previously published
 * stories and against the other stories already kept for this edition).
 */
export async function selectReplacementStory(candidates, { model, policyPath, publishedContext, currentSelections }) {
  if (candidates.length === 0) {
    throw new Error("selectReplacementStory: no candidates available to choose a replacement from.");
  }

  const policyText = fs.readFileSync(policyPath, "utf8");

  const idToCandidate = new Map();
  const candidateLines = candidates.map((c, i) => {
    const id = `C${String(i + 1).padStart(4, "0")}`;
    idToCandidate.set(id, c);
    return `${id} | ${c.source} | ${c.publicationDate} | ${c.title}`;
  });

  const keptBlock = currentSelections
    .map((s, i) => `K${i + 1} | ${s.category} | ${s.source} | ${s.publicationDate} | ${s.headline}`)
    .join("\n");

  const duplicateAvoidanceSection = publishedContext
    ? `\nPREVIOUSLY PUBLISHED STORIES (P#) — from earlier editions. ${DUPLICATE_AVOIDANCE_POLICY}\n\n${publishedContext}\n`
    : "";

  const instructions = `You are the editorial selection engine for Hitoshi's News Choices, an English-learning news app. Follow this editorial policy exactly:

${policyText}
${duplicateAvoidanceSection}
TASK: One previously selected story for this week's edition was rejected as a duplicate of an already-published story (or of another story in this same edition). Select exactly ONE replacement candidate from the CANDIDATES list below to take its place.

Rules:
- You MUST choose only from the candidate ids given below.
- The replacement must not repeat the same underlying event as any story already kept for this edition (listed below as K#), nor any previously published story, unless it is a materially new follow-up development.
- Otherwise, select on the same editorial-policy grounds as any normal selection: importance, current relevance, interest, English-learning value.

STORIES ALREADY KEPT FOR THIS EDITION (K#) — avoid duplicating these too:
${keptBlock}

Reply with ONLY valid JSON (no markdown fences, no commentary), in this exact shape:
{
  "selection": {
    "id": "C0001",
    "category": "U.S. & Politics | World & Conflict | Business & Economy | Technology & AI | Asia Pickup | World Pickup",
    "estimatedLevel": "A2 | B1 | B1+ | B2 | B2+ | C1",
    "estimatedReadingMinutes": 4,
    "whyWeChoseThis": "one or two sentences, original commentary, not copied from the article",
    "keyVocabulary": ["term1", "term2", "term3", "term4"]
  }
}`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model,
    instructions,
    input: `CANDIDATES (${candidateLines.length} total):\n${candidateLines.join("\n")}`,
  });

  const parsed = JSON.parse(stripJsonFences(response.output_text));
  const sel = parsed.selection;
  const candidate = idToCandidate.get(sel?.id);
  if (!candidate) {
    throw new Error(`selectReplacementStory: model returned unknown candidate id: ${sel?.id}`);
  }

  return {
    selection: {
      headline: candidate.title,
      source: candidate.source,
      url: candidate.url,
      publicationDate: candidate.publicationDate,
      category: sel.category,
      estimatedLevel: sel.estimatedLevel,
      estimatedReadingMinutes: sel.estimatedReadingMinutes,
      whyWeChoseThis: sel.whyWeChoseThis,
      keyVocabulary: sel.keyVocabulary,
    },
    usage: response.usage,
  };
}

/**
 * Orchestrates the final safety net: runs the exact + semantic duplicate
 * checks on the selected six, and if any are rejected, asks for a
 * replacement from the remaining candidate pool and re-checks — up to
 * `maxAttempts` rounds. Throws (fails safely, writes nothing) if it cannot
 * converge on six duplicate-free stories.
 */
export async function resolveDuplicatesOrFail({
  selections,
  filteredCandidates,
  publishedStories,
  publishedContext,
  policyPath,
  selectionModel,
  cleanupModel,
  maxAttempts = 3,
  log = console.log,
}) {
  let current = selections.slice();
  const excludedUrls = new Set(current.map((s) => normalizeUrlForDedup(s.url)));

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const exactRejects = findExactDuplicatesInFinal(current, publishedStories);
    const { results: semanticResults } = await classifyFinalDuplicates(current, publishedStories, {
      model: selectionModel,
    });

    const rejectReasons = new Map();
    for (const r of exactRejects) rejectReasons.set(r.index, r.reason);
    for (const r of semanticResults) {
      if (r.verdict === "REJECT" && !rejectReasons.has(r.index)) {
        rejectReasons.set(
          r.index,
          r.reason || `Same underlying event as previously published story ${r.matchedPublished ?? "?"}.`
        );
      }
    }

    if (rejectReasons.size === 0) {
      const { cleaned } = await cleanupHeadlines(current, { model: cleanupModel });
      return cleaned;
    }

    log(
      `\nDuplicate safety check: attempt ${attempt}/${maxAttempts} found ${rejectReasons.size} rejected stor${
        rejectReasons.size === 1 ? "y" : "ies"
      }:`
    );
    for (const [index, reason] of rejectReasons) {
      log(`  REJECT "${current[index].headline}" (${current[index].source}) — ${reason}`);
    }

    for (const index of rejectReasons.keys()) {
      const remaining = filteredCandidates.filter((c) => !excludedUrls.has(normalizeUrlForDedup(c.url)));
      if (remaining.length === 0) {
        throw new Error("Duplicate repair failed: no remaining candidates available to replace a rejected story.");
      }
      const { selection: replacement } = await selectReplacementStory(remaining, {
        model: selectionModel,
        policyPath,
        publishedContext,
        currentSelections: current.filter((_, i) => i !== index),
      });
      excludedUrls.add(normalizeUrlForDedup(replacement.url));
      current[index] = replacement;
      log(`  Replaced with "${replacement.headline}" (${replacement.source})`);
    }
  }

  throw new Error(
    `Duplicate safety check failed after ${maxAttempts} repair attempt(s): could not produce six duplicate-free stories. Refusing to write this edition.`
  );
}
