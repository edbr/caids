"use client";

import * as React from "react";
import { Tooltip as RechartsTooltip } from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function ChartContainer({
  config,
  className,
  children,
}: React.PropsWithChildren<{ config: ChartConfig; className?: string }>) {
  const style = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color])
  ) as React.CSSProperties;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart-container"
        className={cn(
          "h-[260px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis-tick_text]:text-[11px] [&_.recharts-cartesian-grid_line]:stroke-border/80 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          className
        )}
        style={style}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

const ChartTooltip = RechartsTooltip;

function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: string | number; color?: string; dataKey?: string }>;
  label?: string;
}) {
  const context = React.useContext(ChartContext);
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-40 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur">
      {label ? <div className="mb-2 text-xs font-medium text-foreground">{label}</div> : null}
      <div className="space-y-1.5">
        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? "");
          const configLabel = context?.config[key]?.label;
          return (
            <div key={key} className="flex items-center justify-between gap-3 text-xs">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color ?? context?.config[key]?.color }}
                />
                {configLabel ?? item.name}
              </span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent };
