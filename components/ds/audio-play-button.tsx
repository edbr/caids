"use client";

import { Play } from "lucide-react";

export function DSAudioPlayButton({
  isPlaying,
  elapsedSeconds,
  durationSeconds = 30,
  onToggle,
  stopPropagation = false,
  className,
  playAriaLabel = "Play symptom audio",
  pauseAriaLabel = "Pause symptom audio",
}: {
  isPlaying: boolean;
  elapsedSeconds: number;
  durationSeconds?: number;
  onToggle: () => void;
  stopPropagation?: boolean;
  className?: string;
  playAriaLabel?: string;
  pauseAriaLabel?: string;
}) {
  const clamped = Math.max(0, Math.min(durationSeconds, elapsedSeconds));
  const progress = durationSeconds > 0 ? clamped / durationSeconds : 0;
  const size = 44;
  const stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <button
      type="button"
      onClick={(event) => {
        if (stopPropagation) event.stopPropagation();
        onToggle();
      }}
      aria-label={isPlaying ? pauseAriaLabel : playAriaLabel}
      className={[
        "group shrink-0 relative inline-flex items-center justify-center",
        "h-11 w-11 rounded-full border ring-0 ring-inset transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !isPlaying
          ? "border-border bg-background/70 text-muted-foreground hover:bg-background hover:text-teal-600 hover:border-teal-600 hover:ring-1 hover:ring-teal-600/70"
          : "border-foreground/15 bg-muted text-foreground shadow-[0_8px_18px_rgba(0,0,0,0.08)] hover:bg-muted/90",
        className ?? "",
      ].join(" ")}
    >
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
          stroke={isPlaying ? "rgba(15,23,42,0.72)" : "rgba(15,23,42,0.25)"}
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

      {isPlaying ? (
        <span className="relative inline-flex items-end gap-0.5 translate-y-px" aria-hidden>
          <span className="eq-bar h-2 w-0.5 rounded-sm bg-numo-blue-600" />
          <span className="eq-bar eq-bar--1 h-3 w-0.5 rounded-sm bg-numo-blue-700" />
          <span className="eq-bar eq-bar--2 h-2.5 w-0.5 rounded-sm bg-numo-blue-800" />
        </span>
      ) : (
        <Play className="relative h-5 w-5 translate-x-px" aria-hidden />
      )}
    </button>
  );
}
