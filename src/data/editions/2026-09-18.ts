import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the September 11, 2026 – September 13, 2026 edition, selected
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
 * Generated: 2026-09-17T23:37:42.710Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-09-11-hong-kong-tiananmen-activists-sentenced-to",
    headline: "Hong Kong Tiananmen activists sentenced to up to seven years in prison",
    sourceName: "BBC",
    sourceUrl: "https://www.bbc.com/news/articles/cvgyvk2djk4o",
    category: "Asia Pickup",
    publicationDate: "2026-09-11",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-11-hong-kong.jpg",
    imageAlt: "North Kowloon Magistracy No 1 Court (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The sentencing of Hong Kong Tiananmen vigil activists is a significant development in the city political and legal climate. It also helps readers understand terms often used in coverage of civil liberties, national security laws, and political memory.",
    keyVocabulary: [
      "sentenced",
      "activists",
      "vigil",
      "national security",
      "civil liberties",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story concerns activists in Hong Kong connected with public remembrance of Tiananmen, a highly sensitive topic in Chinese political history. A vigil is a gathering, often quiet or symbolic, to remember an event or show support for a cause. The headline says the activists were sentenced to prison, so the article is likely to focus on the legal consequences they faced and what this means for civil liberties in Hong Kong. For learners, the story is important because it brings together law, protest, political memory, and national security language often used in reporting on Hong Kong.",
      vocabulary: [
        {
          term: "sentenced",
          meaning: "Given an official punishment by a court after being found guilty of a crime.",
        },
        {
          term: "activists",
          meaning: "People who work publicly to support political, social, or environmental change.",
        },
        {
          term: "vigil",
          meaning: "A quiet public gathering, often held to remember someone or something or to show support for a cause.",
        },
        {
          term: "national security",
          meaning: "The protection of a country or territory from threats to its safety, government, or stability.",
        },
        {
          term: "civil liberties",
          meaning: "Basic freedoms such as speech, assembly, and political expression that are protected by law in many societies.",
        },
      ],
      readingPrompts: [
        "How does the article connect law and political expression?",
        "What words are used to describe the activists and their actions?",
        "What might this case suggest about public memory in Hong Kong?",
      ],
    },
  },
  {
    id: "story-2026-09-11-california-enacts-new-curbs-on-social",
    headline: "California enacts new curbs on social media for children",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/tech/tech-news/california-enacts-new-curbs-social-media-children-rcna597179",
    category: "Technology & AI",
    publicationDate: "2026-09-11",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-11-california-enacts.jpg",
    imageAlt: "Blue hour front view of California State Capitol dllu 2018 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 944,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "California often influences wider technology policy, so new limits on social media for children matter beyond one U.S. state. The story is useful for learning language around online safety, regulation, and children rights.",
    keyVocabulary: [
      "curbs",
      "social media",
      "enacts",
      "children",
      "online safety",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "California is one of the most influential U.S. states in technology policy because many major tech companies operate there or pay close attention to its rules. The headline says the state has enacted new curbs on social media for children, meaning it has officially introduced limits or restrictions. This topic matters because governments are increasingly debating how to protect young users online while also considering privacy, free expression, and the role of parents and companies. For English learners, the story is useful for understanding common language about digital regulation, online safety, and children’s rights.",
      vocabulary: [
        {
          term: "curbs",
          meaning: "Limits or controls placed on something to reduce possible harm or risk.",
        },
        {
          term: "social media",
          meaning: "Websites and apps that let people share content, communicate, and follow others online.",
        },
        {
          term: "enacts",
          meaning: "Officially makes a rule or law come into effect.",
        },
        {
          term: "children",
          meaning: "Young people who are not yet adults.",
        },
        {
          term: "online safety",
          meaning: "The effort to protect people from harm, risk, or abuse when they use the internet.",
        },
      ],
      readingPrompts: [
        "What problem are the new rules trying to address?",
        "How might children, parents, and tech companies view the curbs differently?",
        "Why could a California law matter outside California?",
      ],
    },
  },
  {
    id: "story-2026-09-11-ai-firm-anthropic-says-it-disrupted",
    headline: "AI firm Anthropic says it disrupted election manipulation operation targeting voters in Malaysia",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/asia/anthropic-disrupt-malaysia-election-manipulation-operation-6377936",
    category: "Technology & AI",
    publicationDate: "2026-09-11",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-11-ai-firm.jpg",
    imageAlt: "Floral clock at Parliament of Malaysia (Landscape) (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "An AI company disrupting an election manipulation operation in Malaysia is a concrete example of how generative AI can affect politics outside the U.S. and Europe. It combines technology, democracy, and regional relevance in a timely way.",
    keyVocabulary: [
      "disrupted",
      "election manipulation",
      "targeting",
      "voters",
      "generative AI",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Anthropic is an artificial intelligence company, and the headline says it disrupted an election manipulation operation targeting voters in Malaysia. Election manipulation means attempts to unfairly influence voters or the democratic process, often through misleading messages, fake content, or coordinated activity. This story matters because it shows how AI tools and AI companies can become involved in protecting political systems, not only in the U.S. or Europe but also in Asia. Readers should pay attention to how the article explains the threat, the company’s response, and the wider risks of generative AI in elections.",
      vocabulary: [
        {
          term: "disrupted",
          meaning: "Stopped or interfered with something so that it could not continue as planned.",
        },
        {
          term: "election manipulation",
          meaning: "Unfair or deceptive efforts to influence how people vote or how an election is understood.",
        },
        {
          term: "targeting",
          meaning: "Choosing a person or group as the focus of an action, message, or attack.",
        },
        {
          term: "voters",
          meaning: "People who are able to take part in an election by choosing a candidate or option.",
        },
        {
          term: "generative AI",
          meaning: "Artificial intelligence that can create new text, images, audio, or other content.",
        },
      ],
      readingPrompts: [
        "What role does the AI company play in the story?",
        "How could AI make election manipulation easier or harder to detect?",
        "Why is Malaysia an important setting for this discussion?",
      ],
    },
  },
  {
    id: "story-2026-09-13-india-pakistan-water-row-deepens-after",
    headline: "India-Pakistan water row deepens after Hague court ruling",
    sourceName: "South China Morning Post",
    sourceUrl: "https://www.scmp.com/week-asia/politics/article/3367223/india-pakistan-water-row-deepens-after-hague-court-ruling",
    category: "Asia Pickup",
    publicationDate: "2026-09-13",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-13-india-pakistan.jpg",
    imageAlt: "International Court of Justice HQ 2006 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 955,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The India-Pakistan water dispute is a serious regional issue involving law, resources, and long-running tensions between nuclear-armed neighbors. A Hague court ruling gives the story a clear current news peg.",
    keyVocabulary: [
      "water row",
      "deepens",
      "court ruling",
      "dispute",
      "resources",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "India and Pakistan have a long and difficult relationship, and water is one of the sensitive issues between them. A water row means a serious disagreement over water resources, which can involve access, management, and legal rights. The headline says the row has deepened after a court ruling in The Hague, giving the dispute a new legal and diplomatic focus. Because both countries are major regional powers and nuclear-armed neighbors, tensions between them are closely watched. For learners, this article offers useful language about international law, shared resources, and disputes that combine geography, politics, and security.",
      vocabulary: [
        {
          term: "water row",
          meaning: "A serious disagreement or argument about the use or control of water resources.",
        },
        {
          term: "deepens",
          meaning: "Becomes more serious, intense, or difficult to solve.",
        },
        {
          term: "court ruling",
          meaning: "An official decision made by a court.",
        },
        {
          term: "dispute",
          meaning: "A disagreement or argument between people, groups, or countries.",
        },
        {
          term: "resources",
          meaning: "Useful supplies or materials, such as water, energy, land, or money, that people or countries need.",
        },
      ],
      readingPrompts: [
        "How does the court ruling affect the tone of the dispute?",
        "Why can water become a security issue between countries?",
        "What language shows whether the situation is improving or worsening?",
      ],
    },
  },
  {
    id: "story-2026-09-12-china-threatens-to-cancel-summit-if",
    headline: "China threatens to cancel summit if US approves new arms sales to Taiwan",
    sourceName: "The Straits Times",
    sourceUrl: "https://www.straitstimes.com/world/china-threatens-to-cancel-summit-if-us-approves-new-arms-sales-to-taiwan",
    category: "World & Conflict",
    publicationDate: "2026-09-12",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/story-2026-09-12-china-threatens.jpg",
    imageAlt: "Taipei Taiwan Presidential-Office-Building-01 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 728,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A Chinese warning over possible U.S. arms sales to Taiwan is an important signal in one of the world most sensitive security relationships. The story gives learners useful background on deterrence, diplomacy, and cross-strait tensions.",
    keyVocabulary: [
      "arms sales",
      "summit",
      "threatens",
      "Taiwan",
      "deterrence",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story focuses on tensions among China, the United States, and Taiwan. The headline says China has warned it may cancel a summit if the U.S. approves new arms sales to Taiwan. Arms sales are politically sensitive because they are connected to defense, deterrence, and the balance of power. A summit is usually a high-level diplomatic meeting, so threatening to cancel one can be a way to send a strong political message. For learners, the story is useful for understanding vocabulary about diplomacy, security policy, and cross-strait tensions, one of the most closely watched issues in international relations.",
      vocabulary: [
        {
          term: "arms sales",
          meaning: "The selling of weapons or military equipment from one government or company to another country or territory.",
        },
        {
          term: "summit",
          meaning: "An important meeting between top political leaders or officials.",
        },
        {
          term: "threatens",
          meaning: "Warns that it may take a serious action if something happens.",
        },
        {
          term: "Taiwan",
          meaning: "An island and political entity at the center of a sensitive relationship involving China and the United States.",
        },
        {
          term: "deterrence",
          meaning: "The use of strength or preparedness to discourage another side from taking unwanted action.",
        },
      ],
      readingPrompts: [
        "What message is China trying to send through the warning?",
        "How are arms sales connected to diplomacy in this story?",
        "What makes Taiwan-related issues so sensitive internationally?",
      ],
    },
  },
  {
    id: "story-2026-09-11-iea-warns-2026-oil-supply-gap",
    headline: "IEA warns 2026 oil supply gap will widen on delayed return of normal Gulf flows",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/world/iea-warns-2026-oil-supply-gap-will-widen-delayed-return-normal-gulf-flows-6378336",
    category: "Business & Economy",
    publicationDate: "2026-09-11",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/story-2026-09-11-iea-warns.jpg",
    imageAlt: "Unmooring and departure of the Oil & Chemical Tanker Gulf Muttrah from BP Oil Refinery Jetty, Kwinana, October 2021 24 (contextual photo, not a photo of the actual event)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Oil supply warnings from the IEA connect global energy markets with instability in the Gulf, making this a strong economy story with real-world consequences. It is also useful for learning common business and energy vocabulary.",
    keyVocabulary: [
      "oil supply",
      "gap",
      "Gulf flows",
      "IEA",
      "widen",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The IEA, or International Energy Agency, is often cited in reporting on global energy markets. The headline says it warns that a 2026 oil supply gap will widen because the return of normal Gulf flows has been delayed. An oil supply gap suggests a difference between how much oil is expected to be available and how much may be needed. Gulf flows refers generally to oil movement linked to the Gulf region, an important area for global energy. This story matters because oil supply can affect prices, business planning, transport costs, and the wider economy, especially when regional instability slows a return to normal conditions.",
      vocabulary: [
        {
          term: "oil supply",
          meaning: "The amount of oil available for use or sale in the market.",
        },
        {
          term: "gap",
          meaning: "A difference between what is needed or expected and what is actually available.",
        },
        {
          term: "Gulf flows",
          meaning: "The movement or supply of oil connected to the Gulf region.",
        },
        {
          term: "IEA",
          meaning: "The International Energy Agency, an organization that provides analysis and advice on energy markets and policy.",
        },
        {
          term: "widen",
          meaning: "To become larger or greater in size, amount, or difference.",
        },
      ],
      readingPrompts: [
        "What does the article suggest about future oil availability?",
        "How might delayed Gulf flows affect the global economy?",
        "Which words in the article signal uncertainty or risk?",
      ],
    },
  },
];
