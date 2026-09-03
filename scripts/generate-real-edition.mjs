/**
 * Real-edition generator: runs the approved GDELT discovery + OpenAI
 * selection pipeline, generates the educational metadata the app's
 * NewsStory/ReadingSupport types need, and writes the result as a NEW
 * edition file under src/data/editions/, then registers it in
 * src/data/editions/index.ts — it never overwrites an existing edition
 * file or any other week's data.
 *
 * Cross-edition duplicate prevention (see scripts/lib/duplicate-check.mjs):
 * every candidate and every final selection is checked against ALL
 * previously archived editions, not just the immediately previous one —
 * first an exact URL/headline pre-filter (before selection, so obvious
 * repeats never cost selection-model tokens), then a semantic/event
 * duplicate classification on the final six (same event via a different
 * publisher or a reworded headline is rejected; a materially new follow-up
 * development is allowed). A rejected story is replaced from the remaining
 * candidate pool and re-checked, up to a few attempts; if six duplicate-free
 * stories cannot be produced, the script fails safely and writes nothing.
 *
 * No article text is ever fetched — only headline/source/URL/date (from
 * GDELT) plus original commentary written by OpenAI from that metadata
 * alone, consistent with the copyright principle in AGENTS.md.
 *
 * Images are sourced automatically (scripts/lib/edition-image-pipeline.mjs):
 * Wikimedia Commons first (scripts/source-images.mjs, licensed-real or
 * licensed-contextual per IMAGE_POLICY.md), an AI-generated illustration
 * fallback (scripts/generate-ai-image.mjs) for any story Commons can't
 * confidently supply. A successful run never leaves imageSourceType:
 * "placeholder" — if a story ends up with neither a Commons image nor a
 * working AI fallback, the whole run throws and writes nothing.
 *
 * Run manually (needs OPENAI_API_KEY from .env.local in the environment):
 *   set -a && source .env.local && set +a && node scripts/generate-real-edition.mjs
 *
 * Optional environment variables:
 *   EDITION_DATE=2026-09-04     Target edition key (defaults to today, UTC).
 *   ALLOW_OVERWRITE=1           Required to regenerate an edition that
 *                               already exists. Without it, the script
 *                               refuses to touch an existing edition file.
 *   EDITION_OUTPUT_DIR=...      Override where the edition .ts file and
 *                               registry (index.ts) are read/written
 *                               (defaults to the real src/data/editions/).
 *   IMAGE_OUTPUT_DIR=...        Override where final images are copied
 *                               (defaults to the real public/images/stories/).
 *   IMAGE_CREDITS_PATH=...      Override the credits file read/appended
 *                               (defaults to the real IMAGE_CREDITS.md).
 * These three overrides exist so a full end-to-end test run can be pointed
 * entirely at a scratch location without ever touching real project files.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { discoverCandidates, selectSixStories, cleanupHeadlines } from "./lib/gdelt-pipeline.mjs";
import {
  loadPublishedStories,
  filterExactDuplicateCandidates,
  buildPublishedContextBlock,
  resolveDuplicatesOrFail,
} from "./lib/duplicate-check.mjs";
import { sourceImagesForEdition, buildImageStoryFields, buildImageCreditEntry } from "./lib/edition-image-pipeline.mjs";
import { nextCreditEntryNumber, appendCreditsSection } from "./lib/image-credits.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const EDITIONS_DIR = process.env.EDITION_OUTPUT_DIR
  ? path.resolve(process.env.EDITION_OUTPUT_DIR)
  : path.join(PROJECT_ROOT, "src", "data", "editions");
const EDITIONS_INDEX_PATH = path.join(EDITIONS_DIR, "index.ts");
const IMAGE_OUTPUT_DIR = process.env.IMAGE_OUTPUT_DIR
  ? path.resolve(process.env.IMAGE_OUTPUT_DIR)
  : path.join(PROJECT_ROOT, "public", "images", "stories");
const IMAGE_CREDITS_PATH = process.env.IMAGE_CREDITS_PATH
  ? path.resolve(process.env.IMAGE_CREDITS_PATH)
  : path.join(PROJECT_ROOT, "IMAGE_CREDITS.md");

const SELECTION_MODEL = "gpt-5.5";
const CLEANUP_MODEL = "gpt-5.4-mini";
const SUPPORT_MODEL = "gpt-5.5"; // educational writing quality matters here

const EDITION_DATE = process.env.EDITION_DATE || new Date().toISOString().slice(0, 10);
const ALLOW_OVERWRITE = process.env.ALLOW_OVERWRITE === "1";

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

function formatDateLong(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function buildDateRangeLabel(publicationDates) {
  const sorted = [...new Set(publicationDates)].sort();
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return first === last ? formatDateLong(first) : `${formatDateLong(first)} – ${formatDateLong(last)}`;
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

/**
 * Regenerates src/data/editions/index.ts from scratch: parses the existing
 * file's own entries (this script is the only writer, so its shape is
 * known) and prepends the new edition — newest first, index 0 is always
 * the one shown at "/". Never touches any src/data/editions/<date>.ts file.
 */
function updateEditionsIndex(newEntry) {
  const existingText = fs.readFileSync(EDITIONS_INDEX_PATH, "utf8");

  const entryPattern = /\{ date: "([\d-]+)", dateRangeLabel: ("(?:[^"\\]|\\.)*"), stories: (\w+) \},/g;
  const existingEntries = [...existingText.matchAll(entryPattern)].map((m) => ({
    date: m[1],
    dateRangeLabelLiteral: m[2],
    varName: m[3],
  }));

  if (existingEntries.some((e) => e.date === newEntry.date)) {
    throw new Error(
      `Edition ${newEntry.date} is already present in editions/index.ts — this should have been caught earlier.`
    );
  }

  const newVarName = `stories_${newEntry.date.replace(/-/g, "_")}`;
  const allEntries = [{ date: newEntry.date, dateRangeLabelLiteral: JSON.stringify(newEntry.dateRangeLabel), varName: newVarName }, ...existingEntries];

  const importLines = allEntries
    .map((e) => `import { stories as ${e.varName} } from "./${e.date}";`)
    .join("\n");
  const arrayLines = allEntries
    .map((e) => `  { date: "${e.date}", dateRangeLabel: ${e.dateRangeLabelLiteral}, stories: ${e.varName} },`)
    .join("\n");

  const fileContent = `import type { NewsStory } from "@/types/news-story";
${importLines}

export interface EditionMeta {
  /** Canonical key, also the /editions/[date] URL segment. */
  date: string;
  /** Human-readable range shown in the page header, e.g. "August 31 – September 1, 2026". */
  dateRangeLabel: string;
  stories: NewsStory[];
}

/**
 * All weekly editions, newest first. Index 0 is always the one shown at "/".
 * Regenerated by scripts/generate-real-edition.mjs each time a new edition
 * is created — do not hand-edit the entries array beyond adding a new one
 * the same way the script does, so this stays in sync with the files in
 * this directory.
 */
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
`;

  fs.writeFileSync(EDITIONS_INDEX_PATH, fileContent);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in the environment. Load .env.local first.");
    process.exitCode = 1;
    return;
  }

  const editionFilePath = path.join(EDITIONS_DIR, `${EDITION_DATE}.ts`);
  if (fs.existsSync(editionFilePath) && !ALLOW_OVERWRITE) {
    console.error(
      `Edition ${EDITION_DATE} already exists at ${path.relative(PROJECT_ROOT, editionFilePath)}.\n` +
        `Refusing to overwrite it. Re-run with ALLOW_OVERWRITE=1 if you really mean to regenerate this edition.`
    );
    process.exitCode = 1;
    return;
  }

  const publishedStories = loadPublishedStories(EDITIONS_DIR);
  const publishedEditionDates = [...new Set(publishedStories.map((s) => s.editionDate))];
  console.log(
    `\nLoaded ${publishedStories.length} previously published stories from ${
      publishedEditionDates.length ? publishedEditionDates.join(", ") : "no existing editions"
    } for cross-edition duplicate checking.`
  );

  const { finalCandidates, totalRaw } = await discoverCandidates({ lookbackDays: 7, maxRecordsPerSource: 50 });

  const { filtered: filteredCandidates, excluded: exactExcludedCandidates } = filterExactDuplicateCandidates(
    finalCandidates,
    publishedStories
  );
  console.log(
    `Exact-duplicate pre-filter: excluded ${exactExcludedCandidates.length} of ${finalCandidates.length} candidates already published (by URL or headline); ${filteredCandidates.length} remain for selection.`
  );

  const publishedContext = buildPublishedContextBlock(publishedStories);

  console.log(`\nAsking ${SELECTION_MODEL} to select six stories from ${filteredCandidates.length} candidates...\n`);
  const policyPath = path.join(PROJECT_ROOT, "EDITORIAL_POLICY.md");
  const { selections: rawSelections, usage: selectionUsage } = await selectSixStories(filteredCandidates, {
    model: SELECTION_MODEL,
    policyPath,
    publishedContext,
  });

  console.log(`\nRunning conservative headline cleanup (${CLEANUP_MODEL})...\n`);
  const { cleaned: cleanedSelections, usage: cleanupUsage } = await cleanupHeadlines(rawSelections, {
    model: CLEANUP_MODEL,
  });

  console.log(`\nRunning final cross-edition duplicate safety check...\n`);
  const selections = await resolveDuplicatesOrFail({
    selections: cleanedSelections,
    filteredCandidates,
    publishedStories,
    publishedContext,
    policyPath,
    selectionModel: SELECTION_MODEL,
    cleanupModel: CLEANUP_MODEL,
  });
  console.log(`\nDuplicate safety check passed: six distinct, non-duplicate stories confirmed.`);

  console.log(`\nGenerating Reading Support content (${SUPPORT_MODEL})...\n`);
  const { support, usage: supportUsage } = await generateSupportContent(selections);

  console.log(`\nSourcing images for all six stories (Wikimedia Commons first, AI-generated illustration fallback if needed)...\n`);
  const storiesForImageSourcing = selections.map((s) => ({
    id: `story-${s.publicationDate}-${slugify(s.headline)}`,
    headline: s.headline,
    category: s.category,
    whyWeChoseThis: s.whyWeChoseThis,
    sourceName: s.source,
  }));
  const imageEntries = await sourceImagesForEdition({
    storiesForImageSourcing,
    editionDate: EDITION_DATE,
    editionsDir: EDITIONS_DIR,
    imageOutputDir: IMAGE_OUTPUT_DIR,
    imageCreditsPath: IMAGE_CREDITS_PATH,
  });
  const commonsCount = imageEntries.filter((e) => e.kind === "commons").length;
  const aiCount = imageEntries.filter((e) => e.kind === "ai").length;
  console.log(`Image sourcing complete: ${commonsCount} from Wikimedia Commons, ${aiCount} AI-generated fallback.`);

  const stories = selections.map((s, i) => {
    const supportContent = support.find((x) => x.id === `H${i + 1}`);
    if (!supportContent) throw new Error(`Missing support content for H${i + 1}`);
    const imageFields = buildImageStoryFields(imageEntries[i]);

    return {
      id: storiesForImageSourcing[i].id,
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
      ...imageFields,
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

  const dateRangeLabel = buildDateRangeLabel(stories.map((s) => s.publicationDate));

  const fileContent = `import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the ${dateRangeLabel} edition, selected
 * automatically by the GDELT + OpenAI pipeline
 * (scripts/generate-real-edition.mjs) following EDITORIAL_POLICY.md.
 * Headlines, sources, URLs, and publication dates are real; "why we chose
 * this," background, vocabulary, and reading prompts are original
 * commentary written for learners, never copied from the articles.
 *
 * Images were sourced automatically per IMAGE_POLICY.md: Wikimedia Commons
 * first (licensed-real or licensed-contextual), an AI-generated
 * illustration fallback where no suitable licensed image was found — see
 * IMAGE_CREDITS.md for the per-image record of every image below.
 * Generated: ${new Date().toISOString()}
 */
export const stories: NewsStory[] = ${serialize(stories)};
`;

  fs.mkdirSync(EDITIONS_DIR, { recursive: true });
  fs.writeFileSync(editionFilePath, fileContent);
  console.log(`\nWrote ${stories.length} real stories to ${path.relative(PROJECT_ROOT, editionFilePath)}`);

  updateEditionsIndex({ date: EDITION_DATE, dateRangeLabel });
  console.log(`Registered edition ${EDITION_DATE} ("${dateRangeLabel}") in ${path.relative(PROJECT_ROOT, EDITIONS_INDEX_PATH)}`);

  let creditNumber = nextCreditEntryNumber(IMAGE_CREDITS_PATH);
  const creditEntries = imageEntries.map((entry, i) => {
    const s = selections[i];
    const number = creditNumber++;
    return { number, localFilename: entry.filename, markdown: buildImageCreditEntry(entry, `${s.headline} (${s.source})`, number) };
  });
  const { appended } = appendCreditsSection(IMAGE_CREDITS_PATH, {
    sectionHeading: `${dateRangeLabel} edition (${EDITION_DATE})`,
    entries: creditEntries,
  });
  console.log(`Appended ${appended} new image credit entries to ${path.relative(PROJECT_ROOT, IMAGE_CREDITS_PATH)}`);

  const reportDir = path.join(PROJECT_ROOT, "scripts", "output");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportDir, `generate-real-edition-report-${EDITION_DATE}.json`),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        editionDate: EDITION_DATE,
        dateRangeLabel,
        totalRawCandidates: totalRaw,
        poolSize: finalCandidates.length,
        publishedStoriesConsidered: publishedStories.length,
        publishedEditionDates,
        exactDuplicatesExcludedFromPool: exactExcludedCandidates.length,
        poolSizeAfterExactDuplicateFilter: filteredCandidates.length,
        selectionModel: SELECTION_MODEL,
        cleanupModel: CLEANUP_MODEL,
        supportModel: SUPPORT_MODEL,
        selectionUsage,
        cleanupUsage,
        supportUsage,
        imagesFromCommons: commonsCount,
        imagesAiGenerated: aiCount,
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
