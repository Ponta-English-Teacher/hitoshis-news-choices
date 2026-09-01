import { NextResponse } from "next/server";
import OpenAI from "openai";

const MODEL = "gpt-5.4-mini";
const MAX_QUESTION_LENGTH = 500;

interface AskStoryContext {
  headline: string;
  sourceName: string;
  category: string;
  publicationDate: string;
  whyWeChoseThis: string;
  background: string;
  vocabulary: { term: string; meaning: string }[];
  readingPrompts: string[];
}

function isValidStoryContext(value: unknown): value is AskStoryContext {
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

interface ChatTurn {
  question: string;
  answer: string;
}

const MAX_HISTORY_TURNS = 20;

function isValidHistory(value: unknown): value is ChatTurn[] {
  if (value === undefined) return true;
  if (!Array.isArray(value)) return false;
  return value.every(
    (turn) =>
      turn &&
      typeof turn === "object" &&
      typeof (turn as Record<string, unknown>).question === "string" &&
      typeof (turn as Record<string, unknown>).answer === "string"
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const question = (body as { question?: unknown })?.question;
  const storyContext = (body as { storyContext?: unknown })?.storyContext;
  const history = (body as { history?: unknown })?.history;

  if (typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "Please type a question first." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json({ ok: false, error: "That question is too long." }, { status: 400 });
  }
  if (!isValidStoryContext(storyContext)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid story context." }, { status: 400 });
  }
  if (!isValidHistory(history)) {
    return NextResponse.json({ ok: false, error: "Invalid conversation history." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Ask AI isn't configured yet. Add an OPENAI_API_KEY to .env.local and restart the server." },
      { status: 500 }
    );
  }

  const vocabLines = storyContext.vocabulary.map((v) => `- ${v.term}: ${v.meaning}`).join("\n");
  const promptLines = storyContext.readingPrompts.map((p) => `- ${p}`).join("\n");

  const instructions = `You are "AI Chat" inside Hitoshi's News Choices, an English-learning news app. A student is chatting with you on the Reading Support page for ONE specific story. This is a real conversation — the student may ask follow-up questions ("Why?", "Can you explain that in easier English?") that refer back to your previous answers, so use the conversation history to understand what they mean. Below is our own educational context for that story — NOT the original publisher's article text. We deliberately do not fetch, store, or send the article itself (copyright).

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

You may answer using BOTH:
1. The story context above.
2. Your own general knowledge — historical background, countries/institutions, political/economic/scientific concepts, vocabulary, or other context helpful for understanding the topic.

CRITICAL RULES:
- Never claim something comes from "the article" or that "the story says" something unless it is actually present in the STORY CONTEXT above.
- When you use your own general knowledge rather than the story context, say so plainly — e.g. "More generally, ...", "For background, ...", "Historically, ...".
- If the student asks about a specific reporting detail (an exact number, quote, or fact) that is not present in the STORY CONTEXT above, say you don't have that specific detail and suggest they check the original article at the source link — do not invent or guess it.
- Never reproduce or summarize a full news article — you do not have it.
- Keep answers clear and appropriately short for an English learner, in plain language.

Answer the student's question.`;

  const turns = (history ?? []).slice(-MAX_HISTORY_TURNS);
  const conversationInput = [
    ...turns.flatMap((turn) => [
      { role: "user" as const, content: turn.question },
      { role: "assistant" as const, content: turn.answer },
    ]),
    { role: "user" as const, content: question },
  ];

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: MODEL,
      instructions,
      input: conversationInput,
    });

    const answer = response.output_text.trim();
    return NextResponse.json({ ok: true, answer });
  } catch (error) {
    console.error("ask failed", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't reach the AI assistant. Please try again." },
      { status: 502 }
    );
  }
}
