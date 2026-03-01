"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variant === "default" &&
          "border-white/10 bg-white text-slate-950 hover:bg-slate-200",
        variant === "secondary" &&
          "border-white/10 bg-white/10 text-white hover:bg-white/20",
        variant === "ghost" && "border-transparent bg-transparent text-slate-300 hover:text-white",
        variant === "outline" &&
          "border-white/10 bg-transparent text-slate-100 hover:bg-white/10",
        size === "sm" && "h-9 px-4",
        size === "md" && "h-10 px-5",
        size === "lg" && "h-11 px-6",
        size === "icon" && "h-10 w-10 rounded-2xl",
        className
      )}
      {...props}
    />
  );
}
