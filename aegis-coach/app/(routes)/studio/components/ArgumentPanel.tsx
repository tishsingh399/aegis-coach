import type { CoachOutput } from "@/lib/coach/spec-schema";

export function ArgumentPanel({ output }: { output: CoachOutput }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-100">
        {output.engineerArgument.pasteable}
      </div>
      <div>
        <p className="muted-label">Talking Points</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {output.engineerArgument.bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
