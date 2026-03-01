import type { CoachOutput } from "@/lib/coach/spec-schema";

export function RecommendationPanel({ output }: { output: CoachOutput }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="muted-label">Primary Recommendation</p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {output.primaryRecommendation.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {output.primaryRecommendation.summary}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          {output.primaryRecommendation.why}
        </p>
      </div>
      <div>
        <p className="muted-label">Alternatives</p>
        <div className="mt-3 space-y-4">
          {output.secondaryRecommendations.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
              <p className="mt-2 text-sm text-slate-400">{item.whenBetter}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
