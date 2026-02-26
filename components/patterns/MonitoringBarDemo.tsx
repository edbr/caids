"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CirclePause, CirclePlay, Ellipsis, TimerReset } from "lucide-react";

type MonitoringState = "start" | "paused" | "stopAtTen";

type MenuAction = {
  id: string;
  label: string;
  nextState: MonitoringState;
  icon: React.ComponentType<{ className?: string }>;
};

const STATE_COPY: Record<MonitoringState, string> = {
  start: "Monitoring will start at 7:00 PM",
  paused: "Monitoring is paused",
  stopAtTen: "Monitoring will stop at 10:00 AM",
};

const STATE_ACTIONS: Record<MonitoringState, MenuAction[]> = {
  start: [{ id: "start-now", label: "Start monitoring", nextState: "stopAtTen", icon: CirclePlay }],
  paused: [
    {
      id: "start-from-paused",
      label: "Start monitoring",
      nextState: "stopAtTen",
      icon: CirclePlay,
    },
    {
      id: "stop-tomorrow",
      label: "Stop monitoring until tomorrow",
      nextState: "start",
      icon: TimerReset,
    },
  ],
  stopAtTen: [
    {
      id: "pause-from-stop",
      label: "Pause monitoring for 15 minutes",
      nextState: "paused",
      icon: CirclePause,
    },
    {
      id: "stop-tomorrow-from-stop",
      label: "Stop monitoring until tomorrow",
      nextState: "start",
      icon: TimerReset,
    },
  ],
};

export function MonitoringBarDemo() {
  const [state, setState] = React.useState<MonitoringState>("stopAtTen");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const isPaused = state === "paused";
  const isAnimating = state === "stopAtTen";
  const morphDuration = isPaused ? 3.8 : 2.2;

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const actions = STATE_ACTIONS[state];

  return (
    <div className="rounded-md  bg-numo-blue-800 p-6 md:p-8 overflow-visible">
      <div className="relative mx-auto w-full max-w-260 overflow-visible" ref={menuRef}>
        <div
          className="flex items-center gap-6 px-8 py-5"
          style={{
            borderRadius: "20px",
            border: "2px solid hsl(var(--numo-teal-900))",
            opacity: 1,
            background: "hsl(var(--numo-blue-800))",
            boxShadow: "var(--ds-shadow-md)",
          }}
        >
          <motion.svg
            viewBox="0 0 240 96"
            className="h-18 w-54 shrink-0 "
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden
            animate={{ opacity: isAnimating ? 0.92 : 0.62 }}
            transition={{ duration: 0.2 }}
          >
            <defs>
              <linearGradient id="monitor-wave-main" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="hsl(var(--numo-blue-400) / 0.25)" />
                <stop offset="42%" stopColor="hsl(var(--numo-teal-400) / 0.95)" />
                <stop offset="100%" stopColor="hsl(var(--numo-orange-400) / 0.5)" />
              </linearGradient>
              <linearGradient id="monitor-wave-sub" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="hsl(var(--numo-blue-500) / 0.2)" />
                <stop offset="60%" stopColor="hsl(var(--numo-teal-600) / 0.7)" />
                <stop offset="100%" stopColor="hsl(var(--numo-yellow-500) / 0.95)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M4 48C26 28 40 68 62 48C84 28 98 68 120 48C142 28 156 68 178 48C200 28 214 60 236 48"
              stroke="url(#monitor-wave-main)"
              strokeWidth="3.1"
              strokeLinecap="round"
              animate={
                isAnimating
                  ? {
                      d: [
                        "M4 48C26 28 40 68 62 48C84 28 98 68 120 48C142 28 156 68 178 48C200 28 214 60 236 48",
                        "M4 48C26 68 40 28 62 48C84 68 98 28 120 48C142 68 156 28 178 48C200 68 214 34 236 48",
                        "M4 48C26 28 40 68 62 48C84 28 98 68 120 48C142 28 156 68 178 48C200 28 214 60 236 48",
                      ],
                    }
                  : undefined
              }
              transition={isAnimating ? { duration: morphDuration, repeat: Infinity, ease: "linear" } : undefined}
            />
            <motion.path
              d="M4 62C26 44 40 82 62 62C84 44 98 82 120 62C142 44 156 82 178 62C200 44 214 76 236 62"
              stroke="url(#monitor-wave-sub)"
              strokeWidth="2.4"
              strokeLinecap="round"
              animate={
                isAnimating
                  ? {
                      d: [
                        "M4 62C26 44 40 82 62 62C84 44 98 82 120 62C142 44 156 82 178 62C200 44 214 76 236 62",
                        "M4 62C26 82 40 44 62 62C84 82 98 44 120 62C142 82 156 44 178 62C200 82 214 48 236 62",
                        "M4 62C26 44 40 82 62 62C84 44 98 82 120 62C142 44 156 82 178 62C200 44 214 76 236 62",
                      ],
                    }
                  : undefined
              }
              transition={
                isAnimating
                  ? { duration: morphDuration * 1.08, repeat: Infinity, ease: "linear", delay: 0.22 }
                  : undefined
              }
            />
            <motion.path
              d="M8 36C30 24 42 52 64 36C86 24 98 52 120 36C142 24 154 52 176 36C198 24 210 48 232 36"
              stroke="hsl(var(--numo-blue-400) / 0.42)"
              strokeWidth="1.8"
              strokeLinecap="round"
              animate={
                isAnimating
                  ? {
                      d: [
                        "M8 36C30 24 42 52 64 36C86 24 98 52 120 36C142 24 154 52 176 36C198 24 210 48 232 36",
                        "M8 36C30 52 42 24 64 36C86 52 98 24 120 36C142 52 154 24 176 36C198 52 210 26 232 36",
                        "M8 36C30 24 42 52 64 36C86 24 98 52 120 36C142 24 154 52 176 36C198 24 210 48 232 36",
                      ],
                    }
                  : undefined
              }
              transition={
                isAnimating
                  ? { duration: morphDuration * 0.9, repeat: Infinity, ease: "linear", delay: 0.1 }
                  : undefined
              }
            />
          </motion.svg>

          <p className="flex-1 text-left font-sans px-6 text-[26px] leading-none text-numo-slate-400">
            {STATE_COPY[state]}
          </p>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Open monitoring menu"
            className="shrink-0 self-center inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-numo-slate-500/30 bg-numo-blue-900/35 text-numo-gray-400 transition hover:border-numo-orange-500 hover:bg-numo-blue-800/55 hover:text-numo-orange-400"
          >
            <Ellipsis className="h-7 w-7" />
          </button>
        </div>

        {menuOpen ? (
          <div className="absolute right-0 top-full z-20 mt-3 w-90">
            <div className="rounded-2xl border border-numo-blue-700/70 bg-numo-blue-900/95 p-2.5 shadow-[0_10px_24px_hsl(var(--numo-blue-900)/0.45),0_2px_8px_hsl(var(--numo-blue-900)/0.35)] backdrop-blur-sm">
            <div className="space-y-1.5">
              {actions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    setState(action.nextState);
                    setMenuOpen(false);
                  }}
                  className="group flex min-h-14 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-numo-slate-400 transition-all duration-150 hover:bg-numo-blue-700/80 active:scale-[0.99] active:bg-numo-blue-700"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-numo-blue-800/70 text-numo-slate-500 transition-colors group-hover:bg-numo-blue-800 group-hover:text-numo-gray-400">
                    <action.icon className="h-6 w-6" />
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
