"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  Video,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Play,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActionState = "default" | "disabled" | "loading" | "success" | "danger";

type RowAction = {
  key: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  state?: ActionState;
};

type PatientRow = {
  id: string;
  name: string;
  meta: string;
  condition: string;
  symptoms: string[];
  moreLabel: string;
  moreTime: string;
  metricTitle: string;
  metricDetail: string;
  metricTime: string;
  actions: RowAction[];
};

const AUDIO_DURATION_S = 30;

function ActionIcon({
  state,
  className,
}: {
  state?: ActionState;
  className?: string;
}) {
  if (state === "loading") return <Loader2 className={(className ?? "") + " animate-spin"} />;
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

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.min(AUDIO_DURATION_S, Math.floor(totalSeconds)));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function ProgressRing({ progress, active }: { progress: number; active: boolean }) {
  const size = 44;
  const stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0"
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(15,23,42,0.10)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={active ? "rgba(15,23,42,0.72)" : "rgba(15,23,42,0.25)"}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-dashoffset 140ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
    </svg>
  );
}

function EqualizerIcon() {
  return (
    <span className="relative inline-flex items-end gap-0.5 translate-y-px" aria-hidden>
      <span className="w-0.5 h-2 bg-current rounded-sm eq-bar" />
      <span className="w-0.5 h-3 bg-current rounded-sm eq-bar eq-bar--1" />
      <span className="w-0.5 h-2.5 bg-current rounded-sm eq-bar eq-bar--2" />
    </span>
  );
}


function PlayButton({
  isPlaying,
  onToggle,
  elapsedSeconds,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  elapsedSeconds: number;
}) {
  const clamped = Math.max(0, Math.min(AUDIO_DURATION_S, elapsedSeconds));
  const progress = clamped / AUDIO_DURATION_S;

  return (
    <TooltipZ
      label={
        isPlaying
          ? `Playing (${formatTime(clamped)} / ${formatTime(AUDIO_DURATION_S)})`
          : `Play (${AUDIO_DURATION_S}s clip)`
      }
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={isPlaying ? "Playing symptom audio" : "Play symptom audio"}
        className={[
          "group shrink-0 relative inline-flex items-center justify-center",
          "h-11 w-11 rounded-full",
          "border transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !isPlaying
            ? "border-border bg-background/70 text-muted-foreground hover:bg-background hover:text-foreground hover:shadow-sm"
            : "border-foreground/15 bg-muted text-foreground shadow-[0_8px_18px_rgba(0,0,0,0.08)] hover:bg-muted/90",
        ].join(" ")}
      >
        <ProgressRing progress={progress} active={isPlaying} />
        {isPlaying ? (
          <EqualizerIcon />
        ) : (
          <Play className="h-5 w-5 translate-x-px" aria-hidden />
        )}
      </button>
    </TooltipZ>
  );
}

function RowActions({ actions }: { actions: RowAction[] }) {
  return (
    <div className="flex items-center justify-end gap-3">
      {actions.map(({ key, Icon, label, state }) => {
        const isDisabled = state === "disabled" || state === "loading";

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
                {state === "loading" && " (sending...)"}
                {state === "success" && " (sent)"}
                {state === "danger" && " (needs attention)"}
              </>
            }
          >
            <button
              type="button"
              aria-label={label}
              disabled={isDisabled}
              className={[base, text, hover, focus, disabled, stateRing].join(" ")}
            >
              <Icon className="h-4 w-4" />

              {(state === "loading" || state === "success" || state === "danger") && (
                <span className="absolute -bottom-1 -right-1 grid place-items-center h-4 w-4 rounded-full bg-background border border-border shadow-sm">
                  <ActionIcon state={state} className="h-3 w-3 text-foreground" />
                </span>
              )}
            </button>
          </TooltipZ>
        );
      })}
    </div>
  );
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
          <span className="h-3 w-3 rounded bg-[#22c55e] ring-1 ring-white/70 shadow-[0_0_0_1px_rgba(34,197,94,0.15),0_0_10px_rgba(34,197,94,0.35)]" />
          <span className="h-4 w-4 rounded bg-[#f59e0b] ring-1 ring-white/70 shadow-[0_0_0_1px_rgba(245,158,11,0.15),0_0_10px_rgba(245,158,11,0.35)]" />
          <span className="h-6 w-6 rounded bg-[#ef4444] ring-1 ring-white/70 shadow-[0_0_0_1px_rgba(239,68,68,0.15),0_0_12px_rgba(239,68,68,0.4)]" />
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
          <PlayButton
            isPlaying={isPlaying}
            onToggle={onTogglePlay}
            elapsedSeconds={elapsedSeconds}
          />
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
          <RowActions actions={row.actions} />
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
        meta: "57 yrs, female",
        condition: "COPD",
        symptoms: ["Cough [4]", "Sneeze [8]", "Heavy breathing [2]"],
        moreLabel: "More symptoms",
        moreTime: "03:46 PM, 02/24",
        metricTitle: "70–130 mg/dl",
        metricDetail: "Pulse rate: 96 BPM",
        metricTime: "03:46 PM, 02/24",
        actions: [
          { key: "cal", Icon: Calendar, label: "Schedule follow-up", state: "default" },
          { key: "sms", Icon: MessageSquare, label: "Send SMS", state: "loading" },
          { key: "vid", Icon: Video, label: "Start video call", state: "disabled" },
        ],
      },
      {
        id: "p2",
        name: "Marco Odermatt",
        meta: "63 yrs, male",
        condition: "Asthma",
        symptoms: ["Wheezing [6]", "Cough [2]", "Shortness of breath [3]"],
        moreLabel: "Needs review",
        moreTime: "09:12 AM, 02/25",
        metricTitle: "SpO₂ trend",
        metricDetail: "O2 saturation: 89% (low)",
        metricTime: "09:12 AM, 02/25",
        actions: [
          { key: "cal", Icon: Calendar, label: "Schedule follow-up", state: "danger" },
          { key: "sms", Icon: MessageSquare, label: "Send SMS", state: "success" },
          { key: "vid", Icon: Video, label: "Start video call", state: "default" },
        ],
      },
      {
        id: "p3",
        name: "Denise Mertens",
        meta: "80 yrs, female",
        condition: "COPD",
        symptoms: ["Wheezing [19]", "Cough [2]", "Shortness of breath [30]"],
        moreLabel: "More symptoms",
        moreTime: "06:25 AM, 02/25",
        metricTitle: "SpO₂ trend",
        metricDetail: "O2 saturation: 86% (low)",
        metricTime: "12:17 AM, 02/24",
        actions: [
          { key: "cal", Icon: Calendar, label: "Schedule follow-up", state: "default" },
          { key: "sms", Icon: MessageSquare, label: "Send SMS", state: "default" },
          { key: "vid", Icon: Video, label: "Start video call", state: "default" },
        ],
      },
    ],
    []
  );

  const [playingRowId, setPlayingRowId] = React.useState<string | null>("p2");
  const [elapsedByRowId, setElapsedByRowId] = React.useState<Record<string, number>>({
    p1: 0,
    p2: 12,
    p3: 0,
  });

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
    <div className="w-full rounded-xl border border-border bg-muted/30 overflow-visible">
      <HeaderRow />
      <div className="rounded-b-xl">
        {rows.map((row, idx) => (
          <InsightRow
            key={row.id}
            row={row}
            rowIndex={idx}
            isLast={idx === rows.length - 1}
            isPlaying={playingRowId === row.id}
            onTogglePlay={() => togglePlay(row.id)}
            elapsedSeconds={elapsedByRowId[row.id] ?? 0}
          />
        ))}
      </div>
    </div>
  </TooltipProvider>
);
}
