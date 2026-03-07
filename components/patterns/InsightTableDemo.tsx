"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InsightTableFilters, type RiskFilter } from "@/components/patterns/InsightTableFilters";
import { DSAudioPlayButton } from "@/components/ds/audio-play-button";
import { InsightTableRowActions } from "@/components/patterns/InsightTableRowActions";
import { type ActionState } from "@/components/patterns/RowActions";

type PatientRow = {
  id: string;
  name: string;
  clinic: string;
  risk: Exclude<RiskFilter, "all">;
  abnormalVitals: boolean;
  meta: string;
  condition: string;
  symptoms: string[];
  moreLabel: string;
  moreTime: string;
  metricTitle: string;
  metricDetail: string;
  metricTime: string;
  actionStates: {
    schedule?: ActionState;
    message?: ActionState;
    videoCall?: ActionState;
  };
  statusDots: Array<{
    color: "green" | "yellow" | "red";
    size: "sm" | "md" | "lg";
  }>;
};

const AUDIO_DURATION_S = 30;
const STATUS_COLORS: Array<"green" | "yellow" | "red"> = ["green", "yellow", "red"];

function stableHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function statusDotsFromId(id: string): PatientRow["statusDots"] {
  const hash = stableHash(id);
  return [
    { color: STATUS_COLORS[hash % STATUS_COLORS.length]!, size: "sm" },
    { color: STATUS_COLORS[Math.floor(hash / 3) % STATUS_COLORS.length]!, size: "md" },
    { color: STATUS_COLORS[Math.floor(hash / 9) % STATUS_COLORS.length]!, size: "lg" },
  ];
}

function riskFromStatusDots(statusDots: PatientRow["statusDots"]): Exclude<RiskFilter, "all"> {
  const thirdDot = statusDots[2];
  if (!thirdDot) return "low";
  if (thirdDot.color === "red") return "high";
  if (thirdDot.color === "yellow") return "moderate";
  return "low";
}

const RISK_ORDER: Record<Exclude<RiskFilter, "all">, number> = {
  high: 0,
  moderate: 1,
  low: 2,
};

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

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.min(AUDIO_DURATION_S, Math.floor(totalSeconds)));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function HeaderRow() {
  return (
    <div className="rounded-t-xl border border-border bg-muted/60 backdrop-blur-sm">
      <div
        className={[
          "grid items-center gap-6 px-6 py-3",
          // status | patient | audio | symptoms | more | vitals | actions
          "grid-cols-[72px_minmax(220px,1.2fr)_56px_minmax(220px,1.3fr)_minmax(160px,1fr)_minmax(180px,1fr)_140px]",
        ].join(" ")}
      >
        <div className="opacity-0 select-none">status</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Patient</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground text-center">Audio</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Symptoms</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">More</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Vitals</div>
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground text-right">Actions</div>
      </div>
    </div>
  );
}

function InsightRow({
  row,
  rowIndex,
  isLast,
  isPlaying,
  onTogglePlay,
  elapsedSeconds,
}: {
  row: PatientRow;
  rowIndex: number;
  isLast?: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
  elapsedSeconds: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  const clamped = Math.max(0, Math.min(AUDIO_DURATION_S, elapsedSeconds));
  const baseZ = 10 + rowIndex;
  const activeZ = 60;
  const dotColorClass: Record<PatientRow["statusDots"][number]["color"], string> = {
    green:
      "bg-[#22c55e] shadow-[0_0_0_1px_rgba(34,197,94,0.15),0_0_10px_rgba(34,197,94,0.35)]",
    yellow:
      "bg-[#f59e0b] shadow-[0_0_0_1px_rgba(245,158,11,0.15),0_0_10px_rgba(245,158,11,0.35)]",
    red: "bg-[#ef4444] shadow-[0_0_0_1px_rgba(239,68,68,0.15),0_0_12px_rgba(239,68,68,0.4)]",
  };
  const dotSizeClass: Record<PatientRow["statusDots"][number]["size"], string> = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ zIndex: hovered || isPlaying ? activeZ : baseZ }}
    animate={{
    backgroundColor: hovered
        ? "hsl(var(--ds-row-hover) / 0.92)"
        : "hsl(var(--ds-row) / 0.70)",
    y: hovered ? -1 : 0,
    boxShadow: hovered ? "0 6px 18px rgba(0,0,0,0.06)" : "0 0 0 rgba(0,0,0,0)",
    }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={[
        "relative isolate overflow-visible",
        "border border-border border-t-0",
        "bg-[hsl(var(--ds-row)/0.70)]",
        isLast ? "rounded-b-xl" : "",
      ].join(" ")}
    >
      <div
        className={[
          "grid items-center gap-6 px-6 py-4",
          "grid-cols-[72px_minmax(220px,1.2fr)_56px_minmax(220px,1.3fr)_minmax(160px,1fr)_minmax(180px,1fr)_140px]",
        ].join(" ")}
      >
        {/* status */}
        <div className="flex items-center gap-2">
          {row.statusDots.map((dot, idx) => (
            <span
              key={`${row.id}-dot-${idx}`}
              className={[
                "rounded ring-1 ring-white/70",
                dotColorClass[dot.color],
                dotSizeClass[dot.size],
              ].join(" ")}
            />
          ))}
        </div>

        {/* patient */}
        <div className="min-w-0">
          <div className="text-base font-medium text-foreground leading-tight truncate">
            {row.name}
          </div>
          <div className="mt-1 space-y-px">
            <div className="text-sm text-muted-foreground leading-snug">{row.meta}</div>
            <div className="text-sm text-muted-foreground leading-snug">{row.condition}</div>
          </div>
        </div>

        {/* audio */}
        <div className="flex justify-center">
          <TooltipZ
            label={
              isPlaying
                ? `Playing (${formatTime(clamped)} / ${formatTime(AUDIO_DURATION_S)})`
                : `Play (${AUDIO_DURATION_S}s clip)`
            }
          >
            <DSAudioPlayButton
              isPlaying={isPlaying}
              onToggle={onTogglePlay}
              elapsedSeconds={elapsedSeconds}
              durationSeconds={AUDIO_DURATION_S}
              stopPropagation
              playAriaLabel="Play symptom audio"
              pauseAriaLabel="Playing symptom audio"
            />
          </TooltipZ>
        </div>

        {/* symptoms */}
        <div className="relative text-xs text-foreground leading-snug">
          <div className="space-y-0.5">
            {row.symptoms.slice(0, 3).map((s) => (
              <div key={s}>{s}</div>
            ))}
          </div>

          <motion.div
            animate={{ opacity: isPlaying ? 1 : 0, y: isPlaying ? 0 : 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="mt-2 text-[11px] text-muted-foreground tabular-nums"
          >
            {isPlaying ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                {formatTime(clamped)} / {formatTime(AUDIO_DURATION_S)}
              </span>
            ) : (
              <span className="select-none"> </span>
            )}
          </motion.div>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              pointer-events-none
              absolute left-0 right-0
              top-full mt-2
              rounded-md
              bg-background
              border border-border
              px-3 py-2
              text-xs text-muted-foreground
              leading-snug
              shadow-sm
              z-50
            "
          >
            <div>Chest tightness [3]</div>
            <div>Wheezing [2]</div>
          </motion.div>
        </div>

        {/* more */}
        <div className="min-w-0">
          <div className="text-sm font-medium text-foreground leading-tight truncate">
            {row.moreLabel}
          </div>
          <div className="mt-1 text-[11px] leading-none text-muted-foreground tabular-nums">
            {row.moreTime}
          </div>
        </div>

        {/* vitals */}
        <div className="min-w-0">
          <div className="text-xs font-medium text-muted-foreground leading-tight">
            {row.metricTitle}
          </div>
          <div className="mt-1 space-y-0.5">
            <div className="text-sm leading-snug">{row.metricDetail}</div>
            <div className="text-[11px] leading-none text-muted-foreground tabular-nums">
              {row.metricTime}
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-end">
          <InsightTableRowActions
            scheduleState={row.actionStates.schedule}
            messageState={row.actionStates.message}
            videoCallState={row.actionStates.videoCall}
            disabled
          />
        </div>
      </div>

      {/* subtle top highlight without layout shift */}
      <div
        className={[
          "absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-200",
          "bg-linear-to-r from-transparent via-foreground/25 to-transparent",
          hovered || isPlaying ? "opacity-100" : "",
        ].join(" ")}
        aria-hidden
      />
    </motion.div>
  );
}

export default function InsightTableDemo() {
  const rows = React.useMemo<PatientRow[]>(
    () => [
      {
        id: "p1",
        name: "Marta Beauchamp",
        clinic: "Curie Downtown",
        risk: "moderate",
        abnormalVitals: false,
        meta: "57 yrs, female",
        condition: "COPD",
        symptoms: ["Cough [4]", "Sneeze [8]", "Heavy breathing [2]"],
        moreLabel: "More symptoms",
        moreTime: "03:46 PM, 02/24",
        metricTitle: "70–130 mg/dl",
        metricDetail: "Pulse rate: 96 BPM",
        metricTime: "03:46 PM, 02/24",
        actionStates: { schedule: "default", message: "loading", videoCall: "disabled" },
        statusDots: statusDotsFromId("p1"),
      },
      {
        id: "p2",
        name: "Marco Odermatt",
        clinic: "Curie North",
        risk: "high",
        abnormalVitals: true,
        meta: "63 yrs, male",
        condition: "Asthma",
        symptoms: ["Wheezing [6]", "Cough [2]", "Shortness of breath [3]"],
        moreLabel: "Needs review",
        moreTime: "09:12 AM, 02/25",
        metricTitle: "SpO₂ trend",
        metricDetail: "O2 saturation: 89% (low)",
        metricTime: "09:12 AM, 02/25",
        actionStates: { schedule: "danger", message: "success", videoCall: "default" },
        statusDots: statusDotsFromId("p2"),
      },
      {
        id: "p3",
        name: "Denise Mertens",
        clinic: "Curie Downtown",
        risk: "low",
        abnormalVitals: true,
        meta: "80 yrs, female",
        condition: "COPD",
        symptoms: ["Wheezing [19]", "Cough [2]", "Shortness of breath [30]"],
        moreLabel: "More symptoms",
        moreTime: "06:25 AM, 02/25",
        metricTitle: "SpO₂ trend",
        metricDetail: "O2 saturation: 86% (low)",
        metricTime: "12:17 AM, 02/24",
        actionStates: { schedule: "default", message: "default", videoCall: "default" },
        statusDots: statusDotsFromId("p3"),
      },
      {
        id: "p4",
        name: "Caroline Hayes",
        clinic: "Curie East",
        risk: "moderate",
        abnormalVitals: true,
        meta: "69 yrs, female",
        condition: "Interstitial Lung Disease",
        symptoms: ["Chest tightness [4]", "Cough [3]", "Fatigue [5]"],
        moreLabel: "Review trends",
        moreTime: "11:22 AM, 02/25",
        metricTitle: "Respiratory rate",
        metricDetail: "RR: 23/min",
        metricTime: "11:20 AM, 02/25",
        actionStates: { schedule: "default", message: "default", videoCall: "success" },
        statusDots: statusDotsFromId("p4"),
      },
      {
        id: "p5",
        name: "Julian Mercer",
        clinic: "Curie Downtown",
        risk: "high",
        abnormalVitals: true,
        meta: "74 yrs, male",
        condition: "COPD",
        symptoms: ["Wheezing [8]", "Shortness of breath [7]", "Cough [5]"],
        moreLabel: "Escalation needed",
        moreTime: "01:05 PM, 02/25",
        metricTitle: "SpO₂ trend",
        metricDetail: "O2 saturation: 84% (critical)",
        metricTime: "01:04 PM, 02/25",
        actionStates: { schedule: "danger", message: "loading", videoCall: "default" },
        statusDots: statusDotsFromId("p5"),
      },
      {
        id: "p6",
        name: "Emma Sullivan",
        clinic: "Curie North",
        risk: "low",
        abnormalVitals: false,
        meta: "52 yrs, female",
        condition: "Asthma",
        symptoms: ["Sneeze [2]", "Cough [1]", "Shortness of breath [1]"],
        moreLabel: "Stable",
        moreTime: "08:33 AM, 02/25",
        metricTitle: "Pulse trend",
        metricDetail: "Pulse rate: 78 BPM",
        metricTime: "08:31 AM, 02/25",
        actionStates: { schedule: "default", message: "success", videoCall: "default" },
        statusDots: statusDotsFromId("p6"),
      },
      {
        id: "p7",
        name: "Noah Bradford",
        clinic: "Curie South",
        risk: "moderate",
        abnormalVitals: true,
        meta: "61 yrs, male",
        condition: "Pulmonary Fibrosis",
        symptoms: ["Breathlessness [5]", "Fatigue [4]", "Dry cough [3]"],
        moreLabel: "Needs coaching",
        moreTime: "04:44 PM, 02/24",
        metricTitle: "Activity vs HR",
        metricDetail: "Pulse rate: 104 BPM",
        metricTime: "04:43 PM, 02/24",
        actionStates: { schedule: "default", message: "default", videoCall: "disabled" },
        statusDots: statusDotsFromId("p7"),
      },
    ],
    []
  );

  const [playingRowId, setPlayingRowId] = React.useState<string | null>("p2");
  const [elapsedByRowId, setElapsedByRowId] = React.useState<Record<string, number>>({
    p1: 0,
    p2: 12,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
  });
  const [risk, setRisk] = React.useState<RiskFilter>("all");
  const [clinic, setClinic] = React.useState("all");
  const [abnormalVitalsOnly, setAbnormalVitalsOnly] = React.useState(false);

  const clinics = React.useMemo(
    () => [...new Set(rows.map((row) => row.clinic))].sort((a, b) => a.localeCompare(b)),
    [rows]
  );

  const filteredRows = React.useMemo(
    () => {
      const result = rows.filter((row) => {
        const derivedRisk = riskFromStatusDots(row.statusDots);
        if (risk !== "all" && derivedRisk !== risk) return false;
        if (clinic !== "all" && row.clinic !== clinic) return false;
        if (abnormalVitalsOnly && !row.abnormalVitals) return false;
        return true;
      });

      return result.sort(
        (a, b) => RISK_ORDER[riskFromStatusDots(a.statusDots)] - RISK_ORDER[riskFromStatusDots(b.statusDots)]
      );
    },
    [rows, risk, clinic, abnormalVitalsOnly]
  );

  function togglePlay(rowId: string) {
    setPlayingRowId((prev) => {
      const next = prev === rowId ? null : rowId;
      if (next) {
        setElapsedByRowId((m) => ({ ...m, [next]: 0 })); // restart
      }
      return next;
    });
  }

  React.useEffect(() => {
    if (!playingRowId) return;

    const tickMs = 120;
    const interval = window.setInterval(() => {
      setElapsedByRowId((m) => {
        const current = m[playingRowId] ?? 0;
        const next = current + tickMs / 1000;

        if (next >= AUDIO_DURATION_S) {
          window.setTimeout(() => setPlayingRowId(null), 0);
          return { ...m, [playingRowId]: AUDIO_DURATION_S };
        }
        return { ...m, [playingRowId]: next };
      });
    }, tickMs);

    return () => window.clearInterval(interval);
  }, [playingRowId]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="h-full w-full overflow-visible">
        <InsightTableFilters
          risk={risk}
          clinic={clinic}
          abnormalVitalsOnly={abnormalVitalsOnly}
          clinics={clinics}
          onRiskChange={setRisk}
          onClinicChange={setClinic}
          onAbnormalVitalsOnlyChange={setAbnormalVitalsOnly}
          onClear={() => {
            setRisk("all");
            setClinic("all");
            setAbnormalVitalsOnly(false);
          }}
        />
        <div className="h-full overflow-x-auto overflow-y-hidden pb-1">
          <div className="h-full min-w-310 rounded-xl border border-border bg-muted/30 overflow-visible">
            <HeaderRow />
            <div className="rounded-b-xl">
              {filteredRows.length > 0 ? (
                filteredRows.map((row, idx) => (
                  <InsightRow
                    key={row.id}
                    row={row}
                    rowIndex={idx}
                    isLast={idx === filteredRows.length - 1}
                    isPlaying={playingRowId === row.id}
                    onTogglePlay={() => togglePlay(row.id)}
                    elapsedSeconds={elapsedByRowId[row.id] ?? 0}
                  />
                ))
              ) : (
                <div className="rounded-b-xl border border-border border-t-0 px-6 py-8 text-center text-sm text-muted-foreground">
                  No patients match the current filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
