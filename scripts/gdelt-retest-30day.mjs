/**
 * Follow-up Stage 1 check ONLY: retest the sources that were weak/absent or
 * inconclusive at a 7-day lookback, now at ~30 days, with domainis: exact
 * matching and retry/backoff on GDELT's 429 rate-limit response.
 *
 * No app changes, no OpenAI scoring, no new provider. Run manually:
 *   node scripts/gdelt-retest-30day.mjs
 *
 * Standalone, isolated, safe to delete once this check is done.
 */

// Same http:// note as gdelt-discovery-test.mjs: https:// to this host
// times out in this dev environment's network; http:// works, and this is
// a public, keyless, read-only metadata API.
const GDELT_ENDPOINT = "http://api.gdeltproject.org/api/v2/doc/doc";
const LOOKBACK_DAYS = 30;
const MAX_RECORDS = 250; // GDELT's per-request cap — used to detect "hit the limit"
const DELAY_BETWEEN_REQUESTS_MS = 6000;
const MAX_RETRIES = 3;
const RETRY_BACKOFF_MS = 9000;

const SOURCES = [
  { name: "ABC News", domain: "abcnews.go.com" },
  { name: "France 24 English", domain: "france24.com" },
  { name: "Politico", domain: "politico.com" },
  { name: "Axios", domain: "axios.com" },
  { name: "The Japan Times", domain: "japantimes.co.jp" },
  { name: "The Economist", domain: "economist.com" },
  { name: "Reuters", domain: "reuters.com" },
  { name: "Associated Press", domain: "apnews.com" },
  { name: "The Washington Post", domain: "washingtonpost.com" },
  { name: "Financial Times", domain: "ft.com" },
  { name: "Bloomberg", domain: "bloomberg.com" },
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

async function fetchSourceWithRetry(source, startdatetime, enddatetime) {
  const params = new URLSearchParams({
    query: `domainis:${source.domain} sourcelang:english`,
    mode: "artlist",
    format: "json",
    maxrecords: String(MAX_RECORDS),
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
        console.log(`  [${source.name}] 429, retrying in ${RETRY_BACKOFF_MS}ms (attempt ${attempt}/${MAX_RETRIES})`);
        await sleep(RETRY_BACKOFF_MS);
        continue;
      }
      return { source: source.name, domain: source.domain, error: "429 after retries", articles: [] };
    }

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

  return { source: source.name, domain: source.domain, error: "unreachable", articles: [] };
}

async function main() {
  const now = new Date();
  const start = new Date(now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  const startdatetime = toGdeltDateTime(start);
  const enddatetime = toGdeltDateTime(now);

  console.log(`GDELT 30-day retest — unconfirmed/weak + known-gap sources`);
  console.log(`Window: ${startdatetime} - ${enddatetime} (UTC, last ${LOOKBACK_DAYS} days)\n`);

  for (const source of SOURCES) {
    const result = await fetchSourceWithRetry(source, startdatetime, enddatetime);

    if (result.error) {
      console.log(`=== ${source.name} (${source.domain}) ===`);
      console.log(`  ERROR: ${result.error}${result.snippet ? " — " + result.snippet : ""}\n`);
    } else {
      const count = result.articles.length;
      const hitLimit = count >= MAX_RECORDS;
      console.log(`=== ${source.name} (${source.domain}) ===`);
      console.log(`  ${count} articles returned${hitLimit ? "  (HIT QUERY LIMIT — true volume is higher)" : ""}`);
      for (const a of result.articles.slice(0, 5)) {
        console.log(`  • ${a.seendate} | ${a.domain} | ${a.title}`);
        console.log(`    ${a.url}`);
      }
      if (count === 0) console.log("  (no articles)");
      console.log("");
    }

    await sleep(DELAY_BETWEEN_REQUESTS_MS);
  }
}

main().catch((err) => {
  console.error("GDELT 30-day retest failed:", err);
  process.exitCode = 1;
});
