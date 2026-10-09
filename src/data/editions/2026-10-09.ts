import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the October 2, 2026 edition, selected
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
 * Generated: 2026-10-09T01:10:59.062Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-10-02-us-sends-third-aircraft-carrier-to",
    headline: "US sends third aircraft carrier to Middle East amid stalemate in Iran war",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/world/2026/oct/02/us-third-aircraft-carrier-middle-east-iran",
    category: "World & Conflict",
    publicationDate: "2026-10-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-02-us-sends.jpg",
    imageAlt: "An F-A-18C Hornet launches from the flight deck of the conventionally powered aircraft carrier (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 848,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A third U.S. aircraft carrier heading to the Middle East signals a serious escalation in the Iran conflict and helps readers follow a major ongoing security story.",
    keyVocabulary: [
      "aircraft carrier",
      "stalemate",
      "deployment",
      "escalation",
      "security",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The Middle East is a region where military moves by major powers can quickly affect diplomacy, energy markets, and international security. An aircraft carrier is a large naval ship that can carry military aircraft, so sending one is often seen as a strong signal of power and readiness. The headline says the United States is sending a third carrier while the Iran war remains in a stalemate, meaning the conflict is not clearly moving toward victory or settlement. For learners, this story is useful for understanding how military deployments can raise tensions, influence negotiations, and show how outside powers become involved in regional conflicts.",
      vocabulary: [
        {
          term: "aircraft carrier",
          meaning: "A large military ship that carries aircraft and can operate as a floating air base.",
        },
        {
          term: "stalemate",
          meaning: "A situation in which neither side in a conflict or negotiation can make progress.",
        },
        {
          term: "deployment",
          meaning: "The movement of military forces or equipment to a place where they may be needed.",
        },
        {
          term: "escalation",
          meaning: "An increase in the seriousness, intensity, or danger of a conflict.",
        },
        {
          term: "security",
          meaning: "Protection from threats, violence, or instability.",
        },
      ],
      readingPrompts: [
        "What message might the U.S. be trying to send by moving another aircraft carrier?",
        "How does the word “stalemate” shape your understanding of the conflict?",
        "What risks can come with military escalation in a tense region?",
      ],
    },
  },
  {
    id: "story-2026-10-02-how-the-fighting-in-ethiopia-spread",
    headline: "How the fighting in Ethiopia spread beyond Tigray, in maps and charts",
    sourceName: "Al Jazeera English",
    sourceUrl: "https://www.aljazeera.com/news/2026/10/2/how-the-fighting-in-ethiopia-spread-beyond-tigray-in-maps-and-charts",
    category: "World Pickup",
    publicationDate: "2026-10-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-02-how-the.jpg",
    imageAlt: "Administrative map of Tigray (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1477,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The Ethiopia conflict is an important African story that can be crowded out by U.S. and European news. A maps-and-charts format should also help learners understand the geography and the spread of fighting.",
    keyVocabulary: [
      "fighting",
      "spread",
      "Tigray",
      "maps and charts",
      "geography",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Tigray is a region in northern Ethiopia that has been central to recent conflict in the country. The headline suggests that fighting has moved beyond Tigray, which means the story is not only about one area but also about how conflict can spread across regions. A maps-and-charts format can help readers see where events are happening and how different places are connected. This is important because African conflicts are sometimes given less attention in international news than stories from the United States or Europe. For English learners, the article may also be useful for practicing language related to geography, conflict, and visual data.",
      vocabulary: [
        {
          term: "fighting",
          meaning: "Armed conflict or violence between groups.",
        },
        {
          term: "spread",
          meaning: "To move or extend from one place or group to another.",
        },
        {
          term: "Tigray",
          meaning: "A region in northern Ethiopia that has been an important focus of conflict.",
        },
        {
          term: "maps and charts",
          meaning: "Visual tools that show locations, patterns, numbers, or changes in an easier-to-understand way.",
        },
        {
          term: "geography",
          meaning: "The study or description of places, regions, and physical locations.",
        },
      ],
      readingPrompts: [
        "How do maps and charts help you understand the movement of conflict?",
        "Why might a conflict become more serious when it spreads beyond one region?",
        "What geographic information seems most important for following the story?",
      ],
    },
  },
  {
    id: "story-2026-10-02-miami-judge-rules-federal-noncitizen-voting",
    headline: "Miami judge rules federal noncitizen voting law violates US Constitution",
    sourceName: "Al Jazeera English",
    sourceUrl: "https://www.aljazeera.com/news/2026/10/2/miami-judge-rules-federal-noncitizen-voting-law-violates-us-constitution",
    category: "U.S. & Politics",
    publicationDate: "2026-10-02",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-02-miami-judge.jpg",
    imageAlt: "Courtroom, Hannibal Federal Building and U.S. Courthouse (2013) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 624,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This court ruling touches on voting rights, citizenship, and constitutional law, all central themes in U.S. politics. It is a useful story for understanding how judges can affect election rules.",
    keyVocabulary: [
      "noncitizen",
      "voting law",
      "Constitution",
      "federal judge",
      "ruling",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Voting rights are one of the most important subjects in U.S. politics, and rules about who may vote are often debated in courts. The headline says a federal judge in Miami ruled that a federal law about noncitizen voting violates the U.S. Constitution. A noncitizen is a person who lives in or is connected to a country but does not have citizenship there. Because the Constitution is the highest legal authority in the United States, court decisions about it can affect election rules and political arguments. This story can help learners understand how judges, laws, citizenship, and elections are connected in the U.S. system.",
      vocabulary: [
        {
          term: "noncitizen",
          meaning: "A person who is not legally recognized as a citizen of a particular country.",
        },
        {
          term: "voting law",
          meaning: "A rule or set of rules that controls who can vote and how elections are run.",
        },
        {
          term: "Constitution",
          meaning: "The basic legal document that sets out the main rules and powers of a government.",
        },
        {
          term: "federal judge",
          meaning: "A judge who works in the national court system rather than a state or local court.",
        },
        {
          term: "ruling",
          meaning: "An official decision made by a court or judge.",
        },
      ],
      readingPrompts: [
        "What does this story suggest about the role of courts in election rules?",
        "Why are questions about citizenship and voting politically sensitive?",
        "How might constitutional arguments shape future debates about elections?",
      ],
    },
  },
  {
    id: "story-2026-10-02-greece-pushes-eu-to-suspend-asylum",
    headline: "Greece pushes EU to suspend asylum during mass migration surges",
    sourceName: "Al Jazeera English",
    sourceUrl: "https://www.aljazeera.com/news/2026/10/2/greece-pushes-eu-to-suspend-asylum-during-mass-migration-surges",
    category: "World & Conflict",
    publicationDate: "2026-10-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-02-greece-pushes.jpg",
    imageAlt: "20151029 5boats with refugees arriving to Skala Sykamias Lesvos Greece (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 366,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Europe migration debate remains a major political and humanitarian issue. Greece proposal to suspend asylum during surges raises important questions about borders, law, and refugee protections.",
    keyVocabulary: [
      "asylum",
      "migration surge",
      "suspend",
      "refugee protections",
      "border control",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Migration and asylum are major issues in Europe because countries must balance border control, public pressure, and international responsibilities toward people seeking safety. Greece is located on important migration routes into the European Union, so its policies can become part of wider EU debates. The headline says Greece is pushing the EU to suspend asylum during mass migration surges. Asylum is legal protection for people who fear danger in their home country, so suspending it would raise difficult questions about law, human rights, and emergency responses. This story is useful for understanding how governments discuss migration when arrivals increase quickly.",
      vocabulary: [
        {
          term: "asylum",
          meaning: "Legal protection given by a country to someone who has fled danger or persecution.",
        },
        {
          term: "migration surge",
          meaning: "A sudden large increase in the number of people moving from one place to another.",
        },
        {
          term: "suspend",
          meaning: "To stop something temporarily.",
        },
        {
          term: "refugee protections",
          meaning: "Legal and humanitarian safeguards for people forced to leave their country because of danger.",
        },
        {
          term: "border control",
          meaning: "The rules and actions a country uses to manage who enters or leaves its territory.",
        },
      ],
      readingPrompts: [
        "What tensions exist between border control and refugee protections?",
        "Why might a country ask for EU-level action instead of acting alone?",
        "How does the word “suspend” affect the seriousness of the proposal?",
      ],
    },
  },
  {
    id: "story-2026-10-02-tokyo-core-inflation-rate-jumps-bolsters",
    headline: "Tokyo core inflation rate jumps, bolsters case for more BOJ hikes",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/economy/inflation/tokyo-core-inflation-rate-jumps-bolsters-case-for-more-boj-hikes",
    category: "Business & Economy",
    publicationDate: "2026-10-02",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-02-tokyo-core.jpg",
    imageAlt: "Bank of Japan headquarters in Tokyo, Japan (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 830,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Tokyo inflation data is directly relevant to Japan and to global markets because it may influence the Bank of Japan next moves. The story gives learners useful vocabulary for prices, interest rates, and central banking.",
    keyVocabulary: [
      "core inflation",
      "Bank of Japan",
      "rate hikes",
      "consumer prices",
      "monetary policy",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Inflation measures how much prices are rising, and it is closely watched by households, businesses, investors, and central banks. The headline focuses on Tokyo core inflation, which is important because Tokyo price data can be an early signal for wider price trends in Japan. The Bank of Japan, often called the BOJ, makes decisions about interest rates and monetary policy. If inflation looks stronger, it may support the case for rate hikes, meaning higher borrowing costs. For learners, this story offers useful language about consumer prices, central banking, and how economic data can influence financial markets and everyday life.",
      vocabulary: [
        {
          term: "core inflation",
          meaning: "A measure of price increases that leaves out some items with more unstable prices.",
        },
        {
          term: "Bank of Japan",
          meaning: "Japan’s central bank, which helps guide monetary policy and interest rates.",
        },
        {
          term: "rate hikes",
          meaning: "Increases in interest rates, often made by a central bank.",
        },
        {
          term: "consumer prices",
          meaning: "The prices people pay for goods and services in daily life.",
        },
        {
          term: "monetary policy",
          meaning: "Actions by a central bank to influence money, credit, inflation, and economic activity.",
        },
      ],
      readingPrompts: [
        "Why might Tokyo inflation data matter beyond Tokyo itself?",
        "How can higher interest rates affect consumers and businesses?",
        "What signals might the Bank of Japan look for before changing policy?",
      ],
    },
  },
  {
    id: "story-2026-10-02-el-nino-dries-kalimantan-rivers-hits",
    headline: "El Nino dries Kalimantan rivers, hits coal shipments in Indonesia",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/business/markets/commodities/el-nino-dries-kalimantan-rivers-hits-coal-shipments-in-indonesia",
    category: "Asia Pickup",
    publicationDate: "2026-10-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-02-el-nino.jpg",
    imageAlt: "Banks of Martapura River, South Kalimantan, 2018-07-28 01 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This story links climate conditions in Indonesia to coal transport and energy supply chains, making it both regionally important and globally relevant. It is a strong Asia story with clear business and environmental angles.",
    keyVocabulary: [
      "El Nino",
      "coal shipments",
      "rivers",
      "supply chain",
      "Kalimantan",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "El Nino is a climate pattern that can change weather conditions in many parts of the world. The headline says it is drying rivers in Kalimantan, the Indonesian part of Borneo, and affecting coal shipments. Rivers can be important transport routes, especially for moving heavy resources such as coal. When water levels are too low, shipping can become more difficult, which may affect supply chains and energy markets. This story connects the environment with business and regional trade. For learners, it is a useful example of how climate conditions can create practical problems for transport, industry, and the movement of goods.",
      vocabulary: [
        {
          term: "El Nino",
          meaning: "A natural climate pattern that can change rainfall and temperatures in different regions.",
        },
        {
          term: "coal shipments",
          meaning: "The transport of coal from one place to another, usually for energy or industry.",
        },
        {
          term: "rivers",
          meaning: "Natural streams of water that can also be used as transport routes.",
        },
        {
          term: "supply chain",
          meaning: "The system of people, companies, transport, and processes that moves goods from producers to users.",
        },
        {
          term: "Kalimantan",
          meaning: "The Indonesian part of the island of Borneo.",
        },
      ],
      readingPrompts: [
        "How can weather and climate affect the movement of goods?",
        "Why are rivers important for some supply chains?",
        "What makes this story both an environmental and a business issue?",
      ],
    },
  },
];
