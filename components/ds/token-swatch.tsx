import * as React from "react";
import { cn } from "@/lib/utils";

export function TokenSwatch({
  label,
  cssVar,
  className,
}: {
  label: string;
  cssVar: string;
  className?: string;
}) {
  const isTriple =
    cssVar.startsWith("--numo-") ||
    cssVar.startsWith("--ds-") ||
    cssVar === "--surface-1" ||
    cssVar === "--surface-2" ||
    cssVar === "--surface-3" ||
    cssVar === "--text-1" ||
    cssVar === "--text-2" ||
    cssVar === "--border-1" ||
    cssVar === "--ring-1" ||
    cssVar === "--accent" ||
    cssVar === "--success" ||
    cssVar === "--warning" ||
    cssVar === "--danger";

  const background = isTriple ? `hsl(var(${cssVar}))` : `var(${cssVar})`;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card px-2 py-1.5",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded-md border border-border"
          style={{ background }}
          aria-hidden
        />

        <div className="min-w-0 leading-tight">
          <div className="text-xs font-medium text-foreground truncate">
            {label}
          </div>
          <div className="text-[11px] text-muted-foreground font-mono truncate">
            {cssVar}
          </div>
        </div>
      </div>
    </div>
  );
}