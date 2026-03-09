"use client";

import * as React from "react";
import { CloudMoon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TimelineBar = {
  start: number; // 0 = 7:00 PM, 12 = 7:00 AM
  end: number;
  mode: "detected" | "reported";
};

type SymptomRow = {
  name: "Sneeze" | "Cough" | "Grunting" | "Heavy breathing" | "Shortness of breath";
  detectedColor: string;
  reportedColor: string;
  bars: TimelineBar[];
};

const TICKS = [
  { hour: 0, label: "7:00 PM" },
  { hour: 3, label: "10:00 PM" },
  { hour: 6, label: "1:00 AM" },
  { hour: 9, label: "4:00 AM" },
  { hour: 12, label: "7:00 AM" },
] as const;

const TIME_WINDOWS = [
  { start: 0, end: 3, label: "7-10" },
  { start: 3, end: 6, label: "10-1" },
  { start: 6, end: 9, label: "1-4" },
  { start: 9, end: 12, label: "4-7" },
] as const;

const SYMPTOM_ROWS: SymptomRow[] = [
  {
    name: "Sneeze",
    detectedColor: "hsl(var(--numo-teal-500))",
    reportedColor: "hsl(var(--numo-teal-700))",
    bars: [
      { start: 0.3, end: 0.7, mode: "detected" },
      { start: 1.1, end: 1.4, mode: "detected" },
      { start: 2.0, end: 2.3, mode: "detected" },
      { start: 3.1, end: 3.5, mode: "detected" },
      { start: 4.6, end: 4.9, mode: "detected" },
      { start: 8.9, end: 9.4, mode: "reported" },
    ],
  },
  {
    name: "Cough",
    detectedColor: "hsl(var(--numo-orange-700))",
    reportedColor: "hsl(var(--numo-orange-700))",
    bars: [
      { start: 0.8, end: 1.2, mode: "detected" },
      { start: 1.7, end: 2.1, mode: "detected" },
      { start: 2.6, end: 3.0, mode: "detected" },
      { start: 3.8, end: 4.2, mode: "detected" },
      { start: 5.0, end: 5.4, mode: "detected" },
      { start: 6.2, end: 6.6, mode: "detected" },
      { start: 10.0, end: 10.8, mode: "reported" },
    ],
  },
  {
    name: "Grunting",
    detectedColor: "hsl(var(--numo-yellow-700))",
    reportedColor: "hsl(var(--numo-yellow-700))",
    bars: [
      { start: 4.7, end: 5.0, mode: "detected" },
      { start: 5.8, end: 6.1, mode: "detected" },
      { start: 6.9, end: 7.2, mode: "detected" },
      { start: 8.1, end: 8.5, mode: "reported" },
    ],
  },
  {
    name: "Heavy breathing",
    detectedColor: "hsl(var(--numo-blue-500))",
    reportedColor: "hsl(var(--numo-blue-700))",
    bars: [
      { start: 3.4, end: 3.8, mode: "detected" },
      { start: 4.3, end: 4.8, mode: "detected" },
      { start: 5.4, end: 5.9, mode: "detected" },
      { start: 6.5, end: 7.0, mode: "detected" },
      { start: 7.6, end: 8.1, mode: "detected" },
      { start: 10.5, end: 11.4, mode: "reported" },
    ],
  },
  {
    name: "Shortness of breath",
    detectedColor: "hsl(var(--numo-warm-blue-500))",
    reportedColor: "hsl(var(--numo-warm-blue-700))",
    bars: [
      { start: 2.2, end: 2.7, mode: "detected" },
      { start: 3.0, end: 3.4, mode: "detected" },
      { start: 4.1, end: 4.6, mode: "detected" },
      { start: 5.2, end: 5.7, mode: "detected" },
      { start: 6.4, end: 6.8, mode: "detected" },
      { start: 7.3, end: 7.8, mode: "detected" },
      { start: 8.6, end: 9.2, mode: "reported" },
      { start: 9.8, end: 10.5, mode: "reported" },
    ],
  },
];

function percentFromHour(hour: number, viewStart: number, viewEnd: number) {
  return `${((hour - viewStart) / (viewEnd - viewStart)) * 100}%`;
}

function formatClockTime(hourOffset: number) {
  const startMinutes = 19 * 60; // 7:00 PM baseline
  const total = (startMinutes + Math.round(hourOffset * 60)) % (24 * 60);
  const hours24 = total < 0 ? total + 24 * 60 : total;
  const hh = Math.floor(hours24 / 60) % 24;
  const mm = hours24 % 60;
  const suffix = hh >= 12 ? "PM" : "AM";
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

export function NightMonitoringDemo() {
  const [selectedWindow, setSelectedWindow] = React.useState<number | null>(null);
  const viewStart = selectedWindow === null ? 0 : TIME_WINDOWS[selectedWindow]!.start;
  const viewEnd = selectedWindow === null ? 12 : TIME_WINDOWS[selectedWindow]!.end;
  const headerTicks =
    selectedWindow === null
      ? TICKS
      : [
          { hour: viewStart, label: formatClockTime(viewStart) },
          { hour: viewStart + 1, label: formatClockTime(viewStart + 1) },
          { hour: viewStart + 2, label: formatClockTime(viewStart + 2) },
          { hour: viewEnd, label: formatClockTime(viewEnd) },
        ];

  return (
    <TooltipProvider delayDuration={120}>
      <div className="mx-auto w-full max-w-315 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
        <div className="rounded-lg border border-border/70 bg-muted/25 px-3 py-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <CloudMoon className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-semibold tracking-wide text-foreground">NIGHT MONITORING</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedWindow(null)}
              disabled={selectedWindow === null}
              className="inline-flex h-7 items-center rounded-md border border-border/70 bg-background px-2 text-[11px] font-medium text-muted-foreground transition hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back to overview
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="w-full">
            <div className="grid grid-cols-[180px_1fr] items-end gap-3 pb-2">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Symptoms
              </span>
              <div className="space-y-1">
                <div className="grid grid-cols-4 gap-1">
                  {TIME_WINDOWS.map((window, index) => (
                    <button
                      key={window.label}
                      type="button"
                      onClick={() =>
                        setSelectedWindow((prev) => (prev === index ? null : index))
                      }
                      className={[
                        "h-6 rounded-md border text-[10px] font-medium transition",
                        selectedWindow === index
                          ? "border-numo-blue-500/60 bg-numo-blue-500/12 text-numo-blue-700"
                          : "border-border/70 bg-background text-muted-foreground hover:bg-muted/40",
                      ].join(" ")}
                      aria-pressed={selectedWindow === index}
                    >
                      {window.label}
                    </button>
                  ))}
                </div>
                <div className="relative h-6">
                  {headerTicks.map((tick) => (
                  <span
                    key={tick.label}
                    style={{ left: percentFromHour(tick.hour, viewStart, viewEnd) }}
                    className="absolute top-0 -translate-x-1/2 text-[11px] text-muted-foreground"
                  >
                    {tick.label}
                  </span>
                ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {SYMPTOM_ROWS.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-[180px_1fr] items-center gap-3 rounded-md bg-muted/30 px-2"
                >
                  <p className="text-sm font-medium" style={{ color: row.reportedColor }}>
                    {row.name}
                  </p>
                  <div className="relative h-11 rounded-md">
                    {headerTicks.map((tick) => (
                      <span
                        key={`${row.name}-${tick.label}`}
                        style={{ left: percentFromHour(tick.hour, viewStart, viewEnd) }}
                        className="absolute inset-y-0 w-px -translate-x-1/2 bg-border/60"
                      />
                    ))}

                    {row.bars.map((bar, index) => {
                      const clippedStart = Math.max(bar.start, viewStart);
                      const clippedEnd = Math.min(bar.end, viewEnd);
                      if (clippedEnd <= clippedStart) return null;

                      const left = ((clippedStart - viewStart) / (viewEnd - viewStart)) * 100;
                      const width = ((clippedEnd - clippedStart) / (viewEnd - viewStart)) * 100;
                      const isDetected = bar.mode === "detected";
                      const backgroundColor = isDetected
                        ? row.detectedColor
                        : row.reportedColor;
                      const borderColor = isDetected ? row.detectedColor : row.reportedColor;

                      return (
                        <Tooltip key={`${row.name}-${index}`}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="absolute top-1/2 h-5 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label={`${row.name} from ${formatClockTime(bar.start)} to ${formatClockTime(bar.end)}`}
                              style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                backgroundColor,
                                border: isDetected ? "none" : `1px solid ${borderColor}`,
                                opacity: isDetected ? 0.92 : 0.42,
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="border-black bg-black text-xs text-white">
                            {row.name}: {formatClockTime(bar.start)} - {formatClockTime(bar.end)}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </TooltipProvider>
  );
}
