import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the September 9, 2026 – September 10, 2026 edition, selected
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
 * Generated: 2026-09-10T23:06:40.913Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-09-10-yemen-houthis-seize-port-city-mocha",
    headline: "Yemen Houthis seize port city Mocha, closing in on control of Bab el-Mandeb Strait",
    sourceName: "South China Morning Post",
    sourceUrl: "https://www.scmp.com/news/world/middle-east/article/3367067/yemens-houthis-seize-port-city-mocha-closing-control-bab-el-mandeb-strait",
    category: "World & Conflict",
    publicationDate: "2026-09-10",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-10-yemen-houthis.jpg",
    imageAlt: "Bab-el-Mandeb Strait, Africa-Arabia (ASTER) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1493,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The reported Houthi advance toward control of a key Red Sea chokepoint could affect Yemen’s war, regional security, and global shipping. It is a concrete development with consequences beyond one battlefield.",
    keyVocabulary: [
      "Houthis",
      "port city",
      "strategic",
      "strait",
      "chokepoint",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Yemen’s war involves several armed and political groups, including the Houthis, who control parts of the country. A port city matters because it can be used for trade, military movement, and access to the sea. Mocha is being discussed in connection with the Bab el-Mandeb Strait, a narrow waterway linking the Red Sea with the Gulf of Aden. When a group moves closer to controlling a strait, the issue becomes bigger than one local battle. It can affect regional security and shipping routes that many countries and companies depend on.",
      vocabulary: [
        {
          term: "Houthis",
          meaning: "The Houthis are an armed political movement in Yemen involved in the country’s long conflict.",
        },
        {
          term: "port city",
          meaning: "A port city is a city by the sea where ships load and unload goods or people.",
        },
        {
          term: "strategic",
          meaning: "Strategic means important for achieving political, military, or economic goals.",
        },
        {
          term: "strait",
          meaning: "A strait is a narrow area of water that connects two larger bodies of water.",
        },
        {
          term: "chokepoint",
          meaning: "A chokepoint is a narrow route where movement can be easily slowed, blocked, or controlled.",
        },
      ],
      readingPrompts: [
        "Why would control of a port city matter in a conflict?",
        "How could a local battle affect international shipping?",
        "What language does the article use to show uncertainty or confirmation?",
      ],
    },
  },
  {
    id: "story-2026-09-10-supreme-court-blocks-missouri-attempt-to",
    headline: "Supreme Court blocks Missouri attempt to use newly drawn Republican congressional map",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/politics/supreme-court/supreme-court-blocks-missouris-attempt-use-newly-drawn-republican-cong-rcna596857",
    category: "U.S. & Politics",
    publicationDate: "2026-09-10",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-10-supreme-court.jpg",
    imageAlt: "US Supreme Court - corrected (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 901,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This Supreme Court action matters because congressional maps can shape election outcomes before voters even cast ballots. It is a useful story for understanding U.S. courts, elections, and redistricting.",
    keyVocabulary: [
      "Supreme Court",
      "congressional map",
      "redistricting",
      "midterm elections",
      "blocks",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "In the United States, voters choose members of Congress from geographic districts. The borders of these districts are shown on congressional maps. When maps are redrawn, the process is called redistricting, and it can strongly affect which party has a better chance of winning seats. Courts sometimes become involved when people argue that a map is unfair or unlawful. A Supreme Court decision about whether Missouri can use a newly drawn Republican map matters because elections can be shaped before voting begins. This story is useful for understanding the connection between law, maps, and political power.",
      vocabulary: [
        {
          term: "Supreme Court",
          meaning: "The Supreme Court is the highest court in the United States.",
        },
        {
          term: "congressional map",
          meaning: "A congressional map shows the district borders used to elect members of the U.S. House of Representatives.",
        },
        {
          term: "redistricting",
          meaning: "Redistricting is the process of redrawing election district boundaries.",
        },
        {
          term: "midterm elections",
          meaning: "Midterm elections are U.S. elections held between presidential elections.",
        },
        {
          term: "blocks",
          meaning: "In a legal context, blocks means stops something from happening or being used.",
        },
      ],
      readingPrompts: [
        "How can district boundaries influence election results?",
        "What role does the Supreme Court play in this political dispute?",
        "Does the article explain who benefits or loses from the map?",
      ],
    },
  },
  {
    id: "story-2026-09-10-anthropic-state-linked-scientists-from-banned",
    headline: "Anthropic: state-linked scientists from banned regions used Claude for virus research",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/tech/tech-news/anthropic-state-linked-scientists-banned-regions-used-claude-virus-res-rcna596859",
    category: "Technology & AI",
    publicationDate: "2026-09-10",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-10-anthropic-state.jpg",
    imageAlt: "V20230504LJ-0199-2 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This story connects AI safety to real-world biosecurity concerns, moving the debate beyond abstract fears. It also helps readers learn how governments and companies talk about controlled technology use.",
    keyVocabulary: [
      "state-linked",
      "banned regions",
      "virus research",
      "safeguards",
      "biosecurity",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Anthropic is the company behind Claude, an AI system that can answer questions and help with complex tasks. The headline says state-linked scientists from banned regions used Claude for virus research. This raises questions about how AI tools should be controlled when they may help with sensitive scientific topics. Virus research can be important for public health, but it can also create biosecurity concerns if knowledge is misused. Companies often create safeguards, rules, and access limits to reduce risk. This story connects AI policy with real-world security, not just general worries about future technology.",
      vocabulary: [
        {
          term: "state-linked",
          meaning: "State-linked means connected in some way to a government or government-backed organization.",
        },
        {
          term: "banned regions",
          meaning: "Banned regions are places where a company or government does not allow access to a service.",
        },
        {
          term: "virus research",
          meaning: "Virus research is scientific study of viruses, including how they spread or affect living things.",
        },
        {
          term: "safeguards",
          meaning: "Safeguards are rules or systems designed to prevent harm or misuse.",
        },
        {
          term: "biosecurity",
          meaning: "Biosecurity means protecting people and environments from dangerous biological materials or knowledge.",
        },
      ],
      readingPrompts: [
        "What risks and benefits of AI in science does the story suggest?",
        "How do companies describe limits on sensitive technology?",
        "What information would help you judge how serious the case is?",
      ],
    },
  },
  {
    id: "story-2026-09-10-suspected-measles-cases-kill-nearly-1",
    headline: "Suspected measles cases kill nearly 1,000 as Bangladesh struggles to contain outbreak",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/asia/bangladesh-measles-outbreak-kills-nearly-1000-rcna596960",
    category: "Asia Pickup",
    publicationDate: "2026-09-10",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-10-suspected-measles.jpg",
    imageAlt: "Infectious Diseases Hospital, Rajshahi 18 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 816,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A deadly measles outbreak in Bangladesh is an important public-health story that could easily be crowded out by U.S. and European politics. It gives readers useful language for disease, vaccination, and crisis response.",
    keyVocabulary: [
      "measles",
      "outbreak",
      "suspected cases",
      "contain",
      "vaccination",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Measles is a highly contagious disease that can spread quickly, especially where vaccination levels are low or health systems are under pressure. The headline reports suspected measles cases and says Bangladesh is struggling to contain an outbreak. In public health, suspected cases are people who may have the disease but may still need confirmation. To contain an outbreak means to slow or stop its spread through actions such as testing, treatment, vaccination campaigns, and public information. This kind of story matters because disease outbreaks can affect families, hospitals, schools, and trust in health services.",
      vocabulary: [
        {
          term: "measles",
          meaning: "Measles is a very contagious viral disease that can cause fever, rash, and serious complications.",
        },
        {
          term: "outbreak",
          meaning: "An outbreak is a sudden increase in cases of a disease in a place.",
        },
        {
          term: "suspected cases",
          meaning: "Suspected cases are people believed to possibly have a disease before it is fully confirmed.",
        },
        {
          term: "contain",
          meaning: "To contain a disease means to stop it from spreading further.",
        },
        {
          term: "vaccination",
          meaning: "Vaccination is the use of a vaccine to help protect people from a disease.",
        },
      ],
      readingPrompts: [
        "What challenges might make an outbreak hard to contain?",
        "How does the article distinguish suspected cases from confirmed information?",
        "What public-health actions are mentioned or implied?",
      ],
    },
  },
  {
    id: "story-2026-09-09-trump-hits-canada-with-import-bans",
    headline: "Trump hits Canada with import bans, 50% tariffs",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/trump-escalates-trade-war-with-canada-with-import-bans-50-tariffs/a-79195010",
    category: "Business & Economy",
    publicationDate: "2026-09-09",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-09-trump-hits.jpg",
    imageAlt: "Wild Horse Border Crossing (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A major escalation in U.S.-Canada trade restrictions would affect companies, prices, and diplomatic relations. The story is valuable for learning the language of tariffs and trade conflict.",
    keyVocabulary: [
      "import bans",
      "tariffs",
      "trade feud",
      "protectionism",
      "supply chains",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Trade between neighboring countries can involve many kinds of goods, companies, and workers. The headline says Trump has targeted Canada with import bans and 50% tariffs, which would represent a strong trade restriction. An import ban stops certain foreign goods from entering a country, while a tariff is a tax added to imported products. These measures can be used to protect domestic industries or pressure another government, but they can also raise prices and create tension. A U.S.-Canada trade dispute matters because both economies are closely connected through supply chains, business investment, and diplomacy.",
      vocabulary: [
        {
          term: "import bans",
          meaning: "Import bans are rules that stop certain goods from being brought into a country.",
        },
        {
          term: "tariffs",
          meaning: "Tariffs are taxes placed on goods imported from another country.",
        },
        {
          term: "trade feud",
          meaning: "A trade feud is a conflict between countries over trade rules, taxes, or restrictions.",
        },
        {
          term: "protectionism",
          meaning: "Protectionism is a policy of limiting foreign competition to support domestic businesses.",
        },
        {
          term: "supply chains",
          meaning: "Supply chains are the systems of companies and transport routes that produce and deliver goods.",
        },
      ],
      readingPrompts: [
        "Who might benefit from import bans or tariffs, and who might lose?",
        "How could trade restrictions affect prices or companies?",
        "What tone does the article use to describe the dispute?",
      ],
    },
  },
  {
    id: "story-2026-09-10-global-heat-stuck-on-high-august",
    headline: "Global heat stuck on high: August was Earth hottest month on record, scientists say",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/europe/earth-hottest-month-record-global-heat-record-high-august-rcna596975",
    category: "World Pickup",
    publicationDate: "2026-09-10",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-10-global-heat.jpg",
    imageAlt: "Weather Station USDA (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 870,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Another global heat record is not just a weather statistic; it is a sign of accelerating climate pressure on health, food, and infrastructure. The story gives learners clear, reusable vocabulary for discussing climate data.",
    keyVocabulary: [
      "global heat",
      "hottest month",
      "record",
      "scientists",
      "climate data",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Scientists track global temperatures over time to understand climate patterns and long-term change. The headline says August was Earth’s hottest month on record, meaning it was the hottest in the available temperature record. A heat record is more than a single weather fact because repeated records can signal growing climate pressure. High global heat can affect human health, farming, water supplies, energy use, and infrastructure. Stories like this help readers understand how climate data is reported and why scientists compare present temperatures with past measurements. They also show the difference between daily weather and broader climate trends.",
      vocabulary: [
        {
          term: "global heat",
          meaning: "Global heat refers to high temperatures measured across the planet as a whole.",
        },
        {
          term: "hottest month",
          meaning: "The hottest month is the month with the highest average temperature in the measured period.",
        },
        {
          term: "record",
          meaning: "A record is the highest, lowest, or most extreme measurement officially noted.",
        },
        {
          term: "scientists",
          meaning: "Scientists are people who study evidence and data to understand the natural world.",
        },
        {
          term: "climate data",
          meaning: "Climate data is information collected over time about temperature, rainfall, and other climate conditions.",
        },
      ],
      readingPrompts: [
        "How does the article explain the meaning of “on record”?",
        "What effects of extreme heat are discussed or suggested?",
        "How is climate data different from everyday weather news?",
      ],
    },
  },
];
