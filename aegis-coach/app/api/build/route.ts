import { NextResponse } from "next/server";
import { CoachOutputSchema } from "@/lib/coach/spec-schema";

type BuildRequest = {
  spec?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json()) as BuildRequest;

  const parsed = CoachOutputSchema.shape.spec.safeParse(body.spec);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid spec payload." }, { status: 400 });
  }

  const primaryScreen = parsed.data.screens[0];

  return NextResponse.json({
    files: [
      {
        path: "components/aegis/GeneratedPreview.tsx",
        content: `export function GeneratedPreview() {
  return (
    <section>
      <h2>${primaryScreen.name}</h2>
      <p>${primaryScreen.purpose}</p>
    </section>
  );
}`
      },
      {
        path: "README.generated.md",
        content: `# Generated Build Output

Screen: ${primaryScreen.name}

Sections:
${primaryScreen.layout.sections.map((section) => `- ${section}`).join("\n")}

Constraints:
${parsed.data.constraints.map((constraint) => `- ${constraint}`).join("\n")}`
      }
    ]
  });
}
