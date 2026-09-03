/**
 * Lightweight, zero-cost regression check for:
 * - classifyLicense() (scripts/lib/commons-search.mjs) — the deterministic
 *   allow-list gate that runs before any AI relevance judgment in
 *   scripts/source-images.mjs;
 * - normalizeCommonsTitle() (scripts/lib/image-credits.mjs) — guards
 *   against a real crash found during integration testing (a live Commons
 *   candidate title containing a literal "%", e.g. a bond/tariff chart
 *   image, is not URL-encoded and previously crashed decodeURIComponent).
 * Pure functions, synthetic fixtures, no network calls, no OpenAI calls.
 *
 * Run: node scripts/test-image-license.mjs
 */

import { classifyLicense } from "./lib/commons-search.mjs";
import { normalizeCommonsTitle } from "./lib/image-credits.mjs";

let failures = 0;
function report(label, pass, detail) {
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

function fixture({ license, licenseShortName, restrictions = "" }) {
  return {
    License: { value: license },
    LicenseShortName: { value: licenseShortName },
    Restrictions: { value: restrictions },
  };
}

const cases = [
  // --- Should ALLOW ---
  { label: "Public Domain", meta: fixture({ license: "pd", licenseShortName: "Public domain" }), expect: true },
  { label: "CC0", meta: fixture({ license: "cc0", licenseShortName: "CC0" }), expect: true },
  { label: "CC BY 2.0", meta: fixture({ license: "cc-by-2.0", licenseShortName: "CC BY 2.0" }), expect: true },
  { label: "CC BY-SA 4.0", meta: fixture({ license: "cc-by-sa-4.0", licenseShortName: "CC BY-SA 4.0" }), expect: true },
  { label: "Free Art License", meta: fixture({ license: "fal", licenseShortName: "Free Art License" }), expect: true },

  // --- Should REJECT ---
  { label: "Unknown/missing license", meta: fixture({ license: "", licenseShortName: "" }), expect: false },
  { label: "CC BY-NC 2.0 (non-commercial)", meta: fixture({ license: "cc-by-nc-2.0", licenseShortName: "CC BY-NC 2.0" }), expect: false },
  { label: "CC BY-ND 2.0 (no-derivatives)", meta: fixture({ license: "cc-by-nd-2.0", licenseShortName: "CC BY-ND 2.0" }), expect: false },
  { label: "CC BY-NC-ND 4.0 (both restrictions)", meta: fixture({ license: "cc-by-nc-nd-4.0", licenseShortName: "CC BY-NC-ND 4.0" }), expect: false },
  { label: "All-rights-reserved / copyrighted", meta: fixture({ license: "", licenseShortName: "All rights reserved" }), expect: false },
  {
    label: "Free license but Restrictions present (e.g. insignia)",
    meta: fixture({ license: "cc-by-sa-4.0", licenseShortName: "CC BY-SA 4.0", restrictions: "insignia" }),
    expect: false,
  },
];

for (const c of cases) {
  const result = classifyLicense(c.meta);
  report(c.label, result.allowed === c.expect, result.allowed ? "allowed" : `rejected — ${result.reason}`);
}

// --- normalizeCommonsTitle: must never throw, even on a literal "%" that
// isn't valid percent-encoding (the exact bug found during integration
// testing, which crashed the whole edition-generation pipeline).
const titleCases = [
  { label: "Title with a literal '%' (not valid percent-encoding)", input: "File:US 10% tariff chart 2026.jpg", expect: "us 10% tariff chart 2026.jpg" },
  { label: "Normal underscore-separated title", input: "File:Normal_Image_Name.jpg", expect: "normal image name.jpg" },
  { label: "Properly percent-encoded title (from a URL) still decodes", input: "File:Berlaymont%20building.jpg", expect: "berlaymont building.jpg" },
];
for (const c of titleCases) {
  let result, threw;
  try {
    result = normalizeCommonsTitle(c.input);
    threw = false;
  } catch {
    threw = true;
  }
  report(c.label, !threw && result === c.expect, threw ? "threw an error" : `got "${result}"`);
}

if (failures > 0) process.exitCode = 1;
console.log(`\n${cases.length + titleCases.length - failures}/${cases.length + titleCases.length} passed.`);
