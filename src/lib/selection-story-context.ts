import type { NewsStory } from "@/types/news-story";

/**
 * Grounding context sent to the selection-based tools (Explain, via
 * /api/ai-help). Translate and Listen only need the selected text itself.
 */
export interface SelectionStoryContext {
  headline: string;
  sourceName: string;
  category: string;
  publicationDate: string;
  whyWeChoseThis: string;
  background: string;
  vocabulary: { term: string; meaning: string }[];
  readingPrompts: string[];
}

export function buildSelectionStoryContext(story: NewsStory): SelectionStoryContext {
  return {
    headline: story.headline,
    sourceName: story.sourceName,
    category: story.category,
    publicationDate: story.publicationDate,
    whyWeChoseThis: story.whyWeChoseThis,
    background: story.readingSupport?.background ?? "",
    vocabulary: story.readingSupport?.vocabulary ?? [],
    readingPrompts: story.readingSupport?.readingPrompts ?? [],
  };
}
