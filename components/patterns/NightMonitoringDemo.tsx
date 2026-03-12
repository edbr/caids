"use client";

import * as React from "react";
import { CloudMoon } from "lucide-react";
import {
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  TooltipProvider,
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

function formatDurationMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  if (rem === 0) return `${hours}h`;
  return `${hours}h ${rem}m`;
}

export function NightMonitoringDemo() {
  const [selectedWindow, setSelectedWindow] = React.useState<number | null>(null);
  const [hoveredWindow, setHoveredWindow] = React.useState<number | null>(null);
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
  const symptomSummary = SYMPTOM_ROWS.map((row) => {
    const detected = row.events.filter((event) => event.mode === "detected").length;
    const reported = row.events.filter((event) => event.mode === "reported").length;
    return { name: row.name, detected, reported, color: row.detectedColor };
  });
  const detectedTimes = SYMPTOM_ROWS.flatMap((row) =>
    row.events.filter((event) => event.mode === "detected").map((event) => event.time)
  ).sort((a, b) => a - b);
  const quietPeriods: Array<{ start: number; end: number; durationMins: number }> = [];
  for (let i = 0; i < detectedTimes.length - 1; i += 1) {
    const start = detectedTimes[i]!;
    const end = detectedTimes[i + 1]!;
    const gap = end - start;
    if (gap >= 1) {
      quietPeriods.push({
        start,
        end,
        durationMins: Math.round(gap * 60),
      });
    }
  }
  const visibleSymptomRows = SYMPTOM_ROWS.map((row, index) => ({
    ...row,
    rowIndex: SYMPTOM_ROWS.length - 1 - index,
  }));
  const visibleEvents = visibleSymptomRows.flatMap((row) =>
    row.events
      .filter((event) => event.time >= viewStart && event.time <= viewEnd)
      .map((event, index) => ({
        id: `${row.name}-${index}-${event.time}`,
        x: event.time,
        y: row.rowIndex,
        mode: event.mode,
        name: row.name,
        fill: event.mode === "detected" ? row.detectedColor : row.reportedColor,
        opacity: event.mode === "detected" ? 0.95 : 0.6,
      }))
  );
  const activeWindowIndex = selectedWindow ?? hoveredWindow;
  const highlightedWindow =
    activeWindowIndex === null ? null : TIME_WINDOWS[activeWindowIndex];

  return (
    <TooltipProvider delayDuration={120}>
      <div className="w-full space-y-4">
        <div className="rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
          <div className="rounded-lg px-3 py-2">
            <div className="flex items-start justify-between gap-3 text-muted-foreground">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2">
                  <CloudMoon className="h-5 w-5 text-numo-warm-blue-800" />
                  <p className="text-xl font-bold tracking-tight text-foreground">Night Monitoring</p>
                </div>
                <p className="text-lg font-medium text-slate-500">
                  Overnight symptom timeline with detected and reported events.
                </p>
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
            <div className="grid grid-cols-[70px_1fr] mt-6 gap-3 pb-2">
                <span className="pt-1 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                 
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
                          "h-6 text-[11px] font-medium transition-colors duration-200",
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
                <div className="h-[340px] rounded-md border border-border/70 bg-background/60 p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 16, right: 18, bottom: 18, left: 18 }}>
                      <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="rgba(148, 163, 184, 0.32)" />
                      {highlightedWindow ? (
                        <ReferenceArea
                          x1={highlightedWindow.start}
                          x2={highlightedWindow.end}
                          fill="rgba(59, 130, 246, 0.12)"
                          ifOverflow="extendDomain"
                        />
                      ) : null}
                      <XAxis
                        type="number"
                        dataKey="x"
                        domain={[viewStart, viewEnd]}
                        ticks={headerTicks.map((tick) => tick.hour)}
                        tickFormatter={(value) => formatClockTime(value)}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        stroke="rgba(100, 116, 139, 0.9)"
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        domain={[-0.5, SYMPTOM_ROWS.length - 0.5]}
                        ticks={visibleSymptomRows.map((row) => row.rowIndex)}
                        tickLine={false}
                        axisLine={false}
                        width={92}
                        tickMargin={12}
                        interval={0}
                        tickFormatter={(value) => {
                          const row = visibleSymptomRows.find((item) => item.rowIndex === value);
                          return row?.name ?? "";
                        }}
                        stroke="rgba(15, 23, 42, 0.9)"
                      />
                      <RechartsTooltip
                        cursor={false}
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const datum = payload[0]?.payload as
                            | { name: string; x: number; mode: "detected" | "reported" }
                            | undefined;
                          if (!datum) return null;
                          return (
                            <div className="rounded-md border border-black bg-black px-2 py-1 text-xs text-white shadow-md">
                              {datum.name}: {formatClockTime(datum.x)} · {datum.mode}
                            </div>
                          );
                        }}
                      />
                      <Scatter
                        data={visibleEvents}
                        shape={(props) => {
                          const payload = props.payload as { fill: string; opacity: number };
                          return (
                            <circle
                              cx={props.cx}
                              cy={props.cy}
                              r={7}
                              fill={payload.fill}
                              fillOpacity={payload.opacity}
                              stroke="hsl(var(--numo-blue-700))"
                              strokeWidth={1.25}
                            />
                          );
                        }}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-background p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Summary</h3>
            <div className="mt-3 space-y-2">
              {symptomSummary.map((item) => (
                <div
                  key={`summary-${item.name}`}
                  className="flex items-center justify-between rounded-md border border-border/70 bg-muted/20 px-3 py-2"
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <p className="text-sm text-numo-blue-900">{item.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{item.detected}</span> detected ·{" "}
                    <span className="font-medium text-foreground">{item.reported}</span> reported
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-background p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Quiet periods</h3>
            <div className="mt-3 space-y-2">
              {quietPeriods.length > 0 ? (
                quietPeriods.map((period, index) => (
                  <div
                    key={`quiet-${index}`}
                    className="rounded-md border border-border/70 bg-muted/20 px-3 py-2 text-sm"
                  >
                    <p className="font-medium text-foreground">
                      {formatClockTime(period.start)} - {formatClockTime(period.end)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      No detected symptoms for {formatDurationMinutes(period.durationMins)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-md border border-border/70 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                  No quiet period longer than 1 hour in this range.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
}
