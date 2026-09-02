import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for the August 31, 2026 – September 2, 2026 edition, selected
 * automatically by the GDELT + OpenAI pipeline
 * (scripts/generate-real-edition.mjs) following EDITORIAL_POLICY.md.
 * Headlines, sources, URLs, and publication dates are real; "why we chose
 * this," background, vocabulary, and reading prompts are original
 * commentary written for learners, never copied from the articles.
 *
 * Images are real photographs sourced from Wikimedia Commons under their
 * stated free-reuse licenses (see IMAGE_CREDITS.md), per IMAGE_POLICY.md —
 * not publisher photographs, and not necessarily photos of the exact 2026
 * event where noted in imageAlt.
 * Generated: 2026-09-02T08:01:19.218Z
 */
export const stories: NewsStory[] = [
  {
    id: "story-2026-09-01-us-launches-strikes-on-iran-following",
    headline: "US launches strikes on Iran following attempted attacks in Strait",
    sourceName: "BBC",
    sourceUrl: "https://www.bbc.com/news/articles/cj06q4ynpmjo",
    category: "World & Conflict",
    publicationDate: "2026-09-01",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/iran-strait-us-navy-patrol.jpg",
    imageAlt: "A U.S. Navy coastal patrol ship transiting the Strait of Hormuz (file photo, 2020, not a photo of the 2026 strikes)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A new round of U.S. strikes on Iran is a major escalation in one of the world’s most sensitive shipping and security zones. The story is important for understanding how regional conflict can quickly affect global diplomacy, energy markets and everyday prices.",
    keyVocabulary: [
      "airstrike",
      "escalation",
      "shipping lane",
      "retaliation",
      "diplomacy",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "The United States and Iran have a long history of tension, and military action between them can quickly worry other countries. A strait is a narrow sea passage, and some straits are vital routes for oil tankers and other cargo ships. If ships are attacked or governments fear more violence, energy supplies, insurance costs and transport routes can be affected. This is why an airstrike in such an area is not only a military story. It may also influence diplomacy, oil prices and the cost of goods far from the region.",
      vocabulary: [
        {
          term: "airstrike",
          meaning: "An airstrike is an attack from the air, usually by military aircraft or missiles.",
        },
        {
          term: "escalation",
          meaning: "Escalation means a situation becomes more serious, dangerous or intense.",
        },
        {
          term: "shipping lane",
          meaning: "A shipping lane is a regular sea route used by cargo ships and tankers.",
        },
        {
          term: "retaliation",
          meaning: "Retaliation is action taken to punish or respond to an attack or harmful act.",
        },
        {
          term: "diplomacy",
          meaning: "Diplomacy is the work of managing relationships and solving problems between countries.",
        },
      ],
      readingPrompts: [
        "How does the article describe the risk of the conflict spreading?",
        "What connections are made between security and global trade?",
        "Which words show uncertainty, blame or possible future action?",
      ],
    },
  },
  {
    id: "story-2026-09-02-north-korea-next-ruler-kim-jong",
    headline: "North Korea next ruler? Kim Jong-un daughter, Seoul spies say",
    sourceName: "South China Morning Post",
    sourceUrl: "https://www.scmp.com/week-asia/people/article/3366008/north-koreas-next-ruler-kim-jong-uns-daughter-seouls-spies-say",
    category: "Asia Pickup",
    publicationDate: "2026-09-02",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/pyongyang-kim-il-sung-square.jpg",
    imageAlt: "Kim Il-sung Square in Pyongyang, North Korea, the ceremonial center of the country’s political leadership (contextual photo, not a photo of Kim Jong-un’s daughter)",
    imageWidth: 1280,
    imageHeight: 960,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "North Korea’s leadership succession is a major question for regional security, and reports about Kim Jong-un’s daughter help readers follow how governments interpret signals from Pyongyang. The story also introduces useful political and intelligence-related language.",
    keyVocabulary: [
      "successor",
      "spy agency",
      "regime",
      "leadership",
      "heir apparent",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "North Korea’s political system is closely watched because decisions in Pyongyang can affect security across Asia. The headline suggests that South Korean intelligence officials believe Kim Jong-un’s daughter may be connected to future leadership plans. In countries where power is concentrated in one ruling family or small group, outside governments often study public appearances, titles, and media attention for clues. However, such signals can be difficult to confirm, especially when information is limited. For readers, this story is useful for understanding how succession, intelligence reports, and regional security are connected.",
      vocabulary: [
        {
          term: "successor",
          meaning: "A successor is a person who takes over a position or role after someone else.",
        },
        {
          term: "spy agency",
          meaning: "A spy agency is a government organization that secretly collects information about other countries or groups.",
        },
        {
          term: "regime",
          meaning: "A regime is a government, often used when discussing an authoritarian or tightly controlled political system.",
        },
        {
          term: "leadership",
          meaning: "Leadership means the people in charge of an organization, country, or group.",
        },
        {
          term: "heir apparent",
          meaning: "An heir apparent is the person widely expected to become the next leader or ruler.",
        },
      ],
      readingPrompts: [
        "What evidence or signals does the report mention about possible succession?",
        "How certain does the article sound, and what information remains unclear?",
        "Why would South Korea and other governments closely watch North Korea’s leadership? ",
      ],
    },
  },
  {
    id: "story-2026-09-02-global-heating-will-hit-at-least",
    headline: "Global heating will hit at least 1.8C, UN warns, and there are ‘no good outcomes’",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/environment/2026/sep/02/global-heating-warming-1-8c-best-case-scenario-un-united-nations-environment-programme-report",
    category: "World Pickup",
    publicationDate: "2026-09-02",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 5,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/climate-drought-cracked-earth.jpg",
    imageAlt: "Cracked, drought-stricken earth in Morocco, illustrating the kind of extreme heat and water stress linked to global heating",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A UN warning that global heating is likely to pass 1.8C is not just an environmental story; it affects food, migration, disasters and future economic choices. It also helps learners build vocabulary for one of the most important global debates in English.",
    keyVocabulary: [
      "global heating",
      "emissions",
      "climate target",
      "forecast",
      "climate crisis",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Global heating refers to the long-term rise in Earth’s average temperature caused mainly by greenhouse gas emissions. International climate targets often use temperature levels to describe how much warming the world may face. A UN warning that heating could reach at least 1.8C matters because even small-sounding increases can affect food production, water supplies, storms, migration and public health. Climate forecasts are also connected to economic choices, such as energy policy and investment. For English learners, this topic is useful because climate language appears often in news, politics and business discussions.",
      vocabulary: [
        {
          term: "global heating",
          meaning: "Global heating is the increase in Earth’s average temperature, especially because of human activity.",
        },
        {
          term: "emissions",
          meaning: "Emissions are gases or substances released into the air, often from cars, factories or energy production.",
        },
        {
          term: "climate target",
          meaning: "A climate target is a goal set to limit warming or reduce pollution.",
        },
        {
          term: "forecast",
          meaning: "A forecast is a prediction about what is likely to happen in the future.",
        },
        {
          term: "climate crisis",
          meaning: "The climate crisis is the serious set of problems caused by global heating and environmental change.",
        },
      ],
      readingPrompts: [
        "What effects of global heating does the article emphasize most?",
        "How does the article explain risk and uncertainty?",
        "What choices are presented for governments, businesses or individuals?",
      ],
    },
  },
  {
    id: "story-2026-09-01-dan-driscoll-us-army-secretary-resigns",
    headline: "Dan Driscoll: US Army secretary resigns after months of tension",
    sourceName: "BBC",
    sourceUrl: "https://www.bbc.com/news/articles/czjz31dk1xmo",
    category: "U.S. & Politics",
    publicationDate: "2026-09-01",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 3,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/pentagon-building-aerial.jpg",
    imageAlt: "Aerial view of the Pentagon, headquarters of the U.S. Department of Defense (file photo, not a photo of Dan Driscoll)",
    imageWidth: 1280,
    imageHeight: 808,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This story gives readers a clear look at how leadership tensions inside the U.S. defense establishment can become national political news. It is useful for understanding government roles, military administration, and the language of resignations and institutional conflict.",
    keyVocabulary: [
      "army secretary",
      "resign",
      "tension",
      "defense establishment",
      "leadership",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story focuses on the resignation of a senior civilian leader connected to the U.S. Army. In the United States, military organizations are not led only by uniformed officers; they also have civilian officials who help manage policy, budgets, administration, and communication with the wider government. When a high-ranking official leaves after reported tension, it can become important political news because it may suggest disagreement inside a major national institution. For English learners, this article is a useful chance to study formal language about leadership, responsibility, conflict, and leaving a public position.",
      vocabulary: [
        {
          term: "army secretary",
          meaning: "A civilian official who helps oversee and manage the U.S. Army within the government.",
        },
        {
          term: "resign",
          meaning: "To formally leave a job or position, often by personal decision or under pressure.",
        },
        {
          term: "tension",
          meaning: "A state of disagreement, pressure, or difficulty between people or groups.",
        },
        {
          term: "defense establishment",
          meaning: "The people and organizations involved in running a country’s military and defense policy.",
        },
        {
          term: "leadership",
          meaning: "The role or ability of guiding, managing, or making decisions for a group or organization.",
        },
      ],
      readingPrompts: [
        "What reasons or pressures are presented for the resignation?",
        "How does the article describe the relationship between political leaders and military administration?",
        "What formal words are used to discuss disagreement or institutional conflict?",
      ],
    },
  },
  {
    id: "story-2026-09-01-anthropic-signs-us-35-billion-cloud",
    headline: "Anthropic signs US$35 billion cloud deal with Nvidia-backed Lambda, source says",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/business/anthropic-signs-us35-billion-cloud-deal-nvidia-backed-lambda-source-says-6353306",
    category: "Technology & AI",
    publicationDate: "2026-09-01",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/ai-cloud-datacenter-racks.jpg",
    imageAlt: "Rows of server racks inside a data center, the kind of computing infrastructure behind large AI cloud deals",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The huge cloud deal shows how fast AI companies are spending on computing power, and why infrastructure has become central to the AI race. It is a useful business-and-technology story for understanding the scale of today’s AI economy.",
    keyVocabulary: [
      "cloud deal",
      "computing power",
      "AI infrastructure",
      "backed by",
      "data center",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Artificial intelligence companies need large amounts of computing power to train and run advanced AI systems. The headline says Anthropic has signed a US$35 billion cloud deal with Lambda, a company described as backed by Nvidia. This kind of agreement shows that AI development is not only about software, but also about access to chips, servers, and data centers. Cloud providers can offer the infrastructure that AI companies need without every company building everything alone. For readers, the story helps explain why business partnerships and infrastructure spending have become central parts of the AI competition.",
      vocabulary: [
        {
          term: "cloud deal",
          meaning: "A cloud deal is a business agreement to use online computing services such as storage, servers, or processing power.",
        },
        {
          term: "computing power",
          meaning: "Computing power is the ability of computers to process data and perform complex tasks.",
        },
        {
          term: "AI infrastructure",
          meaning: "AI infrastructure means the hardware, software, and facilities needed to build and run artificial intelligence systems.",
        },
        {
          term: "backed by",
          meaning: "Backed by means supported financially or strategically by another person or company.",
        },
        {
          term: "data center",
          meaning: "A data center is a building or facility that holds many computers and servers for storing and processing data.",
        },
      ],
      readingPrompts: [
        "Why do AI companies need so much cloud computing capacity?",
        "What might a very large cloud deal suggest about competition in the AI industry?",
        "How are hardware companies, cloud providers, and AI developers connected in this story?",
      ],
    },
  },
  {
    id: "story-2026-09-01-germany-blames-russia-for-airport-drone",
    headline: "Germany blames Russia for airport drone plot, shuts down consulate",
    sourceName: "NBC News",
    sourceUrl: "https://www.nbcnews.com/world/germany/germany-blames-russia-airport-drone-plot-shuts-consulate-rcna595574",
    category: "World & Conflict",
    publicationDate: "2026-09-01",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/germany-drone-quadcopter.jpg",
    imageAlt: "A consumer quadcopter drone in flight over Berlin, Germany (contextual photo, not a photo of the airport incident)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "Germany blaming Russia for an airport drone plot shows how the Ukraine war’s security risks can spread beyond the battlefield. It is a strong story for understanding modern “hybrid” threats, where drones, cyber activity and diplomacy overlap.",
    keyVocabulary: [
      "drone plot",
      "consulate",
      "hybrid threat",
      "accusation",
      "diplomatic signal",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "Germany and Russia have tense relations, especially in the wider security environment shaped by the war in Ukraine. The headline says Germany blames Russia for an airport drone plot and has shut down a consulate. A consulate is a diplomatic office, so closing one is a serious political signal. Drone incidents around airports are especially worrying because they can threaten safety and disrupt travel. This story also points to the idea of hybrid threats, where countries may face pressure through drones, cyber activity, spying, disinformation or diplomatic conflict rather than only traditional military attacks.",
      vocabulary: [
        {
          term: "drone plot",
          meaning: "A drone plot is an alleged plan involving unmanned flying devices, often for spying, disruption or attack.",
        },
        {
          term: "consulate",
          meaning: "A consulate is a government office in another country that helps citizens and handles some diplomatic work.",
        },
        {
          term: "hybrid threat",
          meaning: "A hybrid threat combines different forms of pressure, such as cyberattacks, drones, spying or propaganda.",
        },
        {
          term: "accusation",
          meaning: "An accusation is a claim that someone has done something wrong or illegal.",
        },
        {
          term: "diplomatic signal",
          meaning: "A diplomatic signal is an action or message used by a government to show its position to another country.",
        },
      ],
      readingPrompts: [
        "What evidence or language does the article use when discussing blame?",
        "Why are drones near airports a serious security concern?",
        "How can diplomatic actions become part of a wider conflict?",
      ],
    },
  },
];
