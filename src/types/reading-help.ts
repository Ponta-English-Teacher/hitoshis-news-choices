export type ReadingHelpAction =
  | "translate"
  | "explain"
  | "news-english"
  | "how-to-read";

/**
 * Our own story metadata sent to the model as context. Never includes
 * publisher (Reuters) article text, which the app does not possess.
 */
export interface ReadingHelpStoryContext {
  headline: string;
  sourceName: string;
  category: string;
  estimatedLevel: string;
  background: string;
  vocabulary: { term: string; meaning: string }[];
}

export type ReadingHelpRequest =
  | {
      mode: "selection";
      action: ReadingHelpAction;
      selectedText: string;
      storyContext: ReadingHelpStoryContext;
    }
  | {
      mode: "ask";
      question: string;
      storyContext: ReadingHelpStoryContext;
    };

export interface ReadingHelpResponse {
  response?: string;
  error?: string;
}
