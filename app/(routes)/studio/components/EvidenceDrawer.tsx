import type { CoachOutput } from "@/lib/coach/spec-schema";

export function EvidenceDrawer({ output }: { output: CoachOutput }) {
  const claims = output.engineerArgument.evidenceClaims;

  if (claims.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
        Evidence mode is off. Claims are presented as design guidance without citations.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {claims.map((claim) => (
        <div key={claim.claim} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium text-white">{claim.claim}</p>
          <div className="mt-3 space-y-3">
            {claim.citations.map((citation) => (
              <div key={citation.url} className="text-sm text-slate-300">
                <a className="font-medium text-blue-300 hover:text-blue-200" href={citation.url}>
                  {citation.sourceId}
                </a>
                <p className="mt-1 leading-6 text-slate-400">{citation.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
