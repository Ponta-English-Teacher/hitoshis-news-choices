import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the November 24, 2026 – November 26, 2026 edition, selected
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
 * Generated: 2026-11-27T03:41:28.763Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-11-26-faulty-electrical-goods-returned-to-united",
    headline: "Faulty electrical goods returned to United Kingdom supermarkets ending up on Ghana megadump",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/environment/2026/nov/26/ghana-waste-tip-faulty-electrical-goods-uk-supermarkets-returns",
    category: "World Pickup",
    publicationDate: "2026-11-26",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-11-26-faulty-electrical.jpg",
    imageAlt: "Agbogbloshie, Ghana - September 2019 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 854,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This story connects everyday consumer returns in the UK to pollution and waste burdens in Ghana, making a global supply-chain problem concrete. It is useful for learning language around environmental regulation, consumer goods, and international responsibility.",
    keyVocabulary: [
      "faulty goods",
      "megadump",
      "supply chain",
      "electrical waste",
      "regulation",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "When people return broken or unwanted electrical products to shops, those items may travel through a long chain of companies, recyclers, exporters, and waste handlers. The headline suggests a connection between faulty goods returned in the United Kingdom and a large waste site in Ghana. This matters because electrical waste can contain materials that are difficult or dangerous to process safely, especially when regulation is weak or enforcement is limited. The story also raises questions about responsibility: should the burden fall on consumers, supermarkets, recycling companies, exporting countries, or the countries where waste finally arrives?",
      vocabulary: [
        {
          term: "faulty goods",
          meaning: "Products that do not work correctly or have a defect.",
        },
        {
          term: "megadump",
          meaning: "A very large place where huge amounts of waste are left or processed.",
        },
        {
          term: "supply chain",
          meaning: "The network of people, companies, and steps involved in making, moving, selling, and disposing of a product.",
        },
        {
          term: "electrical waste",
          meaning: "Thrown-away items that use electricity, such as appliances, phones, or electronic devices.",
        },
        {
          term: "regulation",
          meaning: "Official rules made by governments or authorities to control how something is done.",
        },
      ],
      readingPrompts: [
        "Who seems responsible at different points in the waste journey?",
        "How does the story connect everyday shopping habits to global environmental harm?",
        "What role should governments or companies play in preventing unsafe waste exports?",
      ],
    },
  },
  {
    id: "story-2026-11-26-judge-blocks-brendan-carr-led-fcc",
    headline: "Judge blocks Brendan Carr-led FCC from taking any further action against ABC licenses",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/us-news/2026/nov/25/brendan-carr-fcc-abc-licenses",
    category: "U.S. & Politics",
    publicationDate: "2026-11-26",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-11-26-judge-blocks.jpg",
    imageAlt: "FCC HQ (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A court blocking the FCC from acting against ABC licenses is a significant story about media regulation, presidential power, and press freedom in the United States. It gives readers useful context for understanding how government agencies and broadcasters can clash politically.",
    keyVocabulary: [
      "license",
      "injunction",
      "regulator",
      "press freedom",
      "broadcaster",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "In the United States, broadcasters such as television networks need official licenses to use public airwaves. The Federal Communications Commission, or FCC, is the government regulator involved in this area. The headline says a judge has stopped the FCC, led by Brendan Carr, from taking further action against ABC licenses. This kind of dispute matters because it sits at the intersection of law, politics, media regulation, and press freedom. Courts can limit what government agencies do, especially if there are concerns about legal authority, political pressure, or the rights of media organizations to operate independently.",
      vocabulary: [
        {
          term: "license",
          meaning: "Official permission to do something, such as broadcast on television or radio.",
        },
        {
          term: "injunction",
          meaning: "A court order that tells someone to stop doing something or prevents an action from going forward.",
        },
        {
          term: "regulator",
          meaning: "An official body or person responsible for making sure rules are followed in a particular area.",
        },
        {
          term: "press freedom",
          meaning: "The right of journalists and media organizations to report news without improper government control.",
        },
        {
          term: "broadcaster",
          meaning: "A company or organization that sends television or radio programs to the public.",
        },
      ],
      readingPrompts: [
        "What does this case suggest about the relationship between courts and government agencies?",
        "How might media licensing become politically sensitive?",
        "Why is press freedom important when regulators have power over broadcasters?",
      ],
    },
  },
  {
    id: "story-2026-11-25-australia-security-pact-with-solomon-islands",
    headline: "Australia security pact with Solomon Islands a blow to China influence in the Pacific",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/world/2026/nov/25/australia-solomon-islands-treaty-blow-to-china-pacific-influence",
    category: "World & Conflict",
    publicationDate: "2026-11-25",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-11-25-australia-security.jpg",
    imageAlt: "Long shot of the Solomon Islands Parliament House. (10708895683) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 857,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Australia’s security pact with Solomon Islands is an important Pacific geopolitics story because it reflects competition over influence with China. It broadens the edition beyond the usual U.S.-Europe focus while still dealing with a major strategic issue.",
    keyVocabulary: [
      "security pact",
      "influence",
      "Pacific",
      "strategic",
      "geopolitics",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The Pacific region has become an important area of diplomatic and security competition. Australia has long-standing interests in regional stability, while China has also sought greater influence through partnerships, investment, and diplomacy. The headline says Australia has made a security pact with Solomon Islands, and describes it as a blow to Chinese influence. A security pact usually means countries agree to cooperate on defense, policing, or other safety issues. For readers, the key context is that small island nations can have major strategic importance because of their location, resources, and political relationships with larger powers.",
      vocabulary: [
        {
          term: "security pact",
          meaning: "An agreement between countries to cooperate on defense, policing, or safety issues.",
        },
        {
          term: "influence",
          meaning: "The power to affect another country’s decisions, relationships, or direction.",
        },
        {
          term: "Pacific",
          meaning: "The region around the Pacific Ocean, including many island nations and larger countries such as Australia.",
        },
        {
          term: "strategic",
          meaning: "Important for long-term political, military, or economic plans.",
        },
        {
          term: "geopolitics",
          meaning: "The way geography, power, and international relationships affect world politics.",
        },
      ],
      readingPrompts: [
        "Why might Solomon Islands be important to larger regional powers?",
        "How can a security agreement change the balance of influence in a region?",
        "What benefits and risks might small countries face when working with powerful partners?",
      ],
    },
  },
  {
    id: "story-2026-11-25-inflation-rate-jumps-to-4-9",
    headline: "Inflation rate jumps to 4.9% as Australia cost-of-living crisis intensifies",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/business/2026/nov/25/inflation-rate-australia-october-figures",
    category: "Business & Economy",
    publicationDate: "2026-11-25",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-11-25-inflation-rate.jpg",
    imageAlt: "2021-06-28 E-ink price tag in Sydney supermarket (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A sharp rise in Australian inflation is a clear, timely economic story with direct effects on households and policy decisions. It is also good for learners because it explains common economic language around prices, wages, and cost-of-living pressure.",
    keyVocabulary: [
      "inflation",
      "cost of living",
      "consumer prices",
      "interest rates",
      "wages",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Inflation means prices are rising across the economy, so people may need more money to buy the same goods and services. The headline says Australia’s inflation rate has jumped to 4.9%, while the cost-of-living crisis is getting worse. This kind of news matters because inflation affects food, rent, transport, bills, savings, wages, and government policy. When prices rise quickly, households may feel financial pressure, especially if wages do not keep up. Central banks and governments may also face difficult choices about interest rates, support payments, and how to reduce pressure without harming the wider economy.",
      vocabulary: [
        {
          term: "inflation",
          meaning: "A general increase in prices, which reduces how much people can buy with the same amount of money.",
        },
        {
          term: "cost of living",
          meaning: "The amount of money people need to pay for basic needs such as housing, food, energy, and transport.",
        },
        {
          term: "consumer prices",
          meaning: "The prices paid by ordinary people for goods and services.",
        },
        {
          term: "interest rates",
          meaning: "The cost of borrowing money or the reward for saving money, usually shown as a percentage.",
        },
        {
          term: "wages",
          meaning: "Money that workers earn from their jobs, usually paid hourly, weekly, or monthly.",
        },
      ],
      readingPrompts: [
        "Which parts of daily life are most affected by rising prices?",
        "How might inflation influence decisions by households, businesses, and policymakers?",
        "What tensions can appear when governments try to respond to a cost-of-living crisis?",
      ],
    },
  },
  {
    id: "story-2026-11-24-china-huawei-convicted-of-deceiving-banks",
    headline: "China Huawei convicted of deceiving banks about business in Iran and stealing US trade secrets",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/technology/2026/nov/24/huawei-china-convicted-deceiving-banks-stealing-us-trade-secrets",
    category: "Technology & AI",
    publicationDate: "2026-11-24",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-11-24-china-huawei.jpg",
    imageAlt: "Sidejo de Huawei en Ŝenĵeno 04 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 292,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Huawei’s conviction over banks, Iran-related business, and trade secrets is a major technology-and-geopolitics story involving China, the U.S., sanctions, and corporate conduct. It offers rich vocabulary for understanding legal and business reporting in English.",
    keyVocabulary: [
      "convicted",
      "trade secrets",
      "sanctions",
      "deceiving banks",
      "corporate conduct",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Huawei is a major Chinese technology company, and the headline says it has been convicted in a case involving banks, business connected to Iran, and U.S. trade secrets. Stories like this often combine law, international politics, sanctions, technology competition, and corporate responsibility. Sanctions are restrictions that governments use to limit business with certain countries, organizations, or individuals. Trade secrets are valuable business information that companies try to protect. This topic matters because technology companies often operate across borders, but they must still deal with national security concerns, financial rules, and legal systems in different countries.",
      vocabulary: [
        {
          term: "convicted",
          meaning: "Officially found guilty of a crime in a court of law.",
        },
        {
          term: "trade secrets",
          meaning: "Private business information that gives a company an advantage and is not meant to be shared.",
        },
        {
          term: "sanctions",
          meaning: "Official restrictions used by a government to punish or pressure a country, company, or person.",
        },
        {
          term: "deceiving banks",
          meaning: "Giving banks false or misleading information so they make decisions based on the wrong understanding.",
        },
        {
          term: "corporate conduct",
          meaning: "The way a company behaves, especially in business, legal, and ethical matters.",
        },
      ],
      readingPrompts: [
        "How do legal cases against large technology companies affect international relations?",
        "Why are banks important in cases involving sanctions or restricted business?",
        "What makes trade secrets valuable enough to become a major legal issue?",
      ],
    },
  },
  {
    id: "story-2026-11-24-us-defense-chief-has-yet-to",
    headline: "US defense chief has yet to approve Patriot missiles already allocated to Ukraine, FT reports",
    sourceName: "The Straits Times",
    sourceUrl: "https://www.straitstimes.com/world/europe/us-defense-chief-has-yet-to-approve-patriot-missiles-already-allocated-to-ukraine-ft-reports",
    category: "World & Conflict",
    publicationDate: "2026-11-24",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-11-24-us-defense.jpg",
    imageAlt: "210519-A-SO154-943 - Patriot Missile System operates in Croatia (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 813,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The delay over Patriot missiles already allocated to Ukraine is a concrete development in Western military support for Kyiv. It is a useful follow-up to the broader Ukraine war because it focuses on the practical politics of weapons delivery rather than repeating a general war update.",
    keyVocabulary: [
      "Patriot missiles",
      "allocated",
      "defense chief",
      "military aid",
      "approval",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Patriot missiles are advanced air-defense weapons often discussed in the context of protecting cities, infrastructure, or military positions from aerial attacks. The headline says that U.S. military support already allocated to Ukraine may still need approval from the U.S. defense chief, according to a report. This points to the practical side of military aid: weapons may be promised, assigned, approved, transported, and delivered through different steps. For Ukraine, air-defense support is part of the broader war effort. For the United States and its allies, such decisions involve strategy, politics, military supply, and coordination with partners.",
      vocabulary: [
        {
          term: "Patriot missiles",
          meaning: "A type of advanced air-defense missile system used to detect and intercept incoming threats.",
        },
        {
          term: "allocated",
          meaning: "Set aside or assigned for a particular purpose.",
        },
        {
          term: "defense chief",
          meaning: "A senior official responsible for military or defense policy.",
        },
        {
          term: "military aid",
          meaning: "Support given to another country’s armed forces, such as weapons, training, or equipment.",
        },
        {
          term: "approval",
          meaning: "Official permission for something to happen or move forward.",
        },
      ],
      readingPrompts: [
        "What steps might happen between promising weapons and delivering them?",
        "Why can military aid become a political issue inside the country providing it?",
        "How does air defense fit into the wider discussion of support for Ukraine?",
      ],
    },
  },
];
