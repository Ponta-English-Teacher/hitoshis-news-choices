/**
 * Pure retention-planning logic for the ~8-week edition archive window.
 * No filesystem writes happen anywhere in this module — every exported
 * function either computes a value or reads existing files to build an
 * in-memory plan. scripts/retain-editions.mjs is the only thing that ever
 * turns a plan into real deletes/writes, and only after the plan itself
 * has been fully validated.
 *
 * Boundary rule (documented precisely per product requirement "older than
 * 56 days is removed"): an edition is RETAINED when
 *   editionDate >= referenceDate - windowDays (days)
 * i.e. age (in whole days) <= windowDays is retained; age > windowDays is
 * removed. An edition exactly `windowDays` days old is retained (age == 56
 * -> kept); one day older (age == 57) is removed. `referenceDate` is
 * always the EDITION_DATE of the edition just published — never the
 * machine's wall-clock date — so retention is a deterministic function of
 * what's being published, not of when/where the job happens to run.
 *
 * All date arithmetic uses UTC-midnight epoch millis so calendar-field
 * edge cases (month length, leap years, year rollover) reduce to plain
 * integer subtraction rather than field-by-field logic.
 */

import fs from "node:fs";
import path from "node:path";
import { parseExistingEntries } from "./editions-index.mjs";

export const DEFAULT_RETENTION_WINDOW_DAYS = 56;

const EDITION_FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})\.ts$/;
const IMAGE_URL_PATTERN = /imageUrl: "\/images\/stories\/([^"]+)"/g;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export class RetentionPlanError extends Error {}

/** YYYY-MM-DD strings sort correctly with a plain string comparison. */
function byDateDescending(a, b) {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

function toUtcMillis(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUtcMillis(millis) {
  return new Date(millis).toISOString().slice(0, 10);
}

/** True iff `dateStr` is exactly YYYY-MM-DD AND names a real calendar date. */
export function isValidCalendarDateString(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  return fromUtcMillis(toUtcMillis(dateStr)) === dateStr;
}

export function computeCutoffDate(referenceDate, windowDays = DEFAULT_RETENTION_WINDOW_DAYS) {
  return fromUtcMillis(toUtcMillis(referenceDate) - windowDays * MS_PER_DAY);
}

/** age (in whole days) <= windowDays is retained; > windowDays is removed. */
export function isEditionRetained(editionDate, referenceDate, windowDays = DEFAULT_RETENTION_WINDOW_DAYS) {
  return editionDate >= computeCutoffDate(referenceDate, windowDays);
}

/**
 * Removes the numbered `### N. \`filename\`` credit-entry blocks (through
 * to, but not including, the next entry heading, section heading, or a
 * bare `---` divider line) for every filename in `filenamesToRemove`.
 * Every other entry, heading, and divider is left byte-for-byte
 * untouched — this never performs a general orphan sweep, only removes
 * entries whose filename was explicitly asked for.
 */
export function removeCreditEntriesForFilenames(creditsText, filenamesToRemove) {
  if (!filenamesToRemove || filenamesToRemove.size === 0) {
    return { text: creditsText, removedFilenames: [] };
  }

  const removedFilenames = [];
  const blockPattern = /^### (\d+)\. `([^`]+)`\n(?:(?!^#|^---[ \t]*$).*\n?)*/gm;
  const newText = creditsText.replace(blockPattern, (whole, _number, filename) => {
    if (filenamesToRemove.has(filename)) {
      removedFilenames.push(filename);
      return "";
    }
    return whole;
  });

  return { text: newText, removedFilenames };
}

/**
 * Lists every dated edition file in `editionsDir` (excluding index.ts),
 * validating each filename strictly. Throws RetentionPlanError on the
 * first problem found — malformed input must abort planning entirely
 * rather than silently skip the bad file, since a plan built on top of
 * an unexplained gap is not one we can trust.
 */
function listEditionFiles(editionsDir) {
  const entries = fs.readdirSync(editionsDir).filter((f) => f.endsWith(".ts") && f !== "index.ts");

  return entries.map((filename) => {
    const match = EDITION_FILENAME_PATTERN.exec(filename);
    if (!match) {
      throw new RetentionPlanError(`Malformed edition filename (expected YYYY-MM-DD.ts): "${filename}"`);
    }
    const date = match[1];
    if (!isValidCalendarDateString(date)) {
      throw new RetentionPlanError(`Edition filename does not name a real calendar date: "${filename}"`);
    }

    const filePath = path.join(editionsDir, filename);
    let text;
    try {
      text = fs.readFileSync(filePath, "utf8");
    } catch (err) {
      throw new RetentionPlanError(`Could not read edition file "${filename}": ${err.message}`);
    }

    const images = [...text.matchAll(IMAGE_URL_PATTERN)].map((m) => m[1]);
    return { date, filename, filePath, images };
  });
}

/**
 * Computes the complete retention plan in memory: which editions are
 * kept/removed, which images are safe to delete (referenced ONLY by
 * removed editions — never one still used by a retained edition), and
 * cross-checks the on-disk file set against index.ts's own entries so an
 * already-inconsistent registry is caught here rather than acted on
 * blindly. Never writes anything. Throws RetentionPlanError (with the
 * filesystem left completely untouched) whenever the plan cannot be
 * trusted — including the "would remove every edition" case.
 */
export function computeRetentionPlan({ editionsDir, editionsIndexPath, referenceDate, windowDays = DEFAULT_RETENTION_WINDOW_DAYS }) {
  if (!isValidCalendarDateString(referenceDate)) {
    throw new RetentionPlanError(`referenceDate is not a valid YYYY-MM-DD calendar date: "${referenceDate}"`);
  }

  const files = listEditionFiles(editionsDir);

  const indexText = fs.readFileSync(editionsIndexPath, "utf8");
  const indexEntries = parseExistingEntries(indexText);
  const indexDates = new Set(indexEntries.map((e) => e.date));
  const fileDates = new Set(files.map((f) => f.date));

  for (const date of fileDates) {
    if (!indexDates.has(date)) {
      throw new RetentionPlanError(`Edition file "${date}.ts" exists on disk but has no entry in index.ts — refusing to plan against an inconsistent registry.`);
    }
  }
  for (const date of indexDates) {
    if (!fileDates.has(date)) {
      throw new RetentionPlanError(`index.ts has an entry for "${date}" with no corresponding edition file on disk — refusing to plan against an inconsistent registry.`);
    }
  }

  const cutoffDate = computeCutoffDate(referenceDate, windowDays);
  const kept = [];
  const removed = [];
  for (const f of files) {
    (isEditionRetained(f.date, referenceDate, windowDays) ? kept : removed).push(f);
  }

  if (kept.length === 0) {
    throw new RetentionPlanError("Retention plan would remove every edition in the archive — refusing.");
  }

  const retainedImages = new Set(kept.flatMap((f) => f.images));
  const removedImageCandidates = new Set(removed.flatMap((f) => f.images));
  const imagesToDelete = [...removedImageCandidates].filter((img) => !retainedImages.has(img)).sort();

  return {
    referenceDate,
    windowDays,
    cutoffDate,
    keptDates: kept.map((f) => f.date).sort(byDateDescending),
    removedDates: removed.map((f) => f.date).sort(byDateDescending),
    removedEditionFiles: removed.map((f) => f.filename).sort(byDateDescending),
    imagesToDelete,
  };
}
