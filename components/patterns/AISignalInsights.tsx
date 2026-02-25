"use client";

import * as React from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShieldAlert,
  Users,
} from "lucide-react";

type InsightBubble = {
  id: string;
  label: string;
  value: number;
  valueClassName: string;
  Icon: React.ComponentType<{ className?: string }>;
  patients: string[];
};

const BUBBLES: InsightBubble[] = [
  {
    id: "high",
    label: "High-risk",
    value: 10,
    valueClassName: "text-[#ef4f4f]",
    Icon: ShieldAlert,
    patients: ["Marta Beauchamp", "Denise Mertens", "Robert Hansel"],
  },
  {
    id: "moderate",
    label: "Moderate-risk",
    value: 20,
    valueClassName: "text-[#d28a1f]",
    Icon: AlertTriangle,
    patients: ["Joanne Miller", "Marco Odermatt", "Liam Tardif"],
  },
  {
    id: "low",
    label: "Low-risk",
    value: 30,
    valueClassName: "text-[#22a060]",
    Icon: CheckCircle2,
    patients: ["Maria Perryman", "Noah Kim", "Alice Tran"],
  },
  {
    id: "progress",
    label: "Analysis in-progress",
    value: 40,
    valueClassName: "text-[#11a5e8]",
    Icon: Clock3,
    patients: ["Briana Lynch", "Omar Rivera", "Sadie Hall"],
  },
  {
    id: "complete",
    label: "Analysis complete",
    value: 50,
    valueClassName: "text-[#46bfd0]",
    Icon: Activity,
    patients: ["Denise Mertens", "Marta Beauchamp", "Kora Phelps"],
  },
  {
    id: "nodata",
    label: "No data in the past 24 hours",
    value: 60,
    valueClassName: "text-[#1f3648]",
    Icon: Users,
    patients: ["Aria White", "Clara Ingram", "Miles Yoon"],
  },
];

const LAST_UPDATED_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function formatRelativeTime(from: Date, nowMs: number) {
  const seconds = Math.max(0, Math.floor((nowMs - from.getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function AISignalInsights() {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState(() => new Date());
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [nowMs, setNowMs] = React.useState(() => Date.now());
  const [displayValues, setDisplayValues] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(BUBBLES.map((bubble) => [bubble.id, bubble.value]))
  );
  const animationFrameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const startCountAnimation = React.useCallback(() => {
    const durationMs = 800;
    const targets = Object.fromEntries(BUBBLES.map((bubble) => [bubble.id, bubble.value]));
    const startTime = performance.now();

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    setDisplayValues(Object.fromEntries(BUBBLES.map((bubble) => [bubble.id, 0])));

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - (1 - t) * (1 - t);

      setDisplayValues(
        Object.fromEntries(
          BUBBLES.map((bubble) => [bubble.id, Math.round(targets[bubble.id] * eased)])
        )
      );

      if (t < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  }, []);

  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleReload = React.useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    window.setTimeout(() => {
      setLastUpdated(new Date());
      setNowMs(Date.now());
      setIsRefreshing(false);
      startCountAnimation();
    }, 900);
  }, [isRefreshing, startCountAnimation]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#d8e4ee] bg-[#f6fbff] px-3 py-2">
        <div className="min-w-0 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c9ddec] bg-white text-[#2b5a77]">
            <Clock3 className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2b5a77]">
              Latest Update
            </p>
            <p className="truncate text-xs text-[#445564]">
              {LAST_UPDATED_FORMATTER.format(lastUpdated)}
              <span className="ml-2 rounded-full bg-[#e9f4ff] px-1.5 py-0.5 text-[10px] font-medium text-[#1f6aa3]">
                {formatRelativeTime(lastUpdated, nowMs)}
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReload}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#bfd8ea] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1f4f6d] transition hover:bg-[#edf7ff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={["h-3.5 w-3.5", isRefreshing ? "animate-spin" : ""].join(" ")} />
          {isRefreshing ? "Refreshing..." : "Reload data"}
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        {BUBBLES.map((bubble) => {
          const hovered = hoveredId === bubble.id;

          return (
            <div
              key={bubble.id}
              onMouseEnter={() => setHoveredId(bubble.id)}
              onMouseLeave={() => setHoveredId((id) => (id === bubble.id ? null : id))}
              className={[
                "relative rounded-md border border-border bg-card px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-sm",
                hovered ? "z-120" : "z-10",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={["text-[36px] font-semibold leading-none", bubble.valueClassName].join(" ")}>
                  {displayValues[bubble.id] ?? bubble.value}
                </p>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
                  <bubble.Icon className="h-4 w-4" />
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">{bubble.label}</p>

              {hovered ? (
                <div className="absolute left-0 right-0 top-full z-130 mt-2 rounded-md border border-border bg-background p-3 shadow-md">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Patients
                  </p>
                  <ul className="mt-2 space-y-1">
                    {bubble.patients.map((name) => (
                      <li key={name} className="text-xs text-foreground">
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
