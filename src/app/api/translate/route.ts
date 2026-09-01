import { NextResponse } from "next/server";
import OpenAI from "openai";

const MODEL = "gpt-5.4-mini";
const MAX_TEXT_LENGTH = 2000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const text = (body as { text?: unknown })?.text;
  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ ok: false, error: "No text was selected." }, { status: 400 });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "That selection is too long to translate." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Translation isn't configured yet. Add an OPENAI_API_KEY to .env.local and restart the server." },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: MODEL,
      instructions:
        "Translate the given English text into natural, fluent Japanese. Preserve the original meaning and tone. Reply with only the Japanese translation, nothing else.",
      input: text,
    });

    const translation = response.output_text.trim();
    return NextResponse.json({ ok: true, translation });
  } catch (error) {
    console.error("translate failed", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't reach the translation service. Please try again." },
      { status: 502 }
    );
  }
}
