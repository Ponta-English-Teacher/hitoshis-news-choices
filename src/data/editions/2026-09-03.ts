import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the August 29, 2026 – September 2, 2026 edition, selected
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
 * Generated: 2026-09-03T05:07:08.959Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-09-02-federal-judge-blocks-trumps-newest-attempt",
    headline: "Federal judge blocks Trump's newest attempt to crack down on birthright citizenship",
    sourceName: "CNN",
    sourceUrl: "https://www.cnn.com/2026/09/02/politics/judge-blocks-trumps-latest-birthright-citizenship-order",
    category: "U.S. & Politics",
    publicationDate: "2026-09-02",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-02-federal-judge.jpg",
    imageAlt: "US Supreme Court (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Birthright citizenship is a foundational constitutional issue in the United States, and another court block keeps a major immigration fight in the spotlight. The story is useful for understanding how executive power, courts, and citizenship rights interact.",
    keyVocabulary: [
      "birthright citizenship",
      "federal judge",
      "injunction",
      "executive order",
      "constitutional",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Birthright citizenship means that a person born in a country automatically becomes a citizen of that country. In the United States, this idea is closely connected to the Constitution and has long been part of debates over immigration and national identity. When a president tries to change how citizenship rules are applied, courts may be asked to decide whether that action is legal. A federal judge can temporarily stop a government policy while legal arguments continue. This story matters because it shows the tension between presidential power, constitutional rights, and the role of judges in the U.S. political system.",
      vocabulary: [
        {
          term: "birthright citizenship",
          meaning: "The rule that a person can become a citizen automatically because they were born in a particular country.",
        },
        {
          term: "federal judge",
          meaning: "A judge who works in the national court system of a country, rather than in a state or local court.",
        },
        {
          term: "injunction",
          meaning: "A court order that tells someone to stop doing something, often while a case is still being decided.",
        },
        {
          term: "executive order",
          meaning: "An official instruction from a president or head of government about how the government should act.",
        },
        {
          term: "constitutional",
          meaning: "Related to the basic legal document that sets out a country’s government and rights.",
        },
      ],
      readingPrompts: [
        "What powers does the story suggest a president has, and where might those powers have limits?",
        "How does the court’s role affect the future of the policy?",
        "Why might citizenship rules create strong political debate?",
      ],
    },
  },
  {
    id: "story-2026-09-02-google-defeats-u-s-bid-to",
    headline: "Google defeats U.S. bid to force ad tech sale",
    sourceName: "CNBC",
    sourceUrl: "https://www.cnbc.com/2026/09/02/google-defeats-us-bid-to-force-ad-tech-sale.html",
    category: "Technology & AI",
    publicationDate: "2026-09-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-02-google-defeats.jpg",
    imageAlt: "El car on the roof of the Google office in Chicago (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The Google ad-tech ruling is a major development in the long-running effort to rein in Big Tech through antitrust law. It also helps readers learn the business language behind online advertising and competition policy.",
    keyVocabulary: [
      "antitrust",
      "ad tech",
      "break up",
      "competition",
      "ruling",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Google is one of the world’s largest technology companies, and online advertising is a major part of its business. “Ad tech” refers to the tools and systems that help companies buy, sell, and place digital ads. Governments sometimes use antitrust law to challenge large companies when they believe competition may be harmed. A possible forced sale, or breakup, would be a serious step because it could change how a company operates. This story is useful for understanding how law, technology, and business power connect, especially in debates about whether Big Tech companies have too much control over digital markets.",
      vocabulary: [
        {
          term: "antitrust",
          meaning: "Laws and actions meant to prevent companies from unfairly controlling a market or limiting competition.",
        },
        {
          term: "ad tech",
          meaning: "Technology used to buy, sell, manage, and show advertisements online.",
        },
        {
          term: "break up",
          meaning: "To divide a large company into smaller parts, often because of competition concerns.",
        },
        {
          term: "competition",
          meaning: "The situation in which different companies try to win customers in the same market.",
        },
        {
          term: "ruling",
          meaning: "An official decision made by a court or judge.",
        },
      ],
      readingPrompts: [
        "How might control of advertising technology affect businesses and internet users?",
        "What does this story show about the difficulty of regulating large technology companies?",
        "Why might governments want to use antitrust law against Big Tech?",
      ],
    },
  },
  {
    id: "story-2026-09-02-global-bond-rout-gathers-pace-as",
    headline: "Global bond rout gathers pace as inflation fears mount",
    sourceName: "CNBC",
    sourceUrl: "https://www.cnbc.com/2026/09/02/global-bond-yields-inflation-rates.html",
    category: "Business & Economy",
    publicationDate: "2026-09-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 3,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-02-global-bond.jpg",
    imageAlt: "New York Stock Exchange August 2017 04 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1917,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A global bond selloff affects government borrowing, mortgages, currencies, and stock markets, making it an important economic story beyond daily market noise. It is also a strong vocabulary story for learners following financial news.",
    keyVocabulary: [
      "bond rout",
      "yields",
      "inflation fears",
      "borrowing costs",
      "selloff",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Bonds are a way for governments or companies to borrow money from investors. When many investors sell bonds, prices can fall and yields often rise. Higher yields can make borrowing more expensive for governments, businesses, and households. Inflation fears are important because investors may demand higher returns if they think money will lose value over time. A global bond rout can therefore affect many parts of the economy, including mortgages, currencies, and stock markets. This story helps readers understand why financial news about bonds is not only for professional investors but can also influence everyday economic conditions.",
      vocabulary: [
        {
          term: "bond rout",
          meaning: "A sharp and widespread fall in bond prices as many investors sell bonds.",
        },
        {
          term: "yields",
          meaning: "The return investors receive from holding a bond, often moving in the opposite direction from the bond’s price.",
        },
        {
          term: "inflation fears",
          meaning: "Concerns that prices will keep rising and money will buy less in the future.",
        },
        {
          term: "borrowing costs",
          meaning: "The amount of money a person, company, or government must pay to borrow funds.",
        },
        {
          term: "selloff",
          meaning: "A period when many investors sell an asset, causing its price to fall.",
        },
      ],
      readingPrompts: [
        "How could rising bond yields affect people outside the financial industry?",
        "What links does the story make between inflation worries and market behavior?",
        "Why might bond markets influence stocks, currencies, or mortgages?",
      ],
    },
  },
  {
    id: "story-2026-09-01-u-n-world-food-programme-slashes",
    headline: "U.N. World Food Programme slashes West Bank aid, Gaza faces new cuts",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/middle-east/un-world-food-programme-slashes-west-bank-aid-gaza-faces-new-cuts-rcna595497",
    category: "World & Conflict",
    publicationDate: "2026-09-01",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-01-u-n.jpg",
    imageAlt: "WFP World Food Programme sack Gaza strip (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1707,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Cuts to food aid in the West Bank and Gaza add another layer to an already severe humanitarian crisis. The story connects conflict, international funding, and daily survival in clear real-world terms.",
    keyVocabulary: [
      "food aid",
      "funding shortfall",
      "humanitarian crisis",
      "ration",
      "slashes",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The U.N. World Food Programme is an international organization that helps provide food to people facing hunger and crisis. In places affected by conflict, food aid can be essential for daily survival, especially when normal jobs, markets, and supply routes are disrupted. The West Bank and Gaza are both central to a long-running conflict, and humanitarian needs there are closely watched by the international community. When aid is reduced because of limited funding, families may receive less support or face harder choices. This story matters because it connects global donations, political conflict, and the basic human need for food.",
      vocabulary: [
        {
          term: "food aid",
          meaning: "Food or food-related support given to people who do not have enough to eat.",
        },
        {
          term: "funding shortfall",
          meaning: "A situation where there is not enough money to pay for planned work or services.",
        },
        {
          term: "humanitarian crisis",
          meaning: "A serious situation in which many people urgently need help such as food, water, shelter, or medical care.",
        },
        {
          term: "ration",
          meaning: "A limited amount of food or supplies given to each person or family.",
        },
        {
          term: "slashes",
          meaning: "Cuts or reduces something sharply.",
        },
      ],
      readingPrompts: [
        "How do funding decisions affect people living through conflict?",
        "What challenges might aid organizations face when needs are high but resources are limited?",
        "Why is food aid both a humanitarian issue and a political issue?",
      ],
    },
  },
  {
    id: "story-2026-08-29-trump-says-u-s-has-entered",
    headline: "Trump says U.S. has entered deal with Venezuela to take control of 65 billion barrels of oil reserves",
    sourceName: "NPR",
    sourceUrl: "https://www.npr.org/2026/08/28/nx-s1-5948229/trump-says-u-s-has-entered-deal-with-venezuela-to-take-control-of-65-billion-barrels-of-oil-reserves",
    category: "Business & Economy",
    publicationDate: "2026-08-29",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-08-29-trump-says.jpg",
    imageAlt: "Anacortes Refinery 31911 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 950,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The reported U.S.-Venezuela oil deal is important because it combines energy markets, foreign policy, and questions of national control over natural resources. It is likely to shape debate over fuel prices, sanctions, and U.S. influence in Latin America.",
    keyVocabulary: [
      "oil reserves",
      "sanctions",
      "energy deal",
      "state control",
      "natural resources",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Oil reserves are underground supplies of oil that a country or company may be able to use in the future. Venezuela is known as an oil-rich country, and questions about who controls its energy resources can have major political and economic importance. A claimed energy deal involving the United States and Venezuela would raise issues about foreign policy, sanctions, fuel prices, and national control over natural resources. Oil is not only a business product; it is also connected to government power and international influence. This story is important because it combines energy markets with diplomacy and debate over control of valuable resources.",
      vocabulary: [
        {
          term: "oil reserves",
          meaning: "Known supplies of oil underground that may be possible to produce and sell.",
        },
        {
          term: "sanctions",
          meaning: "Penalties or restrictions used by one country or group of countries to pressure another government.",
        },
        {
          term: "energy deal",
          meaning: "An agreement involving the production, control, sale, or transport of energy resources such as oil or gas.",
        },
        {
          term: "state control",
          meaning: "A situation where a government has power over an industry, company, or resource.",
        },
        {
          term: "natural resources",
          meaning: "Materials such as oil, gas, minerals, water, or forests that come from the earth and can be used by people.",
        },
      ],
      readingPrompts: [
        "What questions does the story raise about who should control a country’s natural resources?",
        "How could an oil-related agreement affect foreign policy and energy markets?",
        "Why might sanctions be important in understanding U.S.-Venezuela relations?",
      ],
    },
  },
  {
    id: "story-2026-09-02-hong-kong-activist-joshua-wong-pleads",
    headline: "Hong Kong activist Joshua Wong pleads guilty to collusion",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/hong-kong-activist-joshua-wong-pleads-guilty-to-collusion/a-78657525",
    category: "Asia Pickup",
    publicationDate: "2026-09-02",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-02-hong-kong.jpg",
    imageAlt: "HK NothKowloonMagistracy (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 916,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Joshua Wong’s guilty plea is a significant moment in Hong Kong’s continuing political transformation under national security laws. It gives learners useful context for understanding rights, activism, and Beijing’s influence in the city.",
    keyVocabulary: [
      "collusion",
      "activist",
      "national security law",
      "plead guilty",
      "rights",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Joshua Wong is known internationally as a Hong Kong activist, and his legal situation is connected to broader changes in the city’s political environment. An activist is someone who campaigns for social or political change. In Hong Kong, national security laws have become central to debates about rights, public protest, and Beijing’s influence. To plead guilty means to formally accept guilt in a court case. This story matters because it helps readers understand how legal systems can shape political movements and how questions of security, freedom of expression, and activism remain important in Hong Kong’s relationship with mainland China.",
      vocabulary: [
        {
          term: "collusion",
          meaning: "Secret or improper cooperation, often with another person, group, or country.",
        },
        {
          term: "activist",
          meaning: "A person who works publicly to support political or social change.",
        },
        {
          term: "national security law",
          meaning: "A law intended to protect a country or territory from threats to its safety or political order.",
        },
        {
          term: "plead guilty",
          meaning: "To formally tell a court that one accepts responsibility for a crime.",
        },
        {
          term: "rights",
          meaning: "Basic freedoms and protections that people are considered to have under law or society.",
        },
      ],
      readingPrompts: [
        "How does the story connect individual activism with larger political change in Hong Kong?",
        "What tensions can exist between national security and civil rights?",
        "Why might a guilty plea in a political case attract international attention?",
      ],
    },
  },
];
