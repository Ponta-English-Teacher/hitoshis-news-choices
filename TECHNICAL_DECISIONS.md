# Technical Decisions

Status: pre-implementation. This document records technical-foundation decisions for the AI News Reading App, alongside the product decisions already fixed in `AI_News_Reading_App_Development_Blueprint.docx`. Nothing has been scaffolded, installed, or coded yet.

## Now Fixed

- **Framework**: Next.js, using the App Router.
- **Language**: TypeScript.
- **Hosting / deployment**: Vercel.
- **Weekly automation**: Vercel Cron, calling a protected Next.js server-side endpoint (the "editorial engine" scheduled process described in the blueprint), running every Friday at 6:00 a.m. JST. See `EDITORIAL_POLICY.md` for the full editorial selection criteria, stable category list, and publication-cycle rationale.
- **Current next step**: replace the remaining fictional/mock stories with real current news stories, selected editorially by ChatGPT and Hitoshi per `EDITORIAL_POLICY.md`; Claude implements those selections once decided rather than selecting stories itself.
- **News discovery, V1**: GDELT's free DOC 2.0 API (`domainis:` exact-domain filtering, `sourcelang:english`, ~7-day rolling window), restricted to an approved source pool — no paid news API, no RSS/sitemap workarounds, at this stage. Testing (`scripts/gdelt-discovery-test.mjs`, `scripts/gdelt-retest-30day.mjs` — dev-only, not part of the app) established the pool:
  - **Reliable core**: BBC, CNN, The Guardian, The New York Times, CNBC, NBC News, CBS News, NPR, Al Jazeera English, DW, Nikkei Asia, South China Morning Post, Channel News Asia, The Straits Times, The Korea Herald.
  - **Secondary/sparse**: The Japan Times (real but only ~3 articles/month).
  - **Not reliably supplied by GDELT** (confirmed absent at both 7 and 30 days — not prohibited from the app, just not guaranteed discovery-pool members; see `EDITORIAL_POLICY.md` Section 6): Reuters, Associated Press, The Washington Post, Financial Times, Bloomberg, ABC News, France 24 English, Politico, Axios, The Economist.
  - If the reliable-core pool proves insufficient once scoring/selection is built, a secondary provider (e.g. GNews) can be added later — not needed for V1.
- **Image selection policy**: real licensed image (preferably Wikimedia Commons) → contextual licensed image → AI-generated illustration fallback → temporary placeholder, in that priority order. Never a copyrighted publisher photograph merely because no reusable one is available. See `IMAGE_POLICY.md` for the full policy and `IMAGE_CREDITS.md` for the per-image record. The data model/UI (`NewsStory.imageSourceType`, the "AI-generated illustration" badge) are ready to distinguish all four tiers, but image selection/generation is not yet automated.
- **Browser-side learner state**: `localStorage`, as specified in the blueprint (working glossary, session state).
- **News data for initial development**: sample/mock news data, so early educational-product design and UI work are not dictated by a specific news provider's format or limitations.

## Intentionally Deferred

These are deliberately not decided yet and will be resolved when the relevant feature is actually reached, not before:

- A paid news API or provider (only if the GDELT-based V1 pool above proves insufficient) and its licensing terms.
- AI model / API selection and integration for the AI Help layer (translation, explanation, background, etc.).
- Student ID scheme and any authentication for protecting it.
- Google Apps Script + Google Sheets implementation for long-term vocabulary history (architecture already chosen in the blueprint: one master spreadsheet, rows tagged by Student ID — but not implemented yet).
- All items already listed as deferred in the blueprint's "Decisions Intentionally Deferred" section (provider list/licensing, exact weekly story count and scoring weights, extent of any full-text publisher reuse, reading-completion logging, teacher-facing history view, PWA/offline support, persistence of discussion responses).
- Implementation of the automated Friday-morning selection/publishing pipeline (the Vercel Cron endpoint above). The schedule and editorial rules it will follow are decided (`EDITORIAL_POLICY.md`), but building it is deferred until at least one complete real weekly edition has been produced manually, to serve as a practical model.
