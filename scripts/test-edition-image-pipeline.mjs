/**
 * Zero-cost regression check for scripts/lib/edition-image-pipeline.mjs —
 * the orchestration layer that wires Wikimedia Commons sourcing + the
 * AI-generated fallback into the edition generator. No OpenAI calls, no
 * network calls: sourceImagesFn/generateAiImageFn are injected stubs, so
 * this proves the ORCHESTRATION logic (branching, filename collision
 * safety, staging → final copy, failure cleanup) without spending any
 * real image-generation or Commons-search credits.
 *
 * Run: node scripts/test-edition-image-pipeline.mjs
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sourceImagesForEdition } from "./lib/edition-image-pipeline.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

let failures = 0;
let total = 0;
function report(label, pass, detail) {
  total++;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${label}${detail ? " — " + detail : ""}`);
  if (!pass) failures++;
}

function makeStubImageFile(dir, name) {
  fs.mkdirSync(dir, { recursive: true });
  const src = path.join(PROJECT_ROOT, "public", "images", "stories", "placeholder.png");
  const dest = path.join(dir, name);
  fs.copyFileSync(src, dest);
  return dest;
}

async function testAiFallbackBranch() {
  console.log("\n=== Test A: AI-fallback branch triggers correctly (no real API calls) ===");
  const scratchRoot = fs.mkdtempSync(path.join(os.tmpdir(), "pipeline-test-fallback-"));
  const imageOutputDir = path.join(scratchRoot, "public-images");
  const editionsDir = path.join(scratchRoot, "editions");
  const creditsPath = path.join(scratchRoot, "IMAGE_CREDITS.md");
  fs.mkdirSync(editionsDir, { recursive: true });

  const stories = [
    { id: "story-test-commons", headline: "Commons story", category: "World Pickup", whyWeChoseThis: "x", sourceName: "Test" },
    { id: "story-test-ai", headline: "AI fallback story", category: "Technology & AI", whyWeChoseThis: "x", sourceName: "Test" },
  ];

  let generateAiImageCalls = 0;

  const stubSourceImagesFn = async (inputStories, opts) =>
    inputStories.map((s, i) => {
      if (i === 0) {
        const stagedPath = makeStubImageFile(opts.downloadDir, "commons-stub.jpg");
        return {
          found: true,
          selected: {
            commonsTitle: "File:Stub Commons Image.jpg",
            descriptionUrl: "https://commons.wikimedia.org/wiki/File:Stub_Commons_Image.jpg",
            objectName: "Stub Commons Image",
            description: "A stub image for testing.",
            creator: "Test Creator",
            licenseDisplayName: "CC BY 4.0",
            attributionRequired: true,
            attributionText: "Test Creator / Wikimedia Commons / CC BY 4.0",
            classification: "licensed-contextual",
            selectionReason: "test",
            originalWidth: 1600,
            originalHeight: 1200,
            downloadWidth: 1200,
            downloadHeight: 900,
            localFilename: "commons-stub.jpg",
            localPath: stagedPath,
            downloadedBytes: 123,
          },
        };
      }
      return { found: false, reason: "No suitable licensed Wikimedia Commons image found (stub, for testing)." };
    });

  const stubGenerateAiImageFn = async (_story, opts) => {
    generateAiImageCalls++;
    const stagedPath = makeStubImageFile(opts.outputDir, "ai-stub.jpg");
    return {
      found: true,
      imageSourceType: "ai-generated",
      imagePath: stagedPath,
      imageWidth: 1536,
      imageHeight: 1024,
      altText: "AI-generated editorial illustration for this Technology & AI story — not a photograph of the actual event.",
      generationDate: new Date().toISOString(),
      generationModel: "gpt-image-1",
      purpose: "Generated because no suitable licensed image was found (stub test).",
      prompt: "stub prompt",
      sensitiveStoryHandling: false,
    };
  };

  const results = await sourceImagesForEdition({
    storiesForImageSourcing: stories,
    editionDate: "2099-06-01",
    editionsDir,
    imageOutputDir,
    imageCreditsPath: creditsPath,
    sourceImagesFn: stubSourceImagesFn,
    generateAiImageFn: stubGenerateAiImageFn,
    log: () => {},
  });

  report("Story 0 (Commons available) took the 'commons' branch", results[0].kind === "commons");
  report("Story 1 (Commons found:false) took the 'ai' fallback branch", results[1].kind === "ai");
  report("generateAiImageFn was called exactly once (only for the fallback story)", generateAiImageCalls === 1);
  report(
    "Both images were copied into imageOutputDir",
    fs.existsSync(results[0].finalPath) && fs.existsSync(results[1].finalPath)
  );
  report("Filenames are distinct (no collision)", results[0].filename !== results[1].filename);

  fs.rmSync(scratchRoot, { recursive: true, force: true });
}

async function testFailureCleanup() {
  console.log("\n=== Test B: image-stage failure exits cleanly and leaves no trace ===");
  const scratchRoot = fs.mkdtempSync(path.join(os.tmpdir(), "pipeline-test-failure-"));
  const imageOutputDir = path.join(scratchRoot, "public-images");
  const editionsDir = path.join(scratchRoot, "editions");
  const creditsPath = path.join(scratchRoot, "IMAGE_CREDITS.md");
  fs.mkdirSync(editionsDir, { recursive: true });
  fs.mkdirSync(imageOutputDir, { recursive: true }); // pre-created but must stay empty

  const stories = [
    { id: "story-test-fails", headline: "This story fails both Commons and AI", category: "World & Conflict", whyWeChoseThis: "x", sourceName: "Test" },
  ];

  const stubSourceImagesFn = async (inputStories) =>
    inputStories.map(() => ({ found: false, reason: "stub: no Commons image (testing failure path)" }));
  const stubGenerateAiImageFn = async () => {
    throw new Error("stub: simulated AI image generation failure (testing failure path)");
  };

  const tmpBefore = new Set(fs.readdirSync(os.tmpdir()).filter((f) => f.startsWith("edition-image-staging-")));

  let threw = false;
  try {
    await sourceImagesForEdition({
      storiesForImageSourcing: stories,
      editionDate: "2099-06-02",
      editionsDir,
      imageOutputDir,
      imageCreditsPath: creditsPath,
      sourceImagesFn: stubSourceImagesFn,
      generateAiImageFn: stubGenerateAiImageFn,
      log: () => {},
    });
  } catch {
    threw = true;
  }

  const tmpAfter = fs.readdirSync(os.tmpdir()).filter((f) => f.startsWith("edition-image-staging-"));
  const leftoverStagingDirs = tmpAfter.filter((f) => !tmpBefore.has(f));

  report("sourceImagesForEdition throws when Commons AND AI both fail (this becomes a non-zero exit in the CLI)", threw);
  report("imageOutputDir remains empty — no partial image copy", fs.readdirSync(imageOutputDir).length === 0);
  report("No leftover staging directory in the OS temp dir (cleaned up in `finally`)", leftoverStagingDirs.length === 0);
  report("Scratch IMAGE_CREDITS.md was never created (nothing to append — failure happened before commit)", !fs.existsSync(creditsPath));

  fs.rmSync(scratchRoot, { recursive: true, force: true });
}

async function main() {
  await testAiFallbackBranch();
  await testFailureCleanup();
  if (failures > 0) process.exitCode = 1;
  console.log(`\n${total - failures}/${total} checks passed.`);
}

main().catch((err) => {
  console.error("test-edition-image-pipeline failed unexpectedly:", err);
  process.exitCode = 1;
});
