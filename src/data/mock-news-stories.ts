import type { NewsStory } from "@/types/news-story";

/**
 * Placeholder stories for interface development only.
 * Headlines, sources, and "why we chose this" text are invented, not
 * scraped or reproduced from any real publisher.
 */
export const mockNewsStories: NewsStory[] = [
  {
    id: "story-2026-08-25-trade-framework",
    headline:
      "Negotiators Reach Framework Deal to Ease Regional Trade Tensions",
    sourceName: "Harbor News Wire",
    sourceUrl: "https://example.com/news/trade-framework-deal",
    category: "Politics",
    publicationDate: "2026-08-25",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 6,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 3,
    whyWeChoseThis:
      "Sustained coverage across several independent outlets this week, and the outcome could reshape trade rules that affect prices learners already notice.",
    keyVocabulary: ["framework deal", "negotiations", "raise concerns", "authorities"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
  },
  {
    id: "story-2026-08-26-low-power-chip",
    headline:
      "Researchers Unveil Low-Power Chip Design Aimed at Cutting AI Energy Use",
    sourceName: "Meridian Tech Report",
    sourceUrl: "https://example.com/news/low-power-ai-chip",
    category: "Technology",
    publicationDate: "2026-08-26",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 5,
    whyWeChoseThis:
      "A lightly reported but genuinely consequential story about the environmental cost of AI, with strong background-knowledge value for learners.",
    keyVocabulary: ["energy efficiency", "prototype", "scale up", "carbon footprint"],
    readingMode: "authentic",
    rightsStatus: "unclear-rights",
  },
  {
    id: "story-2026-08-27-coral-recovery",
    headline:
      "Ocean Survey Finds Coral Reefs Recovering Faster Than Expected in Protected Zones",
    sourceName: "Clearline Science Journal",
    sourceUrl: "https://example.com/news/coral-reef-recovery-survey",
    category: "Science",
    publicationDate: "2026-08-27",
    estimatedLevel: "B1",
    estimatedReadingMinutes: 4,
    trendingScore: 2,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 5,
    whyWeChoseThis:
      "A hopeful, evidence-based science story that is easy to underestimate next to louder headlines, but offers strong knowledge value.",
    keyVocabulary: ["marine ecosystem", "conservation", "resilience", "survey"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
  },
  {
    id: "story-2026-08-27-sleep-memory-study",
    headline:
      "New Study Links Sleep Patterns to Long-Term Memory Performance in Teens",
    sourceName: "Northgate Health Journal",
    sourceUrl: "https://example.com/news/sleep-teen-memory-study",
    category: "Health",
    publicationDate: "2026-08-27",
    estimatedLevel: "B1",
    estimatedReadingMinutes: 5,
    trendingScore: 3,
    significanceScore: 3,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    whyWeChoseThis:
      "Directly relevant to learners' own lives, and the publisher has granted reuse rights, so we can offer full interactive reading tools.",
    keyVocabulary: ["long-term memory", "sleep cycle", "cognitive function", "correlation"],
    readingMode: "interactive",
    rightsStatus: "reuse-permitted",
  },
  {
    id: "story-2026-08-28-central-bank-rates",
    headline: "Central Bank Signals Gradual Rate Cuts as Inflation Cools",
    sourceName: "Fenwick Business Daily",
    sourceUrl: "https://example.com/news/central-bank-rate-signal",
    category: "Business",
    publicationDate: "2026-08-28",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 6,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 4,
    whyWeChoseThis:
      "Heavily reported across financial and general press this week, and it introduces economic vocabulary learners will keep encountering.",
    keyVocabulary: ["inflation", "interest rate", "gradual", "monetary policy"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
  },
  {
    id: "story-2026-08-29-car-free-weekends",
    headline: "City Pilots Car-Free Weekends to Test Effect on Air Quality",
    sourceName: "Cascade Public Journal",
    sourceUrl: "https://example.com/news/car-free-weekend-pilot",
    category: "Environment",
    publicationDate: "2026-08-29",
    estimatedLevel: "A2",
    estimatedReadingMinutes: 4,
    trendingScore: 2,
    significanceScore: 3,
    discussionValueScore: 5,
    knowledgeValueScore: 3,
    whyWeChoseThis:
      "A concrete local policy experiment that invites strong discussion and connects easily to learners' own cities.",
    keyVocabulary: ["pilot program", "air quality", "emissions", "public transport"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
  },
];
