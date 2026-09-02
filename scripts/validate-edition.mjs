/**
 * Standalone edition validator — the hard safety gate a future automated
 * publication pipeline must pass before an edition may be committed and
 * published. Read-only: never modifies any edition file, the registry,
 * images, or IMAGE_CREDITS.md.
 *
 * Deterministic and inexpensive: no OpenAI calls, no article-text fetches.
 * Semantic/event duplicate detection is NOT repeated here — that already
 * happens once, expensively, in the generation pipeline
 * (scripts/lib/duplicate-check.mjs). This script only re-checks the cheap,
 * mechanical things: exact URL/headline duplicates, required fields,
 * unique ids, image presence, and registry consistency.
 *
 * Self-contained on purpose (no import from scripts/lib/*): it parses every
 * src/data/editions/*.ts file itself via the same plain-text-regex approach
 * already used elsewhere in scripts/, since Node can't import .ts files
 * directly here (no ts-node/tsx in this project).
 *
 * Usage:
 *   EDITION_DATE=2026-09-04 node scripts/validate-edition.mjs
 *
 * Optional:
 *   EDITIONS_DIR=/path/to/scratch/editions   Override the editions
 *     directory (defaults to the real src/data/editions/), for testing
 *     this validator against fixture files without touching real data.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const EDITIONS_DIR = process.env.EDITIONS_DIR
  ? path.resolve(process.env.EDITIONS_DIR)
  : path.join(PROJECT_ROOT, "src", "data", "editions");
const INDEX_PATH = path.join(EDITIONS_DIR, "index.ts");

const EDITION_DATE = process.env.EDITION_DATE;

const SOURCE_URL_TIMEOUT_MS = 8000;

const VALID_CATEGORIES = new Set([
  "U.S. & Politics",
  "World & Conflict",
  "Business & Economy",
  "Technology & AI",
  "Asia Pickup",
  "World Pickup",
]);
const VALID_LEVELS = new Set(["A1", "A2", "B1", "B1+", "B2", "B2+", "C1", "C2"]);
const VALID_SCORES = new Set([1, 2, 3, 4, 5]);
const VALID_READING_MODES = new Set(["authentic", "interactive"]);
const VALID_RIGHTS_STATUSES = new Set(["reuse-permitted", "copyrighted", "unclear-rights"]);
const VALID_IMAGE_SOURCE_TYPES = new Set(["licensed-real", "licensed-contextual", "ai-generated", "placeholder"]);

function normalizeUrlForDedup(url) {
  return (url || "").split("?")[0].toLowerCase();
}

function normalizeTitleForDedup(title) {
  return (title || "")
    .toLowerCase()
    .replace(/['’"“”]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Extracts a story's fields from its object-literal block by regexing the
 * whole block text for each unique key name (no field name collides with
 * any other, including nested readingSupport keys, so no need to isolate
 * sub-objects textually first).
 */
function parseStoryBlocks(text) {
  const blocks = text.split(/^\s{2}\{/m).slice(1);

  return blocks.map((block) => {
    const str = (key) => {
      const m = new RegExp(`\\b${key}: "((?:[^"\\\\]|\\\\.)*)"`).exec(block);
      return m ? m[1] : undefined;
    };
    const num = (key) => {
      const m = new RegExp(`\\b${key}: (-?\\d+(?:\\.\\d+)?)`).exec(block);
      return m ? Number(m[1]) : undefined;
    };
    const stringArray = (key) => {
      const m = new RegExp(`\\b${key}: \\[([\\s\\S]*?)\\n\\s*\\],`).exec(block);
      if (!m) return undefined;
      return [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
    };
    const hasKey = (key) => new RegExp(`\\b${key}:`).test(block);

    return {
      id: str("id"),
      headline: str("headline"),
      sourceName: str("sourceName"),
      sourceUrl: str("sourceUrl"),
      category: str("category"),
      publicationDate: str("publicationDate"),
      estimatedLevel: str("estimatedLevel"),
      estimatedReadingMinutes: num("estimatedReadingMinutes"),
      trendingScore: num("trendingScore"),
      significanceScore: num("significanceScore"),
      discussionValueScore: num("discussionValueScore"),
      knowledgeValueScore: num("knowledgeValueScore"),
      imageUrl: str("imageUrl"),
      imageAlt: str("imageAlt"),
      imageWidth: num("imageWidth"),
      imageHeight: num("imageHeight"),
      imageSourceType: str("imageSourceType"),
      whyWeChoseThis: str("whyWeChoseThis"),
      keyVocabulary: stringArray("keyVocabulary"),
      readingMode: str("readingMode"),
      rightsStatus: str("rightsStatus"),
      hasReadingSupport: hasKey("readingSupport"),
      readingSupportBackground: str("background"),
      readingSupportVocabulary: (() => {
        const m = /\bvocabulary: \[([\s\S]*?)\n\s*\],/.exec(block);
        if (!m) return undefined;
        return [...m[1].matchAll(/term: "((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
      })(),
      readingSupportPrompts: stringArray("readingPrompts"),
    };
  });
}

/** Parses the registry's ordered `{ date: "...", ... },` entries, in file order. */
function parseIndexEntries(text) {
  const entryPattern = /\{ date: "([\d-]+)", dateRangeLabel: (?:"(?:[^"\\]|\\.)*"), stories: (\w+) \},/g;
  return [...text.matchAll(entryPattern)].map((m) => ({ date: m[1], varName: m[2] }));
}

async function checkUrlReachable(url) {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(SOURCE_URL_TIMEOUT_MS) });
    if (res.status < 400) return { ok: true, status: res.status };
    // Some sites reject HEAD; retry with GET before concluding it's broken.
    const getRes = await fetch(url, { method: "GET", signal: AbortSignal.timeout(SOURCE_URL_TIMEOUT_MS) });
    return { ok: getRes.status < 400, status: getRes.status };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}

async function main() {
  const failures = [];
  const infoLines = [];

  if (!EDITION_DATE) {
    console.error("EDITION_DATE is required, e.g.: EDITION_DATE=2026-09-04 node scripts/validate-edition.mjs");
    process.exitCode = 1;
    return;
  }

  console.log(`Edition validation: ${EDITION_DATE}`);

  const editionPath = path.join(EDITIONS_DIR, `${EDITION_DATE}.ts`);
  if (!fs.existsSync(editionPath)) {
    console.log(`Edition exists: FAIL — no file at ${path.relative(PROJECT_ROOT, editionPath)}`);
    console.log("RESULT: FAIL");
    process.exitCode = 1;
    return;
  }

  const editionText = fs.readFileSync(editionPath, "utf8");
  const stories = parseStoryBlocks(editionText);

  // --- 1. Story count ---
  const storiesOk = stories.length === 6;
  console.log(`Stories: ${stories.length}/6 ${storiesOk ? "PASS" : "FAIL"}`);
  if (!storiesOk) failures.push(`Expected exactly 6 stories, found ${stories.length}.`);

  // --- 2. Required fields ---
  const REQUIRED_STRING_FIELDS = [
    "id",
    "headline",
    "sourceName",
    "sourceUrl",
    "category",
    "publicationDate",
    "estimatedLevel",
    "imageUrl",
    "imageAlt",
    "imageSourceType",
    "whyWeChoseThis",
    "readingMode",
    "rightsStatus",
  ];
  const fieldFailures = [];
  stories.forEach((s, i) => {
    const label = `story[${i}] (${s.id ?? "no id"})`;

    for (const field of REQUIRED_STRING_FIELDS) {
      if (typeof s[field] !== "string" || s[field].length === 0) {
        fieldFailures.push(`${label}: missing or empty required field "${field}".`);
      }
    }
    for (const field of ["estimatedReadingMinutes", "trendingScore", "significanceScore", "discussionValueScore", "knowledgeValueScore", "imageWidth", "imageHeight"]) {
      if (typeof s[field] !== "number" || Number.isNaN(s[field])) {
        fieldFailures.push(`${label}: missing or non-numeric required field "${field}".`);
      }
    }
    if (!Array.isArray(s.keyVocabulary) || s.keyVocabulary.length === 0) {
      fieldFailures.push(`${label}: missing or empty required field "keyVocabulary".`);
    }

    // readingSupport is optional in the NewsStory type — only validate its
    // internal shape when present; do not require it outright.
    if (s.hasReadingSupport) {
      if (typeof s.readingSupportBackground !== "string" || s.readingSupportBackground.length === 0) {
        fieldFailures.push(`${label}: readingSupport.background missing or empty.`);
      }
      if (!Array.isArray(s.readingSupportVocabulary) || s.readingSupportVocabulary.length === 0) {
        fieldFailures.push(`${label}: readingSupport.vocabulary missing or empty.`);
      }
      if (!Array.isArray(s.readingSupportPrompts) || s.readingSupportPrompts.length === 0) {
        fieldFailures.push(`${label}: readingSupport.readingPrompts missing or empty.`);
      }
    }

    // Enum/range checks (only meaningful once the field is confirmed present above).
    if (s.category !== undefined && !VALID_CATEGORIES.has(s.category)) {
      fieldFailures.push(`${label}: invalid category "${s.category}".`);
    }
    if (s.estimatedLevel !== undefined && !VALID_LEVELS.has(s.estimatedLevel)) {
      fieldFailures.push(`${label}: invalid estimatedLevel "${s.estimatedLevel}".`);
    }
    if (s.readingMode !== undefined && !VALID_READING_MODES.has(s.readingMode)) {
      fieldFailures.push(`${label}: invalid readingMode "${s.readingMode}".`);
    }
    if (s.rightsStatus !== undefined && !VALID_RIGHTS_STATUSES.has(s.rightsStatus)) {
      fieldFailures.push(`${label}: invalid rightsStatus "${s.rightsStatus}".`);
    }
    for (const scoreField of ["trendingScore", "significanceScore", "discussionValueScore", "knowledgeValueScore"]) {
      if (s[scoreField] !== undefined && !VALID_SCORES.has(s[scoreField])) {
        fieldFailures.push(`${label}: ${scoreField} must be 1-5, got ${s[scoreField]}.`);
      }
    }
    if (s.sourceUrl !== undefined && !/^https?:\/\//.test(s.sourceUrl)) {
      fieldFailures.push(`${label}: sourceUrl does not look like a URL: "${s.sourceUrl}".`);
    }
  });
  const fieldsOk = fieldFailures.length === 0;
  console.log(`Required fields: ${fieldsOk ? "PASS" : "FAIL"}`);
  if (!fieldsOk) failures.push(...fieldFailures);

  // --- 3. Unique IDs within this edition ---
  const idCounts = new Map();
  for (const s of stories) {
    if (!s.id) continue;
    idCounts.set(s.id, (idCounts.get(s.id) || 0) + 1);
  }
  const withinEditionDupeIds = [...idCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id);
  const idsOk = withinEditionDupeIds.length === 0;
  console.log(`Unique IDs: ${idsOk ? "PASS" : "FAIL"}`);
  if (!idsOk) failures.push(`Duplicate id(s) within this edition: ${withinEditionDupeIds.join(", ")}`);

  // --- 4. Images: no placeholders, valid enum, valid dimensions, file exists ---
  const imageFailures = [];
  stories.forEach((s, i) => {
    const label = `story[${i}] (${s.id ?? "no id"})`;

    if (s.imageSourceType === "placeholder") {
      imageFailures.push(`${label}: imageSourceType is "placeholder" — not allowed in a published edition.`);
    } else if (s.imageSourceType !== undefined && !VALID_IMAGE_SOURCE_TYPES.has(s.imageSourceType)) {
      imageFailures.push(`${label}: invalid imageSourceType "${s.imageSourceType}".`);
    }

    for (const dim of ["imageWidth", "imageHeight"]) {
      const value = s[dim];
      if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        imageFailures.push(`${label}: ${dim} must be a positive integer, got ${JSON.stringify(value)}.`);
      }
    }

    if (typeof s.imageUrl === "string" && s.imageUrl.startsWith("/")) {
      const filePath = path.join(PROJECT_ROOT, "public", s.imageUrl);
      if (!fs.existsSync(filePath)) {
        imageFailures.push(`${label}: image file does not exist: ${path.relative(PROJECT_ROOT, filePath)}`);
      }
    } else if (typeof s.imageUrl === "string" && s.imageUrl.length > 0) {
      infoLines.push(`${label}: imageUrl is external (${s.imageUrl}) — local file existence not applicable.`);
    } else {
      imageFailures.push(`${label}: missing imageUrl.`);
    }
  });
  const imagesOk = imageFailures.length === 0;
  console.log(`Images: ${imagesOk ? "PASS" : "FAIL"}`);
  if (!imagesOk) failures.push(...imageFailures);

  // --- 5. Registry checks ---
  const registryFailures = [];
  if (!fs.existsSync(INDEX_PATH)) {
    registryFailures.push(`Registry file does not exist: ${path.relative(PROJECT_ROOT, INDEX_PATH)}`);
  } else {
    const indexText = fs.readFileSync(INDEX_PATH, "utf8");
    const entries = parseIndexEntries(indexText);

    if (entries.length === 0) {
      registryFailures.push("Registry contains no parseable edition entries.");
    } else {
      const containsTarget = entries.some((e) => e.date === EDITION_DATE);
      if (!containsTarget) {
        registryFailures.push(`Registry does not contain an entry for ${EDITION_DATE}.`);
      }

      for (let i = 0; i < entries.length - 1; i++) {
        if (!(entries[i].date > entries[i + 1].date)) {
          registryFailures.push(
            `Registry is not in strict newest-first order at position ${i}: "${entries[i].date}" is not after "${entries[i + 1].date}".`
          );
        }
      }

      if (!/export const latestEdition = editions\[0\];/.test(indexText)) {
        registryFailures.push('Registry does not define "export const latestEdition = editions[0];" as expected.');
      } else if (entries.length > 0) {
        const maxDate = entries.reduce((max, e) => (e.date > max ? e.date : max), entries[0].date);
        if (entries[0].date !== maxDate) {
          registryFailures.push(
            `latestEdition (editions[0] = "${entries[0].date}") does not resolve to the newest date in the registry ("${maxDate}").`
          );
        }
      }
    }
  }
  const registryOk = registryFailures.length === 0;
  console.log(`Registry: ${registryOk ? "PASS" : "FAIL"}`);
  if (!registryOk) failures.push(...registryFailures);

  // --- 6. Exact duplicates against prior archived editions ---
  const dupFailures = [];
  const priorUrls = new Set();
  const priorTitles = new Set();
  const priorIds = new Set();

  if (fs.existsSync(EDITIONS_DIR)) {
    const otherFiles = fs
      .readdirSync(EDITIONS_DIR)
      .filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== `${EDITION_DATE}.ts`);
    for (const file of otherFiles) {
      const otherText = fs.readFileSync(path.join(EDITIONS_DIR, file), "utf8");
      for (const s of parseStoryBlocks(otherText)) {
        if (s.sourceUrl) priorUrls.add(normalizeUrlForDedup(s.sourceUrl));
        if (s.headline) priorTitles.add(normalizeTitleForDedup(s.headline));
        if (s.id) priorIds.add(s.id);
      }
    }
  }

  stories.forEach((s, i) => {
    const label = `story[${i}] (${s.id ?? "no id"})`;
    if (s.id && priorIds.has(s.id)) {
      dupFailures.push(`${label}: id "${s.id}" already used in another archived edition.`);
    }
    if (s.sourceUrl && priorUrls.has(normalizeUrlForDedup(s.sourceUrl))) {
      dupFailures.push(`${label}: source URL already published in another archived edition: ${s.sourceUrl}`);
    }
    if (s.headline && priorTitles.has(normalizeTitleForDedup(s.headline))) {
      dupFailures.push(`${label}: normalized headline already published in another archived edition: "${s.headline}"`);
    }
  });
  const dupOk = dupFailures.length === 0;
  console.log(`Exact duplicates: ${dupOk ? "PASS" : "FAIL"}`);
  if (!dupOk) failures.push(...dupFailures);

  // --- 7. Source URLs: best-effort, informational only (never the sole cause of failure) ---
  const urlsToCheck = stories.map((s) => s.sourceUrl).filter(Boolean);
  const urlResults = await Promise.all(urlsToCheck.map((u) => checkUrlReachable(u)));
  const reachableCount = urlResults.filter((r) => r.ok).length;
  const unreachable = stories
    .map((s, i) => ({ s, r: urlResults[i] }))
    .filter(({ r }) => r && !r.ok);
  console.log(
    `Source URLs: ${urlsToCheck.length} checked, ${reachableCount} reachable, ${unreachable.length} unreachable`
  );
  for (const { s, r } of unreachable) {
    console.log(`  WARNING (non-fatal): "${s.headline}" — ${s.sourceUrl} — ${r.error || `HTTP ${r.status}`}`);
  }

  for (const line of infoLines) {
    console.log(`  INFO: ${line}`);
  }

  const allOk = storiesOk && fieldsOk && idsOk && imagesOk && registryOk && dupOk;

  if (!allOk) {
    console.log("\nFAILURES:");
    for (const f of failures) console.log(`  - ${f}`);
  }

  console.log(`RESULT: ${allOk ? "PASS" : "FAIL"}`);
  process.exitCode = allOk ? 0 : 1;
}

main().catch((err) => {
  console.error("validate-edition failed unexpectedly:", err);
  process.exitCode = 1;
});
