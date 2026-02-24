"use client";

import * as React from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
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

export function AISignalInsights() {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <div className="space-y-3">

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
                  {bubble.value}
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
