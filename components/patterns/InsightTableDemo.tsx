"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BellRing,
  ClipboardList,
  Gauge,
  HeartPulse,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
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

const MORE_LABEL_OPTIONS = [
  "More symptoms",
  "Needs review",
  "Escalation needed",
  "Review trends",
  "Needs coaching",
  "Stable",
  "Reviews",
] as const;

type MoreLabelOption = (typeof MORE_LABEL_OPTIONS)[number];

type PatientRow = {
  id: string;
  name: string;
  clinic: string;
  risk: Exclude<RiskFilter, "all">;
  statusLevel: Exclude<RiskFilter, "all">;
  abnormalVitals: boolean;
  meta: string;
  condition: string;
  symptoms: string[];
  moreLabel: MoreLabelOption;
  moreTime: string;
  oxygenation: number;
  pulseBpm: number;
  readingTime: string;
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

type RowRisk = Exclude<RiskFilter, "all">;
type StatusDotColor = PatientRow["statusDots"][number]["color"];

const AUDIO_DURATION_S = 30;
const STATUS_DOT_COLOR_CLASS: Record<StatusDotColor, string> = {
  green:
    "bg-[#22c55e] shadow-[0_0_0_1px_rgba(34,197,94,0.15),0_0_10px_rgba(34,197,94,0.35)]",
  yellow:
    "bg-[#f59e0b] shadow-[0_0_0_1px_rgba(245,158,11,0.15),0_0_10px_rgba(245,158,11,0.35)]",
  red: "bg-[#ef4444] shadow-[0_0_0_1px_rgba(239,68,68,0.15),0_0_12px_rgba(239,68,68,0.4)]",
};
const STATUS_DOT_SIZE_CLASS: Record<PatientRow["statusDots"][number]["size"], string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};
const RISK_TO_DOT_COLOR: Record<RowRisk, StatusDotColor> = {
  low: "green",
  moderate: "yellow",
  high: "red",
};
const RISK_CYCLE: RowRisk[] = ["low", "moderate", "high"];
const MORE_LABEL_ICON: Record<MoreLabelOption, React.ComponentType<{ className?: string }>> = {
  "More symptoms": Activity,
  "Needs review": SearchCheck,
  "Escalation needed": BellRing,
  "Review trends": Gauge,
  "Needs coaching": ClipboardList,
  Stable: ShieldCheck,
  Reviews: HeartPulse,
};

function statusDots(colors: [StatusDotColor, StatusDotColor, StatusDotColor]): PatientRow["statusDots"] {
  return [
    { color: colors[0], size: "sm" },
    { color: colors[1], size: "md" },
    { color: colors[2], size: "lg" },
  ];
}

const RISK_ORDER: Record<RowRisk, number> = {
  high: 0,
  moderate: 1,
  low: 2,
};

const INITIAL_ROWS: PatientRow[] = [
  {
    id: "p1",
    name: "Marta Beauchamp",
    clinic: "Curie Downtown",
    risk: "high",
    statusLevel: "high",
    abnormalVitals: false,
    meta: "57 yrs, female",
    condition: "COPD",
    symptoms: ["Cough [4]", "Sneeze [8]", "Heavy breathing [2]"],
    moreLabel: "More symptoms",
    moreTime: "03:46 PM, 02/24",
    oxygenation: 94,
    pulseBpm: 96,
    readingTime: "03:46 PM, 02/24",
    actionStates: { schedule: "default", message: "loading", videoCall: "disabled" },
    statusDots: statusDots(["yellow", "red", "red"]),
  },
  {
    id: "p2",
    name: "Marco Odermatt",
    clinic: "Curie North",
    risk: "high",
    statusLevel: "high",
    abnormalVitals: true,
    meta: "63 yrs, male",
    condition: "Asthma",
    symptoms: ["Wheezing [6]", "Cough [2]", "Shortness of breath [3]"],
    moreLabel: "Needs review",
    moreTime: "09:12 AM, 02/25",
    oxygenation: 89,
    pulseBpm: 102,
    readingTime: "09:12 AM, 02/25",
    actionStates: { schedule: "danger", message: "success", videoCall: "default" },
    statusDots: statusDots(["red", "yellow", "red"]),
  },
  {
    id: "p3",
    name: "Denise Mertens",
    clinic: "Curie Downtown",
    risk: "low",
    statusLevel: "moderate",
    abnormalVitals: true,
    meta: "80 yrs, female",
    condition: "COPD",
    symptoms: ["Wheezing [19]", "Cough [2]", "Shortness of breath [30]"],
    moreLabel: "More symptoms",
    moreTime: "06:25 AM, 02/25",
    oxygenation: 86,
    pulseBpm: 98,
    readingTime: "12:17 AM, 02/24",
    actionStates: { schedule: "default", message: "default", videoCall: "default" },
    statusDots: statusDots(["green", "green", "yellow"]),
  },
  {
    id: "p4",
    name: "Caroline Hayes",
    clinic: "Curie East",
    risk: "moderate",
    statusLevel: "moderate",
    abnormalVitals: true,
    meta: "69 yrs, female",
    condition: "Interstitial Lung Disease",
    symptoms: ["Chest tightness [4]", "Cough [3]", "Fatigue [5]"],
    moreLabel: "Review trends",
    moreTime: "11:22 AM, 02/25",
    oxygenation: 91,
    pulseBpm: 92,
    readingTime: "11:20 AM, 02/25",
    actionStates: { schedule: "default", message: "default", videoCall: "success" },
    statusDots: statusDots(["yellow", "green", "yellow"]),
  },
  {
    id: "p5",
    name: "Julian Mercer",
    clinic: "Curie Downtown",
    risk: "high",
    statusLevel: "high",
    abnormalVitals: true,
    meta: "74 yrs, male",
    condition: "COPD",
    symptoms: ["Wheezing [8]", "Shortness of breath [7]", "Cough [5]"],
    moreLabel: "Escalation needed",
    moreTime: "01:05 PM, 02/25",
    oxygenation: 84,
    pulseBpm: 110,
    readingTime: "01:04 PM, 02/25",
    actionStates: { schedule: "danger", message: "loading", videoCall: "default" },
    statusDots: statusDots(["red", "red", "yellow"]),
  },
  {
    id: "p6",
    name: "Emma Sullivan",
    clinic: "Curie North",
    risk: "low",
    statusLevel: "low",
    abnormalVitals: false,
    meta: "52 yrs, female",
    condition: "Asthma",
    symptoms: ["Sneeze [2]", "Cough [1]", "Shortness of breath [1]"],
    moreLabel: "Stable",
    moreTime: "08:33 AM, 02/25",
    oxygenation: 97,
    pulseBpm: 78,
    readingTime: "08:31 AM, 02/25",
    actionStates: { schedule: "default", message: "success", videoCall: "default" },
    statusDots: statusDots(["green", "yellow", "green"]),
  },
  {
    id: "p7",
    name: "Noah Bradford",
    clinic: "Curie South",
    risk: "moderate",
    statusLevel: "low",
    abnormalVitals: true,
    meta: "61 yrs, male",
    condition: "Pulmonary Fibrosis",
    symptoms: ["Breathlessness [5]", "Fatigue [4]", "Dry cough [3]"],
    moreLabel: "Needs coaching",
    moreTime: "04:44 PM, 02/24",
    oxygenation: 90,
    pulseBpm: 104,
    readingTime: "04:43 PM, 02/24",
    actionStates: { schedule: "default", message: "default", videoCall: "disabled" },
    statusDots: statusDots(["yellow", "red", "green"]),
  },
];

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

function StatusChangeDialog({
  patientName,
  nextRisk,
  onCancel,
  onConfirm,
}: {
  patientName: string;
  nextRisk: RowRisk;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/35 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-5 shadow-xl">
        <div className="text-sm font-semibold text-foreground">Confirm Status Change</div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Change <span className="font-medium text-foreground">{patientName}</span> to{" "}
          <span className="font-medium text-foreground">{nextRisk}</span> status?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background transition hover:opacity-90"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function MoreLabelDialog({
  patientName,
  initialLabel,
  onCancel,
  onConfirm,
}: {
  patientName: string;
  initialLabel: MoreLabelOption;
  onCancel: () => void;
  onConfirm: (label: MoreLabelOption) => void;
}) {
  const [selectedLabel, setSelectedLabel] = React.useState<MoreLabelOption>(initialLabel);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/35 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-5 shadow-xl">
        <div className="text-sm font-semibold text-foreground">Update More Label</div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Choose the new more label for <span className="font-medium text-foreground">{patientName}</span>.
        </p>
        <div className="mt-4 grid gap-2">
          {MORE_LABEL_OPTIONS.map((label) => {
            const isSelected = selectedLabel === label;
            const Icon = MORE_LABEL_ICON[label];

            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedLabel(label)}
                className={[
                  "rounded-lg border px-3 py-2 text-left text-sm transition",
                  isSelected
                    ? "border-foreground bg-foreground/5 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{label}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selectedLabel)}
            className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background transition hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function InsightStatus({
  rowId,
  statusDots,
  statusLevel,
  onRequestRiskChange,
}: {
  rowId: string;
  statusDots: PatientRow["statusDots"];
  statusLevel: RowRisk;
  onRequestRiskChange: (risk: RowRisk) => void;
}) {
  const nextRisk = RISK_CYCLE[(RISK_CYCLE.indexOf(statusLevel) + 1) % RISK_CYCLE.length] ?? "low";

  return (
    <TooltipZ label={`Large square: ${statusLevel}. Click to set ${nextRisk}.`}>
      <div className="flex items-center gap-2">
        {statusDots.map((dot, idx) => {
          const isLargeDot = dot.size === "lg";

          if (!isLargeDot) {
            return (
              <span
                key={`${rowId}-dot-${idx}`}
                className={[
                  "rounded ring-1 ring-white/70",
                  STATUS_DOT_COLOR_CLASS[dot.color],
                  STATUS_DOT_SIZE_CLASS[dot.size],
                ].join(" ")}
              />
            );
          }

          return (
            <button
              key={`${rowId}-dot-${idx}`}
              type="button"
              onClick={() => onRequestRiskChange(nextRisk)}
              className={[
                "rounded ring-1 ring-white/70 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40",
                STATUS_DOT_COLOR_CLASS[RISK_TO_DOT_COLOR[statusLevel]],
                STATUS_DOT_SIZE_CLASS[dot.size],
              ].join(" ")}
              aria-label={`Set ${rowId} status. Current ${statusLevel}. Click to switch to ${nextRisk}.`}
            />
          );
        })}
      </div>
    </TooltipZ>
  );
}

function InsightMore({
  rowId,
  moreLabel,
  moreTime,
  onRequestMoreLabelChange,
}: {
  rowId: string;
  moreLabel: MoreLabelOption;
  moreTime: string;
  onRequestMoreLabelChange: () => void;
}) {
  const Icon = MORE_LABEL_ICON[moreLabel];

  return (
    <div className="min-w-0">
      <TooltipZ label="Update this follow-up label">
        <button
          type="button"
          onClick={onRequestMoreLabelChange}
          className="flex max-w-full items-center gap-2 text-left text-sm font-medium leading-tight text-foreground transition hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          aria-label={`Update more label for ${rowId}. Current label ${moreLabel}.`}
        >
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{moreLabel}</span>
        </button>
      </TooltipZ>
      <div className="mt-1 pl-6 pt-1 text-[11px] leading-none text-muted-foreground tabular-nums">
        {moreTime}
      </div>
    </div>
  );
}

function InsightVitals({
  oxygenation,
  pulseBpm,
  readingTime,
}: {
  oxygenation: number;
  pulseBpm: number;
  readingTime: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="min-w-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="space-y-0.5">
        <div className="text-sm leading-snug">
          {oxygenation}% O2, {pulseBpm} BPM
        </div>
        <div className="relative pl-0.5 pt-1">
          <motion.button
            type="button"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-0 inline-flex rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm"
          >
            Request new reading
          </motion.button>
          <div className="text-[11px] leading-none text-muted-foreground tabular-nums">
            {readingTime}
          </div>
        </div>
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
  onRequestRiskChange,
  onRequestMoreLabelChange,
}: {
  row: PatientRow;
  rowIndex: number;
  isLast?: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
  elapsedSeconds: number;
  onRequestRiskChange: (risk: RowRisk) => void;
  onRequestMoreLabelChange: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);
  const clamped = Math.max(0, Math.min(AUDIO_DURATION_S, elapsedSeconds));
  const baseZ = 10 + rowIndex;
  const activeZ = 60;

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
        <InsightStatus
          rowId={row.id}
          statusDots={row.statusDots}
          statusLevel={row.statusLevel}
          onRequestRiskChange={onRequestRiskChange}
        />

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
        <InsightMore
          rowId={row.id}
          moreLabel={row.moreLabel}
          moreTime={row.moreTime}
          onRequestMoreLabelChange={onRequestMoreLabelChange}
        />

        {/* vitals */}
        <InsightVitals
          oxygenation={row.oxygenation}
          pulseBpm={row.pulseBpm}
          readingTime={row.readingTime}
        />

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
  const [rows, setRows] = React.useState<PatientRow[]>(() => INITIAL_ROWS);
  const [pendingStatusChange, setPendingStatusChange] = React.useState<{
    rowId: string;
    patientName: string;
    nextRisk: RowRisk;
  } | null>(null);
  const [pendingMoreLabelChange, setPendingMoreLabelChange] = React.useState<{
    rowId: string;
    patientName: string;
    currentLabel: MoreLabelOption;
  } | null>(null);

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
        if (risk !== "all" && row.risk !== risk) return false;
        if (clinic !== "all" && row.clinic !== clinic) return false;
        if (abnormalVitalsOnly && !row.abnormalVitals) return false;
        return true;
      });

      return result.sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk]);
    },
    [rows, risk, clinic, abnormalVitalsOnly]
  );

  function updateRowRisk(rowId: string, nextRisk: RowRisk) {
    setRows((currentRows) =>
      currentRows.map((row) => {
        if (row.id !== rowId) return row;

        return {
          ...row,
          statusLevel: nextRisk,
          statusDots: row.statusDots.map((dot) =>
            dot.size === "lg" ? { ...dot, color: RISK_TO_DOT_COLOR[nextRisk] } : dot
          ),
        };
      })
    );
  }

  function requestRowRiskChange(rowId: string, patientName: string, nextRisk: RowRisk) {
    setPendingStatusChange({ rowId, patientName, nextRisk });
  }

  function confirmRowRiskChange() {
    if (!pendingStatusChange) return;
    updateRowRisk(pendingStatusChange.rowId, pendingStatusChange.nextRisk);
    setPendingStatusChange(null);
  }

  function requestMoreLabelChange(rowId: string, patientName: string, currentLabel: MoreLabelOption) {
    setPendingMoreLabelChange({ rowId, patientName, currentLabel });
  }

  function confirmMoreLabelChange(nextLabel: MoreLabelOption) {
    if (!pendingMoreLabelChange) return;

    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === pendingMoreLabelChange.rowId
          ? {
              ...row,
              moreLabel: nextLabel,
            }
          : row
      )
    );
    setPendingMoreLabelChange(null);
  }

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
                    onRequestRiskChange={(nextRisk) => requestRowRiskChange(row.id, row.name, nextRisk)}
                    onRequestMoreLabelChange={() => requestMoreLabelChange(row.id, row.name, row.moreLabel)}
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
        {pendingStatusChange ? (
          <StatusChangeDialog
            patientName={pendingStatusChange.patientName}
            nextRisk={pendingStatusChange.nextRisk}
            onCancel={() => setPendingStatusChange(null)}
            onConfirm={confirmRowRiskChange}
          />
        ) : null}
        {pendingMoreLabelChange ? (
          <MoreLabelDialog
            patientName={pendingMoreLabelChange.patientName}
            initialLabel={pendingMoreLabelChange.currentLabel}
            onCancel={() => setPendingMoreLabelChange(null)}
            onConfirm={confirmMoreLabelChange}
          />
        ) : null}
      </div>
    </TooltipProvider>
  );
}
