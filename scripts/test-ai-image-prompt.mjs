/**
 * Zero-cost regression check for generate-ai-image.mjs's metadata/prompt
 * logic (isSensitiveStory, buildImagePrompt) — no OpenAI calls, no network.
 * Run before spending any real image-generation credits.
 *
 * Run: node scripts/test-ai-image-prompt.mjs
 */

import { isSensitiveStory, buildImagePrompt } from "./generate-ai-image.mjs";

let failures = 0;
let total = 0;
function report(label, pass, detail) {
  total++;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

const stories = {
  iran: {
    id: "story-2026-09-01-us-launches-strikes-on-iran-following",
    headline: "US launches strikes on Iran following attempted attacks in Strait",
    category: "World & Conflict",
    whyWeChoseThis:
      "A new round of U.S. strikes on Iran is a major escalation in one of the world's most sensitive shipping and security zones.",
  },
  // Real story context, verbatim from src/data/editions/2026-09-04.ts —
  // this is the exact text that previously false-triggered ("military",
  // "institutional conflict").
  driscoll: {
    id: "story-2026-09-01-dan-driscoll-us-army-secretary-resigns",
    headline: "Dan Driscoll: US Army secretary resigns after months of tension",
    category: "U.S. & Politics",
    whyWeChoseThis:
      "This story gives readers a clear look at how leadership tensions inside the U.S. defense establishment can become national political news. It is useful for understanding government roles, military administration, and the language of resignations and institutional conflict.",
  },
  anthropic: {
    id: "story-2026-09-01-anthropic-signs-us-35-billion-cloud",
    headline: "Anthropic signs US$35 billion cloud deal with Nvidia-backed Lambda, source says",
    category: "Technology & AI",
    whyWeChoseThis: "The huge cloud deal shows how fast AI companies are spending on computing power.",
  },
  // Real story context, verbatim from src/data/editions/2026-08-31.ts.
  nepalTibet: {
    id: "story-2026-09-01-nepal-tibet-toll-tops-1-000",
    headline: "Nepal-Tibet toll tops 1,000 as tunnel rescue offers last hope",
    category: "World & Conflict",
    whyWeChoseThis:
      "The Nepal-Tibet floods are one of the week's deadliest disasters, with rescue efforts still unfolding. The story also helps readers connect extreme weather, mountain geography, and disaster response.",
  },
  // Synthetic: a disaster story in a category OTHER than "World & Conflict",
  // to prove keyword-based detection works independent of the category
  // default (Nepal-Tibet above is also "World & Conflict", which would
  // pass via the category shortcut regardless of keywords).
  disasterOtherCategory: {
    id: "story-test-wildfire",
    headline: "Wildfire forces thousands to evacuate as flooding follows record heat",
    category: "World Pickup",
    whyWeChoseThis: "A destructive wildfire and flash flooding highlight worsening extreme-weather disasters.",
  },
  // Synthetic: ordinary institutional/policy language using exactly the
  // words the classifier must NOT treat as sufficient on their own.
  defensePolicyNonViolent: {
    id: "story-test-defense-budget",
    headline: "Government unveils new defense budget amid military modernization push",
    category: "U.S. & Politics",
    whyWeChoseThis:
      "This story explains how the military administration plans to modernize the armed forces and covers ongoing institutional conflict between agencies over the defense budget and army procurement policy.",
  },
};

// --- A. Iran/Strait -> sensitive = true (category default) ---
report("A. Iran story classified as sensitive", isSensitiveStory(stories.iran) === true);

// --- B. Dan Driscoll, REAL whyWeChoseThis text -> sensitive = false ---
report(
  "B. Driscoll story (real context, contains 'military'/'institutional conflict') classified as NOT sensitive",
  isSensitiveStory(stories.driscoll) === false
);

// --- C. Anthropic/Lambda -> sensitive = false ---
report("C. Anthropic story classified as NOT sensitive", isSensitiveStory(stories.anthropic) === false);

// --- D. Disaster story -> sensitive = true ---
report("D1. Nepal-Tibet disaster story classified as sensitive", isSensitiveStory(stories.nepalTibet) === true);
report(
  "D2. Disaster story in a non-'World & Conflict' category still classified as sensitive (keyword path)",
  isSensitiveStory(stories.disasterOtherCategory) === true
);

// --- E. Ordinary institutional/policy language must NOT over-trigger ---
report(
  "E. Non-violent defense-policy language ('military', 'army', 'conflict', 'government', 'defense') does NOT trigger sensitivity",
  isSensitiveStory(stories.defensePolicyNonViolent) === false
);

// --- Prompt content checks: new explicit prohibitions ---
const iranPrompt = buildImagePrompt(stories.iran);
report(
  "Iran prompt includes exact required sentence about not reconstructing the event",
  /Do not depict or reconstruct the reported attack, strike, battle, or violent event\./.test(iranPrompt)
);
const requiredForbiddenTerms = [
  "weapons",
  "missiles",
  "rockets",
  "bombs",
  "firearms",
  "military aircraft",
  "fighter jets",
  "attack helicopters",
  "projectiles",
  "explosions",
  "combat scenes",
  "targeting imagery",
];
for (const term of requiredForbiddenTerms) {
  report(`Iran prompt explicitly forbids "${term}"`, iranPrompt.toLowerCase().includes(term.toLowerCase()));
}
report(
  "Iran prompt forbids weapons/projectiles aimed at countries/maps/people",
  /aimed at a country, map, building, or person/i.test(iranPrompt)
);
report(
  "Iran prompt forbids destruction presented as the reported event",
  /destruction or violence must never be presented as the reported event/i.test(iranPrompt)
);
report(
  "Iran prompt redirects toward non-documentary contextual imagery (maps/sea lanes/diplomatic/flags/skylines)",
  /geography or maps/i.test(iranPrompt) &&
    /calm sea lanes/i.test(iranPrompt) &&
    /diplomatic setting/i.test(iranPrompt) &&
    /symbolic flags/i.test(iranPrompt) &&
    /regional skyline/i.test(iranPrompt)
);
report("Iran prompt includes universal no-text rule", /No text, letters, numbers/i.test(iranPrompt));
report("Iran prompt includes 'not a documentary photograph' framing", /NOT a documentary photograph/i.test(iranPrompt));

const driscollPrompt = buildImagePrompt(stories.driscoll);
report("Driscoll prompt uses institutional/political guidance (not the sensitive template)", /government or institutional architecture/i.test(driscollPrompt));
report("Driscoll prompt does NOT contain the sensitive-only forbidden-weapons list", !/fighter jets/i.test(driscollPrompt));

const anthropicPrompt = buildImagePrompt(stories.anthropic);
report("Anthropic prompt uses tech/business contextual guidance", /server\/data-center infrastructure/i.test(anthropicPrompt));
report("Anthropic prompt avoids real logos/trademarks", /no real company logos/i.test(anthropicPrompt));

if (failures > 0) process.exitCode = 1;
console.log(`\n${total - failures}/${total} checks passed.`);
