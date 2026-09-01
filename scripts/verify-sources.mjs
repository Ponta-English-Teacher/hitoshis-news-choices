/**
 * Quality-control check ONLY: for each of the six currently-selected real
 * stories in src/data/mock-news-stories.ts, fetch the public page and
 * extract publicly-provided metadata (title, meta/OG description, byline)
 * to verify the displayed source/date match the page a student would
 * actually land on. Does NOT store or reproduce full article body text —
 * only short, publicly-intended metadata fields.
 *
 * Dev-only, standalone. Run manually:
 *   node scripts/verify-sources.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Node can't import .ts directly without a loader, so the story records are
// parsed out of the file with a regex instead of importing it as a module.
const source = fs.readFileSync(path.join(PROJECT_ROOT, "src", "data", "mock-news-stories.ts"), "utf8");
const stories = [];
const storyBlocks = source.split(/^\s{2}\{/m).slice(1);
for (const block of storyBlocks) {
  const headline = /headline: "([^"]*)"/.exec(block)?.[1];
  const sourceName = /sourceName: "([^"]*)"/.exec(block)?.[1];
  const sourceUrl = /sourceUrl: "([^"]*)"/.exec(block)?.[1];
  const publicationDate = /publicationDate: "([^"]*)"/.exec(block)?.[1];
  if (headline && sourceUrl) stories.push({ headline, sourceName, sourceUrl, publicationDate });
}

function extractMeta(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "i"),
    new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${name}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = re.exec(html);
    if (m) return m[1];
  }
  return null;
}

function extractByline(html) {
  const jsonLdAuthor = /"author"\s*:\s*(\{[^}]*"name"\s*:\s*"([^"]+)"[^}]*\}|\[\{[^}]*"name"\s*:\s*"([^"]+)"[^}]*\}\])/i.exec(html);
  if (jsonLdAuthor) return jsonLdAuthor[2] || jsonLdAuthor[3];
  const byline = /(?:By|by)\s+([A-Z][a-zA-Z.\s]{2,40}(?:Press|AP|Associated Press|Reuters))/.exec(html);
  if (byline) return byline[1].trim();
  return null;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
      },
      redirect: "follow",
    });
    const finalUrl = res.url;
    const html = await res.text();
    const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim();
    const description = extractMeta(html, "description") || extractMeta(html, "og:description");
    const publishedTime = extractMeta(html, "article:published_time") || extractMeta(html, "og:updated_time");
    const byline = extractByline(html);
    return { ok: res.ok, status: res.status, finalUrl, title, description, publishedTime, byline };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function main() {
  for (const s of stories) {
    console.log(`\n=== ${s.headline} ===`);
    console.log(`  Stored source: ${s.sourceName} | date: ${s.publicationDate}`);
    console.log(`  URL: ${s.sourceUrl}`);
    const result = await checkUrl(s.sourceUrl);
    if (!result.ok && result.error) {
      console.log(`  FETCH FAILED: ${result.error}`);
      continue;
    }
    console.log(`  HTTP ${result.status}${result.finalUrl !== s.sourceUrl ? ` (redirected to ${result.finalUrl})` : ""}`);
    console.log(`  <title>: ${result.title}`);
    console.log(`  meta description: ${result.description}`);
    console.log(`  published_time meta: ${result.publishedTime}`);
    console.log(`  detected byline: ${result.byline ?? "(none found)"}`);
  }
}

main().catch((err) => {
  console.error("verify-sources failed:", err);
  process.exitCode = 1;
});
