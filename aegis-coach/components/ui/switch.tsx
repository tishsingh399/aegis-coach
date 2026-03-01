"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

type SwitchProps = {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
  return (
    <button
      aria-checked={checked}
      aria-label="toggle"
      className={cn(
        "relative h-6 w-11 rounded-full border border-white/10 transition-colors",
        checked ? "bg-blue-500" : "bg-white/10",
        className
      )}
      role="switch"
      type="button"
      onClick={() => onCheckedChange?.(!checked)}
    >
      <span
        className={cn(
          "absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}
