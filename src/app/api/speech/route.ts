import { NextResponse } from "next/server";
import OpenAI from "openai";

const TTS_MODEL = process.env.OPENAI_TTS_MODEL || "tts-1-hd";
const TTS_VOICE = (process.env.OPENAI_TTS_VOICE || "alloy") as
  | "alloy"
  | "echo"
  | "fable"
  | "onyx"
  | "nova"
  | "shimmer";
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
      { ok: false, error: "That selection is too long to read aloud." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Listen isn't configured yet. Add an OPENAI_API_KEY to .env.local and restart the server." },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const response = await client.audio.speech.create({
      model: TTS_MODEL,
      voice: TTS_VOICE,
      input: text,
      response_format: "mp3",
    });

    const audio = Buffer.from(await response.arrayBuffer());
    return new NextResponse(new Uint8Array(audio), {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("speech failed", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't generate audio for this text." },
      { status: 502 }
    );
  }
}
