"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  defaultValue,
  className,
  children
}: React.PropsWithChildren<{ defaultValue: string; className?: string }>) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 rounded-[20px] border border-white/10 bg-white/5 p-2",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  className,
  children
}: React.PropsWithChildren<{ value: string; className?: string }>) {
  const context = React.useContext(TabsContext);

  if (!context) {
    return null;
  }

  const active = context.value === value;

  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active ? "bg-white text-slate-950" : "bg-transparent text-slate-300 hover:text-white",
        className
      )}
      type="button"
      onClick={() => context.setValue(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children
}: React.PropsWithChildren<{ value: string; className?: string }>) {
  const context = React.useContext(TabsContext);

  if (!context || context.value !== value) {
    return null;
  }

  return <div className={cn(className)}>{children}</div>;
}
