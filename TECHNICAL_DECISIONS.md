# Technical Decisions

Status: pre-implementation. This document records technical-foundation decisions for the AI News Reading App, alongside the product decisions already fixed in `AI_News_Reading_App_Development_Blueprint.docx`. Nothing has been scaffolded, installed, or coded yet.

## Now Fixed

- **Framework**: Next.js, using the App Router.
- **Language**: TypeScript.
- **Hosting / deployment**: Vercel.
- **Weekly automation**: Vercel Cron, calling a protected Next.js server-side endpoint (the "editorial engine" scheduled process described in the blueprint).
- **Browser-side learner state**: `localStorage`, as specified in the blueprint (working glossary, session state).
- **News data for initial development**: sample/mock news data, so early educational-product design and UI work are not dictated by a specific news provider's format or limitations.

## Intentionally Deferred

These are deliberately not decided yet and will be resolved when the relevant feature is actually reached, not before:

- News API / provider selection and licensing terms.
- AI model / API selection and integration for the AI Help layer (translation, explanation, background, etc.).
- Student ID scheme and any authentication for protecting it.
- Google Apps Script + Google Sheets implementation for long-term vocabulary history (architecture already chosen in the blueprint: one master spreadsheet, rows tagged by Student ID — but not implemented yet).
- All items already listed as deferred in the blueprint's "Decisions Intentionally Deferred" section (provider list/licensing, exact weekly story count and scoring weights, extent of any full-text publisher reuse, reading-completion logging, teacher-facing history view, PWA/offline support, persistence of discussion responses).
