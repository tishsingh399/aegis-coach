import type { CoachOutput } from "@/lib/coach/spec-schema";

export function SpecPanel({ output }: { output: CoachOutput }) {
  return (
    <pre className="overflow-auto rounded-2xl border border-white/10 bg-[#080c1a] p-4 text-xs leading-6 text-slate-300">
      {JSON.stringify(output.spec, null, 2)}
    </pre>
  );
}
