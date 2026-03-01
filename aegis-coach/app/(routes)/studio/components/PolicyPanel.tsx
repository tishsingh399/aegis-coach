import { ScopeChip } from "@/components/aegis/ScopeChip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

type PolicyPanelProps = {
  evidenceMode: boolean;
  onEvidenceChange: (checked: boolean) => void;
};

export function PolicyPanel({
  evidenceMode,
  onEvidenceChange
}: PolicyPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="muted-label">Constraints</p>
        <CardTitle className="mt-2">Guardrails before generation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <ScopeChip label="Data" value="Ticket metadata only" />
          <ScopeChip label="Tools" value="Read-only proposals" />
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-white">Evidence mode</p>
            <p className="text-xs text-slate-400">
              Require citations for factual claims
            </p>
          </div>
          <Switch checked={evidenceMode} onCheckedChange={onEvidenceChange} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          High impact actions remain review-only until the user explicitly
          confirms them in UI.
        </div>
      </CardContent>
    </Card>
  );
}
