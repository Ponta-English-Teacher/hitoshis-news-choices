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
  whyWeChoseThis: string;
  keyVocabulary: string[];
  readingMode: ReadingMode;
  rightsStatus: RightsStatus;
}
