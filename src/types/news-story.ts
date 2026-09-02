export type CEFRLevel = "A1" | "A2" | "B1" | "B1+" | "B2" | "B2+" | "C1" | "C2";

/** The six stable categories from EDITORIAL_POLICY.md — labels assigned after selection, not required slots. */
export type NewsCategory =
  | "U.S. & Politics"
  | "World & Conflict"
  | "Business & Economy"
  | "Technology & AI"
  | "Asia Pickup"
  | "World Pickup";

/** 1-5, matching the blueprint's indicator scale (e.g. Trending 🔥 4/5). */
export type EditorialScore = 1 | 2 | 3 | 4 | 5;

export type ReadingMode = "authentic" | "interactive";

/**
 * Image-selection priority tier, per IMAGE_POLICY.md:
 * - "licensed-real": a real, legally reusable photograph of the actual event.
 * - "licensed-contextual": a real, legally reusable photograph that is
 *   relevant context (place/institution/company/person/file photo) but does
 *   not depict the specific event itself.
 * - "ai-generated": an AI-generated illustration, used only when no
 *   suitable real image (real or contextual) could be found. Must be
 *   labelled as such in the UI.
 * - "placeholder": the temporary neutral placeholder — a technical
 *   fallback during generation, not meant to remain in a published edition.
 */
export type ImageSourceType =
  | "licensed-real"
  | "licensed-contextual"
  | "ai-generated"
  | "placeholder";

/**
 * Mirrors the blueprint's three source-rights tiers (Section 4), which
 * determine both default behavior and which ReadingMode is allowed.
 */
export type RightsStatus =
  | "reuse-permitted"
  | "copyrighted"
  | "unclear-rights";

export interface ReadingSupportVocabularyItem {
  term: string;
  meaning: string;
}

/**
 * In-app "prepare before you read" content for an Authentic Reading story.
 * Optional: only stories with a built support page carry this; others keep
 * the direct-to-publisher card behavior.
 */
export interface ReadingSupport {
  background: string;
  vocabulary: ReadingSupportVocabularyItem[];
  readingPrompts: string[];
}

export interface NewsStory {
  id: string;
  headline: string;
  sourceName: string;
  sourceUrl: string;
  category: NewsCategory;
  publicationDate: string;
  estimatedLevel: CEFRLevel;
  estimatedReadingMinutes: number;
  trendingScore: EditorialScore;
  significanceScore: EditorialScore;
  discussionValueScore: EditorialScore;
  knowledgeValueScore: EditorialScore;
  imageUrl: string;
  imageAlt: string;
  /** The image file's actual pixel dimensions, so Reading Support can render it at its true aspect ratio without cropping/distortion. */
  imageWidth: number;
  imageHeight: number;
  imageSourceType: ImageSourceType;
  whyWeChoseThis: string;
  keyVocabulary: string[];
  readingMode: ReadingMode;
  rightsStatus: RightsStatus;
  readingSupport?: ReadingSupport;
}
