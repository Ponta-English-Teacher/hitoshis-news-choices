/**
 * Shared GDELT discovery + OpenAI selection pipeline logic, used by both
 * the dev proof-of-concept script (gdelt-openai-selection-test.mjs) and the
 * real-edition generator (generate-real-edition.mjs). Dev-only tooling —
 * not imported by the Next.js app.
 */

import fs from "node:fs";
import OpenAI from "openai";

export const GDELT_ENDPOINT = "http://api.gdeltproject.org/api/v2/doc/doc"; // https:// times out in this dev environment
export const DELAY_BETWEEN_REQUESTS_MS = 6000;
export const MAX_RETRIES = 3;
export const RETRY_BACKOFF_MS = 9000;

// Reliable-core pool + Japan Times as an allowed sparse secondary, per
// TECHNICAL_DECISIONS.md's "News discovery, V1" entry.
export const APPROVED_SOURCES = [
  { name: "BBC", domain: "bbc.com" },
  { name: "CNN", domain: "cnn.com" },
  { name: "The Guardian", domain: "theguardian.com" },
  { name: "The New York Times", domain: "nytimes.com" },
  { name: "CNBC", domain: "cnbc.com" },
  { name: "NBC News", domain: "nbcnews.com" },
  { name: "CBS News", domain: "cbsnews.com" },
  { name: "NPR", domain: "npr.org" },
  { name: "Al Jazeera English", domain: "aljazeera.com" },
  { name: "DW", domain: "dw.com" },
  { name: "Nikkei Asia", domain: "asia.nikkei.com" },
  { name: "South China Morning Post", domain: "scmp.com" },
  { name: "Channel News Asia", domain: "channelnewsasia.com" },
  { name: "The Straits Times", domain: "straitstimes.com" },
  { name: "The Korea Herald", domain: "koreaherald.com" },
  { name: "The Japan Times", domain: "japantimes.co.jp" },
];

export function toGdeltDateTime(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds())
  );
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deterministic, conservative fix for mechanical GDELT spacing artifacts:
 * repeated whitespace, a space before ordinary punctuation, a space on
 * both sides of a thousands-comma ("1, 000" -> "1,000"), and a space on
 * both sides of a hyphen joining two words/numbers ("30 - year" -> "30-year",
 * "Nepal - Tibet" -> "Nepal-Tibet"). Deliberately does not touch anything
 * else — no rephrasing, no apostrophe reconstruction (that needs judgment,
 * handled separately by the conservative LLM cleanup pass).
 */
export function normalizeHeadline(text) {
  return (text || "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?%])/g, "$1")
    .replace(/(\d)\s*,\s*(\d{3}\b)/g, "$1,$2")
    .replace(/([A-Za-z0-9])\s+-\s+([A-Za-z0-9])/g, "$1-$2")
    .trim();
}

export function normalizeTitleForDedup(title) {
  return normalizeHeadline(title)
    .toLowerCase()
    .replace(/['’"“”]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function toIsoDate(seendate) {
  // GDELT seendate looks like "20260901T113000Z"
  const m = /^(\d{4})(\d{2})(\d{2})T/.exec(seendate || "");
  return m ? `${m[1]}-${m[2]}-${m[3]}` : seendate;
}

async function fetchSourceWithRetry(source, startdatetime, enddatetime, maxRecordsPerSource) {
  const params = new URLSearchParams({
    query: `domainis:${source.domain} sourcelang:english`,
    mode: "artlist",
    format: "json",
    maxrecords: String(maxRecordsPerSource),
    sort: "DateDesc",
    startdatetime,
    enddatetime,
  });
  const url = `${GDELT_ENDPOINT}?${params.toString()}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(url);
    const bodyText = await res.text();

    if (res.status === 429) {
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_BACKOFF_MS);
        continue;
      }
      return { source: source.name, error: "429 after retries", articles: [] };
    }
    if (!res.ok) {
      return { source: source.name, error: `HTTP ${res.status}`, articles: [] };
    }
    try {
      const data = JSON.parse(bodyText);
      return { source: source.name, articles: data.articles ?? [] };
    } catch {
      return { source: source.name, error: "Non-JSON response", articles: [] };
    }
  }
  return { source: source.name, error: "unreachable", articles: [] };
}

export async function discoverCandidates({ lookbackDays = 7, maxRecordsPerSource = 50, log = console.log } = {}) {
  const now = new Date();
  const start = new Date(now.getTime() - lookbackDays * 24 * 60 * 60 * 1000);
  const startdatetime = toGdeltDateTime(start);
  const enddatetime = toGdeltDateTime(now);

  log(`Discovering candidates: ${startdatetime} - ${enddatetime} (UTC, last ${lookbackDays} days)\n`);

  let totalRaw = 0;
  const byUrl = new Map();

  for (const source of APPROVED_SOURCES) {
    const result = await fetchSourceWithRetry(source, startdatetime, enddatetime, maxRecordsPerSource);
    if (result.error) {
      log(`  ${source.name}: ERROR ${result.error}`);
    } else {
      log(`  ${source.name}: ${result.articles.length} raw articles`);
      totalRaw += result.articles.length;
      for (const a of result.articles) {
        const key = (a.url || "").split("?")[0].toLowerCase();
        if (!key) continue;
        if (!byUrl.has(key)) {
          byUrl.set(key, {
            title: normalizeHeadline(a.title),
            source: source.name,
            domain: a.domain,
            url: a.url,
            publicationDate: toIsoDate(a.seendate),
          });
        }
      }
    }
    await sleep(DELAY_BETWEEN_REQUESTS_MS);
  }

  const afterUrlDedup = [...byUrl.values()];

  const bySourceTitle = new Map();
  for (const a of afterUrlDedup) {
    const key = `${a.source}::${normalizeTitleForDedup(a.title)}`;
    if (!bySourceTitle.has(key)) bySourceTitle.set(key, a);
  }
  const afterSameSourceDedup = [...bySourceTitle.values()];

  const byTitle = new Map();
  for (const a of afterSameSourceDedup) {
    const key = normalizeTitleForDedup(a.title);
    if (!byTitle.has(key)) byTitle.set(key, a);
  }
  const finalCandidates = [...byTitle.values()];

  log(`\nTotal raw: ${totalRaw}`);
  log(`After URL dedup: ${afterUrlDedup.length}`);
  log(`After same-source title dedup: ${afterSameSourceDedup.length}`);
  log(`After cross-source title dedup: ${finalCandidates.length}`);

  return { finalCandidates, totalRaw, afterUrlDedup: afterUrlDedup.length, afterSameSourceDedup: afterSameSourceDedup.length };
}

function stripJsonFences(raw) {
  return raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
}

/**
 * Shared wording for how the selection/classification prompts should treat
 * a candidate or selected story that overlaps with an already-published
 * story. Exported so scripts/lib/duplicate-check.mjs can reuse the exact
 * same rule when it checks/repairs the final six after selection, without
 * duplicate-check.mjs needing to import back into this module.
 */
export const DUPLICATE_AVOIDANCE_POLICY = `Do not select a story that covers the same underlying event as a previously published story, even if it comes from a different publisher, has a rewritten headline, or merely restates the same development with no new facts.

A genuinely important FOLLOW-UP development about the same broader topic or ongoing situation MAY be selected, but only if it represents a materially new development that would justify a separate, new news story. For example: an earlier report that two countries "exchanged fire," followed later by one side "launching strikes," is a meaningful escalation and may be selected as a follow-up. But two articles about the exact same lawsuit, disaster, or announcement — merely reported by a different outlet or with a reworded headline — describe the same underlying event and must NOT both be selected.`;

export async function selectSixStories(candidates, { model, policyPath, publishedContext }) {
  const policyText = fs.readFileSync(policyPath, "utf8");

  const idToCandidate = new Map();
  const candidateLines = candidates.map((c, i) => {
    const id = `C${String(i + 1).padStart(4, "0")}`;
    idToCandidate.set(id, c);
    return `${id} | ${c.source} | ${c.publicationDate} | ${c.title}`;
  });

  const duplicateAvoidanceSection = publishedContext
    ? `\nPREVIOUSLY PUBLISHED STORIES (P#) — from earlier editions of this app, already read by users. ${DUPLICATE_AVOIDANCE_POLICY}\n\n${publishedContext}\n`
    : "";

  const instructions = `You are the editorial selection engine for Hitoshi's News Choices, an English-learning news app. Follow this editorial policy exactly:

${policyText}
${duplicateAvoidanceSection}
TASK: From the CANDIDATES list below, select exactly six (6) stories for this week's edition.

Rules:
- You MUST choose only from the candidate ids given below. Do not invent, alter, or hallucinate any story, headline, source, or URL not in this list.
- Select purely on which six stories are genuinely the strongest according to the editorial policy above. Categories are labels you assign to each story AFTER you have chosen it — they are NOT slots that must each be filled. A category may receive zero, one, or several of the six stories; do not aim for one-per-category, and do not select a weaker story just to cover a category that would otherwise be empty.
- "Asia Pickup" and "World Pickup" remain available for genuinely interesting discoveries, but neither is required to appear in this or any edition. Only use them when a story genuinely earns its place there.
- Variety still matters: do not select multiple stories that are essentially about the same underlying event (e.g. two articles both primarily about the same disaster, court ruling, or summit). Different stories that happen to share a broad theme (e.g. two unrelated AI stories) are fine.
- Do not try to reproduce the overall English-language media agenda. Do not reward a story merely because many publishers cover it — you are only seeing one representative per distinct story anyway.${
    publishedContext
      ? `\n- Do not select a candidate that repeats the same underlying event as any story listed above under PREVIOUSLY PUBLISHED STORIES, unless it is a materially new follow-up development (see the duplicate-avoidance guidance above).`
      : ""
  }

Reply with ONLY valid JSON (no markdown fences, no commentary), in this exact shape:
{
  "selections": [
    {
      "id": "C0001",
      "category": "U.S. & Politics | World & Conflict | Business & Economy | Technology & AI | Asia Pickup | World Pickup",
      "estimatedLevel": "A2 | B1 | B1+ | B2 | B2+ | C1",
      "estimatedReadingMinutes": 4,
      "whyWeChoseThis": "one or two sentences, original commentary, not copied from the article",
      "keyVocabulary": ["term1", "term2", "term3", "term4"]
    }
  ]
}
The "selections" array must contain exactly 6 items.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model,
    instructions,
    input: `CANDIDATES (${candidateLines.length} total):\n${candidateLines.join("\n")}`,
  });

  const parsed = JSON.parse(stripJsonFences(response.output_text));

  const selections = parsed.selections.map((s) => {
    const candidate = idToCandidate.get(s.id);
    if (!candidate) {
      throw new Error(`Model returned unknown candidate id: ${s.id}`);
    }
    return {
      headline: candidate.title,
      source: candidate.source,
      url: candidate.url,
      publicationDate: candidate.publicationDate,
      category: s.category,
      estimatedLevel: s.estimatedLevel,
      estimatedReadingMinutes: s.estimatedReadingMinutes,
      whyWeChoseThis: s.whyWeChoseThis,
      keyVocabulary: s.keyVocabulary,
    };
  });

  return { selections, usage: response.usage };
}

/**
 * Conservative headline cleanup, run only on the already-selected
 * headlines. Fixes things deterministic regex can't safely handle (e.g. a
 * missing apostrophe) without rephrasing, shortening, or simplifying.
 */
export async function cleanupHeadlines(selections, { model }) {
  const items = selections.map((s, i) => `H${i + 1} | source: ${s.source} | ${s.headline}`).join("\n");

  const instructions = `You are a careful copy-editor. Below are real news headlines that passed through an automated feed and sometimes contain mechanical text-corruption artifacts (e.g. a missing apostrophe, a missing or stray hyphen, odd spacing around punctuation, doubled punctuation).

Your ONLY job: fix obvious mechanical artifacts so each headline reads as the publisher actually would have written it.

Strict limits:
- Do NOT rewrite, rephrase, shorten, simplify, or add/remove any information.
- Do NOT change a headline merely to make it easier for a language learner.
- Preserve the publisher's original wording, tone, and level of detail exactly — fix ONLY mechanical corruption.
- If you are not confident a headline contains an artifact, or not confident what the correct fix is, leave it completely unchanged.

Reply with ONLY valid JSON (no markdown fences, no commentary), in this exact shape:
{ "headlines": [ { "id": "H1", "cleaned": "..." } ] }
One entry per input headline, same order, same ids.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({ model, instructions, input: items });

  const parsed = JSON.parse(stripJsonFences(response.output_text));

  const cleaned = selections.map((s, i) => {
    const match = parsed.headlines.find((h) => h.id === `H${i + 1}`);
    // Deterministic normalization runs again as a final safety net, in case
    // the LLM pass left (or introduced) a mechanical spacing artifact.
    const cleanedHeadline = normalizeHeadline(match?.cleaned?.trim() || s.headline);
    return {
      ...s,
      originalHeadline: s.headline,
      headline: cleanedHeadline,
      headlineChanged: cleanedHeadline !== s.headline,
    };
  });

  return { cleaned, usage: response.usage };
}
