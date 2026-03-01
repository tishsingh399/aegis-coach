import { NextResponse } from "next/server";
import { buildMockCoachOutput } from "@/lib/coach/mock";
import { CoachOutputSchema } from "@/lib/coach/spec-schema";

type CoachRequest = {
  userPrompt?: string;
  evidenceMode?: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CoachRequest;
  const userPrompt =
    body.userPrompt?.trim() ||
    "I need a security AI assistant that can suggest remediation and run playbooks.";
  const evidenceMode = Boolean(body.evidenceMode);

  const output = buildMockCoachOutput(userPrompt, evidenceMode);
  const parsed = CoachOutputSchema.safeParse(output);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Coach output failed schema validation." },
      { status: 500 }
    );
  }

  return NextResponse.json(parsed.data);
}
