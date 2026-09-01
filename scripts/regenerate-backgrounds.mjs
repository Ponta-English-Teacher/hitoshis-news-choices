/**
 * Quality-control correction ONLY: regenerate the "background" field for
 * each of the six already-selected stories in src/data/mock-news-stories.ts,
 * grounded in verified publicly-available metadata (headline + the page's
 * own meta/OG description) gathered by scripts/verify-sources.mjs — NOT
 * full article text. Also corrects the Congo Ebola story's displayed
 * source, since verification found its actual byline is The Associated
 * Press even though the URL is hosted on nbcnews.com.
 *
 * Does NOT touch headline, url, date, category, keyVocabulary, or
 * readingPrompts — only the background paragraph (and, for one story, the
 * displayed sourceName).
 *
 * Run manually: set -a && source .env.local && set +a && node scripts/regenerate-backgrounds.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(PROJECT_ROOT, "src", "data", "mock-news-stories.ts");
const MODEL = "gpt-5.5";

// Verified via scripts/verify-sources.mjs: publicly-provided meta/OG
// description for each story's actual URL, plus detected byline.
const VERIFIED = [
  {
    match: "I've never been to Afghanistan",
    verifiedSnippet:
      "As of August, the number forced to return this year from Pakistan and Iran had reached another million.",
    byline: "Lyse Doucet (BBC)",
  },
  {
    match: "Nepal-Tibet toll tops 1,000",
    verifiedSnippet: "Nearly 4,500 people are still missing - 3,916 in Nepal and 546 in China's Tibet.",
    byline: "CNA",
  },
  {
    match: "US and Iran exchange fire",
    verifiedSnippet:
      "The US and Iran have returned to firing on each other in the Middle East. Tehran targeted US military sites in the Gulf after Washington attacked rocket launchers on the Iranian island of Larak in the Strait of Hormuz. The US Central Command has rejected Tehran's accusation of an \"act of aggression\".",
    byline: "CNA",
  },
  {
    match: "US trade regulator and 22 states accuse Amazon",
    verifiedSnippet:
      "FTC alleges in lawsuit that online retailer 'secretly and systematically overcharged' advertisers for years.",
    byline: "The Guardian",
  },
  {
    match: "ChatGPT becomes first AI chatbot",
    verifiedSnippet:
      "BRUSSELS: ChatGPT will have to comply with tougher safety rules after the European Union added it on Monday (Aug 31) to a list of digital services subject to greater legal scrutiny, a first for an artificial intelligence chatbot. Brussels also designated Reddit and Roblox as \"very large\" online platforms.",
    byline: "CNA",
  },
  {
    match: "Congo authorities report more than 6,000",
    verifiedSnippet:
      "More than 1,360 people have recovered from the virus in what authorities said was an \"encouraging\" development.",
    byline: "The Associated Press",
    correctedSourceName: "The Associated Press (via NBC News)",
  },
];

function stripJsonFences(raw) {
  return raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
}

async function regenerateBackgrounds(entries) {
  const items = entries
    .map(
      (e, i) =>
        `H${i + 1}\nheadline: ${e.headline}\ncategory: ${e.category}\nwhyWeChoseThis: ${e.whyWeChoseThis}\nverifiedPublicSnippet: ${e.verifiedSnippet}\n`
    )
    .join("\n");

  const instructions = `You are correcting the "Background" preparation text for Hitoshi's News Choices, an English-learning news app. For each story you are given its headline, category, our own "why we chose this" text, and a short VERIFIED PUBLIC SNIPPET (the publisher's own meta/social-share description for that exact page).

Write a revised background paragraph (roughly 90-130 words) that:
- Is grounded in the verified snippet's actual facts — use its real, specific details (numbers, names, places, organizations named in it).
- Paraphrases in your own original words — do NOT copy the snippet's sentences verbatim or near-verbatim.
- Does NOT invent any additional specific facts, numbers, or details beyond what the headline and verified snippet state.
- Still reads as general orientation/context for an English learner, not a full article summary.

Reply with ONLY valid JSON (no markdown fences, no commentary):
{ "backgrounds": [ { "id": "H1", "background": "..." } ] }
One entry per input, same ids, same order.`;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({ model: MODEL, instructions, input: items });
  const parsed = JSON.parse(stripJsonFences(response.output_text));
  return { backgrounds: parsed.backgrounds, usage: response.usage };
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set. Load .env.local first.");
    process.exitCode = 1;
    return;
  }

  let source = fs.readFileSync(DATA_PATH, "utf8");

  const entries = VERIFIED.map((v) => {
    const headlineMatch = new RegExp(`headline: "([^"]*${v.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"]*)"`).exec(
      source
    );
    if (!headlineMatch) throw new Error(`Could not find story matching "${v.match}" in ${DATA_PATH}`);
    const headline = headlineMatch[1];
    const blockStart = source.indexOf(headlineMatch[0]);
    const blockEnd = source.indexOf("\n  },", blockStart);
    const block = source.slice(blockStart, blockEnd);
    const category = /category: "([^"]*)"/.exec(block)?.[1];
    const whyWeChoseThis = /whyWeChoseThis: "([^"]*)"/.exec(block)?.[1];
    return { ...v, headline, category, whyWeChoseThis };
  });

  console.log(`Regenerating backgrounds for ${entries.length} stories with verified public metadata...\n`);
  const { backgrounds, usage } = await regenerateBackgrounds(entries);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const newBackground = backgrounds.find((b) => b.id === `H${i + 1}`)?.background;
    if (!newBackground) throw new Error(`No regenerated background for ${entry.headline}`);

    const headlineIndex = source.indexOf(`headline: "${entry.headline}"`);
    const blockEnd = source.indexOf("\n  },", headlineIndex);
    let block = source.slice(headlineIndex, blockEnd);

    const oldBackgroundMatch = /background: "([^"]*)"/.exec(block);
    if (!oldBackgroundMatch) throw new Error(`No background field found for ${entry.headline}`);
    const escaped = newBackground.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const updatedBlock = block.replace(/background: "([^"]*)"/, `background: "${escaped}"`);

    if (entry.correctedSourceName) {
      const sourceNameEscaped = entry.correctedSourceName.replace(/"/g, '\\"');
      const withSourceFixed = updatedBlock.replace(/sourceName: "([^"]*)"/, `sourceName: "${sourceNameEscaped}"`);
      source = source.slice(0, headlineIndex) + withSourceFixed + source.slice(blockEnd);
      console.log(`[${entry.headline}]\n  sourceName corrected -> "${entry.correctedSourceName}"\n  background regenerated\n`);
    } else {
      source = source.slice(0, headlineIndex) + updatedBlock + source.slice(blockEnd);
      console.log(`[${entry.headline}]\n  background regenerated\n`);
    }
  }

  fs.writeFileSync(DATA_PATH, source);
  console.log(`Wrote corrections to ${path.relative(PROJECT_ROOT, DATA_PATH)}`);
  if (usage) console.log(`Token usage: ${JSON.stringify(usage)}`);
}

main().catch((err) => {
  console.error("regenerate-backgrounds failed:", err);
  process.exitCode = 1;
});
