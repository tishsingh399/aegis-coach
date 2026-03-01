import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WizardShell() {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="muted-label">Confirm Wizard</p>
        <CardTitle className="mt-2">Review scope before execution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-slate-300">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          Review the proposed action, impacted systems, and required approvals
          before anything runs.
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Request Approval</Button>
          <Button variant="outline">Rollback Path</Button>
        </div>
      </CardContent>
    </Card>
  );
}
