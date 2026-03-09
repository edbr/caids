"use client";

import * as React from "react";
import { CloudMoon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SymptomEvent = {
  time: number; // 0 = 7:00 PM, 12 = 7:00 AM
  mode: "detected" | "reported";
};

type SymptomRow = {
  name: "Sneeze" | "Cough" | "Grunting" | "Heavy breathing" | "Shortness of breath";
  detectedColor: string;
  reportedColor: string;
  events: SymptomEvent[];
};

const TICKS = [
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
    events: [
      { time: 9.1, mode: "detected" },
      { time: 9.16, mode: "detected" },
      { time: 9.2, mode: "detected" },
      { time: 10.1, mode: "detected" },
      { time: 10.2, mode: "detected" },
      { time: 11.2, mode: "reported" },
    ],
  },
  {
    name: "Cough",
    detectedColor: "hsl(var(--numo-orange-700))",
    reportedColor: "hsl(var(--numo-orange-700))",
    events: [
      { time: 0.8, mode: "detected" },
      { time: 1.7, mode: "detected" },
      { time: 1.8, mode: "detected" },
      { time: 1.84, mode: "detected" },
      { time: 1.9, mode: "detected" },
      { time: 2.6, mode: "detected" },
      { time: 3.8, mode: "detected" },
      { time: 5.0, mode: "detected" },
      { time: 6.2, mode: "detected" },
      { time: 10.0, mode: "reported" },
    ],
  },
  {
    name: "Grunting",
    detectedColor: "hsl(var(--numo-yellow-700))",
    reportedColor: "hsl(var(--numo-yellow-700))",
    events: [
      { time: 4.7, mode: "detected" },
      { time: 5.8, mode: "detected" },
      { time: 6.9, mode: "detected" },
      { time: 8.1, mode: "reported" },
    ],
  },
  {
    name: "Heavy breathing",
    detectedColor: "hsl(var(--numo-blue-500))",
    reportedColor: "hsl(var(--numo-blue-700))",
    events: [
      { time: 3.4, mode: "detected" },
      { time: 4.3, mode: "detected" },
      { time: 5.4, mode: "detected" },
      { time: 6.5, mode: "detected" },
      { time: 7.6, mode: "detected" },
      { time: 10.5, mode: "reported" },
    ],
  },
  {
    name: "Shortness of breath",
    detectedColor: "hsl(var(--numo-warm-blue-500))",
    reportedColor: "hsl(var(--numo-warm-blue-700))",
    events: [
      { time: 2.1, mode: "detected" },
      { time: 2.2167, mode: "detected" },
      { time: 2.289, mode: "detected" },
      { time: 2.45, mode: "detected" },
      { time: 6.3, mode: "detected" },
      { time: 6.4, mode: "detected" },
      { time: 6.5333, mode: "detected" },
      { time: 8.6, mode: "reported" },
      { time: 8.6167, mode: "reported" },
      { time: 8.6333, mode: "reported" },
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
  const [hoveredWindow, setHoveredWindow] = React.useState<number | null>(null);
  const viewStart = selectedWindow === null ? 0 : TIME_WINDOWS[selectedWindow]!.start;
  const viewEnd = selectedWindow === null ? 12 : TIME_WINDOWS[selectedWindow]!.end;
  const dividerHours =
    selectedWindow === null
      ? [3, 6, 9]
      : [viewStart + 1, viewStart + 2];
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
        <div className="rounded-lg  px-3 py-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <CloudMoon className="h-5 w-5 text-numo-warm-blue-500" />
              <p className="text-sm font-semibold tracking-wide text-numo-warm-blue-600">NIGHT MONITORING</p>
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
            <div className="grid grid-cols-[180px_1fr] mt-6 gap-3 pb-2">
              <span className="pt-1 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                Symptoms
              </span>
              <div>
                <div className="grid grid-cols-4 divide-x divide-border/70 overflow-hidden rounded-md border border-border/70 bg-background">
                  {TIME_WINDOWS.map((window, index) => (
                    <button
                      key={window.label}
                      type="button"
                      onClick={() =>
                        setSelectedWindow((prev) => (prev === index ? null : index))
                      }
                      className={[
                        "h-6 text-[10px] font-medium transition-colors duration-200",
                        selectedWindow === index
                          ? "bg-numo-blue-500/30 text-numo-blue-900"
                          : hoveredWindow === index
                            ? "bg-numo-blue-500/12 text-numo-blue-800"
                            : "text-muted-foreground hover:bg-muted/60",
                      ].join(" ")}
                      aria-pressed={selectedWindow === index}
                    >
                      {window.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={[
                "relative mt-1 rounded-md p-1",
                selectedWindow === null ? "cursor-pointer" : "",
              ].join(" ")}
              onMouseLeave={() => setHoveredWindow(null)}
            >
              <div className="space-y-0">
              {SYMPTOM_ROWS.map((row, rowIndex) => (
                <div
                  key={row.name}
                  className={[
                    "grid grid-cols-[180px_1fr] items-center gap-3 rounded-md bg-muted/50 px-2 py-1",
                    rowIndex < SYMPTOM_ROWS.length - 1 ? "border-b border-border/60" : "",
                  ].join(" ")}
                >
                  <p className="text-sm font-medium text-numo-blue-900">
                    {row.name}
                  </p>
                  <div
                    className="relative h-14 rounded-md"
                    onMouseMove={(event) => {
                      if (selectedWindow !== null) return;
                      const rect = event.currentTarget.getBoundingClientRect();
                      const relativeX = event.clientX - rect.left;
                      const slotWidth = rect.width / 4;
                      const index = Math.max(0, Math.min(3, Math.floor(relativeX / slotWidth)));
                      setHoveredWindow(index);
                    }}
                    onClick={(event) => {
                      if (selectedWindow !== null) return;
                      const rect = event.currentTarget.getBoundingClientRect();
                      const relativeX = event.clientX - rect.left;
                      const slotWidth = rect.width / 4;
                      const index = Math.max(0, Math.min(3, Math.floor(relativeX / slotWidth)));
                      setSelectedWindow(index);
                    }}
                  >
                    {selectedWindow === null ? (
                      <div
                        className="pointer-events-none absolute inset-y-0 bg-numo-blue-500/12 transition-all duration-300 ease-out"
                        style={{
                          left: `${(hoveredWindow ?? -1) * 25}%`,
                          width: hoveredWindow === null ? "0%" : "25%",
                          opacity: hoveredWindow === null ? 0 : 1,
                        }}
                      />
                    ) : (
                      <div className="pointer-events-none absolute inset-0 bg-numo-blue-500/12 opacity-100 transition-opacity duration-300 ease-out" />
                    )}

                    {headerTicks.map((tick) => (
                      <span
                        key={`${row.name}-${tick.label}`}
                        style={{ left: percentFromHour(tick.hour, viewStart, viewEnd) }}
                        className="absolute inset-y-0 w-px -translate-x-1/2 bg-border/60"
                      />
                    ))}

                    {row.events.map((event, index) => {
                      if (event.time < viewStart || event.time > viewEnd) return null;

                      const left = ((event.time - viewStart) / (viewEnd - viewStart)) * 100;
                      const isDetected = event.mode === "detected";
                      const backgroundColor = isDetected
                        ? row.detectedColor
                        : row.reportedColor;
                      const borderColor = "hsl(var(--numo-blue-700))";

                      return (
                        <Tooltip key={`${row.name}-${index}`}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label={`${row.name} at ${formatClockTime(event.time)}`}
                              style={{
                                left: `${left}%`,
                                backgroundColor,
                                border: `1px solid ${borderColor}`,
                                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.22)",
                                opacity: isDetected ? 0.95 : 0.52,
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="border-black bg-black text-xs text-white">
                            {row.name}: {formatClockTime(event.time)}
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

      </div>
    </TooltipProvider>
  );
}
