"use client";

import * as React from "react";
import { Check } from "lucide-react";

type DayBlock = {
  id: "today" | "tomorrow";
  label: string;
  dateText: string;
  slots: string[];
};

const DAY_BLOCKS: DayBlock[] = [
  {
    id: "today",
    label: "Today:",
    dateText: "Wednesday November 30th",
    slots: ["1:00PM", "2:00PM", "3:00PM", "4:00PM"],
  },
  {
    id: "tomorrow",
    label: "Tomorrow:",
    dateText: "Thursday December 1st",
    slots: ["1:00PM", "2:00PM", "3:00PM", "4:00PM"],
  },
];

export function PatientTimeSelectionDemo() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const hasSelection = selected.size > 0;

  function toggleSlot(dayId: string, slot: string) {
    const key = `${dayId}:${slot}`;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="inline-block w-fit max-w-full overflow-hidden rounded-3xl border border-numo-blue-700 bg-numo-blue-800 align-top">
      <div className="border-b border-numo-blue-700 bg-numo-blue-900/60 px-8 py-6">
        <h3 className="max-w-225 text-2xl leading-[1.2] text-numo-blue-400">
          Please select a time for a Curie clinician to call you:
        </h3>
      </div>

      <div className="space-y-5 px-8 py-6">
        {DAY_BLOCKS.map((day, idx) => (
          <div key={day.id}>
            <p className="text-2xl font-medium leading-none">
              <span className="text-numo-yellow-500">{day.label}</span>
              <span className="ml-2 text-numo-gray-400">{day.dateText}</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-4">
              {day.slots.map((slot) => {
                const key = `${day.id}:${slot}`;
                const isSelected = selected.has(key);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleSlot(day.id, slot)}
                    aria-pressed={isSelected}
                    className={[
                      "min-w-32 rounded-full border px-4 py-2 text-xl font-medium leading-none transition",
                      !isSelected
                        ? "border-numo-slate-400 text-numo-slate-400 hover:border-numo-teal-400 hover:text-numo-teal-400"
                        : "border-numo-teal-400 bg-numo-teal-700/20 text-numo-teal-400 shadow-[0_0_0_1px_hsl(var(--numo-teal-400)/0.25)]",
                    ].join(" ")}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {idx === 0 ? <div className="mt-6 border-t border-numo-slate-600/70" /> : null}
          </div>
        ))}

        <div className="pt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            className="inline-flex min-w-32 items-center justify-center rounded-full  px-8 py-3 text-xl font-medium leading-none text-numo-red-400 transition hover:text-numo-red-600"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!hasSelection}
            className={[
              "inline-flex min-w-32 items-center justify-center gap-2 rounded-full border px-8 py-3 text-xl font-medium leading-none transition",
              hasSelection
                ? "border-numo-orange-500 bg-numo-orange-500 text-numo-blue-900 hover:bg-numo-orange-400"
                : "border-numo-slate-500 text-numo-slate-500 opacity-70",
            ].join(" ")}
          >
            <Check className="h-5 w-5" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
