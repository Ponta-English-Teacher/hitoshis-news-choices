import { NextResponse } from "next/server";
import type {
  ReadingHelpAction,
  ReadingHelpRequest,
  ReadingHelpResponse,
  ReadingHelpStoryContext,
} from "@/types/reading-help";

const OPENAI_MODEL = "gpt-4o-mini";
const MAX_TEXT_LENGTH = 2000;

const SYSTEM_PROMPT =
  "You are the AI Reading Help assistant inside \"Hitoshi's News Choices\", " +
  "an English-learning news app for university-level English learners " +
  "(often Japanese speakers) preparing to read real news articles. " +
  "You do NOT have access to the full original article text, only the " +
  "app's own story metadata and background provided to you below. Never " +
  "claim to quote, summarize, or reproduce the original article. Keep " +
  "answers concise, clear, encouraging, and appropriate for a language " +
  "learner.";

const ACTION_LABELS: Record<ReadingHelpAction, string> = {
  translate: "Translate",
  explain: "Explain This",
  "news-english": "News English",
  "how-to-read": "How to Read This",
};

const ACTION_INSTRUCTIONS: Record<ReadingHelpAction, string> = {
  translate:
    "Translate the learner's selected text naturally into Japanese, " +
    "keeping the original meaning and tone. Reply with the Japanese " +
    "translation.",
  explain:
    "Explain the selected text for an English learner. Clarify grammar, " +
    "sentence structure, pronoun/reference relationships, and difficult " +
    "vocabulary where relevant. Use simple English, with Japanese only " +
    "where it genuinely helps.",
  "news-english":
    "Explain how the selected word, expression, or sentence works in " +
    "news English. Point out journalistic vocabulary, headline style, " +
    "compressed grammar, common news collocations, or register where " +
    "relevant.",
  "how-to-read":
    "Help the learner understand how to process this selected passage. " +
    "Explain what information is most important, who or what key " +
    "references refer to, how the passage is organized, and what " +
    "background knowledge may help. Do not summarize an entire article " +
    "— address only this selected text.",
};

function formatStoryContext(context: ReadingHelpStoryContext): string {
  const vocabLine = context.vocabulary
    .map((item) => `${item.term} (${item.meaning})`)
    .join("; ");

  return [
    `Story headline: "${context.headline}"`,
    `Source: ${context.sourceName}`,
    `Category: ${context.category}`,
    `Learner level: ${context.estimatedLevel}`,
    `Our own background summary (not the article text): ${context.background}`,
    `Key vocabulary already introduced to the learner: ${vocabLine}`,
  ].join("\n");
}

function buildSelectionPrompt(
  action: ReadingHelpAction,
  selectedText: string,
  context: ReadingHelpStoryContext,
): string {
  return (
    `${formatStoryContext(context)}\n\n` +
    `Text the learner selected on the page:\n"""${selectedText}"""\n\n` +
    `Task (${ACTION_LABELS[action]}): ${ACTION_INSTRUCTIONS[action]}`
  );
}

function buildAskPrompt(
  question: string,
  context: ReadingHelpStoryContext,
): string {
  return (
    `${formatStoryContext(context)}\n\n` +
    `The learner's question:\n"""${question}"""\n\n` +
    "Answer the learner's question to support their understanding of the " +
    "topic, background, vocabulary, or reading strategy. Do not claim to " +
    "quote or summarize the full article text, since you were not given " +
    "it — rely only on the story metadata above and your general " +
    "knowledge. Keep the answer focused and appropriately levelled for " +
    "the learner."
  );
}

function isStoryContext(value: unknown): value is ReadingHelpStoryContext {
  if (!value || typeof value !== "object") return false;
  const context = value as Record<string, unknown>;
  return (
    typeof context.headline === "string" &&
    typeof context.sourceName === "string" &&
    typeof context.category === "string" &&
    typeof context.estimatedLevel === "string" &&
    typeof context.background === "string" &&
    Array.isArray(context.vocabulary) &&
    context.vocabulary.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof (item as Record<string, unknown>).term === "string" &&
        typeof (item as Record<string, unknown>).meaning === "string",
    )
  );
}

const VALID_ACTIONS: ReadingHelpAction[] = [
  "translate",
  "explain",
  "news-english",
  "how-to-read",
];

function parseRequestBody(body: unknown): ReadingHelpRequest | null {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;

  if (value.mode === "selection") {
    if (
      typeof value.action === "string" &&
      VALID_ACTIONS.includes(value.action as ReadingHelpAction) &&
      typeof value.selectedText === "string" &&
      value.selectedText.trim().length > 0 &&
      value.selectedText.length <= MAX_TEXT_LENGTH &&
      isStoryContext(value.storyContext)
    ) {
      return {
        mode: "selection",
        action: value.action as ReadingHelpAction,
        selectedText: value.selectedText,
        storyContext: value.storyContext,
      };
    }
    return null;
  }

  if (value.mode === "ask") {
    if (
      typeof value.question === "string" &&
      value.question.trim().length > 0 &&
      value.question.length <= MAX_TEXT_LENGTH &&
      isStoryContext(value.storyContext)
    ) {
      return {
        mode: "ask",
        question: value.question,
        storyContext: value.storyContext,
      };
    }
    return null;
  }

  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ReadingHelpResponse>(
      { error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = parseRequestBody(body);
  if (!parsed) {
    return NextResponse.json<ReadingHelpResponse>(
      { error: "Invalid request." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json<ReadingHelpResponse>({
      error:
        "AI Reading Help isn't configured yet in this environment. " +
        "Set OPENAI_API_KEY in your local .env file to enable it.",
    });
  }

  const userPrompt =
    parsed.mode === "selection"
      ? buildSelectionPrompt(
          parsed.action,
          parsed.selectedText,
          parsed.storyContext,
        )
      : buildAskPrompt(parsed.question, parsed.storyContext);

  try {
    const completion = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.4,
          max_tokens: 500,
        }),
      },
    );

    if (!completion.ok) {
      const errorBody = await completion.text().catch(() => "");
      console.error(
        "OpenAI request failed",
        completion.status,
        errorBody.slice(0, 500),
      );
      return NextResponse.json<ReadingHelpResponse>({
        error:
          "AI Reading Help couldn't get a response right now. Please try again in a moment.",
      });
    }

    const data = await completion.json();
    const text: unknown = data?.choices?.[0]?.message?.content;

    if (typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json<ReadingHelpResponse>({
        error: "AI Reading Help didn't return a usable response. Please try again.",
      });
    }

    return NextResponse.json<ReadingHelpResponse>({ response: text.trim() });
  } catch (error) {
    console.error("AI Reading Help request error", error);
    return NextResponse.json<ReadingHelpResponse>({
      error:
        "AI Reading Help is temporarily unavailable. Please try again shortly.",
    });
  }
}
