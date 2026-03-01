import { Badge } from "@/components/ui/badge";

type ScopeChipProps = {
  label: string;
  value: string;
};

export function ScopeChip({ label, value }: ScopeChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
      <Badge className="border-transparent bg-white/10 px-2 py-1 text-[10px] text-slate-300">
        {label}
      </Badge>
      <span className="font-medium">{value}</span>
    </div>
  );
}
