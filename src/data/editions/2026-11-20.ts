import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the November 14, 2026 – November 20, 2026 edition, selected
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
 * Generated: 2026-11-20T02:15:13.719Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-11-20-japan-core-inflation-soars-to-highest",
    headline: "Japan core inflation soars to highest this year as energy subsidy expiry pushes up consumer prices",
    sourceName: "CNBC",
    sourceUrl: "https://www.cnbc.com/2026/11/20/japan-inflation-cpi-october.html",
    category: "Business & Economy",
    publicationDate: "2026-11-20",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-11-20-japan-core.jpg",
    imageAlt: "Bank of Japan 20190223 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Japan's inflation data matters because it affects household budgets, government policy, and the Bank of Japan's difficult interest-rate decisions. It is also useful for learners because it introduces practical economic language tied to everyday prices.",
    keyVocabulary: [
      "core inflation",
      "energy subsidies",
      "consumer prices",
      "interest rates",
      "household budgets",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Inflation is the rate at which prices rise, and it directly affects what households can buy with their income. In Japan, “core inflation” usually gets close attention because it helps economists and policymakers judge whether price increases are becoming broad and lasting. Energy prices are especially important because electricity, gas, and fuel costs affect both families and businesses. If government energy subsidies end, consumers may feel higher prices more quickly. The Bank of Japan watches this kind of data carefully because interest-rate decisions can influence borrowing, saving, business investment, and the overall economy.",
      vocabulary: [
        {
          term: "core inflation",
          meaning: "A measure of inflation that leaves out some prices that change a lot, often to show the underlying trend in prices.",
        },
        {
          term: "energy subsidies",
          meaning: "Government support that helps reduce the cost of electricity, gas, fuel, or other energy for consumers or businesses.",
        },
        {
          term: "consumer prices",
          meaning: "The prices that ordinary people pay for goods and services in daily life.",
        },
        {
          term: "interest rates",
          meaning: "The cost of borrowing money or the reward for saving it, usually expressed as a percentage.",
        },
        {
          term: "household budgets",
          meaning: "The plan or limit for how much a family or household can spend and save.",
        },
      ],
      readingPrompts: [
        "How might higher energy costs affect ordinary households and businesses?",
        "Why would inflation data matter to the Bank of Japan?",
        "What choices might a government face when subsidies become expensive?",
      ],
    },
  },
  {
    id: "story-2026-11-20-classified-nsa-network-is-still-down",
    headline: "Classified NSA network is still down, leaving some staff working from home",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/politics/rcna610261",
    category: "Technology & AI",
    publicationDate: "2026-11-20",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-11-20-classified-nsa.jpg",
    imageAlt: "National Security Agency headquarters, Fort Meade, Maryland (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 998,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A classified NSA network remaining offline is a serious national-security and technology story, not just an office IT problem. It gives readers useful vocabulary around cybersecurity, government systems, and intelligence work.",
    keyVocabulary: [
      "classified network",
      "intelligence agency",
      "outage",
      "remote work",
      "cybersecurity",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The NSA is a U.S. intelligence agency that works with highly sensitive information, so its computer systems are not like normal office networks. A classified network is designed for restricted material and must meet strong security requirements. If such a system remains offline, the issue can affect how staff communicate, access information, and do their jobs. The mention of some staff working from home also raises questions about how government agencies balance security, continuity, and modern work practices during technology problems. This story is important because it connects cybersecurity with national-security operations.",
      vocabulary: [
        {
          term: "classified network",
          meaning: "A computer system used for information that is restricted because of national security or other serious concerns.",
        },
        {
          term: "intelligence agency",
          meaning: "A government organization that gathers and analyzes information related to security and threats.",
        },
        {
          term: "outage",
          meaning: "A period when a system, service, or network is not working.",
        },
        {
          term: "remote work",
          meaning: "Work done away from the usual office, often from home using digital tools.",
        },
        {
          term: "cybersecurity",
          meaning: "The protection of computer systems, networks, and data from attacks or unauthorized access.",
        },
      ],
      readingPrompts: [
        "Why is a network outage more serious for an intelligence agency than for an ordinary office?",
        "What security questions might remote work create in this context?",
        "How should organizations prepare for technology failures in critical systems?",
      ],
    },
  },
  {
    id: "story-2026-11-20-price-tag-for-us-war-in",
    headline: "Price tag for US war in Iran barrels past $48 billion",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/price-tag-for-us-war-in-iran-barrels-past-48-billion/a-79998255",
    category: "World & Conflict",
    publicationDate: "2026-11-20",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-11-20-price-tag.jpg",
    imageAlt: "The Pentagon January 2008 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 732,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The rising financial cost of the U.S. war in Iran is a meaningful new angle on a major ongoing conflict. It helps readers understand how wars are debated not only in military terms but also through budgets and political accountability.",
    keyVocabulary: [
      "war costs",
      "military spending",
      "barrels past",
      "accountability",
      "price tag",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Wars are often discussed through battlefield events, diplomacy, and human consequences, but their financial cost is also a major issue. Military operations can require large amounts of public money for equipment, logistics, personnel, and long-term support. When the price tag of a conflict rises, citizens and lawmakers may ask whether the goals justify the spending and who is responsible for decisions. The headline’s phrase “barrels past” suggests a cost increasing quickly beyond a major level. For readers, this story is a chance to understand how conflict, budgets, and political accountability are connected.",
      vocabulary: [
        {
          term: "war costs",
          meaning: "The money spent on fighting, supporting, and managing a war.",
        },
        {
          term: "military spending",
          meaning: "Government money used for armed forces, weapons, operations, and defense needs.",
        },
        {
          term: "barrels past",
          meaning: "A phrase meaning to move beyond a point very quickly or forcefully.",
        },
        {
          term: "accountability",
          meaning: "The responsibility to explain decisions and accept criticism or consequences for them.",
        },
        {
          term: "price tag",
          meaning: "The total cost of something, especially when it is large or politically important.",
        },
      ],
      readingPrompts: [
        "How can the financial cost of war change public debate?",
        "What kinds of spending might be included in a war’s total cost?",
        "Why is accountability important when public money is used for conflict?",
      ],
    },
  },
  {
    id: "story-2026-11-19-iraq-risky-standoff-the-state-vs",
    headline: "Iraq risky standoff: The state vs. Iran-allied militias",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/iraqs-risky-standoff-the-state-vs-iran-allied-militias/a-79995757",
    category: "Asia Pickup",
    publicationDate: "2026-11-19",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 5,
    trendingScore: 3,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-11-19-iraq-risky.jpg",
    imageAlt: "Government building, Baghdad 2006 (contextual photo, not a photo of the actual event)",
    imageWidth: 800,
    imageHeight: 533,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Iraq's confrontation with Iran-allied militias is an important regional security story that could affect both domestic stability and wider Middle East politics. It is a strong Asia Pickup because it highlights a serious Asian story that might otherwise be crowded out.",
    keyVocabulary: [
      "militias",
      "standoff",
      "state authority",
      "Iran-allied",
      "domestic stability",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Iraq’s government faces a difficult security challenge when armed groups operate with strong political or regional connections. Militias are not the same as regular state forces, and their power can raise questions about who controls weapons, territory, and decision-making. The phrase “state vs. Iran-allied militias” points to tension between official state authority and groups linked to Iran’s influence. This matters because Iraq’s internal stability is closely connected to wider Middle East politics. A standoff could affect domestic governance, regional relationships, and the ability of the state to act as the main source of security.",
      vocabulary: [
        {
          term: "militias",
          meaning: "Armed groups that are not usually part of a country’s regular official military.",
        },
        {
          term: "standoff",
          meaning: "A tense situation in which opposing sides refuse to back down.",
        },
        {
          term: "state authority",
          meaning: "The power of a government to make and enforce rules within its territory.",
        },
        {
          term: "Iran-allied",
          meaning: "Connected to or supportive of Iran’s interests or influence.",
        },
        {
          term: "domestic stability",
          meaning: "A situation in which a country’s internal politics and security are relatively calm and controlled.",
        },
      ],
      readingPrompts: [
        "What problems can arise when armed groups are powerful outside regular state forces?",
        "How might regional alliances affect Iraq’s domestic politics?",
        "Why is state authority important for long-term security?",
      ],
    },
  },
  {
    id: "story-2026-11-19-cop31-can-africa-win-the-climate",
    headline: "COP31: Can Africa win the climate funding it needs?",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/cop31-can-africa-win-the-climate-funding-it-needs/audio-79994350",
    category: "World Pickup",
    publicationDate: "2026-11-19",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-11-19-cop31-can.jpg",
    imageAlt: "African Union Headquarters Addis Ababa (contextual photo, not a photo of the actual event)",
    imageWidth: 900,
    imageHeight: 574,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Climate finance for Africa is a major global issue, combining climate change, development, and fairness between rich and poorer countries. The story broadens the edition beyond the usual U.S.-Europe focus while offering useful policy vocabulary.",
    keyVocabulary: [
      "climate funding",
      "COP31",
      "developing countries",
      "adaptation",
      "climate finance",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "COP meetings are international climate conferences where governments discuss how to respond to climate change. Climate funding is a major issue because poorer and developing countries often face serious climate risks while having fewer resources to prepare, adapt, or recover. For African countries, funding can be connected to infrastructure, agriculture, health, disaster readiness, and energy choices. The question of whether Africa can win the funding it needs is also about fairness: countries have contributed differently to global emissions, but climate impacts are not shared equally. This story helps readers understand the policy language behind global climate negotiations.",
      vocabulary: [
        {
          term: "climate funding",
          meaning: "Money provided to help countries reduce emissions, adapt to climate change, or recover from climate-related damage.",
        },
        {
          term: "COP31",
          meaning: "A United Nations climate conference where countries discuss climate policy and cooperation.",
        },
        {
          term: "developing countries",
          meaning: "Countries with lower average incomes or fewer resources for infrastructure, health, and economic development.",
        },
        {
          term: "adaptation",
          meaning: "Actions taken to prepare for or reduce the harmful effects of climate change.",
        },
        {
          term: "climate finance",
          meaning: "Funding from public or private sources used to support climate action.",
        },
      ],
      readingPrompts: [
        "Why is climate funding especially important for countries with fewer resources?",
        "How does fairness shape debates about global climate finance?",
        "What might countries hope to gain from a COP meeting?",
      ],
    },
  },
  {
    id: "story-2026-11-14-fact-check-iranian-content-farms-reach",
    headline: "Fact check: Iranian content farms reach millions",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/fact-check-iranian-content-farms-reach-millions/a-79934190",
    category: "Technology & AI",
    publicationDate: "2026-11-14",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-11-14-fact-check.jpg",
    imageAlt: "Social media apps (contextual photo, not a photo of the actual event)",
    imageWidth: 1170,
    imageHeight: 1711,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Iranian content farms reaching millions is a timely media-literacy story about online influence and misinformation. It is especially valuable for English learners because it shows how political messaging spreads through digital platforms.",
    keyVocabulary: [
      "content farms",
      "misinformation",
      "fact check",
      "online influence",
      "media literacy",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Content farms are online operations that produce large amounts of material, often designed to attract attention, influence opinions, or spread a message widely. When a fact-checking story says such content reaches millions, it raises concerns about how easily political narratives and misleading information can travel through digital platforms. This topic is important for media literacy because readers need to think about who created online content, why it was made, and whether it is reliable. For English learners, the story also provides useful language for discussing misinformation, online influence, and the ways digital media can shape public understanding.",
      vocabulary: [
        {
          term: "content farms",
          meaning: "Organizations or networks that produce large amounts of online material, often quickly and for traffic or influence.",
        },
        {
          term: "misinformation",
          meaning: "False or misleading information, whether shared by mistake or on purpose.",
        },
        {
          term: "fact check",
          meaning: "A careful review to see whether claims, images, or information are accurate.",
        },
        {
          term: "online influence",
          meaning: "The ability to shape people’s opinions or behavior through digital platforms.",
        },
        {
          term: "media literacy",
          meaning: "The skill of judging how reliable information is and understanding how media messages are made.",
        },
      ],
      readingPrompts: [
        "What signs might help readers judge whether online content is trustworthy?",
        "Why can large-scale content production be powerful on social media?",
        "How can fact-checking help people respond to misinformation?",
      ],
    },
  },
];
