/**
 * Orchestrates automatic image sourcing for one edition's six stories:
 * Wikimedia Commons first (scripts/source-images.mjs), AI-generated
 * illustration fallback (scripts/generate-ai-image.mjs) for any story
 * Commons can't confidently supply. Used by scripts/generate-real-edition.mjs.
 *
 * Transaction safety: every image is downloaded/generated into a private
 * temporary staging directory first. Final filenames are chosen (a
 * read-only check against the real/target image directory and prior
 * editions) and staged files are copied into `imageOutputDir` ONLY after
 * every one of the six stories has succeeded. If anything throws partway
 * through (a Commons+AI double failure, a download error, etc.), the
 * staging directory is removed in a `finally` block and — critically —
 * nothing has been copied into `imageOutputDir` yet, so a failed run
 * leaves zero trace there. The caller (generate-real-edition.mjs) is
 * expected to write the edition file / registry / IMAGE_CREDITS.md only
 * after this function returns successfully, so a failure here also means
 * no edition file, no registry update, and no credits changes.
 *
 * `sourceImagesFn`/`generateAiImageFn` are injectable (default to the real
 * implementations) specifically so this can be unit-tested — including
 * the AI-fallback branch and the failure/cleanup path — without spending
 * any real OpenAI API calls. See scripts/test-edition-image-pipeline.mjs.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { sourceImagesForStories } from "../source-images.mjs";
import { generateAiImage } from "../generate-ai-image.mjs";
import {
  loadUsedCommonsFiles,
  loadUsedLocalImageFilenames,
  chooseSafeLocalFilename,
  formatLicensedCreditEntry,
  formatAiGeneratedCreditEntry,
  slugify,
} from "./image-credits.mjs";

/**
 * `storiesForImageSourcing`: array of { id, headline, category,
 *   whyWeChoseThis, sourceName }, same order the caller wants results in.
 * Returns: array of finalized entries (same order), each
 *   { kind: "commons" | "ai", story, commons?, ai?, filename, finalPath }.
 * Throws if any story ends up with neither a Commons image nor a
 * successful AI-generated fallback — never returns a placeholder result.
 */
export async function sourceImagesForEdition({
  storiesForImageSourcing,
  editionDate,
  editionsDir,
  imageOutputDir,
  imageCreditsPath,
  sourceImagesFn = sourceImagesForStories,
  generateAiImageFn = generateAiImage,
  log = console.log,
}) {
  const stagingRoot = fs.mkdtempSync(path.join(os.tmpdir(), "edition-image-staging-"));
  const stagingImagesDir = path.join(stagingRoot, "images");

  try {
    const usedCommonsFiles = loadUsedCommonsFiles(imageCreditsPath);
    const usedLocalFilenames = loadUsedLocalImageFilenames(editionsDir);

    const commonsResults = await sourceImagesFn(storiesForImageSourcing, {
      downloadDir: stagingImagesDir,
      excludeCommonsFiles: usedCommonsFiles,
      excludeLocalFilenames: usedLocalFilenames,
      log,
    });

    const rawResults = [];
    for (let i = 0; i < storiesForImageSourcing.length; i++) {
      const story = storiesForImageSourcing[i];
      const commons = commonsResults[i];

      if (commons.found && commons.selected) {
        rawResults.push({ kind: "commons", story, commons: commons.selected });
        continue;
      }

      log(`  No suitable Commons image for "${story.headline}" (${commons.reason}) — generating AI illustration fallback...`);
      const ai = await generateAiImageFn(story, { outputDir: stagingImagesDir, log });
      rawResults.push({ kind: "ai", story, ai });
    }

    // Deterministic, collision-safe final filenames — read-only checks
    // against imageOutputDir and prior editions; no writes yet.
    const usedThisRun = new Set();
    const finalized = rawResults.map((entry) => {
      const baseSlug = slugify(entry.story.id || entry.story.headline).split("-").slice(0, 6).join("-");
      const stagedPath = entry.kind === "commons" ? entry.commons.localPath : entry.ai.imagePath;
      const ext = (path.extname(stagedPath).replace(".", "") || "jpg").toLowerCase();
      const filename = chooseSafeLocalFilename({
        baseSlug,
        extension: ext,
        editionDate,
        usedFilenames: new Set([...usedLocalFilenames, ...usedThisRun]),
        imagesDir: imageOutputDir,
      });
      usedThisRun.add(filename);
      return { ...entry, filename, stagedPath };
    });

    // Commit: copy staged files into their final destination only now that
    // every story has succeeded.
    fs.mkdirSync(imageOutputDir, { recursive: true });
    for (const entry of finalized) {
      fs.copyFileSync(entry.stagedPath, path.join(imageOutputDir, entry.filename));
    }

    return finalized.map((entry) => ({ ...entry, finalPath: path.join(imageOutputDir, entry.filename) }));
  } finally {
    fs.rmSync(stagingRoot, { recursive: true, force: true });
  }
}

function commonsSubject(commons) {
  return (
    commons.objectName ||
    commons.description ||
    commons.commonsTitle.replace(/^File:/i, "").replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ")
  );
}

/** Builds the NewsStory image fields (imageUrl/imageAlt/imageWidth/imageHeight/imageSourceType) for one finalized entry. */
export function buildImageStoryFields(entry) {
  const imageUrl = `/images/stories/${entry.filename}`;

  if (entry.kind === "commons") {
    const c = entry.commons;
    const contextualNote = c.classification === "licensed-contextual" ? " (contextual photo, not a photo of the actual event)" : "";
    return {
      imageUrl,
      imageAlt: `${commonsSubject(c)}${contextualNote}`,
      imageWidth: c.downloadWidth,
      imageHeight: c.downloadHeight,
      imageSourceType: c.classification,
    };
  }

  const a = entry.ai;
  return {
    imageUrl,
    imageAlt: a.altText,
    imageWidth: a.imageWidth,
    imageHeight: a.imageHeight,
    imageSourceType: "ai-generated",
  };
}

/** Builds one IMAGE_CREDITS.md entry (Markdown text) for one finalized entry, in the format matching its source type. */
export function buildImageCreditEntry(entry, storyLabel, number) {
  if (entry.kind === "commons") {
    const c = entry.commons;
    return formatLicensedCreditEntry({
      number,
      storyLabel,
      localFilename: entry.filename,
      subject: commonsSubject(c),
      creator: c.creator,
      sourcePageUrl: c.descriptionUrl,
      licenseDisplayName: c.licenseDisplayName,
      attributionRequired: c.attributionRequired,
      attributionText: c.attributionText,
    });
  }

  const a = entry.ai;
  return formatAiGeneratedCreditEntry({
    number,
    storyLabel,
    localFilename: entry.filename,
    generationDate: a.generationDate,
    generationModel: a.generationModel,
    purpose: a.purpose,
    altText: a.altText,
  });
}
