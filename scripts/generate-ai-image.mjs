/**
 * AI-generated illustration fallback: when the automatic Wikimedia Commons
 * sourcing system (scripts/source-images.mjs) cannot find a suitable,
 * safely-licensed image for a story, this module generates a conservative
 * editorial illustration instead. This is a NORMAL fallback path, not an
 * error condition — see IMAGE_POLICY.md.
 *
 * Uses the current OpenAI Images API (client.images.generate) with a GPT
 * image model — the installed SDK (openai@6.49.0) was inspected first
 * (node_modules/openai/resources/images.d.ts) rather than assuming an
 * older DALL-E-era signature. GPT image models always return base64 image
 * data (no `url` field), and support the exact landscape sizes this app's
 * cards use (1536x1024, close to the ~3:2 aspect ratio already used
 * throughout public/images/stories/) — so the generated image is used at
 * its native requested size with no cropping.
 *
 * Dimensions are read back from the actual decoded image bytes via
 * scripts/lib/image-dimensions.mjs (no OS-specific tool), so this works
 * identically on GitHub Actions' Linux runners.
 *
 * Failure behavior: this function throws on any failure (missing API key,
 * API error, no image data returned, write failure). It never fabricates
 * metadata and never silently substitutes a placeholder — the caller is
 * expected to treat a thrown error as a hard failure.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { getImageDimensions } from "./lib/image-dimensions.mjs";
import { slugify } from "./lib/image-credits.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const DEFAULT_MODEL = "gpt-image-1";
const DEFAULT_SIZE = "1536x1024"; // landscape, close to the ~3:2 ratio already used by every story image
const DEFAULT_QUALITY = "low"; // "safe + relevant + usable", not fine art direction — keeps cost modest
const OUTPUT_FORMAT = "jpeg"; // matches every existing story image's file type

/**
 * Story categories/topics involving conflict, disaster, crime, or
 * political violence get the most conservative prompt treatment,
 * regardless of the exact category label, since a story can be sensitive
 * without being labelled "World & Conflict" (e.g. a World Pickup disaster
 * story).
 *
 * Deliberately requires STRONG evidence of actual violence/disaster/crime
 * — words like "military", "army", "conflict", "defense", or "government"
 * are common in ordinary institutional/political language (e.g. "military
 * administration", "institutional conflict") and must NOT alone trigger
 * the sensitive-story template. Only words that are themselves fairly
 * unambiguous evidence of a violent or catastrophic event are included.
 */
const SENSITIVE_STRONG_EVIDENCE_PATTERN =
  /\b(attack(?:s|ed|ing)?|strikes?|airstrikes?|bombing|missiles?|shootings?|killed|deaths?|casualt(?:y|ies)|invasion|war|armed clash|explosions?|disasters?|earthquakes?|floods?|flooding|wildfires?|crash(?:es|ed)?|murder(?:s|ed)?|violent crime)\b/i;

export function isSensitiveStory(story) {
  if (story.category === "World & Conflict") return true;
  return SENSITIVE_STRONG_EVIDENCE_PATTERN.test(`${story.headline} ${story.whyWeChoseThis || ""}`);
}

function categoryGuidance(story, sensitive) {
  if (sensitive) {
    return `This story involves conflict, war, military escalation, disaster, crime, or political violence.

Do not depict or reconstruct the reported attack, strike, battle, or violent event.

Explicitly do NOT include any of the following, under any circumstances: weapons, missiles, rockets, bombs, firearms, military aircraft, fighter jets, attack helicopters, projectiles, explosions, combat scenes, targeting imagery (e.g. crosshairs or a weapon/projectile aimed at a country, map, building, or person), destruction, casualties, or any depiction of an attack in progress. Destruction or violence must never be presented as the reported event, even in a stylized or symbolic form.

Instead, prefer calm, non-documentary, symbolic or contextual illustration: geography or maps, calm sea lanes or coastlines, a diplomatic setting (a conference table, flags, a podium), government or institutional buildings, symbolic flags, a city or regional skyline, a generic non-combat ship or vessel shown peacefully, an abstract representation of geopolitical tension, or a neutral regional landscape. Always prefer symbolic/contextual illustration over any reconstruction of the actual event.`;
  }
  switch (story.category) {
    case "U.S. & Politics":
      return "Prefer government or institutional architecture, a generic podium/press-conference setting, flags, or other symbolic civic imagery. Do not attempt a photorealistic portrait of any specific named real person performing a specific documented action.";
    case "Business & Economy":
    case "Technology & AI":
      return "Contextual editorial imagery is appropriate: server/data-center infrastructure, computer hardware, an office or workplace setting, shipping/logistics, or abstract technology visuals. Keep it generic — no real company logos, products, or trademarks.";
    case "Asia Pickup":
    case "World Pickup":
    default:
      return "Use a calm, generic, symbolic contextual illustration relevant to the story's general subject (e.g. a landscape, a relevant everyday setting, or an abstract representation of the topic). Avoid depicting specific real named individuals performing specific documented actions.";
  }
}

export function buildImagePrompt(story) {
  const sensitive = isSensitiveStory(story);
  const guidance = categoryGuidance(story, sensitive);

  return `Create an editorial illustration for an English-learning news application. This image is an editorial illustration for an English-learning news application, NOT a documentary photograph of the actual event, and must not be composed or framed as though it were a real news photograph.

Story topic (context only — do not invent specific factual details beyond what is stated): "${story.headline}" (category: ${story.category}).

${guidance}

Universal rules, always apply:
- No text, letters, numbers, captions, headlines, logos, watermarks, or fake news-site/UI elements anywhere in the image.
- No graphic injury, gore, or sensational imagery.
- No photorealistic "documentary" or photojournalism-style framing (no simulated press-photo captions, borders, or camera-flash realism).
- Style: clean, calm, editorial illustration suitable for a general-audience educational news app — a flat, painterly, or vector-illustration style is preferable to hyper-realistic photography.`;
}

/**
 * Generates one AI illustration for a story and saves it to `outputDir`.
 * Throws on any failure — never returns fabricated metadata or a
 * placeholder substitute.
 *
 * `story`: { id, headline, category, whyWeChoseThis, sourceName }
 * `options.outputDir`: REQUIRED explicit destination (this module never
 *   assumes or defaults to the real public/images/stories/ directory).
 */
export async function generateAiImage(story, options) {
  const {
    outputDir,
    model = DEFAULT_MODEL,
    size = DEFAULT_SIZE,
    quality = DEFAULT_QUALITY,
    log = console.log,
  } = options || {};

  if (!outputDir) throw new Error("generateAiImage: options.outputDir is required.");
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set.");

  const sensitive = isSensitiveStory(story);
  const prompt = buildImagePrompt(story);

  log(`Generating AI illustration for "${story.headline}"`);
  log(`  model=${model} size=${size} quality=${quality} sensitiveStoryHandling=${sensitive}`);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.images.generate({
    model,
    prompt,
    size,
    quality,
    output_format: OUTPUT_FORMAT,
    moderation: "auto",
    n: 1,
  });

  const imageBase64 = response.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("OpenAI image generation returned no image data (no b64_json in response).");
  }

  const buffer = Buffer.from(imageBase64, "base64");
  const { width, height } = getImageDimensions(buffer, OUTPUT_FORMAT);

  const baseSlug = slugify(story.id || story.headline).split("-").slice(0, 6).join("-");
  const filename = `${baseSlug}-ai.jpg`;
  const imagePath = path.join(outputDir, filename);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return {
    found: true,
    imageSourceType: "ai-generated",
    imagePath,
    imageWidth: width,
    imageHeight: height,
    altText: `AI-generated editorial illustration for this ${story.category} story — not a photograph of the actual event.`,
    generationDate: new Date().toISOString(),
    generationModel: model,
    purpose: `Generated because no suitable licensed real/contextual photograph was available for: "${story.headline}". ${
      sensitive
        ? "Sensitive-story safeguards applied: abstract/symbolic contextual imagery only, no depiction of violence, injury, or attack."
        : "Standard contextual editorial imagery guidance applied for this category."
    }`,
    prompt,
    sensitiveStoryHandling: sensitive,
  };
}

// --- CLI test harness: generates illustrations for specific stories from a
// real (already-published) edition, READ-ONLY input, writing only to a
// scratch directory. Never modifies the edition file, the registry, or
// IMAGE_CREDITS.md.
async function main() {
  const EDITION_DATE = process.env.EDITION_DATE || "2026-09-04";
  const STORY_MATCH = process.env.STORY_MATCH; // optional substring filter on headline
  const OUTPUT_DIR =
    process.env.OUTPUT_DIR || path.join(PROJECT_ROOT, "..", `ai-image-test-output-${Date.now()}`);

  const editionPath = path.join(PROJECT_ROOT, "src", "data", "editions", `${EDITION_DATE}.ts`);
  if (!fs.existsSync(editionPath)) {
    console.error(`No edition file at ${editionPath}`);
    process.exitCode = 1;
    return;
  }
  const text = fs.readFileSync(editionPath, "utf8");
  const blocks = text.split(/^\s{2}\{/m).slice(1);
  let stories = blocks.map((block) => {
    const str = (key) => new RegExp(`\\b${key}: "((?:[^"\\\\]|\\\\.)*)"`).exec(block)?.[1];
    return {
      id: str("id"),
      headline: str("headline"),
      category: str("category"),
      sourceName: str("sourceName"),
      whyWeChoseThis: str("whyWeChoseThis"),
    };
  });

  if (STORY_MATCH) {
    stories = stories.filter((s) => s.headline?.toLowerCase().includes(STORY_MATCH.toLowerCase()));
  }

  if (stories.length === 0) {
    console.error("No matching stories found.");
    process.exitCode = 1;
    return;
  }

  console.log(`Generating AI illustrations for ${stories.length} stor${stories.length === 1 ? "y" : "ies"} from ${EDITION_DATE} (READ-ONLY input; output goes to ${OUTPUT_DIR})\n`);

  for (const story of stories) {
    const result = await generateAiImage(story, { outputDir: OUTPUT_DIR });
    console.log(`\n=== ${story.headline} ===`);
    console.log(`Category: ${story.category}`);
    console.log(`Sensitive-story safeguards applied: ${result.sensitiveStoryHandling}`);
    console.log(`Model: ${result.generationModel}`);
    console.log(`Prompt:\n${result.prompt}\n`);
    console.log(`Alt text: ${result.altText}`);
    console.log(`Purpose: ${result.purpose}`);
    console.log(`Dimensions: ${result.imageWidth}x${result.imageHeight}`);
    console.log(`File: ${result.imagePath}`);
  }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((err) => {
    console.error("generate-ai-image failed:", err);
    process.exitCode = 1;
  });
}
