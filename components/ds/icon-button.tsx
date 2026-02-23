"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IconButtonState = "default" | "disabled" | "loading" | "success" | "danger";

export function DSIconButton({
  "aria-label": ariaLabel,
  tooltip,
  state = "default",
  className,
  children,
  onClick,
}: {
  "aria-label": string;
  tooltip?: React.ReactNode;
  state?: IconButtonState;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isDisabled = state === "disabled" || state === "loading";

  const btn = (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-md",
        "border border-border bg-background/70 text-muted-foreground",
        "transition",
        "hover:bg-background hover:text-foreground hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        state === "success" && "ring-1 ring-[hsl(var(--success))]/25",
        state === "danger" && "ring-1 ring-[hsl(var(--danger))]/25",
        className
      )}
    >
      {children}
    </button>
  );

  if (!tooltip) return btn;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent className="text-xs">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
