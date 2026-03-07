import Link from "next/link";
import { ActivitySquare, HeartPulse, Search } from "lucide-react";
import { DSPage } from "@/components/ds/page";

const PATTERNS = [
  {
    href: "/patterns/clinical",
    title: "@clinical-patterns",
    description: "Header, AI signal insights, notifications, and actionable insight table.",
    type: "Clinical",
    icon: ActivitySquare,
    iconBg: "border-numo-blue-500/40 bg-numo-blue-400/12",
    iconColor: "text-numo-blue-700 dark:text-numo-blue-400",
  },
  {
    href: "/patterns/patient",
    title: "@patient-patterns",
    description: "Monitoring bar contextual states and home menu overlay interactions.",
    type: "Patient",
    icon: HeartPulse,
    iconBg: "border-numo-teal-500/40 bg-numo-teal-400/12",
    iconColor: "text-numo-teal-700 dark:text-numo-teal-400",
  },
] as const;

export default function PatternsIndexPage() {
  return (
    <DSPage title="Patterns" description="Choose a pattern group." hidePageIntro>
      <section className="mx-auto w-full max-w-180 space-y-7 py-16">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Pattern Directory</h1>
          <p className="text-lg text-muted-foreground">
            Browse reusable interaction patterns used across clinical and patient surfaces.
          </p>
          <p className="text-base text-foreground">
            Start from these pattern groups before building end-to-end prototype pages.
          </p>
        </div>

        <div className="rounded-2xl border border-numo-yellow-600/40 bg-numo-yellow-400/10 px-5 py-4 text-base font-medium text-foreground">
          Patterns should stay implementation-agnostic and focused on flow, hierarchy, and behavioral rules.
        </div>

        <div className="rounded-xl border border-border bg-background px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <Search className="h-5 w-5 shrink-0" />
              <span className="truncate text-md">Search patterns</span>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">{PATTERNS.length} patterns</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background">
          {PATTERNS.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <div
                key={pattern.href}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border px-4 py-4 last:border-b-0 md:px-5"
              >
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-md border",
                    pattern.iconBg,
                    pattern.iconColor,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-foreground">{pattern.title}</p>
                    <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {pattern.type}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-base text-muted-foreground">{pattern.description}</p>
                </div>

                <Link
                  href={pattern.href}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-md font-medium text-foreground transition hover:border-numo-blue-400/60 hover:text-numo-blue-700"
                >
                  Open
                  <span className="text-xl leading-none">+</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </DSPage>
  );
}
