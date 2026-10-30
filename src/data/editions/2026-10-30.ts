import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the October 24, 2026 – October 27, 2026 edition, selected
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
 * Generated: 2026-10-30T00:49:10.371Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-10-27-chinese-markets-lose-trillions-as-race",
    headline: "Chinese markets lose trillions as race for AI supremacy with US takes its toll",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/world/2026/oct/27/chinese-markets-lose-trillions-ai-race-beijing",
    category: "Business & Economy",
    publicationDate: "2026-10-27",
    estimatedLevel: "C1",
    estimatedReadingMinutes: 6,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-10-27-chinese-markets.jpg",
    imageAlt: "Shanghai Stock Exchange 2 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This connects the AI race to real financial pressure in China, showing that technological competition can reshape markets, investment, and policy. It is a strong business story with clear links to geopolitics and the future of tech.",
    keyVocabulary: [
      "AI supremacy",
      "market losses",
      "investment bubble",
      "tech competition",
      "geopolitics",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The global race to lead in artificial intelligence is not only about software and research; it also affects stock markets, investors, and government strategy. China and the United States are both trying to build stronger AI industries, but rapid investment in a hot technology can create financial risks. When expectations become very high, markets may punish companies or sectors if growth looks uncertain, costs rise, or policy pressure increases. For English learners, this story is useful because it connects business language with geopolitics: technology competition can influence share prices, national planning, and confidence in the wider economy.",
      vocabulary: [
        {
          term: "AI supremacy",
          meaning: "The goal of being the leading country or company in artificial intelligence technology.",
        },
        {
          term: "market losses",
          meaning: "A drop in the value of shares, companies, or financial markets.",
        },
        {
          term: "investment bubble",
          meaning: "A situation where prices rise too high because investors are overly excited, often before falling sharply.",
        },
        {
          term: "tech competition",
          meaning: "Rivalry between countries or companies to develop and control important technologies.",
        },
        {
          term: "geopolitics",
          meaning: "The way geography, power, and international relations affect political and economic decisions.",
        },
      ],
      readingPrompts: [
        "How does competition in technology create pressure on financial markets?",
        "What risks can appear when investors become too excited about a new industry?",
        "How might governments balance innovation with economic stability?",
      ],
    },
  },
  {
    id: "story-2026-10-25-us-military-gives-elon-musk-spacex",
    headline: "US military gives Elon Musk SpaceX access to sensitive tracking data | SpaceX",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/science/2026/oct/25/spacex-access-sensitive-tracking-data",
    category: "Technology & AI",
    publicationDate: "2026-10-25",
    estimatedLevel: "B2+",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-25-us-military.jpg",
    imageAlt: "Iridium-1 Launch (32312419215) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 1920,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The story raises an important question about how much governments now depend on private technology companies for sensitive national-security systems. It is especially useful for understanding the overlap between space, defense, data, and corporate power.",
    keyVocabulary: [
      "sensitive data",
      "tracking system",
      "military contractor",
      "national security",
      "oversight",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Space technology is increasingly connected to national security. Governments often work with private companies to launch satellites, manage communications, or support tracking systems. When a company receives access to sensitive data, it can raise important questions about trust, oversight, and the boundary between public power and private business. SpaceX, led by Elon Musk, is a major private space company, so its relationship with the U.S. military is closely watched. This topic helps learners understand how modern defense no longer depends only on government agencies; it also relies on specialized companies that control key technology and infrastructure.",
      vocabulary: [
        {
          term: "sensitive data",
          meaning: "Information that must be protected because it could cause harm if shared with the wrong people.",
        },
        {
          term: "tracking system",
          meaning: "Technology used to follow the location or movement of objects, vehicles, satellites, or people.",
        },
        {
          term: "military contractor",
          meaning: "A private company paid to provide goods or services to the armed forces.",
        },
        {
          term: "national security",
          meaning: "The protection of a country from threats such as attacks, spying, or major disruption.",
        },
        {
          term: "oversight",
          meaning: "The process of supervising an activity to make sure it is legal, safe, and responsible.",
        },
      ],
      readingPrompts: [
        "What benefits and risks come from governments relying on private technology companies?",
        "Why might access to tracking data be especially sensitive?",
        "Who should be responsible for overseeing private companies that support national security?",
      ],
    },
  },
  {
    id: "story-2026-10-24-iranian-plots-to-kill-u-s",
    headline: "Iranian plots to kill U.S. officials in Middle East have reached advanced stages, intel memo warns",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/middle-east/iranian-plots-kill-us-officials-middle-east-reached-advanced-stages-in-rcna605360",
    category: "World & Conflict",
    publicationDate: "2026-10-24",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-24-iranian-plots.jpg",
    imageAlt: "AH-64 Apache helicopters, 1st Battalion, 227th Aviation Regiment, conduct overflights of the U.S. Embassy in Baghdad, Dec. 31, 2019 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This is a serious escalation risk in an already tense U.S.-Iran environment. The story helps readers follow how intelligence warnings, diplomacy, and military security interact before a crisis becomes visible to the public.",
    keyVocabulary: [
      "intelligence memo",
      "assassination plot",
      "U.S. officials",
      "escalation",
      "diplomacy",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Relations between the United States and Iran have often involved diplomatic tension, security concerns, and the risk of sudden escalation. An intelligence warning about possible plots against U.S. officials is serious because it may affect how governments protect diplomats, military personnel, and other representatives abroad. Intelligence memos are usually meant to help officials understand threats before they become public crises. This kind of story is important for learners because it shows how international conflict can develop quietly through warnings, security planning, and behind-the-scenes decisions, even before any visible event occurs.",
      vocabulary: [
        {
          term: "intelligence memo",
          meaning: "A written warning or report from intelligence officials about a possible threat or security issue.",
        },
        {
          term: "assassination plot",
          meaning: "A secret plan to kill an important political, military, or public figure.",
        },
        {
          term: "U.S. officials",
          meaning: "People who work in official roles for the United States government.",
        },
        {
          term: "escalation",
          meaning: "A situation becoming more serious, dangerous, or intense.",
        },
        {
          term: "diplomacy",
          meaning: "The work of managing relations between countries through talks, negotiation, and official communication.",
        },
      ],
      readingPrompts: [
        "How can intelligence warnings influence government decisions before a crisis happens?",
        "Why are threats against officials especially dangerous for international relations?",
        "What role can diplomacy play when security tensions are rising?",
      ],
    },
  },
  {
    id: "story-2026-10-25-serbia-votes-as-students-seek-to",
    headline: "Serbia votes as students seek to unseat Aleksandar Vucic in snap election",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/europe/serbia-votes-students-seek-unseat-aleksandar-vucic-snap-election-rcna605377",
    category: "World Pickup",
    publicationDate: "2026-10-25",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-25-serbia-votes.png",
    imageAlt: "2023 Serbian election protests, 24 December (1) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 720,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Serbia’s election is a useful window into democratic pressure, student activism, and long-running debates over political power in Europe. It broadens the edition beyond the usual major-power focus while remaining clearly current and consequential.",
    keyVocabulary: [
      "snap election",
      "student movement",
      "opposition",
      "incumbent leader",
      "democratic accountability",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Serbia is holding a snap election, meaning voters are being asked to choose leaders earlier than the normal schedule. The headline highlights student efforts to challenge Aleksandar Vucic, the incumbent leader, which points to wider debates about political power, opposition movements, and democratic accountability. Student activism can be influential because young people often bring energy, visibility, and moral pressure to political campaigns. For learners, this story offers a chance to understand election vocabulary and to think about how public movements can shape politics in European countries that may receive less global attention than larger powers.",
      vocabulary: [
        {
          term: "snap election",
          meaning: "An election that is called earlier than expected, often because of political pressure or strategy.",
        },
        {
          term: "student movement",
          meaning: "Organized political or social action led mainly by students.",
        },
        {
          term: "opposition",
          meaning: "Political parties or groups that challenge the current government or leader.",
        },
        {
          term: "incumbent leader",
          meaning: "The person who already holds a political office and is seeking to keep power.",
        },
        {
          term: "democratic accountability",
          meaning: "The idea that leaders must answer to citizens and can be judged through elections and public criticism.",
        },
      ],
      readingPrompts: [
        "Why might students become important actors in an election?",
        "What advantages does an incumbent leader usually have?",
        "How can a snap election affect the strength of opposition groups?",
      ],
    },
  },
  {
    id: "story-2026-10-25-brazil-election-lula-and-bolsonaro-face",
    headline: "Brazil election: Lula and Bolsonaro face off in second round",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/brazil-votes-in-tight-runoff-between-leftist-lula-and-right-wing-flavio-bolsonaro/a-79753924",
    category: "World Pickup",
    publicationDate: "2026-10-25",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-25-brazil-election.jpg",
    imageAlt: "Brasilia National Congress Buildings (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 883,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Brazil is one of the world’s largest democracies, and a Lula-Bolsonaro runoff would matter far beyond domestic politics. The story gives learners useful context for understanding polarization, elections, and Latin America’s global role.",
    keyVocabulary: [
      "second round",
      "runoff",
      "polarization",
      "campaign",
      "democracy",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Brazil is one of the world’s largest democracies, so its presidential elections attract attention beyond Latin America. A second round, or runoff, happens when no candidate wins enough support in the first vote, so the leading candidates compete again. Lula and Bolsonaro represent different political directions, and their rivalry is often discussed in terms of polarization, meaning society is sharply divided between opposing sides. For English learners, this story is useful because it introduces election language while also showing why Brazil’s political choices can matter internationally, including for regional leadership, democratic debate, and global perceptions of Latin America.",
      vocabulary: [
        {
          term: "second round",
          meaning: "A later stage of an election in which voters choose again, usually between the top candidates.",
        },
        {
          term: "runoff",
          meaning: "A final vote held when no candidate wins enough support in the first round.",
        },
        {
          term: "polarization",
          meaning: "A deep division in society or politics between strongly opposed groups.",
        },
        {
          term: "campaign",
          meaning: "Organized activities by candidates and supporters to win an election.",
        },
        {
          term: "democracy",
          meaning: "A political system in which citizens can choose their leaders through elections.",
        },
      ],
      readingPrompts: [
        "What can a runoff reveal about divisions within a country?",
        "Why might Brazil’s election matter outside Brazil?",
        "How does polarization change the way campaigns are fought?",
      ],
    },
  },
  {
    id: "story-2026-10-24-india-news-china-border-tension-back",
    headline: "India news: China border tension back in focus despite talks",
    sourceName: "DW",
    sourceUrl: "https://www.dw.com/en/india-news-india-china-border-tensions-back-in-focus-despite-ongoing-talks/live-79748098",
    category: "Asia Pickup",
    publicationDate: "2026-10-24",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 3,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-10-24-india-news.jpg",
    imageAlt: "China India CIA map border disputes (contextual photo, not a photo of the actual event)",
    imageWidth: 652,
    imageHeight: 490,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "India-China border tensions remain one of Asia’s most important security issues, even when talks are under way. This story is worth reading because it shows how diplomacy and military pressure can exist at the same time.",
    keyVocabulary: [
      "border tension",
      "diplomatic talks",
      "disputed territory",
      "military presence",
      "regional stability",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "India and China are two major Asian powers, and tension along their shared border is an important security issue. Some border areas are disputed, meaning the two sides do not fully agree on control or boundaries. Even when diplomatic talks are taking place, military presence near sensitive areas can keep pressure high. This story helps learners understand that diplomacy and confrontation can happen at the same time: countries may speak with each other while also preparing for possible conflict. The topic matters because India-China relations affect regional stability, security planning, and the broader balance of power in Asia.",
      vocabulary: [
        {
          term: "border tension",
          meaning: "Stress or conflict between countries over activity or control near a shared border.",
        },
        {
          term: "diplomatic talks",
          meaning: "Official discussions between governments to manage problems or improve relations.",
        },
        {
          term: "disputed territory",
          meaning: "Land claimed or controlled in different ways by more than one country or group.",
        },
        {
          term: "military presence",
          meaning: "The stationing or movement of armed forces in a particular area.",
        },
        {
          term: "regional stability",
          meaning: "A situation in which nearby countries are relatively peaceful and unlikely to enter conflict.",
        },
      ],
      readingPrompts: [
        "How can talks continue while military pressure remains high?",
        "Why are disputed borders difficult to resolve?",
        "What could border tensions mean for the wider region?",
      ],
    },
  },
];
