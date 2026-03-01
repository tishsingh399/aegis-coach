import * as React from "react";
import { cn } from "@/lib/utils/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return <div className={cn("surface-card rounded-[24px]", className)} {...props} />;
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("px-6 pt-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: DivProps) {
  return <div className={cn("text-base font-semibold text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }: DivProps) {
  return <div className={cn("text-sm leading-6 text-slate-300", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}
