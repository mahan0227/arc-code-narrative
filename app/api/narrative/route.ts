import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";

export async function POST(request: NextRequest) {
  const apiKey = getOpenAIApiKey(request);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Send Authorization: Bearer <your OpenAI API key> on each request." },
      { status: 401 },
    );
  }

  let body: { code?: string; language?: string; audience?: string; model?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.code?.trim()) {
    return NextResponse.json({ error: "`code` is required." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });
  const model = body.model?.trim() || "gpt-4o-mini";

  const system = `You are Arc Code Narrative — explain codebases as mythic-but-accurate systems stories.
Return JSON:
- logline: string
- cast: { name: string; role: string; metaphor: string }[] // modules/classes/functions as characters
- acts: { act: string; what_happens: string; where_in_code: string }[]
- data_journeys: { artifact: string; path: string }[]
- villains: { failure_mode: string; symptom: string; fix_hint: string }[]
- onboarding_path: string[] (ordered reading list)
- glossary: { term: string; plain: string }[]`;

  const user = `LANGUAGE_HINT: ${body.language?.trim() || "infer"}\nAUDIENCE: ${body.audience?.trim() || "senior engineer new to repo"}\n\nCODE:\n---\n${body.code}\n---`;

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.55,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    const text = completion.choices[0]?.message?.content;
    if (!text) return NextResponse.json({ error: "Empty model response." }, { status: 502 });
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ raw: text }, { status: 200 });
    }
    return NextResponse.json({ result: parsed, model });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
