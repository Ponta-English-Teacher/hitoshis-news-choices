/**
 * Wikimedia Commons API wrapper + deterministic license classifier, shared
 * by scripts/source-images.mjs. Metadata-only (Commons' `action=query` API,
 * never HTML scraping). No API key — Commons' read API is public/keyless.
 *
 * The license classifier is exported standalone (`classifyLicense`) so it
 * can be unit-tested with synthetic extmetadata fixtures without any
 * network call — this is the one piece of the pipeline that must be
 * airtight, since it's the sole gate between "safe to reuse" and "reject".
 */

export const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

/**
 * Wikimedia's API etiquette policy expects a descriptive User-Agent
 * identifying the application (https://meta.wikimedia.org/wiki/User-Agent_policy).
 * Confirmed empirically during testing: requests without one are
 * intermittently and silently throttled/blocked once a script makes more
 * than a handful of rapid requests (exactly the pattern an automated,
 * multi-story sourcing run produces) — this header is required for
 * reliable operation, not just politeness.
 */
export const COMMONS_REQUEST_HEADERS = {
  "User-Agent": "HitoshisNewsChoices/1.0 (https://hitoshis-news-choices.vercel.app/; automated educational-news-app image sourcing)",
};

/** Normal photographic/raster formats suitable for the site; SVG diagrams,
 * audio/video, and document formats are rejected even if their license is
 * otherwise fine — they aren't usable as a story photo. */
export const ACCEPTED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function isAcceptableMimeType(mime) {
  return ACCEPTED_MIME_TYPES.has((mime || "").toLowerCase());
}

/**
 * Deterministic allow-list check against Commons' `extmetadata`. Runs
 * BEFORE any AI relevance judgment — a candidate that fails this check is
 * never shown to a model at all.
 *
 * Accepts: Public Domain, CC0, CC BY *, CC BY-SA *, Free Art License (FAL).
 * Rejects: NC (non-commercial), ND (no-derivatives), unknown/missing
 * license, and anything with a non-empty `Restrictions` field (e.g.
 * "insignia", "trademarked") — those carry legal complications beyond a
 * normal free license and are rejected conservatively.
 */
export function classifyLicense(extmetadata) {
  const slugRaw = extmetadata?.License?.value || "";
  const shortNameRaw = extmetadata?.LicenseShortName?.value || "";
  const restrictions = (extmetadata?.Restrictions?.value || "").trim();
  const slug = slugRaw.toLowerCase().trim();
  const shortName = shortNameRaw.toLowerCase().trim();

  if (restrictions) {
    return { allowed: false, reason: `Restrictions present on file: "${restrictions}"`, slug, shortName };
  }

  // Tokenize the slug on separators so "nc"/"nd" are matched as whole
  // license-family tokens (e.g. "cc-by-nc-sa" -> ["cc","by","nc","sa"]),
  // not as a substring that could false-positive on something else.
  const slugTokens = slug.split(/[-_.\s]+/).filter(Boolean);
  const shortNameTokens = shortName.split(/[\s,/-]+/).filter(Boolean);

  if (slugTokens.includes("nc") || shortNameTokens.includes("nc")) {
    return { allowed: false, reason: `Non-commercial (NC) license, not reusable: "${shortNameRaw || slugRaw}"`, slug, shortName };
  }
  if (slugTokens.includes("nd") || shortNameTokens.includes("nd")) {
    return { allowed: false, reason: `No-derivatives (ND) license, not reusable: "${shortNameRaw || slugRaw}"`, slug, shortName };
  }

  const isPublicDomain = slug === "pd" || slug === "cc0" || /^cc0/.test(slug) || /public domain/.test(shortName);
  const isCcBy = /^cc-by-\d/.test(slug);
  const isCcBySa = /^cc-by-sa-\d/.test(slug);
  const isFal = slug === "fal" || /free art license/.test(shortName);
  // Fallback for files whose machine-readable License slug is missing but
  // whose human-readable LicenseShortName is unambiguous.
  const shortNameLooksFree =
    !slug && (/^cc by-sa/.test(shortName) || /^cc by /.test(shortName) || /^cc by$/.test(shortName));

  if (isPublicDomain || isCcBy || isCcBySa || isFal || shortNameLooksFree) {
    return { allowed: true, reason: null, slug, shortName };
  }

  return {
    allowed: false,
    reason: `Unrecognized or non-free license: "${shortNameRaw || slugRaw || "(none provided)"}"`,
    slug,
    shortName,
  };
}

export async function searchCommons(query, { limit = 10 } = {}) {
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srnamespace: "6",
    srlimit: String(limit),
    format: "json",
  });
  try {
    const res = await fetch(`${COMMONS_API}?${params.toString()}`, { headers: COMMONS_REQUEST_HEADERS });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.query?.search || []).map((s) => ({ title: s.title, pageid: s.pageid }));
  } catch {
    return [];
  }
}

/**
 * Fetches full imageinfo/extmetadata for one file, including the exact
 * thumbnail dimensions Commons computes for the requested width
 * (`iiurlwidth`) — this is how downloaded-image dimensions are obtained
 * without any OS-specific tool (works identically on macOS and a Linux CI
 * runner), replacing a `sips`/ImageMagick-style post-download probe.
 */
export async function fetchImageInfo(title, { thumbWidth = 1200 } = {}) {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: String(thumbWidth),
    format: "json",
  });
  try {
    const res = await fetch(`${COMMONS_API}?${params.toString()}`, { headers: COMMONS_REQUEST_HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const page = Object.values(pages)[0];
    const info = page?.imageinfo?.[0];
    if (!info || !page || page.missing !== undefined) return null;

    const extmetadata = info.extmetadata || {};
    return {
      title: page.title,
      descriptionUrl: info.descriptionurl,
      fullUrl: info.url,
      // Falls back to the full-size URL if Commons couldn't render a
      // thumbnail at the requested width (e.g. some SVGs/huge TIFFs).
      downloadUrl: info.thumburl || info.url,
      downloadWidth: info.thumbwidth || info.width,
      downloadHeight: info.thumbheight || info.height,
      originalWidth: info.width,
      originalHeight: info.height,
      mime: info.mime,
      extmetadata,
      artist: stripHtml(extmetadata?.Artist?.value),
      creditText: stripHtml(extmetadata?.Credit?.value),
      description: stripHtml(extmetadata?.ImageDescription?.value),
      objectName: extmetadata?.ObjectName?.value,
    };
  } catch {
    return null;
  }
}

function stripHtml(value) {
  if (!value) return undefined;
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
