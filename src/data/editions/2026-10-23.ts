import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the October 21, 2026 – October 22, 2026 edition, selected
 * automatically by the GDELT + OpenAI pipeline
 * (scripts/generate-real-edition.mjs) following EDITORIAL_POLICY.md.
 * Headlines, sources, URLs, and publication dates are real; "why we chose
 * this," background, vocabulary, and reading prompts are original
 * commentary written for learners, never copied from the articles.
 *
 * Images were sourced automatically per IMAGE_POLICY.md: Wikimedia Commons
 * first (licensed-real or licensed-contextual), an AI-generated
 * illustration fallback where no suitable licensed image was found — see
 * IMAGE_CREDITS.md for the per-image record of every image below.
 * Generated: 2026-10-23T00:03:41.603Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-10-22-supreme-court-says-new-hampshire-student",
    headline: "Supreme Court says New Hampshire student IDs can't be used to vote in November",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/politics/supreme-court/new-hampshire-student-ids-cannot-used-vote-november-midterm-elections-rcna604570",
    category: "U.S. & Politics",
    publicationDate: "2026-10-22",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-22-supreme-court.jpg",
    imageAlt: "New Hampshire State House, Concord, NH (2004) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1707,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A Supreme Court decision about voter ID rules is a concrete, current development with direct importance for U.S. elections. It also gives learners useful language around voting rights, courts, and state election rules.",
    keyVocabulary: [
      "student ID",
      "voter registration",
      "Supreme Court",
      "election rules",
      "voter ID",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "In the United States, states set many of the practical rules for voting, such as registration steps and which forms of identification can be accepted. Courts can become involved when people disagree about whether those rules are fair or legal. This story focuses on a Supreme Court decision connected to New Hampshire and whether student IDs can be used for voting in November. For learners, it is useful because it shows how election rules can affect specific groups of voters, including students, and how legal decisions can matter during an election season.",
      vocabulary: [
        {
          term: "student ID",
          meaning: "An identification card that shows a person is a student at a school, college, or university.",
        },
        {
          term: "voter registration",
          meaning: "The process of officially signing up so that a person is allowed to vote in an election.",
        },
        {
          term: "Supreme Court",
          meaning: "The highest court in a legal system, which can make final decisions on important legal questions.",
        },
        {
          term: "election rules",
          meaning: "The official laws and procedures that explain how voting and elections must be carried out.",
        },
        {
          term: "voter ID",
          meaning: "A document used to prove a person's identity when they vote.",
        },
      ],
      readingPrompts: [
        "Who might be most affected by this rule about student IDs?",
        "How can court decisions change the way elections are run?",
        "What balance should states try to find between security and access to voting?",
      ],
    },
  },
  {
    id: "story-2026-10-22-iran-says-7-oil-tankers-attacked",
    headline: "Iran says 7 oil tankers attacked in the Strait of Hormuz as fears grow of a return to war",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/iran/iran-says-7-oil-tankers-attacked-strait-hormuz-fears-grow-return-war-rcna605108",
    category: "World & Conflict",
    publicationDate: "2026-10-22",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-22-iran-says.jpg",
    imageAlt: "STS004-37-716 - Strait of Hormuz (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1280,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Attacks on oil tankers in the Strait of Hormuz could affect both regional security and global energy markets. This is a significant follow-up in the wider Iran conflict because it describes a new and potentially escalatory development.",
    keyVocabulary: [
      "oil tanker",
      "Strait of Hormuz",
      "escalation",
      "maritime security",
      "regional security",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The Strait of Hormuz is an important waterway for oil transport, so security problems there can quickly become international concerns. Oil tankers are large ships that move fuel across oceans, and attacks on them can raise fears about energy supplies, shipping safety, and possible military conflict. This story says Iran reported attacks on seven oil tankers as concerns grow about a return to war. Readers should watch how the article connects local or regional violence with wider global effects, especially because maritime security and energy markets are closely linked.",
      vocabulary: [
        {
          term: "oil tanker",
          meaning: "A large ship designed to carry oil or fuel across the sea.",
        },
        {
          term: "Strait of Hormuz",
          meaning: "A narrow sea route that is important for the movement of oil and shipping.",
        },
        {
          term: "escalation",
          meaning: "A situation becoming more serious, dangerous, or intense.",
        },
        {
          term: "maritime security",
          meaning: "The protection of ships, ports, and sea routes from threats or attacks.",
        },
        {
          term: "regional security",
          meaning: "The safety and stability of a particular area of the world.",
        },
      ],
      readingPrompts: [
        "Why can attacks on ships affect countries far away from the area?",
        "What signs might show that a conflict is escalating?",
        "How does energy transport connect with international security?",
      ],
    },
  },
  {
    id: "story-2026-10-21-meta-ordered-to-pay-25-billion",
    headline: "Meta ordered to pay $25 billion to New Mexico after jury finds company misled consumers about data privacy",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/tech/tech-news/meta-ordered-pay-25-billion-new-mexico-consumers-data-privacy-rcna604864",
    category: "Technology & AI",
    publicationDate: "2026-10-21",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-21-meta-ordered.jpg",
    imageAlt: "Meta Platforms Headquarters Menlo Park California (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A $25 billion privacy verdict against Meta is a major technology accountability story. It is useful for understanding how data privacy, consumer protection, and large tech companies intersect.",
    keyVocabulary: [
      "data privacy",
      "jury",
      "misled consumers",
      "damages",
      "consumer protection",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Meta is one of the world’s largest technology companies, and its services involve large amounts of user information. Data privacy has become a major public issue because people want to know how companies collect, use, and protect personal data. This story concerns a jury decision in New Mexico that ordered Meta to pay $25 billion after finding that the company misled consumers about data privacy. The case is important for understanding how courts, consumer protection rules, and technology companies interact when the public believes a company has not been honest about personal information.",
      vocabulary: [
        {
          term: "data privacy",
          meaning: "The protection of personal information and control over how it is collected, shared, or used.",
        },
        {
          term: "jury",
          meaning: "A group of ordinary people chosen to listen to a court case and make a decision about the facts.",
        },
        {
          term: "misled consumers",
          meaning: "Gave customers information that made them believe something false or incomplete.",
        },
        {
          term: "damages",
          meaning: "Money that a court orders someone to pay for harm or loss.",
        },
        {
          term: "consumer protection",
          meaning: "Laws and actions meant to keep customers safe from unfair or dishonest business practices.",
        },
      ],
      readingPrompts: [
        "What responsibilities do technology companies have when handling user data?",
        "Why might a court case about privacy lead to a very large financial penalty?",
        "How can consumers know whether a company is being clear about data use?",
      ],
    },
  },
  {
    id: "story-2026-10-22-nasdaq-dives-more-than-750-points",
    headline: "Nasdaq dives more than 750 points as investors worry massive AI spending won't pay off",
    sourceName: "CBS News",
    sourceUrl: "https://www.cbsnews.com/news/nasdaq-ai-spending-debt-investors-concerns-stocks/",
    category: "Business & Economy",
    publicationDate: "2026-10-22",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-22-nasdaq-dives.jpg",
    imageAlt: "Facebook on Nasdaq (contextual photo, not a photo of the actual event)",
    imageWidth: 592,
    imageHeight: 473,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A sharp Nasdaq fall over doubts about AI spending captures an important question in markets: whether the AI investment boom can justify its cost. The story connects technology enthusiasm with real financial risk.",
    keyVocabulary: [
      "Nasdaq",
      "investors",
      "AI spending",
      "sell-off",
      "pay off",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The Nasdaq is a major stock market index that includes many technology companies, so it often reflects investor confidence in the tech sector. Recently, companies and markets have shown strong interest in artificial intelligence, but developing and expanding AI can require very large spending. This story focuses on a sharp Nasdaq drop as investors worry that major AI spending may not bring enough financial return. It is useful for learners because it connects technology excitement with market risk, showing that investors often react not only to current profits but also to expectations about the future.",
      vocabulary: [
        {
          term: "Nasdaq",
          meaning: "A major U.S. stock market index that includes many technology-related companies.",
        },
        {
          term: "investors",
          meaning: "People or organizations that put money into something in the hope of making a profit.",
        },
        {
          term: "AI spending",
          meaning: "Money used by companies to develop, buy, or expand artificial intelligence tools and systems.",
        },
        {
          term: "sell-off",
          meaning: "A period when many investors sell stocks or other assets, often causing prices to fall.",
        },
        {
          term: "pay off",
          meaning: "To produce a good result or enough benefit to justify the cost or effort.",
        },
      ],
      readingPrompts: [
        "Why might investors become nervous about heavy spending on AI?",
        "How can expectations about the future affect stock prices today?",
        "What is the difference between excitement about technology and confidence in profits?",
      ],
    },
  },
  {
    id: "story-2026-10-22-96-of-world-coral-reefs-face",
    headline: "96% of world coral reefs face critical risk of collapse",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/96-of-worlds-coral-reefs-face-critical-risk-of-collapse-iucn-warns/a-79736234",
    category: "World Pickup",
    publicationDate: "2026-10-22",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-22-96-of.jpg",
    imageAlt: "Bleached Staghorn Coral (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The warning that most coral reefs face critical risk of collapse is a serious global environmental story with long-term consequences for oceans, food systems, and coastal communities. It also offers strong vocabulary for climate and biodiversity topics.",
    keyVocabulary: [
      "coral reefs",
      "collapse",
      "ecosystem",
      "climate risk",
      "biodiversity",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Coral reefs are ocean ecosystems that support many forms of marine life and help protect coastal areas. They are also connected to food systems and local economies, especially in communities that depend on fishing or tourism. This story warns that 96% of the world’s coral reefs face a critical risk of collapse. That makes it a major environmental topic, not only because of biodiversity loss but also because reef damage can affect people who live near the sea. Learners should pay attention to how the article links climate risk, ecosystems, and long-term global consequences.",
      vocabulary: [
        {
          term: "coral reefs",
          meaning: "Underwater structures made by tiny sea animals that provide homes for many kinds of marine life.",
        },
        {
          term: "collapse",
          meaning: "A serious breakdown or failure of a system, structure, or ecosystem.",
        },
        {
          term: "ecosystem",
          meaning: "A community of living things and their environment working together as a system.",
        },
        {
          term: "climate risk",
          meaning: "The danger that climate change can cause harm to people, nature, or economies.",
        },
        {
          term: "biodiversity",
          meaning: "The variety of living things in a particular place or on Earth as a whole.",
        },
      ],
      readingPrompts: [
        "Why are coral reefs important beyond their beauty?",
        "How could reef collapse affect both nature and human communities?",
        "What language does the article use to show urgency or risk?",
      ],
    },
  },
  {
    id: "story-2026-10-21-small-base-long-shadow-chinas-new",
    headline: "Small base, long shadow: China's new military outpost in Laos",
    sourceName: "The Straits Times",
    sourceUrl: "https://www.straitstimes.com/opinion/small-base-long-shadow-chinas-new-military-outpost-in-laos",
    category: "Asia Pickup",
    publicationDate: "2026-10-21",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-21-small-base.jpg",
    imageAlt: "2021-12-03 China-Laos-Eisenbahn (contextual photo, not a photo of the actual event)",
    imageWidth: 1080,
    imageHeight: 810,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A new Chinese military outpost in Laos is a notable Asia security story that may otherwise be crowded out by U.S. and Middle East coverage. It helps readers understand how influence, infrastructure, and military presence shape regional politics.",
    keyVocabulary: [
      "military outpost",
      "regional influence",
      "foothold",
      "security ties",
      "strategic",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "A military outpost is usually a small base or position, but even a small site can have wider political meaning. This story looks at China’s new military outpost in Laos and suggests that its size may be less important than its strategic influence. In Asia, military presence, infrastructure, and security ties can shape relationships between countries and affect how power is balanced in a region. For learners, the headline is useful because it introduces language about regional influence and shows how geography and security partnerships can become important in international politics.",
      vocabulary: [
        {
          term: "military outpost",
          meaning: "A small military base or position, often located away from a country’s main centers of power.",
        },
        {
          term: "regional influence",
          meaning: "The ability of a country to affect decisions, relationships, or events in a nearby area.",
        },
        {
          term: "foothold",
          meaning: "A first position or base that helps someone gain more influence or control later.",
        },
        {
          term: "security ties",
          meaning: "Relationships between countries that involve defense, military cooperation, or safety issues.",
        },
        {
          term: "strategic",
          meaning: "Important for long-term planning, power, or advantage.",
        },
      ],
      readingPrompts: [
        "Why might a small military base have a large political impact?",
        "How can security ties change relationships between neighboring countries?",
        "What does the headline suggest about influence beyond physical size?",
      ],
    },
  },
];
