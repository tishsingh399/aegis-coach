"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[140px] w-full resize-none border-0 bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}
