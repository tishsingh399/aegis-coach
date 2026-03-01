import { cn } from "@/lib/utils/cn";

type RiskBadgeProps = {
  level: "low" | "medium" | "high";
};

export function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        level === "low" && "bg-emerald-500/10 text-emerald-300",
        level === "medium" && "bg-amber-500/10 text-amber-300",
        level === "high" && "bg-red-500/10 text-red-300"
      )}
    >
      {level}
    </span>
  );
}
