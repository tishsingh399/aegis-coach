"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type CoachComposerProps = {
  prompt: string;
  onPromptChange: (value: string) => void;
  evidenceMode: boolean;
  onEvidenceChange: (value: boolean) => void;
  onGenerate: () => void;
  isPending: boolean;
};

export function CoachComposer({
  prompt,
  onPromptChange,
  evidenceMode,
  onEvidenceChange,
  onGenerate,
  isPending
}: CoachComposerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <Textarea
          className="min-h-[112px] border-white/10 bg-white/[0.02] text-base leading-7"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Describe the security AI chat workflow you want to design..."
        />
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-xs font-semibold text-slate-300">Evidence Mode</span>
              <Switch checked={evidenceMode} onCheckedChange={onEvidenceChange} />
            </div>
            <Button size="sm" variant="outline">
              Scope: Read-only draft
            </Button>
            <p className="text-xs font-medium text-slate-400">Model Aurora 1.4</p>
          </div>
          <Button disabled={isPending} size="lg" onClick={onGenerate}>
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
