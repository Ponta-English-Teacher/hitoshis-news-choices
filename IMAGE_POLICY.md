# Image Selection Policy

This document governs how a story image is chosen for **Hitoshi's News Choices**. It is a companion to `EDITORIAL_POLICY.md` (story selection) and `IMAGE_CREDITS.md` (the per-image record for every image actually in use).

Every published story should have a meaningful image. Use this priority order:

## 1. Real licensed image — first choice

Search for an appropriate, legally reusable real photograph, preferably from Wikimedia Commons.

The image should be genuinely relevant to:
- the specific event, when available;
- the people/place/institution involved; or
- the broader factual context of the story.

Verify the license and attribution before using it (via the Commons API's `imageinfo`/`extmetadata`, not by assuming from a search result).

## 2. Contextual licensed image — second choice

If no reusable image of the actual event is available, use an appropriate real contextual photograph — for example a relevant location, institution, company, public figure, scientific subject, or historical/file photograph.

Do **not** imply that an older or contextual photograph depicts the current event. Use accurate alt text, and identify it as a file/context photo where appropriate (e.g. "file photo, 2023, not a photo of the 2026 incident").

## 3. AI-generated illustration — fallback

If no suitable legally reusable real or contextual image can reasonably be found, generate an AI illustration for the story.

The AI image must:
- be clearly illustrative rather than pretending to be documentary news photography;
- represent the subject accurately without inventing factual details;
- avoid depicting invented scenes as though they actually occurred;
- use a consistent visual style appropriate for Hitoshi's News Choices;
- be labelled in the app as "AI-generated illustration" (the `imageSourceType: "ai-generated"` field drives this label automatically — see Architecture below);
- have appropriate alt text.

For sensitive subjects — war, disasters, deaths, disease, crime, political violence — be especially careful not to generate a fictional photorealistic depiction that could be mistaken for evidence of the real event. Prefer a clearly editorial/illustrative treatment.

## Important principle

**Never use a copyrighted publisher photograph merely because no reusable photograph is available.** If the choice is between a questionable/copyrighted real image and a clearly-labelled AI-generated illustration, choose the AI-generated illustration.

## Placeholders

The neutral placeholder (`public/images/stories/placeholder.png`, `imageSourceType: "placeholder"`) may remain as a temporary technical fallback during generation. A completed/published weekly edition should not normally contain placeholder images.

## Architecture: how the app distinguishes these

`NewsStory.imageSourceType` (see `src/types/news-story.ts`) records which of the four tiers above a story's image belongs to:

- `"licensed-real"`
- `"licensed-contextual"`
- `"ai-generated"`
- `"placeholder"`

`StoryCard` and `ReadingSupportPage` both render a small "AI-generated illustration" badge over the image whenever `imageSourceType === "ai-generated"` — this is already wired up and ready to use; no story currently uses this tier.

This field is required on every `NewsStory` record. It does not change selection, editorial policy, or any other app behavior — it only records provenance and drives the AI-illustration label.

## Documentation requirements

Every image actually in use must have a record in `IMAGE_CREDITS.md`.

**For a Wikimedia/licensed image (real or contextual), record:**
- story
- Commons filename
- subject
- creator/photographer
- Wikimedia Commons source page
- license
- required attribution

**For an AI-generated image, record:**
- story
- that it is AI-generated
- generation date
- purpose/context (what it depicts and why no real image was used)
- alt text

## Current status

This policy is documented and the data model/UI are ready to distinguish all four tiers. Selecting and generating images against this policy is **not yet automated** — the current six real stories keep their already-approved Wikimedia Commons images (all `"licensed-real"` or `"licensed-contextual"`, per `IMAGE_CREDITS.md`), and no AI-generated images have been created yet.
