export type CEFRLevel = "A1" | "A2" | "B1" | "B1+" | "B2" | "B2+" | "C1" | "C2";

export type NewsCategory =
  | "World"
  | "Politics"
  | "Business"
  | "Technology"
  | "Science"
  | "Health"
  | "Environment"
  | "Society";

/** 1-5, matching the blueprint's indicator scale (e.g. Trending 🔥 4/5). */
export type EditorialScore = 1 | 2 | 3 | 4 | 5;

export type ReadingMode = "authentic" | "interactive";

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
  /** Development placeholder only; will be replaced by a rights-cleared publisher image. */
  imageUrl: string;
  imageAlt: string;
  whyWeChoseThis: string;
  keyVocabulary: string[];
  readingMode: ReadingMode;
  rightsStatus: RightsStatus;
  readingSupport?: ReadingSupport;
}
