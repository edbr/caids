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
  const morphDuration = isPaused ? 4.4 : 2.8;

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
    <div className="rounded-md border border-numo-blue-700 bg-numo-blue-800 p-6 md:p-8 overflow-visible">
      <div className="relative mx-auto w-full max-w-260 overflow-visible" ref={menuRef}>
        <div
          className="flex items-center gap-6 px-8 py-5"
          style={{
            borderRadius: "20px",
            border: "2px solid hsl(var(--numo-blue-900))",
            opacity: 1,
            background: "hsl(var(--numo-blue-800))",
            boxShadow: "var(--ds-shadow-md)",
          }}
        >
          <motion.svg
            viewBox="0 0 240 76"
            className="h-14 w-54 shrink-0 "
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
              d="M4 36C26 24 40 48 62 36C84 24 98 48 120 36C142 24 156 48 178 36C200 24 214 44 236 36"
              stroke="url(#monitor-wave-main)"
              strokeWidth="3.1"
              strokeLinecap="round"
              animate={
                isAnimating
                  ? {
                      d: [
                        "M4 36C26 24 40 48 62 36C84 24 98 48 120 36C142 24 156 48 178 36C200 24 214 44 236 36",
                        "M4 36C26 48 40 24 62 36C84 48 98 24 120 36C142 48 156 24 178 36C200 48 214 28 236 36",
                        "M4 36C26 24 40 48 62 36C84 24 98 48 120 36C142 24 156 48 178 36C200 24 214 44 236 36",
                      ],
                    }
                  : undefined
              }
              transition={isAnimating ? { duration: morphDuration, repeat: Infinity, ease: "linear" } : undefined}
            />
            <motion.path
              d="M4 44C26 34 40 56 62 44C84 34 98 56 120 44C142 34 156 56 178 44C200 34 214 52 236 44"
              stroke="url(#monitor-wave-sub)"
              strokeWidth="2.4"
              strokeLinecap="round"
              animate={
                isAnimating
                  ? {
                      d: [
                        "M4 44C26 34 40 56 62 44C84 34 98 56 120 44C142 34 156 56 178 44C200 34 214 52 236 44",
                        "M4 44C26 56 40 34 62 44C84 56 98 34 120 44C142 56 156 34 178 44C200 56 214 36 236 44",
                        "M4 44C26 34 40 56 62 44C84 34 98 56 120 44C142 34 156 56 178 44C200 34 214 52 236 44",
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
              d="M8 28C30 20 42 36 64 28C86 20 98 36 120 28C142 20 154 36 176 28C198 20 210 34 232 28"
              stroke="hsl(var(--numo-blue-400) / 0.42)"
              strokeWidth="1.8"
              strokeLinecap="round"
              animate={
                isAnimating
                  ? {
                      d: [
                        "M8 28C30 20 42 36 64 28C86 20 98 36 120 28C142 20 154 36 176 28C198 20 210 34 232 28",
                        "M8 28C30 35 42 21 64 28C86 35 98 21 120 28C142 35 154 21 176 28C198 35 210 22 232 28",
                        "M8 28C30 20 42 36 64 28C86 20 98 36 120 28C142 20 154 36 176 28C198 20 210 34 232 28",
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
            className="shrink-0 self-center inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-numo-slate-500/30 bg-numo-blue-900/35 text-numo-gray-400 transition hover:border-numo-orange-500 hover:bg-numo-blue-800/55 hover:text-numo-orange-400"
          >
            <Ellipsis className="h-6 w-6" />
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
                  className="group flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-base font-medium text-numo-slate-400 transition-all duration-150 hover:bg-numo-blue-700/80 active:scale-[0.99] active:bg-numo-blue-700"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-numo-blue-800/70 text-numo-slate-500 transition-colors group-hover:bg-numo-blue-800 group-hover:text-numo-gray-400">
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
