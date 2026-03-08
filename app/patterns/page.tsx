import Link from "next/link";
import { ArrowUpRight, Microscope, Search, Users } from "lucide-react";
import { DSPage } from "@/components/ds/page";
import { PATTERN_ROUTES } from "@/components/patterns/patterns-registry";

const PATTERN_ICON_BY_HREF = {
  "/patterns/clinical": {
    icon: Microscope,
    iconBg: "border-numo-blue-500/40 bg-numo-blue-400/12",
    iconColor: "text-numo-blue-700 dark:text-numo-blue-400",
  },
  "/patterns/patient": {
    icon: Users,
    iconBg: "border-numo-teal-500/40 bg-numo-teal-400/12",
    iconColor: "text-numo-teal-700 dark:text-numo-teal-400",
  },
} as const;

export default function PatternsIndexPage() {
  return (
    <DSPage title="Patterns" description="Browse and open single pattern pages." hidePageIntro>
      <section className="mx-auto w-full max-w-180 space-y-7 py-16">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Pattern Directory</h1>
          <p className="text-lg text-muted-foreground">
            Explore reusable clinical and patient interaction patterns.
          </p>
          <p className="text-base text-foreground">
            Open a pattern or jump directly to a specific child interaction.
          </p>
        </div>

        <div className="rounded-2xl border border-numo-yellow-600/40 bg-numo-yellow-400/10 px-5 py-4 text-base font-medium text-foreground">
          Patterns define repeatable interaction building blocks and behavior.
        </div>

        <div className="rounded-xl border border-border bg-background px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <Search className="h-5 w-5 shrink-0" />
              <span className="truncate text-md">Search patterns</span>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">{PATTERN_ROUTES.length} patterns</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background">
          {PATTERN_ROUTES.map((pattern) => {
            const iconSpec = PATTERN_ICON_BY_HREF[pattern.href as keyof typeof PATTERN_ICON_BY_HREF];
            const Icon = iconSpec.icon;
            return (
              <div key={pattern.href} className="grid grid-cols-[auto_1fr] items-start gap-4 border-b border-border px-4 py-4 last:border-b-0 md:px-5">
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-md border",
                    iconSpec.iconBg,
                    iconSpec.iconColor,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={pattern.href}
                      className="text-lg font-semibold text-foreground transition hover:text-numo-blue-700"
                    >
                      {pattern.title}
                    </Link>
                    <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {pattern.type}
                    </span>
                  </div>
                  <p className="mt-1 text-base text-muted-foreground">{pattern.description}</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="space-y-2">
                      {pattern.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group flex items-center justify-between gap-3 rounded-md border border-border/70 bg-muted/25 px-3 py-3 text-sm text-foreground transition hover:border-numo-teal-300/70 hover:bg-numo-teal-100/10"
                        >
                          <span className="font-medium text-numo-blue-800 group-hover:text-numo-blue-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            {child.title}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-numo-blue-800">
                            View
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </DSPage>
  );
}
