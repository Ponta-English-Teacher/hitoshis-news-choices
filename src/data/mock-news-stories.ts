import type { NewsStory } from "@/types/news-story";

/**
 * Real current news stories for this week's edition, selected automatically
 * by the GDELT + OpenAI pipeline (scripts/generate-real-edition.mjs)
 * following EDITORIAL_POLICY.md. Headlines, sources, URLs, and publication
 * dates are real; "why we chose this," background, vocabulary, and reading
 * prompts are original commentary written for learners, never copied from
 * the articles. Story images are real photographs sourced from Wikimedia
 * Commons under their stated free-reuse licenses (see IMAGE_CREDITS.md) —
 * not publisher photographs, and not necessarily photos of the exact 2026
 * event where noted in imageAlt. See TECHNICAL_DECISIONS.md for the
 * discovery/selection pipeline.
 * Generated: 2026-09-01T13:36:49.006Z
 */
export const mockNewsStories: NewsStory[] = [
  {
    id: "story-2026-09-01-ive-never-been-to-afghanistan-six",
    headline: "I've never been to Afghanistan: Six million deportees forced to start over under the Taliban",
    sourceName: "BBC",
    sourceUrl: "https://www.bbc.com/news/articles/c2e074nn8eko",
    category: "Asia Pickup",
    publicationDate: "2026-09-01",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 6,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/afghan-refugee-camp-pakistan.jpg",
    imageAlt: "An Afghan refugee camp in Pakistan",
    imageWidth: 1280,
    imageHeight: 956,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "This story gives a human view of a huge regional crisis: millions of Afghans being pushed into a country many barely know, now ruled by the Taliban. It is important, current, and useful for learning language around migration, identity, and political instability.",
    keyVocabulary: [
      "deportee",
      "Taliban",
      "start over",
      "forced return",
      "identity",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story looks at Afghans who are being sent back to Afghanistan at a time when the country is ruled by the Taliban. The headline describes a much larger movement of six million deportees, while the verified details note that, by August, another one million people had been forced to return this year from Pakistan and Iran. For English learners, the story offers useful context for words such as deportee, returnee, border, identity, and resettlement. It also shows that “going back” does not always mean returning to a familiar home, especially for people who may have spent much of their lives outside Afghanistan.",
      vocabulary: [
        {
          term: "deportee",
          meaning: "A deportee is a person who is officially sent out of a country by the government.",
        },
        {
          term: "Taliban",
          meaning: "The Taliban is the political and military group currently ruling Afghanistan.",
        },
        {
          term: "start over",
          meaning: "To start over means to begin a new life or situation again after a major change.",
        },
        {
          term: "forced return",
          meaning: "A forced return happens when people must go back to a country even if they do not want to.",
        },
        {
          term: "identity",
          meaning: "Identity means how people understand who they are, including their culture, nationality, language, and personal history.",
        },
      ],
      readingPrompts: [
        "How might someone feel if they are sent to a country they do not really know?",
        "What challenges can people face when they have to start life again?",
        "How does political instability affect ordinary families and individuals?",
      ],
    },
  },
  {
    id: "story-2026-09-01-nepal-tibet-toll-tops-1-000",
    headline: "Nepal-Tibet toll tops 1,000 as tunnel rescue offers last hope",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/asia/nepal-tibet-toll-1000-rescue-tunnel-6354286",
    category: "World & Conflict",
    publicationDate: "2026-09-01",
    estimatedLevel: "B1",
    estimatedReadingMinutes: 3,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/nepal-tibet-flood-satellite.jpg",
    imageAlt: "Satellite image of the Nepal flash flood, captured by ESA's Copernicus Sentinel-2 mission in August 2026",
    imageWidth: 1280,
    imageHeight: 1600,
    imageSourceType: "licensed-real",
    whyWeChoseThis: "The Nepal-Tibet floods are one of the week’s deadliest disasters, with rescue efforts still unfolding. The story also helps readers connect extreme weather, mountain geography, and disaster response.",
    keyVocabulary: [
      "flood toll",
      "rescue effort",
      "tunnel",
      "missing people",
      "extreme weather",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story focuses on a deadly Nepal-Tibet disaster in which the reported toll has risen above 1,000, while a tunnel rescue is described as a final source of hope. The verified figures show the scale of uncertainty that remains: nearly 4,500 people are still missing, including 3,916 in Nepal and 546 in China’s Tibet. For learners, the article is useful for understanding disaster-response language such as toll, missing, rescue, tunnel, and last hope. It also highlights how reports from mountain regions can involve more than one country or territory, making numbers and rescue information especially important to read carefully.",
      vocabulary: [
        {
          term: "flood toll",
          meaning: "A flood toll is the number of people killed, injured, or affected by a flood.",
        },
        {
          term: "rescue effort",
          meaning: "A rescue effort is organized work to save people from danger.",
        },
        {
          term: "tunnel",
          meaning: "A tunnel is a passage built through or under the ground, a mountain, or another barrier.",
        },
        {
          term: "missing people",
          meaning: "Missing people are people whose location is unknown and who may be in danger.",
        },
        {
          term: "extreme weather",
          meaning: "Extreme weather means very severe weather, such as heavy rain, floods, storms, or heat.",
        },
      ],
      readingPrompts: [
        "Why can rescue work be harder in mountain areas?",
        "What kinds of support do communities need after a major flood?",
        "How might extreme weather change the risks people face in daily life?",
      ],
    },
  },
  {
    id: "story-2026-08-31-us-and-iran-exchange-fire-for",
    headline: "US and Iran exchange fire for first time in a month",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/watch/us-and-iran-exchange-fire-first-time-in-month-6352296",
    category: "World & Conflict",
    publicationDate: "2026-08-31",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 3,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/us-navy-strait-of-hormuz.jpg",
    imageAlt: "A U.S. Navy carrier strike group transiting the Strait of Hormuz (file photo, 2023, not a photo of the 2026 incident)",
    imageWidth: 1280,
    imageHeight: 853,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A renewed exchange of fire between the U.S. and Iran is a major escalation with possible consequences for regional security and global energy markets. It is a concise way for learners to follow a fast-moving international conflict.",
    keyVocabulary: [
      "exchange fire",
      "escalation",
      "military strike",
      "ceasefire",
      "regional security",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This story describes a renewed exchange of fire between the United States and Iran in the Middle East, the first such exchange in a month according to the headline. The verified details say Tehran targeted US military sites in the Gulf after Washington attacked rocket launchers on Iran’s Larak island in the Strait of Hormuz. US Central Command also rejected Tehran’s claim that the strike was an “act of aggression.” For English learners, this is a useful article for vocabulary around military action and diplomacy, including terms such as target, military site, rocket launcher, accusation, and aggression. It also shows how each side may describe the same event differently.",
      vocabulary: [
        {
          term: "exchange fire",
          meaning: "To exchange fire means that two sides shoot or attack each other.",
        },
        {
          term: "escalation",
          meaning: "Escalation is a situation becoming more serious, dangerous, or intense.",
        },
        {
          term: "military strike",
          meaning: "A military strike is an attack carried out by armed forces.",
        },
        {
          term: "ceasefire",
          meaning: "A ceasefire is an agreement or period when fighting is supposed to stop.",
        },
        {
          term: "regional security",
          meaning: "Regional security means the safety and stability of countries in a particular area.",
        },
      ],
      readingPrompts: [
        "What words in the article suggest the conflict is becoming more serious?",
        "How might one military incident affect nearby countries?",
        "Why can conflicts in one region influence global markets?",
      ],
    },
  },
  {
    id: "story-2026-08-31-us-trade-regulator-and-22-states",
    headline: "US trade regulator and 22 states accuse Amazon of taking $20bn with secret surcharges",
    sourceName: "The Guardian",
    sourceUrl: "https://www.theguardian.com/technology/2026/aug/31/amazon-advertising-lawsuit",
    category: "Business & Economy",
    publicationDate: "2026-08-31",
    estimatedLevel: "B2",
    estimatedReadingMinutes: 4,
    trendingScore: 4,
    significanceScore: 4,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/amazon-fulfillment-center.jpg",
    imageAlt: "An Amazon fulfillment center in Shakopee, Minnesota",
    imageWidth: 1280,
    imageHeight: 854,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "The Amazon lawsuit is a major business and consumer-protection story involving online advertising, state governments, and alleged hidden charges. It offers useful vocabulary for understanding regulation of large technology platforms.",
    keyVocabulary: [
      "trade regulator",
      "surcharge",
      "advertising practices",
      "lawsuit",
      "consumer protection",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This business story centers on a lawsuit against Amazon brought by the US Federal Trade Commission and 22 states. According to the headline, regulators accuse the company of taking $20 billion through secret surcharges. The verified description says the FTC alleges that the online retailer overcharged advertisers in a hidden and systematic way over a period of years. For learners, the article is a good chance to study consumer-protection and business vocabulary such as regulator, lawsuit, surcharge, advertiser, overcharge, and allege. It also shows how large online platforms can face legal challenges not only from national agencies, but also from state governments.",
      vocabulary: [
        {
          term: "trade regulator",
          meaning: "A trade regulator is a government body that checks whether companies follow business and market rules.",
        },
        {
          term: "surcharge",
          meaning: "A surcharge is an extra fee added to the usual price or cost.",
        },
        {
          term: "advertising practices",
          meaning: "Advertising practices are the methods companies use to promote products or services.",
        },
        {
          term: "lawsuit",
          meaning: "A lawsuit is a legal case brought to a court or legal authority.",
        },
        {
          term: "consumer protection",
          meaning: "Consumer protection means laws and actions designed to keep buyers safe from unfair or misleading business behavior.",
        },
      ],
      readingPrompts: [
        "What is the difference between an accusation and a proven fact in a legal story?",
        "Why might hidden or unclear charges be a consumer-protection issue?",
        "How should governments regulate very large online platforms?",
      ],
    },
  },
  {
    id: "story-2026-08-31-chatgpt-becomes-first-ai-chatbot-to",
    headline: "ChatGPT becomes first AI chatbot to face tougher EU rules",
    sourceName: "Channel News Asia",
    sourceUrl: "https://www.channelnewsasia.com/business/eu-chatgpt-reddit-roblox-tougher-regulation-6351981",
    category: "Technology & AI",
    publicationDate: "2026-08-31",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 4,
    trendingScore: 5,
    significanceScore: 5,
    discussionValueScore: 5,
    knowledgeValueScore: 4,
    imageUrl: "/images/stories/eu-berlaymont-building.jpg",
    imageAlt: "The Berlaymont building in Brussels, headquarters of the European Commission",
    imageWidth: 1280,
    imageHeight: 864,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "ChatGPT facing tougher EU rules is a clear example of how governments are beginning to regulate powerful AI tools. The story is highly relevant for students because it connects technology they know with law, safety, and public policy.",
    keyVocabulary: [
      "AI chatbot",
      "EU rules",
      "regulation",
      "compliance",
      "transparency",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This technology story is about ChatGPT becoming the first artificial intelligence chatbot to face tougher European Union rules. The verified details say Brussels added ChatGPT on Monday, August 31, to a list of digital services that must meet stronger safety requirements and accept greater legal scrutiny. The same announcement also named Reddit and Roblox as “very large” online platforms. For English learners, the article gives useful vocabulary for discussing technology regulation, including comply, safety rules, digital services, legal scrutiny, and online platform. It also shows how familiar apps and AI tools are increasingly being treated as subjects of public policy, not just private products.",
      vocabulary: [
        {
          term: "AI chatbot",
          meaning: "An AI chatbot is a computer program that uses artificial intelligence to answer questions or have conversations.",
        },
        {
          term: "EU rules",
          meaning: "EU rules are laws or requirements made by the European Union for its member countries and markets.",
        },
        {
          term: "regulation",
          meaning: "Regulation is the control of an activity or industry through official rules.",
        },
        {
          term: "compliance",
          meaning: "Compliance means following laws, rules, or official requirements.",
        },
        {
          term: "transparency",
          meaning: "Transparency means being open and clear about how something works or how decisions are made.",
        },
      ],
      readingPrompts: [
        "Why might governments want stricter rules for AI chatbots?",
        "What benefits and risks do students experience when using AI tools?",
        "What responsibilities should companies have when they build powerful technology?",
      ],
    },
  },
  {
    id: "story-2026-09-01-congo-authorities-report-more-than-6",
    headline: "Congo authorities report more than 6,000 confirmed Ebola cases and nearly 3,000 deaths",
    sourceName: "The Associated Press (via NBC News)",
    sourceUrl: "https://www.nbcnews.com/world/africa/congo-authorities-report-6000-confirmed-ebola-cases-nearly-3000-deaths-rcna595427",
    category: "World Pickup",
    publicationDate: "2026-09-01",
    estimatedLevel: "B1+",
    estimatedReadingMinutes: 3,
    trendingScore: 4,
    significanceScore: 5,
    discussionValueScore: 4,
    knowledgeValueScore: 5,
    imageUrl: "/images/stories/congo-ebola-awareness-monusco.jpg",
    imageAlt: "A UN peacekeeper taking part in an Ebola-awareness hand-washing campaign in Kinshasa, Democratic Republic of Congo (file photo, 2014, not a photo of the 2026 outbreak)",
    imageWidth: 3648,
    imageHeight: 2736,
    imageSourceType: "licensed-contextual",
    whyWeChoseThis: "A major Ebola outbreak in Congo is a serious global health story that deserves attention beyond the biggest political headlines. It also gives learners important public-health vocabulary and background knowledge.",
    keyVocabulary: [
      "Ebola",
      "confirmed cases",
      "outbreak",
      "public health",
      "authorities",
    ],
    readingMode: "authentic",
    rightsStatus: "copyrighted",
    readingSupport: {
      background: "This public-health story concerns Ebola in Congo, where authorities report more than 6,000 confirmed cases and nearly 3,000 deaths. The verified details add another important part of the picture: more than 1,360 people have recovered from the virus, which authorities described as an encouraging development. For learners, the article is useful for understanding health and emergency vocabulary such as confirmed case, death, recover, virus, authorities, and development. It also shows why outbreak reports often include several kinds of numbers at the same time: total infections, deaths, and recoveries can each tell readers something different about the situation.",
      vocabulary: [
        {
          term: "Ebola",
          meaning: "Ebola is a serious infectious disease that can cause severe illness and death.",
        },
        {
          term: "confirmed cases",
          meaning: "Confirmed cases are people officially identified as having a disease through accepted medical checks.",
        },
        {
          term: "outbreak",
          meaning: "An outbreak is a sudden increase in cases of a disease in a place.",
        },
        {
          term: "public health",
          meaning: "Public health is the work of protecting and improving the health of whole communities.",
        },
        {
          term: "authorities",
          meaning: "Authorities are official people or organizations with the power to make decisions or give information.",
        },
      ],
      readingPrompts: [
        "Why is clear public information important during a disease outbreak?",
        "How can a health crisis affect communities beyond hospitals?",
        "What language does the article use to show the scale of the outbreak?",
      ],
    },
  },
];
