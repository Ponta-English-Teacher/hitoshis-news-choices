import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the September 29, 2026 – October 1, 2026 edition, selected
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
 * Generated: 2026-10-02T00:43:56.063Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-10-01-supreme-court-to-hear-case-challenging",
    headline: "Supreme court to hear case challenging Trump immigration detention policy | US immigration",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/us-news/2026/oct/01/supreme-court-case-trump-immigration-detention",
    category: "U.S. & Politics",
    publicationDate: "2026-10-01",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-01-supreme-court.jpg",
    imageAlt: "Panorama of United States Supreme Court Building at Dusk (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 660,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A Supreme Court case on immigration detention could reshape how the U.S. government treats people held under immigration law. It is a strong story for understanding American legal language and the balance between executive power and individual rights.",
    keyVocabulary: [
      "detention",
      "immigration policy",
      "Supreme Court",
      "challenge",
      "executive power",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The U.S. Supreme Court is the country’s highest court, and its decisions can change how laws are understood across the nation. This case concerns immigration detention, meaning the government’s power to hold people under immigration law. When a policy is “challenged,” lawyers are asking a court to decide whether it is legal or constitutional. The issue matters because immigration law often involves a difficult balance: the government says it needs authority to manage borders and enforce rules, while individuals may argue that their liberty and legal rights must be protected. The case is also useful for learning formal legal and political vocabulary.",
      vocabulary: [
        {
          term: "detention",
          meaning: "Detention is the act of keeping someone in official custody, often by the government or police.",
        },
        {
          term: "immigration policy",
          meaning: "Immigration policy is a government’s set of rules about who may enter, stay, or be removed from a country.",
        },
        {
          term: "Supreme Court",
          meaning: "The Supreme Court is the highest court in a legal system, with the power to make final decisions on major legal questions.",
        },
        {
          term: "challenge",
          meaning: "A legal challenge is an attempt to question or overturn a rule, policy, or decision in court.",
        },
        {
          term: "executive power",
          meaning: "Executive power is the authority held by a president, prime minister, or government administration to enforce laws and run the state.",
        },
      ],
      readingPrompts: [
        "What rights and powers seem to be in tension in this case?",
        "How does the article describe the role of the Supreme Court?",
        "Which legal words are important for understanding the argument?",
      ],
    },
  },
  {
    id: "story-2026-10-01-gas-vehicles-fall-under-50-of",
    headline: "Gas vehicles fall under 50% of global new-auto sales for first time",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/business/automobiles/gas-vehicles-fall-under-50-of-global-new-auto-sales-for-first-time",
    category: "Business & Economy",
    publicationDate: "2026-10-01",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-01-gas-vehicles.png",
    imageAlt: "Electric car sales share in the Stated Policies Scenario, 2030 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 720,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The fact that gasoline-only vehicles have fallen below half of global new-auto sales marks a major shift in industry, climate policy and consumer behavior. It is a clear, globally relevant economic milestone.",
    keyVocabulary: [
      "gas vehicles",
      "auto sales",
      "electric vehicles",
      "milestone",
      "consumer behavior",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "For many decades, gasoline-powered vehicles were the normal choice for new car buyers around the world. The headline suggests that this pattern has reached an important turning point, with gas-only vehicles falling below half of global new-auto sales. This matters for several reasons: carmakers must plan what kinds of vehicles to build, governments are thinking about climate and energy policy, and consumers are changing how they choose transportation. Electric vehicles and other alternatives are becoming more central to the auto market. The story is a useful example of how business news can show long-term changes in technology, climate action, and consumer behavior.",
      vocabulary: [
        {
          term: "gas vehicles",
          meaning: "Gas vehicles are cars or other vehicles that run on gasoline rather than electricity or another main power source.",
        },
        {
          term: "auto sales",
          meaning: "Auto sales are the number of cars and other vehicles sold in a market during a certain period.",
        },
        {
          term: "electric vehicles",
          meaning: "Electric vehicles are vehicles powered mainly or fully by electricity stored in batteries.",
        },
        {
          term: "milestone",
          meaning: "A milestone is an important point or event that shows meaningful progress or change.",
        },
        {
          term: "consumer behavior",
          meaning: "Consumer behavior means the way people choose, buy, and use products or services.",
        },
      ],
      readingPrompts: [
        "Why might this change matter to car companies?",
        "How could climate policy affect what vehicles people buy?",
        "What does this milestone suggest about consumer choices?",
      ],
    },
  },
  {
    id: "story-2026-09-30-japan-court-rules-voice-is-protected",
    headline: "Japan court rules voice is protected as publicity right in AI cloning case",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/spotlight/society/japan-court-rules-voice-is-protected-as-publicity-right-in-ai-cloning-case",
    category: "Technology & AI",
    publicationDate: "2026-09-30",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-30-japan-court.jpg",
    imageAlt: "2023 Dyktafon Olympus VN-541PC (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1313,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A Japanese court ruling that a voice can be legally protected is highly relevant as AI voice cloning becomes easier and more common. The story connects technology, entertainment, identity and law in a way students are likely to encounter again.",
    keyVocabulary: [
      "publicity right",
      "AI cloning",
      "protected",
      "court ruling",
      "consent",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "AI voice cloning can make a digital copy of a person’s voice, raising new questions about ownership, identity, and consent. In entertainment, advertising, and online media, a recognizable voice can have personal and commercial value. A Japanese court ruling that treats a voice as protected under publicity rights is important because the law must respond to technology that is becoming easier to use. Publicity rights usually concern a person’s control over how their identity is used, especially for profit. This topic connects technology and law, and it may become more common as AI tools create realistic audio from limited voice data.",
      vocabulary: [
        {
          term: "publicity right",
          meaning: "A publicity right is a legal right to control the commercial use of one’s identity, such as a name, image, or voice.",
        },
        {
          term: "AI cloning",
          meaning: "AI cloning is the use of artificial intelligence to create a realistic copy of something, such as a voice or image.",
        },
        {
          term: "protected",
          meaning: "If something is legally protected, the law gives it special rights or limits how others may use it.",
        },
        {
          term: "court ruling",
          meaning: "A court ruling is an official decision made by a judge or court.",
        },
        {
          term: "consent",
          meaning: "Consent means permission given freely by someone before an action involving them takes place.",
        },
      ],
      readingPrompts: [
        "Why might a person’s voice be valuable or sensitive?",
        "How does AI make old legal ideas more complicated?",
        "What uses of voice cloning might need permission?",
      ],
    },
  },
  {
    id: "story-2026-09-30-taiwan-taps-us-tech-for-sea",
    headline: "Taiwan taps US tech for sea drones to fend off China vast maritime fleet",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/business/aerospace-defense-industries/taiwan-taps-us-tech-for-sea-drones-to-fend-off-china-s-vast-maritime-fleet",
    category: "World & Conflict",
    publicationDate: "2026-09-30",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-30-taiwan-taps.png",
    imageAlt: "Task force 59 USV (contextual photo, not a photo of the actual event)",
    imageWidth: 888,
    imageHeight: 608,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Taiwan’s use of U.S. technology for sea drones shows how military planning is changing in response to China’s maritime power. It is a concrete example of how drones are reshaping modern security strategy.",
    keyVocabulary: [
      "sea drones",
      "maritime fleet",
      "deterrence",
      "defense technology",
      "unmanned",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Sea drones are unmanned systems that can operate on or under the water, and they are becoming part of modern defense planning. Taiwan’s interest in U.S. technology for sea drones reflects a wider change in security strategy: smaller, smarter, and remotely operated systems can support a military without relying only on large ships. The headline places this development in relation to China’s large maritime fleet, showing how naval power and deterrence are central issues in the region. This story matters because it links technology, geography, and military planning. It also helps learners understand vocabulary used in security and international relations news.",
      vocabulary: [
        {
          term: "sea drones",
          meaning: "Sea drones are unmanned machines designed to operate on or under the water.",
        },
        {
          term: "maritime fleet",
          meaning: "A maritime fleet is a group of ships or naval forces used at sea.",
        },
        {
          term: "deterrence",
          meaning: "Deterrence is the strategy of preventing an attack by showing that the cost or risk would be too high.",
        },
        {
          term: "defense technology",
          meaning: "Defense technology is equipment or systems developed for military protection and security.",
        },
        {
          term: "unmanned",
          meaning: "Unmanned describes a vehicle or system that operates without a person physically inside it.",
        },
      ],
      readingPrompts: [
        "How might drones change the way countries plan defense?",
        "Why is maritime power important in this story?",
        "What advantages and risks could unmanned systems bring?",
      ],
    },
  },
  {
    id: "story-2026-09-29-malaysia-begins-sending-home-myanmar-refugees",
    headline: "Malaysia begins sending home Myanmar refugees despite safety concerns",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/spotlight/myanmar-crisis/malaysia-begins-sending-home-myanmar-refugees-despite-safety-concerns",
    category: "Asia Pickup",
    publicationDate: "2026-09-29",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-29-malaysia-begins.jpg",
    imageAlt: "Rohingya Refugee Camp 26 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Malaysia’s decision to send Myanmar refugees home despite safety concerns is an important human-rights and regional politics story. It broadens the edition with a serious Southeast Asian issue that might otherwise be overlooked.",
    keyVocabulary: [
      "refugees",
      "deportation",
      "safety concerns",
      "asylum",
      "human rights",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Refugees are people who have left their country because they fear danger or persecution. When a government sends refugees or migrants back to another country, the action may be described as deportation or return, depending on the legal situation. The headline says Malaysia has begun sending Myanmar refugees home despite safety concerns, which makes the issue important for human rights and regional politics. A central question is whether people are being returned to conditions where they may not be safe. This kind of story often involves asylum, international responsibility, domestic pressure, and difficult choices between border control and protection of vulnerable people.",
      vocabulary: [
        {
          term: "refugees",
          meaning: "Refugees are people who leave their country because they fear serious danger, conflict, or persecution.",
        },
        {
          term: "deportation",
          meaning: "Deportation is the official act of forcing someone to leave a country.",
        },
        {
          term: "safety concerns",
          meaning: "Safety concerns are worries that people may face danger, harm, or insecure conditions.",
        },
        {
          term: "asylum",
          meaning: "Asylum is protection given by a country to someone who cannot safely return to their own country.",
        },
        {
          term: "human rights",
          meaning: "Human rights are basic rights and freedoms that all people should have, regardless of nationality or status.",
        },
      ],
      readingPrompts: [
        "What safety issues does the article ask readers to consider?",
        "How might governments balance border control and protection?",
        "Which words show the human-rights side of the story?",
      ],
    },
  },
  {
    id: "story-2026-10-01-swiss-glaciers-lose-more-than-5",
    headline: "Swiss glaciers lose more than 5% of ice after record heatwave",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/world/swiss-glaciers-lose-more-ice-after-record-heatwave-6422871",
    category: "World Pickup",
    publicationDate: "2026-10-01",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 3,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-01-swiss-glaciers.jpg",
    imageAlt: "Aletschgletscher-Eggishorn (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 807,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A loss of more than 5% of Swiss glacier ice after a record heatwave is a striking sign of climate change’s physical impact. The story is easy to visualize and useful for learning climate and environmental vocabulary.",
    keyVocabulary: [
      "glaciers",
      "heatwave",
      "ice loss",
      "climate change",
      "melting",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Glaciers are large masses of ice that form over long periods and can be found in cold mountain areas, including Switzerland. The headline says Swiss glaciers lost more than 5% of their ice after a record heatwave, making the physical effects of climate change easier to imagine. Glacier ice is important because it reflects long-term climate conditions and can affect landscapes, water systems, and local environments. Heatwaves can speed up melting, especially when temperatures stay unusually high. This story is useful for learning environmental vocabulary because it connects a clear visual change, melting ice, with broader concerns about warming and climate impacts.",
      vocabulary: [
        {
          term: "glaciers",
          meaning: "Glaciers are very large, slow-moving masses of ice formed from packed snow over many years.",
        },
        {
          term: "heatwave",
          meaning: "A heatwave is a period of unusually hot weather that lasts for several days or longer.",
        },
        {
          term: "ice loss",
          meaning: "Ice loss means a reduction in the amount or thickness of ice in places such as glaciers.",
        },
        {
          term: "climate change",
          meaning: "Climate change is the long-term shift in Earth’s temperatures and weather patterns, especially linked to global warming.",
        },
        {
          term: "melting",
          meaning: "Melting is the process of ice or snow turning into water because of heat.",
        },
      ],
      readingPrompts: [
        "Why is glacier ice a visible sign of climate conditions?",
        "How can a heatwave affect natural environments?",
        "What climate vocabulary helps explain the story clearly?",
      ],
    },
  },
];
