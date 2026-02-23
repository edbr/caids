import * as React from "react";
import { cn } from "@/lib/utils";

export function DSPanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-background shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function DSPanelHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn("flex items-center justify-between px-6 py-4", className)}
      {...props}
    />
  );
}

export function DSPanelTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-[22px] font-semibold tracking-[-0.01em]", className)}
      {...props}
    />
  );
}

export function DSPanelSubheader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between px-6 pb-4", className)}
      {...props}
    />
  );
}

export function DSPanelBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-4", className)} {...props} />;
}
