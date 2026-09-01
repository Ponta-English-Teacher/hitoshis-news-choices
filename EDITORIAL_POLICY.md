# Editorial Policy

This document records the editorial/product decisions that govern how stories are selected and organized for **Hitoshi's News Choices**. It is a companion to `TECHNICAL_DECISIONS.md` (which covers technical-foundation decisions) and to `AI_News_Reading_App_Development_Blueprint.docx` (the original product blueprint).

## 1. Editorial Purpose

Hitoshi's News Choices is **not** intended to provide geographically balanced news coverage, and it is **not** a generic news aggregator. It also does **not** attempt to measure or reproduce the overall English-language media agenda — comprehensive coverage of any single wire service or flagship publisher (Reuters, AP, Bloomberg, Financial Times, The Washington Post, etc.) is not a goal.

The primary editorial question for every edition is simpler:

> Select current, important, interesting real-world news that is worth reading in English.

Selection considerations:

1. **Importance** — does the story matter?
2. **Current relevance** — is it meaningfully connected to what is happening now?
3. **Interest** — is this something students may genuinely want to know about?
4. **English-learning value** — does it provide useful language, concepts, or background knowledge?
5. **Variety** — avoid selecting several stories that are essentially the same.
6. **Asia Pickup and World Pickup exist to broaden the edition beyond U.S./European dominance** — see Section 2 for what this means in practice.

These considerations are weighed together editorially; they are not a strict priority order or a numeric scoring formula. (An earlier version of this policy ranked "influence on the English-language news environment" as the top consideration — this has been dropped. Chasing overall media-agenda prominence isn't necessary for this app's purpose, and it isn't achievable anyway: see Section 6.)

## 2. Stable News Categories

Six broad categories are used across editions:

- **U.S. & Politics**
- **World & Conflict**
- **Business & Economy**
- **Technology & AI**
- **Asia Pickup** and **World Pickup** — these two are not ordinary topical categories, and they are not "minor story" or "light story" slots. Their editorial purpose is to **broaden the edition beyond one dominated by U.S. and European news**:
  - **Asia Pickup** may select any worthwhile story from anywhere in Asia — including Afghanistan, the Middle East's Asian side, Central Asia, East/South/Southeast Asia, etc. It does not need to be minor or light, and it may substantively overlap with World & Conflict, Business & Economy, or Technology & AI in subject matter — a major, heavy Asian story (a disaster, a conflict, a significant economic event) is exactly the kind of story this category exists to surface. Its job is to make sure a strong Asian story isn't crowded out by U.S./European coverage, not to provide a change of pace from serious news.
  - **World Pickup** performs the same broadening role for worthwhile stories from other parts of the world, or unusual/global subjects, that might otherwise be crowded out by the same U.S./European dominance — again, not required to be light or minor.

The category list itself is stable, but an edition does **not** have to contain exactly one story per category. Major categories may contain multiple stories when justified by that week's news, and Asia Pickup/World Pickup may legitimately overlap with a topical category rather than being mutually exclusive from it.

## 3. Weekly Publication Cycle

**Every Friday at 6:00 a.m. Japan Standard Time (JST).**

Reason: students are likely to use the app over the weekend, so a Friday-morning edition gives them fresh material for Friday, Saturday, and Sunday.

Each edition should primarily review approximately the preceding seven days of English-language news, rather than simply selecting stories published on Friday itself.

## 4. Future Automation

The Friday update should eventually be automated, likely using Vercel Cron (see `TECHNICAL_DECISIONS.md`).

This is **not yet implemented**. At least one complete real weekly edition must first be built manually, using the editorial rules above, to serve as a practical model for designing the automated selection system.

## 5. Editorial Workflow (current)

Story selection is made editorially by ChatGPT and Hitoshi. Claude implements those selections in the codebase once they have been decided — Claude does not perform the editorial selection itself.

## 6. V1 Discovery Source Pool

The V1 automated discovery mechanism is GDELT's free DOC 2.0 API, restricted to an approved pool of English-language source domains (see `TECHNICAL_DECISIONS.md` for the full list and the testing that established it).

Testing found that several major publishers — Reuters, Associated Press, The Washington Post, Financial Times, Bloomberg, ABC News, France 24 English, Politico, Axios, and The Economist — return **zero articles in GDELT** even over a 30-day window, most likely due to paywalls/bot-blocking rather than a query error. Given the simplified editorial goal above (Section 1), this is not treated as a gap to fix:

- These publishers are **not prohibited** — a story from any of them can still appear in the app (as the current real Reuters story already does) if it comes to Hitoshi/ChatGPT's attention some other way.
- They are simply **not guaranteed members of the automated discovery pool**, and V1 does not build any special integration (RSS/sitemap scraping, a paid news API, etc.) to recover them.
- The Japan Times returns real but very sparse results (a few articles a month) and may remain in the pool as an occasional secondary source, not a dependable one.
