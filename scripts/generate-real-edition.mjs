/**
 * Real-edition generator: runs the approved GDELT discovery + OpenAI
 * selection pipeline, generates the educational metadata the app's
 * NewsStory/ReadingSupport types need, and writes the result directly into
 * src/data/mock-news-stories.ts, replacing the dummy/mock stories with six
 * real, currently-selected stories.
 *
 * No article text is ever fetched — only headline/source/URL/date (from
 * GDELT) plus original commentary written by OpenAI from that metadata
 * alone, consistent with the copyright principle in AGENTS.md.
 *
 * Run manually (needs OPENAI_API_KEY from .env.local in the environment):
 *   set -a && source .env.local && set +a && node scripts/generate-real-edition.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { discoverCandidates, selectSixStories, cleanupHeadlines } from "./lib/gdelt-pipeline.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SELECTION_MODEL = "gpt-5.5";
const CLEANUP_MODEL = "gpt-5.4-mini";
const SUPPORT_MODEL = "gpt-5.5"; // educational writing quality matters here

const PLACEHOLDER_IMAGE = "/images/stories/placeholder.png";
const PLACEHOLDER_ALT = "Neutral placeholder image — no licensed photograph selected for this story yet";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['’"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .slice(0, 6)
    .join("-");
}

function stripJsonFences(raw) {
  return raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
}

async function generateSupportContent(selections) {
  const items = selections
    .map(
      (s, i) =>
        `H${i + 1}\nheadline: ${s.headline}\nsource: ${s.source}\ncategory: ${s.category}\nlevel: ${s.estimatedLevel}\nwhyWeChoseThis: ${s.whyWeChoseThis}\ninitialKeyTerms: ${s.keyVocabulary.join(", ")}\n`
    )
    .join("\n");

  const instructions = `You are writing "Reading Support" preparation material for Hitoshi's News Choices, an English-learning news app. For each story below, write ORIGINAL educational content for learners — never copy or closely paraphrase actual article sentences (you have not been given the article text, only its headline and topic).

IMPORTANT — avoid hallucination: base everything ONLY on the headline, category, and "why we chose this" text given for each story. Do not invent specific facts, numbers, quotes, or details beyond what's implied by that information. It is fine, and expected, for the background to stay at a general, orienting level rather than reporting specifics you were not given.

For each story, produce:
- "background": one short paragraph (roughly 80-130 words) giving an English learner the context needed to understand the topic — who/what is involved and why it matters. General orientation, not a summary of unconfirmed article details.
- "vocabulary": exactly 5 items, each { "term": "...", "meaning": "a learner-friendly one-sentence definition" }. Prefer terms from the provided initialKeyTerms plus any other genuinely useful term from the headline/topic.
- "readingPrompts": exactly 3 short questions/prompts to think about while reading (not a quiz, no single "correct answer" implied).
- "trendingScore", "significanceScore", "discussionValueScore", "knowledgeValueScore": integers 1-5 each, following the blueprint's indicator scale.

Reply with ONLY valid JSON (no markdown fences, no commentary), in this exact shape:
{
  "stories": [
    {
      "id": "H1",
      "background": "...",
      "vocabulary": [{ "term": "...", "meaning": "..." }],
      "readingPrompts": ["...", "...", "..."],
      "trendingScore": 3,
      "significanceScore": 4,
      "discussionValueScore": 3,
      "knowledgeValueScore": 4
    }
  ]
}
One entry per input story, same ids, same order.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: SUPPORT_MODEL,
    instructions,
    input: items,
  });

  const parsed = JSON.parse(stripJsonFences(response.output_text));
  return { support: parsed.stories, usage: response.usage };
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => `${padInner}${serialize(v, indent + 1)}`).join(",\n");
    return `[\n${items},\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    const items = keys.map((k) => `${padInner}${k}: ${serialize(value[k], indent + 1)}`).join(",\n");
    return `{\n${items},\n${pad}}`;
  }
  return JSON.stringify(value);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in the environment. Load .env.local first.");
    process.exitCode = 1;
    return;
  }

  const { finalCandidates, totalRaw } = await discoverCandidates({ lookbackDays: 7, maxRecordsPerSource: 50 });

  console.log(`\nAsking ${SELECTION_MODEL} to select six stories from ${finalCandidates.length} candidates...\n`);
  const policyPath = path.join(PROJECT_ROOT, "EDITORIAL_POLICY.md");
  const { selections: rawSelections, usage: selectionUsage } = await selectSixStories(finalCandidates, {
    model: SELECTION_MODEL,
    policyPath,
  });

  console.log(`\nRunning conservative headline cleanup (${CLEANUP_MODEL})...\n`);
  const { cleaned: selections, usage: cleanupUsage } = await cleanupHeadlines(rawSelections, { model: CLEANUP_MODEL });

  console.log(`\nGenerating Reading Support content (${SUPPORT_MODEL})...\n`);
  const { support, usage: supportUsage } = await generateSupportContent(selections);

  const stories = selections.map((s, i) => {
    const supportContent = support.find((x) => x.id === `H${i + 1}`);
    if (!supportContent) throw new Error(`Missing support content for H${i + 1}`);

    return {
      id: `story-${s.publicationDate}-${slugify(s.headline)}`,
      headline: s.headline,
      sourceName: s.source,
      sourceUrl: s.url,
      category: s.category,
      publicationDate: s.publicationDate,
      estimatedLevel: s.estimatedLevel,
      estimatedReadingMinutes: s.estimatedReadingMinutes,
      trendingScore: supportContent.trendingScore,
      significanceScore: supportContent.significanceScore,
      discussionValueScore: supportContent.discussionValueScore,
      knowledgeValueScore: supportContent.knowledgeValueScore,
      imageUrl: PLACEHOLDER_IMAGE,
      imageAlt: PLACEHOLDER_ALT,
      whyWeChoseThis: s.whyWeChoseThis,
      keyVocabulary: supportContent.vocabulary.map((v) => v.term),
      readingMode: "authentic",
      rightsStatus: "copyrighted",
      readingSupport: {
        background: supportContent.background,
        vocabulary: supportContent.vocabulary,
        readingPrompts: supportContent.readingPrompts,
      },
    };
  });

  const fileContent = `import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for this week's edition, selected automatically
 * by the GDELT + OpenAI pipeline (scripts/generate-real-edition.mjs)
 * following EDITORIAL_POLICY.md. Headlines, sources, URLs, and publication
 * dates are real; "why we chose this," background, vocabulary, and reading
 * prompts are original commentary written for learners, never copied from
 * the articles. Story images are a neutral placeholder
 * (public/images/stories/placeholder.png) — no publisher photographs are
 * used. See TECHNICAL_DECISIONS.md for the discovery/selection pipeline.
 * Generated: ${new Date().toISOString()}
 */
export const mockNewsStories: NewsStory[] = ${serialize(stories)};
`;

  const outPath = path.join(PROJECT_ROOT, "src", "data", "mock-news-stories.ts");
  fs.writeFileSync(outPath, fileContent);
  console.log(`\nWrote ${stories.length} real stories to ${path.relative(PROJECT_ROOT, outPath)}`);

  const reportDir = path.join(PROJECT_ROOT, "scripts", "output");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportDir, "generate-real-edition-report.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalRawCandidates: totalRaw,
        poolSize: finalCandidates.length,
        selectionModel: SELECTION_MODEL,
        cleanupModel: CLEANUP_MODEL,
        supportModel: SUPPORT_MODEL,
        selectionUsage,
        cleanupUsage,
        supportUsage,
        stories,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error("generate-real-edition failed:", err);
  process.exitCode = 1;
});
