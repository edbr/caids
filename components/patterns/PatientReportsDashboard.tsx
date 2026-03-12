"use client";

import * as React from "react";
import {
  AudioLines,
  BatteryMedium,
  PlugZap,
  RadioTower,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { DSAudioPlayButton } from "@/components/ds/audio-play-button";
import { NightMonitoringDemo } from "@/components/patterns/NightMonitoringDemo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const NIGHT_EVENTS = [
  { time: "7:12 PM", type: "reported" as const, label: "Cough" },
  { time: "9:48 PM", type: "detected" as const, label: "Heavy breathing" },
  { time: "10:31 PM", type: "reported" as const, label: "Shortness of breath" },
  { time: "12:08 AM", type: "detected" as const, label: "Cough burst" },
  { time: "3:44 AM", type: "reported" as const, label: "Restless sleep" },
  { time: "6:58 AM", type: "detected" as const, label: "Wake event" },
];

const VITALS = [
  { day: "Mar 6", spo2: 95, pulse: 82, temp: 98.8 },
  { day: "Mar 7", spo2: 98, pulse: 86, temp: 99.0 },
  { day: "Mar 8", spo2: 96, pulse: 84, temp: 99.1 },
  { day: "Mar 9", spo2: 92, pulse: 80, temp: 99.4 },
  { day: "Mar 10", spo2: 94, pulse: 85, temp: 99.8 },
  { day: "Mar 11", spo2: 97, pulse: 83, temp: 100.4 },
  { day: "Mar 12", spo2: 96, pulse: 81, temp: 101.1 },
];

const HEALTH_HISTORY = [
  { day: "Mar 6", score: 84, spo2: 96, zone: "green" as const },
  { day: "Mar 7", score: 79, spo2: 95, zone: "green" as const },
  { day: "Mar 8", score: 73, spo2: 95, zone: "orange" as const },
  { day: "Mar 9", score: 66, spo2: 94, zone: "orange" as const },
  { day: "Mar 10", score: 58, spo2: 93, zone: "orange" as const },
  { day: "Mar 11", score: 49, spo2: 92, zone: "red" as const },
  { day: "Mar 12", score: 41, spo2: 91, zone: "red" as const },
];

const vitalsChartConfig = {
  spo2: {
    label: "SpO2",
    color: "#93c5fd",
  },
  pulse: {
    label: "Pulse",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const healthHistoryChartConfig = {
  health: {
    label: "Health score",
    color: "#2563eb",
  },
  spo2: {
    label: "SpO2 overlay",
    color: "#93c5fd",
  },
} satisfies ChartConfig;

const symptomEvidenceChartConfig = {
  timeline: {
    label: "Evidence",
    color: "#2563eb",
  },
} satisfies ChartConfig;

function SectionCard({
  title,
  description,
  action,
  className,
  children,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}>) {
  return (
    <section className={cn("rounded-2xl border border-border bg-background shadow-sm", className)}>
      <div className="flex items-start justify-between gap-3 px-5 py-5">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-base font-medium text-slate-500">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </section>
  );
}

function HealthHistoryChartCard() {
  const chartData = HEALTH_HISTORY.map((item) => ({
    day: item.day,
    health: item.score,
    spo2: item.spo2,
  }));

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Health History</CardTitle>
        <CardDescription>Seven-day deterioration trend with SpO2 overlaid.</CardDescription>
      </CardHeader>
      <CardContent className="pt-1">
        <ChartContainer config={healthHistoryChartConfig} className="h-55 text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 10,
                bottom: 4,
              }}
            >
              <defs>
                <linearGradient id="history-health-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-health)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-health)" stopOpacity={0.12} />
                </linearGradient>
                <linearGradient id="history-zone-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(34,197,94,0.12)" />
                  <stop offset="55%" stopColor="rgba(249,115,22,0.12)" />
                  <stop offset="100%" stopColor="rgba(239,68,68,0.16)" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value: string) => value.replace("Mar ", "")}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="health"
                type="natural"
                fill="url(#history-health-fill)"
                fillOpacity={1}
                stroke="var(--color-health)"
                strokeWidth={2.5}
              />
              <Area
                dataKey="spo2"
                type="natural"
                fill="transparent"
                stroke="var(--color-spo2)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="py-3">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 leading-none font-medium text-foreground">
              Escalating risk across the last week <TrendingDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Mar 6 - Mar 12 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function VitalsAreaChartCard() {
  const chartData = VITALS.map((item) => ({
    day: item.day,
    spo2: item.spo2,
    pulse: item.pulse,
  }));

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Vitals</CardTitle>
        <CardDescription>Showing SpO2 and pulse for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="pt-1">
        <ChartContainer config={vitalsChartConfig} className="h-52.5 text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 10,
                bottom: 4,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value: string) => value.replace("Mar ", "")}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillSpo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-spo2)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-spo2)" stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="fillPulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-pulse)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-pulse)" stopOpacity={0.12} />
                </linearGradient>
              </defs>
              <Area
                dataKey="spo2"
                type="natural"
                fill="url(#fillSpo2)"
                fillOpacity={1}
                stroke="var(--color-spo2)"
                strokeWidth={2.25}
              />
              <Area
                dataKey="pulse"
                type="natural"
                fill="url(#fillPulse)"
                fillOpacity={1}
                stroke="var(--color-pulse)"
                strokeWidth={2.25}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="py-3">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-1">
            <div className="flex items-center gap-2 leading-none font-medium text-foreground">
              Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Mar 6 - Mar 12 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function PatientReportsDashboard() {
  const [isEvidencePlaying, setIsEvidencePlaying] = React.useState(false);
  const [isMonitoringEnabled, setIsMonitoringEnabled] = React.useState(true);
  const [evidenceElapsedSeconds, setEvidenceElapsedSeconds] = React.useState(0);
  const evidenceChartData = NIGHT_EVENTS.slice(1, 5).map((event, index) => ({
    time: event.time,
    timeline: [3, 7, 4, 6][index],
    label: event.label,
  }));
  const playbackProgress = evidenceElapsedSeconds / 30;
  const playbackIndex = playbackProgress * (evidenceChartData.length - 1);
  const leftIndex = Math.floor(playbackIndex);
  const rightIndex = Math.min(evidenceChartData.length - 1, leftIndex + 1);
  const leftPoint = evidenceChartData[leftIndex] ?? evidenceChartData[0];
  const rightPoint = evidenceChartData[rightIndex] ?? leftPoint;
  const interpolation = playbackIndex - leftIndex;
  const playbackValue =
    leftPoint && rightPoint
      ? leftPoint.timeline + (rightPoint.timeline - leftPoint.timeline) * interpolation
      : evidenceChartData[0]?.timeline ?? 0;
  const playbackTime = leftPoint?.time ?? evidenceChartData[0]?.time;

  React.useEffect(() => {
    if (!isEvidencePlaying) return;

    const interval = window.setInterval(() => {
      setEvidenceElapsedSeconds((value) => {
        if (value >= 30) return 0;
        return value + 1;
      });
    }, 600);

    return () => window.clearInterval(interval);
  }, [isEvidencePlaying]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SectionCard
          title="Remote device controls"
          description="Manage monitoring and device connection state."
        >
          <div className="space-y-4">
            <div className="grid gap-3 xl:grid-cols-4">
                <div className="rounded-xl border border-border/70 bg-background px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Monitoring</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {isMonitoringEnabled ? "On" : "Off"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMonitoringEnabled((value) => !value)}
                      className={cn(
                        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition",
                        isMonitoringEnabled ? "bg-numo-blue-600" : "bg-muted"
                      )}
                      aria-pressed={isMonitoringEnabled}
                      aria-label={isMonitoringEnabled ? "Turn monitoring off" : "Turn monitoring on"}
                    >
                      <span
                        className={cn(
                          "block h-5 w-5 rounded-full bg-white shadow transition-transform",
                          isMonitoringEnabled ? "translate-x-5" : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-background px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Battery</p>
                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BatteryMedium className="h-4 w-4 text-numo-blue-700" />
                    82%
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-background px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Cell strength</p>
                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <RadioTower className="h-4 w-4 text-numo-blue-700" />
                    Strong
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-background px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Power</p>
                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <PlugZap className="h-4 w-4 text-numo-teal-700" />
                    Plugged in
                  </div>
                </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Symptom Evidence"
          description="Tap play to reveal the event timeline."
          action={<AudioLines className="h-5 w-5 text-numo-orange-700" />}
        >
          <div className="space-y-4">
            <div className="grid items-center gap-4 md:grid-cols-[auto_minmax(0,1fr)]">
              <DSAudioPlayButton
                isPlaying={isEvidencePlaying}
                elapsedSeconds={evidenceElapsedSeconds}
                durationSeconds={30}
                onToggle={() => {
                  setIsEvidencePlaying((playing) => {
                    if (playing) return false;
                    if (evidenceElapsedSeconds >= 30) setEvidenceElapsedSeconds(0);
                    return true;
                  });
                }}
                playAriaLabel="Play symptom evidence audio"
                pauseAriaLabel="Pause symptom evidence audio"
              />
              <div className="rounded-2xlbg-muted/20 px-3 py-2">
                <ChartContainer config={symptomEvidenceChartConfig} className="h-12 text-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      accessibilityLayer
                      data={evidenceChartData}
                      margin={{
                        left: 8,
                        right: 8,
                        top: 12,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value: string) => value.replace(":00", "")}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      {isEvidencePlaying ? (
                        <ReferenceLine
                          x={playbackTime}
                          stroke="rgba(37, 99, 235, 0.35)"
                          strokeDasharray="4 4"
                        />
                      ) : null}
                      <Line
                        dataKey="timeline"
                        type="natural"
                        stroke="var(--color-timeline)"
                        strokeWidth={2}
                        dot={{
                          r: 4,
                          fill: "var(--color-timeline)",
                        }}
                        activeDot={{
                          r: 6,
                          fill: "var(--color-timeline)",
                        }}
                      />
                      {isEvidencePlaying ? (
                        <ReferenceDot
                          x={playbackTime}
                          y={playbackValue}
                          r={6}
                          fill="var(--color-timeline)"
                          stroke="white"
                          strokeWidth={2}
                        />
                      ) : null}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <HealthHistoryChartCard />
        <VitalsAreaChartCard />
      </div>

      <NightMonitoringDemo />
    </div>
  );
}
