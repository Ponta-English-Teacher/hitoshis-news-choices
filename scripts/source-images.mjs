/**
 * Automatic licensed-image sourcing: given story context (headline,
 * category, whyWeChoseThis, sourceName), finds a safe, legally reusable
 * Wikimedia Commons image, or returns a clean `{ found: false }` result so
 * the future pipeline can fall back to AI-generated illustration (a later
 * step — not implemented here).
 *
 * Pipeline per batch of stories (cost-conscious: exactly two OpenAI calls
 * total, regardless of how many stories are passed in):
 *   1. One batched call generates 2-3 targeted Commons search queries per
 *      story.
 *   2. Commons' public, keyless search + imageinfo API (metadata only,
 *      never HTML scraping) returns candidates for every query.
 *   3. Deterministic, model-free filtering: license allow-list
 *      (scripts/lib/commons-search.mjs's classifyLicense), acceptable
 *      MIME type, and "already used" dedup (scripts/lib/image-credits.mjs)
 *      — all BEFORE any model sees the candidates.
 *   4. One batched call judges relevance across the remaining safe
 *      candidates for every story, classifies licensed-real vs
 *      licensed-contextual, and may answer "none suitable" per story.
 *   5. The chosen candidate (if any) is downloaded; dimensions come
 *      directly from Commons' `iiurlwidth`-derived thumbnail metadata, not
 *      from any OS-specific image tool, so this works identically on
 *      GitHub Actions' Linux runners.
 *
 * This module never writes to a real edition file, the registry, or
 * IMAGE_CREDITS.md — the caller decides the download destination and
 * whether/how to use the result.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { searchCommons, fetchImageInfo, classifyLicense, isAcceptableMimeType, COMMONS_REQUEST_HEADERS } from "./lib/commons-search.mjs";
import { loadUsedCommonsFiles, loadUsedLocalImageFilenames, normalizeCommonsTitle, slugify } from "./lib/image-credits.mjs";
import { getImageDimensions } from "./lib/image-dimensions.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const QUERY_MODEL = "gpt-5.4-mini"; // cheap: just proposes search strings
const RELEVANCE_MODEL = "gpt-5.5"; // judgment call worth the better model

const QUERIES_PER_STORY = 3;
const CANDIDATES_PER_QUERY = 8;
const MAX_CANDIDATES_INSPECTED_PER_STORY = 15;
const FETCH_CONCURRENCY = 5;

function stripJsonFences(raw) {
  return raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/**
 * ONE batched OpenAI call: proposes 2-3 Commons search queries per story.
 * Deliberately generic guidance (no reference to any specific story) so
 * this generalizes to any future edition, not just the six stories used to
 * test it.
 */
async function generateSearchQueries(stories, { model = QUERY_MODEL } = {}) {
  const itemsBlock = stories
    .map((s, i) => `S${i + 1} | category: ${s.category} | source: ${s.sourceName}\nheadline: ${s.headline}\nwhy: ${s.whyWeChoseThis}`)
    .join("\n\n");

  const instructions = `You are proposing Wikimedia Commons search queries for a news-learning app's story images. Commons only hosts freely-licensed images, so search terms must target things that plausibly HAVE a free photo, not the exact private news moment.

For EACH story below, propose ${QUERIES_PER_STORY} short Commons search queries (2-5 words each) that could surface a legally reusable, contextually relevant photo. Prefer concrete, photographable nouns:
- institutions, government buildings, landmark locations, company facilities
- vehicles, equipment, technology, natural phenomena
- a well-documented public official's name ONLY if they hold a government/public office likely to have official (often public-domain) photography

Do NOT propose queries that search for a private individual, a family member of a public figure, or anyone unlikely to have a freely-licensed photo — prefer the relevant institution, location, or object instead.
Do NOT propose queries tied to an unrelated past tragedy or disaster merely because it shares a location with this story (e.g. do not surface a building's disaster/attack imagery for an unrelated story about that same building today).

STORIES:
${itemsBlock}

Reply with ONLY valid JSON (no markdown fences, no commentary):
{ "queries": [ { "id": "S1", "queries": ["...", "...", "..."] } ] }
One entry per story, same ids, same order.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({ model, instructions, input: itemsBlock });
  const parsed = JSON.parse(stripJsonFences(response.output_text));

  return stories.map((_, i) => {
    const entry = parsed.queries.find((q) => q.id === `S${i + 1}`);
    return entry?.queries?.slice(0, QUERIES_PER_STORY) ?? [];
  });
}

/**
 * ONE batched OpenAI call: given only license-safe candidates, judges the
 * best match per story (or none). The model never sees a candidate that
 * failed the deterministic license/MIME/dedup filter.
 */
async function selectBestCandidates(storiesWithCandidates, { model = RELEVANCE_MODEL } = {}) {
  const blocks = storiesWithCandidates.map((s, i) => {
    const candidateLines = s.candidates
      .map(
        (c, ci) =>
          `  C${i + 1}.${ci + 1} | ${c.info.objectName || c.title} | ${c.info.description || "(no description)"} | ${c.info.originalWidth}x${c.info.originalHeight}`
      )
      .join("\n");
    return `STORY S${i + 1}\nheadline: ${s.headline}\nwhy: ${s.whyWeChoseThis}\nCANDIDATES:\n${candidateLines || "  (none)"}`;
  });

  if (blocks.every((_, i) => storiesWithCandidates[i].candidates.length === 0)) {
    // Nothing to judge at all — skip the call entirely.
    return storiesWithCandidates.map(() => ({ chosenId: null, classification: null, reason: "No license-safe candidates were found to judge." }));
  }

  const instructions = `You are choosing the best Wikimedia Commons image for each news story below, from an ALREADY license-verified candidate list (you do not need to re-check licensing).

For each story, either:
- choose the single best candidate id (e.g. "C1.2"), and classify it:
  - "licensed-real" ONLY if there is strong, explicit evidence the image depicts the actual specific event/story described (e.g. its description clearly ties it to this exact news event) — be conservative; when uncertain, use "licensed-contextual" instead.
  - "licensed-contextual" for a real photo that is topically/institutionally/geographically relevant but does not depict the specific event itself.
- OR answer that none are suitable — this is a normal, expected outcome, not a failure. Do not force a weak or misleading choice.

${blocks.join("\n\n")}

Reply with ONLY valid JSON (no markdown fences, no commentary):
{ "selections": [ { "id": "S1", "chosenId": "C1.2", "classification": "licensed-contextual", "reason": "one short sentence" } ] }
If none are suitable for a story, set "chosenId": null, "classification": null, and explain why in "reason". One entry per story, same order, same ids.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({ model, instructions, input: blocks.join("\n\n") });
  const parsed = JSON.parse(stripJsonFences(response.output_text));

  return storiesWithCandidates.map((_, i) => {
    const sel = parsed.selections.find((x) => x.id === `S${i + 1}`);
    return {
      chosenId: sel?.chosenId ?? null,
      classification: sel?.classification ?? null,
      reason: sel?.reason ?? "",
    };
  });
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, { headers: COMMONS_REQUEST_HEADERS });
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

/**
 * Main entry point. `stories` is an array of
 * { id, headline, category, whyWeChoseThis, sourceName }.
 * `options.downloadDir` is REQUIRED and must be an explicit destination —
 * this module never assumes or defaults to the real public/images/stories/
 * directory, so callers must opt in deliberately.
 * `options.excludeCommonsFiles` / `options.excludeLocalFilenames`: extra
 * Sets of already-used identifiers to avoid, on top of what this function
 * loads itself from IMAGE_CREDITS.md and src/data/editions/.
 * `options.log`: optional logger (defaults to console.log).
 */
export async function sourceImagesForStories(stories, options) {
  const { downloadDir, log = console.log } = options;
  if (!downloadDir) throw new Error("sourceImagesForStories: options.downloadDir is required.");
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set.");

  const usedCommonsFiles = new Set([
    ...loadUsedCommonsFiles(path.join(PROJECT_ROOT, "IMAGE_CREDITS.md")),
    ...(options.excludeCommonsFiles || []),
  ]);
  const usedLocalFilenames = new Set([
    ...loadUsedLocalImageFilenames(path.join(PROJECT_ROOT, "src", "data", "editions")),
    ...(options.excludeLocalFilenames || []),
  ]);

  log(`Generating Commons search queries for ${stories.length} stor${stories.length === 1 ? "y" : "ies"} (1 batched call, ${QUERY_MODEL})...`);
  const queriesPerStory = await generateSearchQueries(stories);

  const perStory = [];

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    const queries = queriesPerStory[i];
    log(`\n[${i + 1}/${stories.length}] "${story.headline}"`);
    log(`  Queries: ${queries.map((q) => `"${q}"`).join(", ")}`);

    const seenTitles = new Set();
    const rawCandidates = [];
    for (const q of queries) {
      const results = await searchCommons(q, { limit: CANDIDATES_PER_QUERY });
      for (const r of results) {
        if (seenTitles.has(r.title)) continue;
        seenTitles.add(r.title);
        rawCandidates.push(r);
      }
      if (rawCandidates.length >= MAX_CANDIDATES_INSPECTED_PER_STORY) break;
    }
    const inspected = rawCandidates.slice(0, MAX_CANDIDATES_INSPECTED_PER_STORY);

    const infos = await mapWithConcurrency(inspected, FETCH_CONCURRENCY, (c) => fetchImageInfo(c.title));

    let rejectedByLicense = 0;
    const safe = [];
    inspected.forEach((c, idx) => {
      const info = infos[idx];
      if (!info) {
        rejectedByLicense++; // couldn't retrieve metadata — treat conservatively as rejected
        return;
      }
      if (!isAcceptableMimeType(info.mime)) {
        rejectedByLicense++;
        return;
      }
      const license = classifyLicense(info.extmetadata);
      if (!license.allowed) {
        rejectedByLicense++;
        return;
      }
      const normalizedTitle = normalizeCommonsTitle(info.title);
      if (usedCommonsFiles.has(normalizedTitle)) {
        rejectedByLicense++; // already used elsewhere — treat as unavailable, not a license failure per se, but same "rejected" bucket for reporting simplicity
        return;
      }
      safe.push({ title: c.title, info, license });
    });

    log(`  Commons results inspected: ${inspected.length}`);
    log(`  Rejected (license/type/already-used): ${rejectedByLicense}`);
    log(`  Remaining after filtering: ${safe.length}`);

    perStory.push({
      story,
      queries,
      inspectedCount: inspected.length,
      rejectedCount: rejectedByLicense,
      candidates: safe,
    });
  }

  log(`\nJudging relevance across all stories (1 batched call, ${RELEVANCE_MODEL})...`);
  const selections = await selectBestCandidates(
    perStory.map((p) => ({ headline: p.story.headline, whyWeChoseThis: p.story.whyWeChoseThis, candidates: p.candidates }))
  );

  const results = [];
  for (let i = 0; i < perStory.length; i++) {
    const p = perStory[i];
    const sel = selections[i];

    const base = {
      storyId: p.story.id,
      headline: p.story.headline,
      queries: p.queries,
      inspectedCount: p.inspectedCount,
      rejectedCount: p.rejectedCount,
      remainingCount: p.candidates.length,
    };

    if (!sel.chosenId) {
      results.push({
        ...base,
        found: false,
        reason: sel.reason || "No suitable licensed Wikimedia Commons image found",
      });
      continue;
    }

    const [, candidateIdxStr] = sel.chosenId.split(".");
    const candidateIdx = Number(candidateIdxStr) - 1;
    const chosen = p.candidates[candidateIdx];
    if (!chosen) {
      results.push({ ...base, found: false, reason: `Model referenced unknown candidate id "${sel.chosenId}"; treating as no selection.` });
      continue;
    }

    const ext = (chosen.info.mime || "image/jpeg").split("/")[1].replace("jpeg", "jpg");
    let localFilename = `${slugify(p.story.id || p.story.headline).split("-").slice(0, 6).join("-")}.${ext}`;
    if (usedLocalFilenames.has(localFilename)) {
      localFilename = `${slugify(p.story.id || p.story.headline).split("-").slice(0, 6).join("-")}-${Date.now()}.${ext}`;
    }
    const destPath = path.join(downloadDir, localFilename);

    let downloadedBytes = null;
    let downloadError = null;
    let measuredWidth = null;
    let measuredHeight = null;
    try {
      downloadedBytes = await downloadImage(chosen.info.downloadUrl, destPath);
      // Commons' imageinfo `thumbwidth`/`thumbheight` do not reliably match
      // what the thumbnail server actually serves (confirmed empirically:
      // a requested 1200px-wide thumbnail was sometimes actually served at
      // 1280px) — measure the real downloaded bytes instead of trusting
      // that metadata, so imageWidth/imageHeight in the story record are
      // always true.
      const measured = getImageDimensions(fs.readFileSync(destPath), ext);
      measuredWidth = measured.width;
      measuredHeight = measured.height;
    } catch (err) {
      downloadError = err.message;
    }

    const attributionRequired = chosen.info.extmetadata?.AttributionRequired?.value === "true";
    const licenseDisplayName = chosen.info.extmetadata?.UsageTerms?.value || chosen.license.shortName || chosen.license.slug;
    const creator = chosen.info.artist || "Unknown";
    // A short, correctly-cased license name for the composed attribution
    // string below (chosen.license.shortName is lowercased for matching,
    // not for display). Composed as "<creator> / Wikimedia Commons /
    // <license>" — the wording convention already established throughout
    // IMAGE_CREDITS.md — rather than passing through Commons' raw `Credit`
    // field, which for self-uploaded files is often just the literal,
    // unhelpful text "Own work".
    const licenseShortDisplay = chosen.info.extmetadata?.LicenseShortName?.value || licenseDisplayName;

    results.push({
      ...base,
      found: !downloadError,
      reason: downloadError,
      selected: {
        commonsTitle: chosen.title,
        descriptionUrl: chosen.info.descriptionUrl,
        // Exposed so a caller building imageAlt/credit text has something
        // descriptive to work with, without an extra API call.
        objectName: chosen.info.objectName,
        description: chosen.info.description,
        creator,
        licenseDisplayName,
        attributionRequired,
        attributionText: `${creator} / Wikimedia Commons / ${licenseShortDisplay}`,
        classification: sel.classification === "licensed-real" ? "licensed-real" : "licensed-contextual",
        selectionReason: sel.reason,
        originalWidth: chosen.info.originalWidth,
        originalHeight: chosen.info.originalHeight,
        // Measured from the actual downloaded bytes, not Commons' reported
        // thumbwidth/thumbheight (see comment above) — null only if the
        // download itself failed, in which case `found` is already false.
        downloadWidth: measuredWidth,
        downloadHeight: measuredHeight,
        localFilename,
        localPath: destPath,
        downloadedBytes,
      },
    });
  }

  return results;
}

// --- CLI test harness: sources images for a real (already-published)
// edition's stories, READ-ONLY, downloading into a scratch directory only.
// Never modifies the edition file, the registry, or IMAGE_CREDITS.md.
async function main() {
  const EDITION_DATE = process.env.EDITION_DATE || "2026-09-04";
  const OUTPUT_DIR =
    process.env.OUTPUT_DIR || path.join(PROJECT_ROOT, "..", `source-images-test-output-${Date.now()}`);

  const editionPath = path.join(PROJECT_ROOT, "src", "data", "editions", `${EDITION_DATE}.ts`);
  if (!fs.existsSync(editionPath)) {
    console.error(`No edition file at ${editionPath}`);
    process.exitCode = 1;
    return;
  }
  const text = fs.readFileSync(editionPath, "utf8");
  const blocks = text.split(/^\s{2}\{/m).slice(1);
  const stories = blocks.map((block) => {
    const str = (key) => new RegExp(`\\b${key}: "((?:[^"\\\\]|\\\\.)*)"`).exec(block)?.[1];
    return {
      id: str("id"),
      headline: str("headline"),
      category: str("category"),
      sourceName: str("sourceName"),
      whyWeChoseThis: str("whyWeChoseThis"),
    };
  });

  console.log(`Sourcing test images for ${stories.length} stories from ${EDITION_DATE} (READ-ONLY input; downloads go to ${OUTPUT_DIR})\n`);

  const results = await sourceImagesForStories(stories, { downloadDir: OUTPUT_DIR });

  console.log("\n\n================ SUMMARY ================\n");
  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.headline}`);
    console.log(`   Queries: ${r.queries.map((q) => `"${q}"`).join(", ")}`);
    console.log(`   Inspected: ${r.inspectedCount}, Rejected: ${r.rejectedCount}, Remaining: ${r.remainingCount}`);
    if (r.found && r.selected) {
      const s = r.selected;
      console.log(`   SELECTED: ${s.commonsTitle}`);
      console.log(`   Commons page: ${s.descriptionUrl}`);
      console.log(`   Creator: ${s.creator}`);
      console.log(`   License: ${s.licenseDisplayName}`);
      console.log(`   Classification: ${s.classification}`);
      console.log(`   Reason: ${s.selectionReason}`);
      console.log(`   Original dimensions: ${s.originalWidth}x${s.originalHeight}`);
      console.log(`   Downloaded dimensions: ${s.downloadWidth}x${s.downloadHeight} (${s.downloadedBytes} bytes)`);
      console.log(`   Local file: ${s.localPath}`);
    } else {
      console.log(`   NOT FOUND — ${r.reason}`);
    }
    console.log("");
  });

  const foundCount = results.filter((r) => r.found).length;
  console.log(`Result: ${foundCount}/${results.length} stories got a licensed image; ${results.length - foundCount} fell back to "not found" (would go to AI-generation fallback in a later step).`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((err) => {
    console.error("source-images failed:", err);
    process.exitCode = 1;
  });
}
