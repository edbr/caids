"use client";

import { CalendarClock } from "lucide-react";

export function DSTabletButtonsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-numo-blue-800 p-4">
      <button className="font-sans inline-flex h-11 items-center rounded-full border border-numo-teal-500 px-6 font-medium text-2xl text-numo-teal-400 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-numo-teal-500/15">
        Menu
      </button>

      <button className="mt-1 inline-flex rounded-full border border-numo-orange-700 bg-numo-orange-500 px-5 py-2 font-sans text-[20px] font-semibold leading-none tracking-tight text-numo-blue-900 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-numo-orange-700/90">
        Start Check-in
      </button>

      <button
        aria-label="Appointment icon"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-numo-slate-700 bg-numo-blue-900/30 text-numo-slate-400 transition-all"
      >
        <CalendarClock className="h-6 w-6" />
      </button>
    </div>
  );
}
