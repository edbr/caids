"use client";

import * as React from "react";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Video,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ActionState =
  | "default"
  | "disabled"
  | "loading"
  | "success"
  | "danger";

export type RowAction = {
  key: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  state?: ActionState;
  onClick?: () => void;
};

export const INSIGHT_ACTIONS: RowAction[] = [
  { key: "cal", Icon: Calendar, label: "Schedule follow-up", state: "default" },
  { key: "sms", Icon: MessageSquare, label: "Send SMS", state: "default" },
  { key: "vid", Icon: Video, label: "Start video call", state: "default" },
  { key: "sms-sent", Icon: MessageSquare, label: "Send SMS", state: "success" },
  { key: "cal-alert", Icon: Calendar, label: "Schedule follow-up", state: "danger" },
];

function ActionIcon({
  state,
  className,
}: {
  state?: ActionState;
  className?: string;
}) {
  if (state === "success") return <CheckCircle2 className={className} />;
  if (state === "danger") return <AlertTriangle className={className} />;
  return null;
}

function TooltipZ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        className="z-9999 bg-foreground text-background text-xs shadow-md pointer-events-auto"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function RowActions({ actions }: { actions: RowAction[] }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center justify-end gap-3">
        {actions.map(({ key, Icon, label, state, onClick }) => {
          const isDisabled = state === "disabled";

          const base =
            "group relative inline-flex items-center justify-center h-8 w-8 rounded-md border border-border/60 bg-background/70 transition";
          const hover = "hover:bg-background hover:text-foreground hover:shadow-sm";
          const focus =
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
          const disabled = "disabled:opacity-40 disabled:cursor-not-allowed";
          const text = "text-muted-foreground";

          const stateRing =
            state === "success"
              ? "ring-1 ring-[hsl(var(--ds-success))]/25"
              : state === "danger"
                ? "ring-1 ring-[hsl(var(--ds-danger))]/25"
                : "";

          return (
            <TooltipZ
              key={key}
              label={
                <>
                  {label}
                  {state === "disabled" && " (disabled)"}
                  {state === "success" && " (sent)"}
                  {state === "danger" && " (needs attention)"}
                </>
              }
            >
              <button
                type="button"
                aria-label={label}
                disabled={isDisabled}
                onClick={onClick}
                className={[base, text, hover, focus, disabled, stateRing].join(" ")}
              >
                <Icon className="h-4 w-4" />

                {(state === "success" || state === "danger") && (
                  <span className="absolute -bottom-1 -right-1 grid place-items-center h-4 w-4 rounded-full bg-background border border-border shadow-sm">
                    <ActionIcon state={state} className="h-3 w-3 text-foreground" />
                  </span>
                )}
              </button>
            </TooltipZ>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
