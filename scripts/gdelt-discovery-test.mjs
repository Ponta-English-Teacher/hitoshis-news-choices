/**
 * Stage 1 proof-of-concept ONLY: query GDELT's free DOC 2.0 API, restricted
 * to an approved pool of English-language news source domains, for stories
 * from the last ~7 days — and print what it actually returns for inspection.
 *
 * No OpenAI scoring, no story selection, no homepage changes, no Cron.
 * Run manually:
 *   node scripts/gdelt-discovery-test.mjs
 *
 * Standalone Node script (no dependencies, no app code touched) so it is
 * trivial to delete once this experiment is done.
 */

// Note: https:// to this host times out in this dev environment's network;
// http:// works. This is a public, keyless, read-only metadata API, so
// plain HTTP is acceptable for this local proof-of-concept script.
const GDELT_ENDPOINT = "http://api.gdeltproject.org/api/v2/doc/doc";
const LOOKBACK_DAYS = 7;
const MAX_RECORDS_PER_SOURCE = 50;
const DELAY_BETWEEN_REQUESTS_MS = 5500; // GDELT asks for no more than 1 request per 5 seconds

// Approved source pool (per editorial decision) mapped to the domain GDELT
// is expected to index them under. Some of these are guesses about GDELT's
// actual domain field for that publisher — that's exactly what this PoC is
// meant to check, not assume.
const APPROVED_SOURCES = [
  { name: "Reuters", domain: "reuters.com" },
  { name: "Associated Press", domain: "apnews.com" },
  { name: "BBC", domain: "bbc.com" },
  { name: "CNN", domain: "cnn.com" },
  { name: "The Guardian", domain: "theguardian.com" },
  { name: "The New York Times", domain: "nytimes.com" },
  { name: "The Washington Post", domain: "washingtonpost.com" },
  { name: "Financial Times", domain: "ft.com" },
  { name: "Bloomberg", domain: "bloomberg.com" },
  { name: "CNBC", domain: "cnbc.com" },
  { name: "NBC News", domain: "nbcnews.com" },
  { name: "ABC News", domain: "abcnews.go.com" },
  { name: "CBS News", domain: "cbsnews.com" },
  { name: "NPR", domain: "npr.org" },
  { name: "Al Jazeera English", domain: "aljazeera.com" },
  { name: "DW", domain: "dw.com" },
  { name: "France 24 English", domain: "france24.com" },
  { name: "The Economist", domain: "economist.com" },
  { name: "Politico", domain: "politico.com" },
  { name: "Axios", domain: "axios.com" },
  { name: "Nikkei Asia", domain: "asia.nikkei.com" },
  { name: "South China Morning Post", domain: "scmp.com" },
  { name: "The Japan Times", domain: "japantimes.co.jp" },
  { name: "Channel News Asia", domain: "channelnewsasia.com" },
  { name: "The Straits Times", domain: "straitstimes.com" },
  { name: "The Korea Herald", domain: "koreaherald.com" },
];

function toGdeltDateTime(date) {
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeTitle(title) {
  return (title || "")
    .toLowerCase()
    .replace(/['’"“”]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function fetchSource(source, startdatetime, enddatetime) {
  const params = new URLSearchParams({
    // domainis: (exact match) rather than domain: (substring match) — domain:
    // was found to false-positive-match unrelated domains that merely
    // contain the target as a substring (e.g. domain:apnews.com matched
    // "kelownacapnews.com").
    query: `domainis:${source.domain} sourcelang:english`,
    mode: "artlist",
    format: "json",
    maxrecords: String(MAX_RECORDS_PER_SOURCE),
    sort: "DateDesc",
    startdatetime,
    enddatetime,
  });

  const url = `${GDELT_ENDPOINT}?${params.toString()}`;
  const res = await fetch(url);
  const bodyText = await res.text();

  if (!res.ok) {
    return { source: source.name, domain: source.domain, error: `HTTP ${res.status}`, snippet: bodyText.slice(0, 200), articles: [] };
  }

  try {
    const data = JSON.parse(bodyText);
    return { source: source.name, domain: source.domain, articles: data.articles ?? [] };
  } catch {
    return { source: source.name, domain: source.domain, error: "Non-JSON response", snippet: bodyText.slice(0, 200), articles: [] };
  }
}

async function main() {
  const now = new Date();
  const start = new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  const startdatetime = toGdeltDateTime(start);
  const enddatetime = toGdeltDateTime(now);

  console.log(`GDELT Stage 1 discovery test — approved source pool`);
  console.log(`Window: ${startdatetime} - ${enddatetime} (UTC, last ${LOOKBACK_DAYS} days)\n`);

  const perSource = [];
  for (const source of APPROVED_SOURCES) {
    const result = await fetchSource(source, startdatetime, enddatetime);
    perSource.push(result);
    if (result.error) {
      console.log(`  ${result.articles.length.toString().padStart(3)}  ${source.name.padEnd(28)} (${source.domain})  ERROR: ${result.error} — ${result.snippet}`);
    } else {
      console.log(`  ${result.articles.length.toString().padStart(3)}  ${source.name.padEnd(28)} (${source.domain})`);
    }
    await sleep(DELAY_BETWEEN_REQUESTS_MS);
  }

  // Dedup by URL (a source can occasionally return the same article twice).
  const byUrl = new Map();
  for (const { source, articles } of perSource) {
    for (const a of articles) {
      const key = (a.url || "").split("?")[0].toLowerCase();
      if (!key) continue;
      if (!byUrl.has(key)) {
        byUrl.set(key, {
          title: a.title,
          url: a.url,
          domain: a.domain,
          seendate: a.seendate,
          language: a.language,
          sourcecountry: a.sourcecountry,
          source,
        });
      }
    }
  }
  const unique = [...byUrl.values()];
  const totalRaw = perSource.reduce((sum, r) => sum + r.articles.length, 0);

  console.log(`\nTotal raw records: ${totalRaw}`);
  console.log(`Unique articles after URL dedup: ${unique.length}`);

  // Obvious duplicate/syndicated coverage: same normalized title appearing
  // under more than one approved source.
  const byNormalizedTitle = new Map();
  for (const a of unique) {
    const key = normalizeTitle(a.title);
    if (!key) continue;
    if (!byNormalizedTitle.has(key)) byNormalizedTitle.set(key, []);
    byNormalizedTitle.get(key).push(a);
  }
  const duplicateClusters = [...byNormalizedTitle.values()].filter(
    (group) => new Set(group.map((a) => a.source)).size > 1
  );

  console.log(`\nLikely duplicate/syndicated coverage clusters (same title, multiple approved sources): ${duplicateClusters.length}`);
  for (const cluster of duplicateClusters.slice(0, 15)) {
    console.log(`  • "${cluster[0].title}"`);
    for (const a of cluster) {
      console.log(`      ${a.source} — ${a.url}`);
    }
  }

  console.log(`\nSample per source (up to 5 each):\n`);
  for (const source of APPROVED_SOURCES) {
    const sample = unique.filter((a) => a.source === source.name).slice(0, 5);
    console.log(`--- ${source.name} (${source.domain}) ---`);
    for (const a of sample) {
      console.log(`  • ${a.title}`);
      console.log(`    ${a.domain} | ${a.seendate} | ${a.sourcecountry} | ${a.language}`);
      console.log(`    ${a.url}`);
    }
    if (sample.length === 0) console.log("  (none)");
    console.log("");
  }
}

main().catch((err) => {
  console.error("GDELT discovery test failed:", err);
  process.exitCode = 1;
});
