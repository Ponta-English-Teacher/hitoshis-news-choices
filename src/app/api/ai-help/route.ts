import { NextResponse } from "next/server";
import OpenAI from "openai";

const MODEL = "gpt-5.4-mini";
const MAX_TEXT_LENGTH = 2000;

interface AiHelpStoryContext {
  headline: string;
  sourceName: string;
  category: string;
  publicationDate: string;
  whyWeChoseThis: string;
  background: string;
  vocabulary: { term: string; meaning: string }[];
  readingPrompts: string[];
}

function isValidStoryContext(value: unknown): value is AiHelpStoryContext {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.headline === "string" &&
    typeof c.sourceName === "string" &&
    typeof c.category === "string" &&
    typeof c.publicationDate === "string" &&
    typeof c.whyWeChoseThis === "string" &&
    typeof c.background === "string" &&
    Array.isArray(c.vocabulary) &&
    Array.isArray(c.readingPrompts)
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const text = (body as { text?: unknown })?.text;
  const storyContext = (body as { storyContext?: unknown })?.storyContext;

  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "No text was selected." }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ ok: false, error: "That selection is too long." }, { status: 400 });
  }
  if (!isValidStoryContext(storyContext)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid story context." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "AI Help isn't configured yet. Add an OPENAI_API_KEY to .env.local and restart the server." },
      { status: 500 }
    );
  }

  const vocabLines = storyContext.vocabulary.map((v) => `- ${v.term}: ${v.meaning}`).join("\n");
  const promptLines = storyContext.readingPrompts.map((p) => `- ${p}`).join("\n");

  const instructions = `You are "AI Help" inside Hitoshi's News Choices, an English-learning news app. A student has selected a short passage of English text while reading preparation material for ONE specific story, and wants help understanding that exact passage in context.

Below is our own educational context for the story — NOT the original publisher's article text. We deliberately do not fetch, store, or send the article itself (copyright).

STORY CONTEXT (our own material, not the article):
Headline: ${storyContext.headline}
Source: ${storyContext.sourceName}
Category: ${storyContext.category}
Publication date: ${storyContext.publicationDate}
Why we chose this: ${storyContext.whyWeChoseThis}
Background: ${storyContext.background}
Key English:
${vocabLines}
What to notice while reading:
${promptLines}

Your job: briefly help the student understand the SELECTED TEXT below, in the context of this story. As relevant, explain its meaning, difficult wording, grammar, nuance, reference/context, or why the wording matters.

CRITICAL RULES:
- Do NOT simply translate the selection into another language — that is a separate feature (Translate) and not your job here.
- Never claim something comes from "the article" or that "the story says" something unless it is actually present in the STORY CONTEXT above.
- When you use general knowledge rather than the story context, say so plainly — e.g. "More generally, ...", "For background, ...", "Historically, ...".
- Never reproduce or summarize a full news article — you do not have it.
- Keep the explanation short (a few sentences) and clear for an English learner.

SELECTED TEXT: "${text}"

Explain this selected text now.`;

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: MODEL,
      instructions,
      input: text,
    });

    const explanation = response.output_text.trim();
    return NextResponse.json({ ok: true, explanation });
  } catch (error) {
    console.error("ai-help failed", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't reach the AI assistant. Please try again." },
      { status: 502 }
    );
  }
}
