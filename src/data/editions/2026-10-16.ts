import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the October 15, 2026 edition, selected
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
 * Generated: 2026-10-15T23:43:15.479Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-10-15-white-house-prepares-plans-to-use",
    headline: "White House prepares plans to use weapon dubbed mother of all bombs on Iran, sources say",
    sourceName: "CBS News",
    sourceUrl: "https://www.cbsnews.com/news/iran-trump-administration-mother-of-all-bombs/",
    category: "World & Conflict",
    publicationDate: "2026-10-15",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-15-white-house.jpg",
    imageAlt: "MOAB bomb (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This is a potentially major escalation in the Iran conflict, involving U.S. military planning and a weapon with strong symbolic and strategic meaning. It is a serious follow-up to an ongoing war rather than a repeat of earlier developments.",
    keyVocabulary: [
      "executive privilege",
      "military planning",
      "bunker-buster",
      "escalation",
      "sources say",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story concerns possible U.S. military planning connected to the conflict involving Iran. When a government prepares options, it does not always mean leaders have decided to act, but it can show what choices are being considered in a crisis. A very powerful bomb, especially one associated with striking hardened or underground targets, carries both military and symbolic meaning. Such planning matters because it could signal a major escalation, affect diplomacy, and increase regional and global security risks. Readers should pay attention to what is confirmed, what is attributed to unnamed sources, and how officials describe the purpose of any planning.",
      vocabulary: [
        {
          term: "executive privilege",
          meaning: "A legal principle that can allow a president or senior officials to keep some internal government communications private.",
        },
        {
          term: "military planning",
          meaning: "The process of preparing possible actions, resources, and strategies for a security situation.",
        },
        {
          term: "bunker-buster",
          meaning: "A powerful weapon designed to damage or destroy deeply buried or heavily protected targets.",
        },
        {
          term: "escalation",
          meaning: "A situation in which a conflict becomes more intense, dangerous, or widespread.",
        },
        {
          term: "sources say",
          meaning: "A phrase showing that information comes from people with knowledge of the issue, often without naming them publicly.",
        },
      ],
      readingPrompts: [
        "What is the difference between preparing a plan and deciding to carry it out?",
        "How does the language of unnamed sources affect your confidence in the report?",
        "Why might a weapon’s symbolic meaning matter as much as its military use?",
      ],
    },
  },
  {
    id: "story-2026-10-15-eight-crew-missing-after-drone-attack",
    headline: "Eight crew missing after drone attack leaves tanker ablaze off Romania coast",
    sourceName: "BBC",
    sourceUrl: "https://www.bbc.com/news/articles/c60qkgpp592yo",
    category: "World & Conflict",
    publicationDate: "2026-10-15",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-15-eight-crew.jpg",
    imageAlt: "Brand op tanker Diana bij Mobil Oil de brand, Bestanddeelnr 921-9354 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 832,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A drone attack on a tanker near Romania connects maritime security, the war in Europe, and risks to civilian shipping. It is a compact but high-stakes story with clear international relevance.",
    keyVocabulary: [
      "tanker",
      "drone attack",
      "crew members",
      "maritime security",
      "ablaze",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story focuses on a tanker that was reportedly set on fire after a drone attack near Romania, with crew members missing. Tankers are important because they carry fuel or other cargo across seas, and attacks on them can threaten lives, trade, and energy supply routes. The location near Romania connects the incident to wider security concerns in Europe and the Black Sea region. Even when civilian shipping is not the main target of a conflict, it can become exposed to serious risks. Readers should watch for details about the vessel, the missing crew, responsibility for the attack, and the wider maritime security implications.",
      vocabulary: [
        {
          term: "tanker",
          meaning: "A large ship used to transport liquids such as oil, fuel, or chemicals.",
        },
        {
          term: "drone attack",
          meaning: "An attack carried out using an unmanned aircraft or other remote-controlled device.",
        },
        {
          term: "crew members",
          meaning: "The people who work on a ship, aircraft, or other vehicle.",
        },
        {
          term: "maritime security",
          meaning: "The protection of ships, ports, sea routes, and people at sea from threats.",
        },
        {
          term: "ablaze",
          meaning: "Burning strongly or on fire.",
        },
      ],
      readingPrompts: [
        "How can attacks at sea affect people far from the conflict zone?",
        "What information would help clarify who may be responsible?",
        "Why is civilian shipping especially vulnerable during regional wars?",
      ],
    },
  },
  {
    id: "story-2026-10-15-justice-department-sues-california-claiming-it",
    headline: "Justice Department sues California, claiming it mailing ballots to more than 20,000 noncitizens",
    sourceName: "CBS News",
    sourceUrl: "https://www.cbsnews.com/news/justice-department-california-lawsuit-mail-ballots-noncitizens/",
    category: "U.S. & Politics",
    publicationDate: "2026-10-15",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-15-justice-department.jpg",
    imageAlt: "US Department of Justice building with road (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 948,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The Justice Department’s lawsuit against California raises important questions about voting rights, election administration, and federal-state power. It is useful for understanding recurring disputes in U.S. politics.",
    keyVocabulary: [
      "Justice Department",
      "mail-in ballots",
      "noncitizens",
      "lawsuit",
      "election administration",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story is about a lawsuit by the U.S. Justice Department against California over allegations related to mail-in ballots and noncitizens. In the United States, elections are run largely by states, but federal law also protects voting rights and sets certain limits. Disputes over voter eligibility, ballot access, and election procedures often become politically sensitive because they involve both democracy and public trust. The headline indicates a legal claim, not a final court finding. Readers should distinguish between allegations, evidence presented in court, and any official response from California or election administrators.",
      vocabulary: [
        {
          term: "Justice Department",
          meaning: "The U.S. federal government department responsible for enforcing federal law.",
        },
        {
          term: "mail-in ballots",
          meaning: "Voting papers that are sent to voters and returned by mail instead of being cast in person.",
        },
        {
          term: "noncitizens",
          meaning: "People who live in or are present in a country but do not have that country’s citizenship.",
        },
        {
          term: "lawsuit",
          meaning: "A legal case brought to a court to resolve a dispute or claim.",
        },
        {
          term: "election administration",
          meaning: "The process of organizing and managing elections, including voter registration and ballot handling.",
        },
      ],
      readingPrompts: [
        "What is being claimed, and what still needs to be proven?",
        "How does this story show tension between state and federal authority?",
        "Why do voting procedures often become major political debates?",
      ],
    },
  },
  {
    id: "story-2026-10-15-ftc-issues-subpoenas-to-anthropic-and",
    headline: "FTC issues subpoenas to Anthropic and OpenAI over safety incidents",
    sourceName: "CBS News",
    sourceUrl: "https://www.cbsnews.com/news/ftc-subpoenas-anthropic-openai-consumer-protection/",
    category: "Technology & AI",
    publicationDate: "2026-10-15",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-15-ftc-issues.jpg",
    imageAlt: "AI-generated editorial illustration for this Technology & AI story — not a photograph of the actual event.",
    imageWidth: 1536,
    imageHeight: 1024,
    imageSourceType: "ai-generated",
    whyWeChoseThis: "Regulatory scrutiny of leading AI companies is one of the central technology stories of the moment. This article gives learners useful language for discussing AI safety, investigations, and government oversight.",
    keyVocabulary: [
      "subpoena",
      "AI safety",
      "regulator",
      "incident",
      "oversight",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story concerns the U.S. Federal Trade Commission sending subpoenas to Anthropic and OpenAI about AI safety incidents. A subpoena is a legal demand for information, so this suggests a formal inquiry rather than a casual request. As artificial intelligence systems become more widely used, governments are paying closer attention to risks such as harmful outputs, product safety, consumer protection, and company transparency. The article is likely useful for understanding how regulators examine powerful technology companies. Readers should notice what kind of incidents are being discussed, what the companies are asked to provide, and how oversight may shape the AI industry.",
      vocabulary: [
        {
          term: "subpoena",
          meaning: "An official legal order requiring a person or organization to provide information or appear to answer questions.",
        },
        {
          term: "AI safety",
          meaning: "The effort to make artificial intelligence systems reliable, controlled, and less likely to cause harm.",
        },
        {
          term: "regulator",
          meaning: "A government body or official that makes sure organizations follow rules and laws.",
        },
        {
          term: "incident",
          meaning: "An event, often unexpected or harmful, that may require investigation or action.",
        },
        {
          term: "oversight",
          meaning: "The process of monitoring an organization or activity to make sure it is responsible and lawful.",
        },
      ],
      readingPrompts: [
        "What does a subpoena suggest about the seriousness of the inquiry?",
        "How should governments balance AI innovation with public safety?",
        "What kinds of AI incidents might regulators want companies to explain?",
      ],
    },
  },
  {
    id: "story-2026-10-15-emerging-market-job-shortage-a-ticking",
    headline: "Emerging market job shortage a ticking time bomb: UN development chief",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/editor-s-picks/interview/emerging-market-job-shortage-a-ticking-time-bomb-un-development-chief",
    category: "Business & Economy",
    publicationDate: "2026-10-15",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-15-emerging-market.jpg",
    imageAlt: "Construction workers in Mexico (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 696,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The warning about job shortages in emerging markets points to a long-term global economic risk, not just a single country’s problem. It is valuable for understanding development, demographics, and employment pressures.",
    keyVocabulary: [
      "emerging markets",
      "job shortage",
      "development",
      "labor force",
      "ticking time bomb",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story highlights a warning from a United Nations development leader about job shortages in emerging markets. Emerging markets are economies that are growing and industrializing but may still face limits in infrastructure, education, income levels, or institutional strength. A shortage of good jobs can create pressure when young or growing populations enter the labor force faster than economies can employ them. This matters because employment affects poverty reduction, social stability, migration, and long-term growth. The phrase “ticking time bomb” suggests a risk that may build gradually before becoming a serious crisis. Readers should look for links between demographics, development policy, and job creation.",
      vocabulary: [
        {
          term: "emerging markets",
          meaning: "Countries or economies that are growing quickly and becoming more connected to global markets but are not yet fully developed.",
        },
        {
          term: "job shortage",
          meaning: "A situation in which there are not enough jobs for the people who need work.",
        },
        {
          term: "development",
          meaning: "The process of improving living standards, economic opportunity, education, health, and infrastructure.",
        },
        {
          term: "labor force",
          meaning: "The group of people who are working or available to work in an economy.",
        },
        {
          term: "ticking time bomb",
          meaning: "A problem that may seem manageable now but could become dangerous if not addressed.",
        },
      ],
      readingPrompts: [
        "Why can a lack of jobs become a long-term development risk?",
        "How might demographics affect employment pressure in emerging markets?",
        "What kinds of policies could help create more stable work opportunities?",
      ],
    },
  },
  {
    id: "story-2026-10-15-north-korea-pact-with-russia-built",
    headline: "North Korea pact with Russia built to outlast Ukraine war",
    sourceName: "Nikkei Asia",
    sourceUrl: "https://asia.nikkei.com/spotlight/policy-asia/north-korea-s-pact-with-russia-built-to-outlast-ukraine-war",
    category: "Asia Pickup",
    publicationDate: "2026-10-15",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-15-north-korea.jpg",
    imageAlt: "2011 Russian Embassy in DPRK (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The deepening North Korea-Russia relationship is an important Asian security story with consequences beyond the Ukraine war. It also helps broaden the edition beyond U.S. and European domestic news.",
    keyVocabulary: [
      "security pact",
      "alliance",
      "sanctions",
      "geopolitics",
      "outlast",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story focuses on the relationship between North Korea and Russia and a pact described as lasting beyond the war in Ukraine. A security pact can signal deeper cooperation between governments, especially when both face international pressure or share strategic interests. For Asia, closer North Korea-Russia ties may affect regional security calculations involving neighboring countries and larger powers. The story matters because it suggests the relationship is not only a temporary response to one war, but part of a broader geopolitical shift. Readers should pay attention to what the pact covers, how long-term cooperation is framed, and how sanctions or diplomacy may be affected.",
      vocabulary: [
        {
          term: "security pact",
          meaning: "An agreement between countries to cooperate on defense, security, or strategic issues.",
        },
        {
          term: "alliance",
          meaning: "A relationship in which countries agree to support each other, often for political or military reasons.",
        },
        {
          term: "sanctions",
          meaning: "Economic or political penalties used to pressure a country, organization, or individual to change behavior.",
        },
        {
          term: "geopolitics",
          meaning: "The way geography, power, security, and national interests influence international relations.",
        },
        {
          term: "outlast",
          meaning: "To continue for a longer time than something else.",
        },
      ],
      readingPrompts: [
        "What would it mean for this pact to continue beyond the Ukraine war?",
        "How could closer North Korea-Russia ties affect Asian security?",
        "Why might countries under pressure seek stronger partnerships with each other?",
      ],
    },
  },
];
