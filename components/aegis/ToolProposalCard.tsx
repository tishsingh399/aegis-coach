import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/aegis/RiskBadge";

type ToolProposalCardProps = {
  title: string;
  summary: string;
  risk: "low" | "medium" | "high";
};

export function ToolProposalCard({
  title,
  summary,
  risk
}: ToolProposalCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>{title}</CardTitle>
        <RiskBadge level={risk} />
      </CardHeader>
      <CardContent className="text-sm leading-6 text-slate-300">{summary}</CardContent>
    </Card>
  );
}
