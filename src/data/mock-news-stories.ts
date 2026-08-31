import type { NewsStory } from "@/types/news-story";

/**
 * Placeholder stories for interface development.
 * Most headlines, sources, and "why we chose this" text are invented, not
 * scraped or reproduced from any real publisher. One entry (Technology,
 * Reuters) is a real current story: only its headline, source, URL, and
 * publication date are real; "why we chose this" and Key English are
 * original commentary, not copied from the article.
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
    imageUrl: "/images/stories/cargo-port.jpg",
    imageAlt:
      "The container ship COSCO Shipping Danube being loaded at the Port of Rotterdam",
    whyWeChoseThis:
      "Sustained coverage across several independent outlets this week, and the outcome could reshape trade rules that affect prices learners already notice.",
    keyVocabulary: ["framework deal", "negotiations", "raise concerns", "authorities"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
  },
  {
    id: "story-2026-08-27-kioxia-sandisk-investment",
    headline: "Kioxia, Sandisk to invest over $31 billion in Japan amid AI boom",
    sourceName: "Reuters",
    sourceUrl:
      "https://www.reuters.com/world/asia-pacific/kioxia-sandisk-invest-over-31-billion-japan-amid-ai-boom-2026-08-27/",
    category: "Technology",
    publicationDate: "2026-08-27",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/semiconductor-chip.jpg",
    imageAlt: "Bottom view of an Intel Pentium III computer chip showing its pins",
    whyWeChoseThis:
      "Japan and the United States are making a major long-term investment in advanced memory-chip production as demand from AI continues to grow. The story connects AI development with manufacturing, government policy, and the global semiconductor industry.",
    keyVocabulary: ["invest", "semiconductor", "memory chip", "government support", "surging demand"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background:
        "AI systems need enormous amounts of data processing and memory. As demand for AI grows, companies are investing heavily in semiconductor factories and advanced memory chips. Kioxia is a major Japanese memory-chip maker, while Sandisk is an American data-storage company. The investment in this story shows how AI development is affecting manufacturing, government policy, and the global technology industry.",
      vocabulary: [
        {
          term: "invest",
          meaning:
            "to put money into a business or project in order to help it grow",
        },
        {
          term: "semiconductor",
          meaning:
            "a material or electronic component used to control electrical signals; semiconductors are essential in computer chips",
        },
        {
          term: "memory chip",
          meaning: "an electronic component that stores digital information",
        },
        {
          term: "government support",
          meaning: "financial or policy assistance provided by a government",
        },
        {
          term: "surging demand",
          meaning: "demand that is increasing very quickly",
        },
      ],
      readingPrompts: [
        "Why are Kioxia and Sandisk making such a large investment now?",
        "What role is the Japanese government playing?",
        "How is the growth of AI affecting the semiconductor industry?",
      ],
    },
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
    imageUrl: "/images/stories/coral-reef-underwater.jpg",
    imageAlt: "A colorful coral outcrop on Flynn Reef, part of the Great Barrier Reef",
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
    imageUrl: "/images/stories/student-sleeping.jpg",
    imageAlt: "A student asleep at a classroom desk while studying",
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
    imageUrl: "/images/stories/financial-district.jpg",
    imageAlt: "View of the Manhattan Financial District skyline",
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
    imageUrl: "/images/stories/urban-bike-street.jpg",
    imageAlt: "Pedestrians and cyclists filling a tree-lined city street on a car-free day",
    whyWeChoseThis:
      "A concrete local policy experiment that invites strong discussion and connects easily to learners' own cities.",
    keyVocabulary: ["pilot program", "air quality", "emissions", "public transport"],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
  },
];
