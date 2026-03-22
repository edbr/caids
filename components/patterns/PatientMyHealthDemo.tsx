"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HeartPulse,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, XAxis } from "recharts";
import { InteractionMenu } from "@/components/patterns/InteractionMenu";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type SummaryCard = {
  title: string;
  iconSrc: string;
  accent: string;
  highLabel: string;
  highDate: string;
  lowLabel: string;
  lowDate: string;
};

type SymptomRow = {
  label: string;
  count: number;
};

type TrendPoint = {
  day: string;
  symptomTrend: number | null;
  pulse: number | null;
  oxygenation: number | null;
  expectedSymptomTrend?: number | null;
  expectedPulse?: number | null;
  expectedOxygenation?: number | null;
};

type CardHeadingProps = {
  icon: React.ReactNode;
  title: string;
  titleClassName: string;
  description?: React.ReactNode;
  meta?: React.ReactNode;
};

const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Pulse",
    iconSrc: "/menuicon/pulse.svg",
    accent: "text-numo-slate-400",
    highLabel: "88 bpm",
    highDate: "Today",
    lowLabel: "65 bpm",
    lowDate: "03/27",
  },
  {
    title: "Oxygen",
    iconSrc: "/menuicon/o2.svg",
    accent: "text-numo-slate-400",
    highLabel: "95 %",
    highDate: "03/28",
    lowLabel: "89 %",
    lowDate: "Today",
  },
];

const SYMPTOM_ROWS: SymptomRow[] = [
  { label: "Cough", count: 6 },
  { label: "Throat clearing", count: 3 },
  { label: "Cough episodes", count: 3 },
];

const TREND_POINTS: TrendPoint[] = [

  
  {
    day: "03/28",
    symptomTrend: 2,
    pulse: 74,
    oxygenation: 93,
  },
  {
    day: "03/30",
    symptomTrend: 2,
    pulse: 78,
    oxygenation: 92,
  },
  {
    day: "04/01",
    symptomTrend: 3,
    pulse: 81,
    oxygenation: 91,
  },
  {
    day: "Yesterday",
    symptomTrend: 2,
    pulse: 84,
    oxygenation: 90,
  },
  {
    day: "Today",
    symptomTrend: 1,
    pulse: 88,
    oxygenation: 94,
    expectedSymptomTrend: 1,
    expectedPulse: 88,
    expectedOxygenation: 94,
  },
  {
    day: "Tomorrow",
    symptomTrend: null,
    pulse: null,
    oxygenation: null,
    expectedSymptomTrend: 2,
    expectedPulse: 86,
    expectedOxygenation: 95,
  },
];

const TREND_CHART_CONFIG = {
  symptomTrend: {
    label: "Symptom trend",
    color: "hsl(var(--numo-slate-900))",
  },
  pulse: {
    label: "Pulse",
    color: "hsl(var(--numo-warm-blue-400))",
  },
  oxygenation: {
    label: "Oxygenation",
    color: "hsl(var(--numo-blue-400))",
  },
} satisfies ChartConfig;

function severityLabel(value: number) {
  if (value === 1) return "Mild";
  if (value === 2) return "Moderate";
  return "Severe";
}

function severityDotColor(value: number) {
  if (value === 1) return "hsl(var(--numo-teal-400))";
  if (value === 2) return "hsl(var(--numo-yellow-500))";
  return "hsl(var(--numo-red-600))";
}

function TrendTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: string | number; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const orderedPayload = [...payload].sort((a, b) => {
    const order: Record<string, number> = {
      oxygenation: 0,
      expectedOxygenation: 0,
      pulse: 1,
      expectedPulse: 1,
      symptomTrend: 2,
      expectedSymptomTrend: 2,
    };
    return (order[String(a.dataKey ?? "")] ?? 99) - (order[String(b.dataKey ?? "")] ?? 99);
  });

  return (
    <div className="min-w-44 rounded-xl border border-numo-blue-700 bg-numo-blue-900/95 px-3 py-2 shadow-xl backdrop-blur">
      {label ? <div className="mb-2 text-xs font-medium text-numo-gray-400">{label}</div> : null}
      <div className="space-y-1.5 text-xs">
        {orderedPayload.map((item) => {
          const key = String(item.dataKey ?? "");
          const normalizedKey =
            key === "expectedSymptomTrend"
              ? "symptomTrend"
              : key === "expectedPulse"
                ? "pulse"
                : key === "expectedOxygenation"
                  ? "oxygenation"
                  : key;
          const color =
            normalizedKey === "symptomTrend"
              ? severityDotColor(Number(item.value ?? 1))
              : normalizedKey === "pulse"
                ? "hsl(var(--numo-orange-400))"
                : "hsl(var(--numo-yellow-400))";
          const displayValue =
            normalizedKey === "symptomTrend"
              ? severityLabel(Number(item.value ?? 1))
              : normalizedKey === "pulse"
                ? `${item.value} bpm`
                : `${item.value}%`;
          const displayLabel =
            normalizedKey === "symptomTrend"
              ? "Symptom trend"
              : normalizedKey === "pulse"
                ? "Pulse"
                : "Oxygenation";

          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-numo-slate-500">
                <span className="h-2.5 w-2.5" />
                {displayLabel}
              </span>
              <span className="font-medium text-numo-gray-400">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardHeading({
  icon,
  title,
  titleClassName,
  description,
  meta,
}: CardHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          {icon}
        </div>
        <div className="min-w-0 space-y-1 pt-1.5">
          <h3 className={`text-[26px] font-medium leading-none tracking-[0.02em] ${titleClassName}`}>
            {title}
          </h3>
          {description ? (
            <CardDescription className="text-[14px] leading-snug text-numo-slate-400">
              {description}
            </CardDescription>
          ) : null}
        </div>
      </div>
      {meta ? <div className="pt-0.5">{meta}</div> : null}
    </div>
  );
}

function HealthSummaryCard({
  title,
  iconSrc,
  accent,
  highLabel,
  highDate,
  lowLabel,
  lowDate,
}: SummaryCard) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="h-full rounded-[26px] border border-numo-blue-800/50 bg-numo-blue-900/70 px-5 py-5 shadow-[0_16px_36px_hsl(var(--numo-blue-900)/0.32),inset_0_1px_0_hsl(var(--numo-slate-400)/0.08)]"
    >
      <CardHeading
        icon={<Image src={iconSrc} alt="" width={32} height={32} className="h-8 w-8" aria-hidden />}
        title={title}
        titleClassName={accent}
      />

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-3 border-b border-numo-blue-700/90 pb-3">
          <div className="text-numo-gray-400">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-numo-slate-400">
              Highest
            </div>
            <div className="mt-1 text-[24px] leading-none">
              <span className="mr-2 text-numo-yellow-400">↑</span>
              <span>{highLabel}</span>
            </div>
          </div>
          <div className="pt-4 text-[16px] tabular-nums text-numo-slate-400">{highDate}</div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="text-numo-gray-400">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-numo-slate-400">
              Lowest
            </div>
            <div className="mt-1 text-[24px] leading-none">
              <span className="mr-2 text-numo-gray-400">↓</span>
              <span>{lowLabel}</span>
            </div>
          </div>
          <div className="pt-4 text-[16px] tabular-nums text-numo-slate-400">{lowDate}</div>
        </div>
      </div>
    </motion.article>
  );
}

function MostCommonSymptomsCard({ rows }: { rows: SymptomRow[] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
      className="rounded-[26px] border border-numo-blue-800/50 bg-numo-blue-900/70 px-5 py-5 shadow-[0_16px_36px_hsl(var(--numo-blue-900)/0.32),inset_0_1px_0_hsl(var(--numo-slate-400)/0.08)]"
    >
      <CardHeading
        icon={<HeartPulse className="h-8 w-8 text-numo-teal-300" />}
        title="Common symptoms"
        titleClassName="text-numo-slate-300"
        meta={
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-numo-slate-500">
          </div>
        }
      />

      <div className="mt-5 rounded-xl bg-numo-blue-900 px-5 py-1">
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.label}
                className="border-numo-blue-700/85 hover:bg-transparent"
              >
                <TableCell className="py-3 pl-0 text-[20px] leading-relaxed tracking-wide text-numo-gray-400">
                  {row.label}
                </TableCell>
                <TableCell className="py-3 pr-0 text-right text-[20px] tabular-nums text-numo-gray-400">
                  {row.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.article>
  );
}

function SymptomTrendCard({ points }: { points: TrendPoint[] }) {
  return (
    <article className="rounded-[22px] border border-numo-blue-800/50 bg-numo-blue-900/80 px-6 py-5 shadow-[0_16px_36px_hsl(var(--numo-blue-900)/0.32),inset_0_1px_0_hsl(var(--numo-slate-400)/0.08)]">
      <CardHeading
        icon={<TrendingUp className="h-8 w-8 text-numo-teal-400" />}
        title="Trend"
        titleClassName="text-numo-slate-400"
        meta={
          <div className="pt-1 text-right">
            <div className="text-[18px] tracking-wide">
              <span className="text-numo-slate-400 uppercase">today: </span>
              <span className="text-numo-teal-100 uppercase font-medium ">Mild</span>
            </div>
          </div>
        }
      />
      <div className="-mx-6 mt-4 border-b border-numo-blue-700/80" />

      <div className="mt-7 overflow-hidden rounded-[18px] px-4 py-4">
        <ChartContainer
          config={TREND_CHART_CONFIG}
          className="h-77.5 min-h-77.5 min-w-0 w-full [&_.recharts-cartesian-grid_line]:stroke-numo-blue-700"
        >
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={310}>
            <AreaChart
              accessibilityLayer
              data={points}
              margin={{
                left: 10,
                right: 12,
                top: 20,
              }}
            >
              <defs>
                <linearGradient id="fill-symptom-trend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-symptomTrend)" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="var(--color-symptomTrend)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fill-pulse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-pulse)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-pulse)" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="fill-oxygenation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-oxygenation)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-oxygenation)" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="5 8" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "hsl(var(--numo-slate-500))", fontSize: 15 }}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--numo-blue-900) / 0.6)" }}
                content={<TrendTooltipContent />}
              />
              <Area
                dataKey="symptomTrend"
                type="natural"
                fill="url(#fill-symptom-trend)"
                stroke="var(--color-symptomTrend)"
                strokeWidth={3}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
                dot={({ cx, cy, payload }) => (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4.5}
                    fill={severityDotColor(payload?.symptomTrend ?? 1)}
                    stroke="hsl(var(--numo-blue-900))"
                    strokeWidth={2}
                  />
                )}
                activeDot={({ cx, cy, payload }) => (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={severityDotColor(payload?.symptomTrend ?? 1)}
                    stroke="hsl(var(--numo-gray-400))"
                    strokeWidth={2}
                  />
                )}
              />
              <Line
                dataKey="expectedSymptomTrend"
                type="linear"
                stroke="var(--color-symptomTrend)"
                strokeWidth={3}
                strokeDasharray="6 6"
                connectNulls
                dot={({ cx, cy, payload }) =>
                  payload?.day === "Tomorrow" ? (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill={severityDotColor(payload?.expectedSymptomTrend ?? 1)}
                      stroke="hsl(var(--numo-blue-900))"
                      strokeWidth={2}
                    />
                  ) : (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={0}
                      fill="transparent"
                      stroke="transparent"
                    />
                  )
                }
                activeDot={({ cx, cy, payload }) => (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={severityDotColor(payload?.expectedSymptomTrend ?? 1)}
                    stroke="hsl(var(--numo-gray-400))"
                    strokeWidth={2}
                  />
                )}
              />
              <Area
                dataKey="pulse"
                type="natural"
                fill="url(#fill-pulse)"
                stroke="var(--color-pulse)"
                strokeWidth={3}
                isAnimationActive
                animationBegin={120}
                animationDuration={950}
                animationEasing="ease-out"
                dot={{ r: 4, fill: "hsl(var(--numo-warm-blue-400))", stroke: "hsl(var(--numo-blue-900))", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "hsl(var(--numo-warm-blue-400))", stroke: "hsl(var(--numo-gray-400))", strokeWidth: 2 }}
              />
              <Line
                dataKey="expectedPulse"
                type="linear"
                stroke="var(--color-pulse)"
                strokeWidth={3}
                strokeDasharray="6 6"
                connectNulls
                dot={({ cx, cy, payload }) =>
                  payload?.day === "Tomorrow" ? (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4.5}
                      fill="hsl(var(--numo-warm-blue-400))"
                      stroke="hsl(var(--numo-blue-900))"
                      strokeWidth={2}
                    />
                  ) : (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={0}
                      fill="transparent"
                      stroke="transparent"
                    />
                  )
                }
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--numo-warm-blue-400))",
                  stroke: "hsl(var(--numo-gray-400))",
                  strokeWidth: 2,
                }}
              />
              <Area
                dataKey="oxygenation"
                type="natural"
                fill="url(#fill-oxygenation)"
                stroke="var(--color-oxygenation)"
                strokeWidth={3}
                isAnimationActive
                animationBegin={240}
                animationDuration={1000}
                animationEasing="ease-out"
                dot={{ r: 4, fill: "var(--color-oxygenation)", stroke: "hsl(var(--numo-blue-900))", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "var(--color-oxygenation)", stroke: "hsl(var(--numo-gray-400))", strokeWidth: 2 }}
              />
              <Line
                dataKey="expectedOxygenation"
                type="linear"
                stroke="var(--color-oxygenation)"
                strokeWidth={3}
                strokeDasharray="6 6"
                connectNulls
                dot={({ cx, cy, payload }) =>
                  payload?.day === "Tomorrow" ? (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4.5}
                      fill="var(--color-oxygenation)"
                      stroke="hsl(var(--numo-blue-900))"
                      strokeWidth={2}
                    />
                  ) : (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={0}
                      fill="transparent"
                      stroke="transparent"
                    />
                  )
                }
                activeDot={{
                  r: 6,
                  fill: "var(--color-oxygenation)",
                  stroke: "hsl(var(--numo-gray-400))",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-[17px]">
        <div className="inline-flex items-center gap-2 text-numo-slate-400">
          <span className="h-2.5 w-2.5 rounded-full bg-numo-blue-400" />
          Oxygenation
        </div>
        <div className="inline-flex items-center gap-2 text-numo-slate-400">
          <span className="h-2.5 w-2.5 rounded-full bg-numo-warm-blue-400" />
          Pulse
        </div>
        <div className="inline-flex items-center gap-2 text-numo-slate-400">
          <span className="relative inline-flex h-2.5 w-5 items-center">
            <span className="absolute left-0 h-2.5 w-2.5 rounded-full bg-numo-teal-400" />
            <span className="absolute left-1.5 h-2.5 w-2.5 rounded-full bg-numo-yellow-500 ring-1 ring-numo-blue-900/70" />
            <span className="absolute left-3 h-2.5 w-2.5 rounded-full bg-numo-red-600 ring-1 ring-numo-blue-900/70" />
          </span>
          Symptom trend
        </div>
        <div className="inline-flex items-center gap-2 text-numo-slate-400">
          <span className="h-px w-6 border-t-2 border-dashed border-numo-slate-400" />
          Tomorrow expected
        </div>
      </div>
    </article>
  );
}

export function PatientMyHealthDemo() {
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-[28px] border border-numo-blue-700 bg-numo-blue-800 shadow-[0_32px_100px_hsl(var(--numo-blue-900)/0.38)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--numo-slate-700)/0.18),transparent_28%),radial-gradient(circle_at_50%_42%,hsl(var(--numo-blue-400)/0.08),transparent_30%)]" />

      <div className="relative min-h-190 px-8 py-7 sm:px-10 sm:py-9">
        <header className="flex items-start justify-between gap-4">
          <div className="pt-1">
            <Image src="/numoW.svg" alt="Numo logo" width={204} height={56} className="h-9 w-auto sm:h-11" priority />
          </div>

          <div className="flex items-center gap-4">
            <InteractionMenu />
          </div>
        </header>

        <main className="pb-8 pt-8">
          <div className="mt-12 grid gap-4 lg:grid-cols-[0.95fr_1.45fr]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {SUMMARY_CARDS.map((card) => (
                  <HealthSummaryCard key={card.title} {...card} />
                ))}
              </div>
              <MostCommonSymptomsCard rows={SYMPTOM_ROWS} />
            </div>

            <SymptomTrendCard points={TREND_POINTS} />
          </div>
        </main>
      </div>
    </div>
  );
}
