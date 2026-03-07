import Link from "next/link";
import { LogIn, Monitor, NotebookText, Search, Settings2, TabletSmartphone } from "lucide-react";
import { DSPage } from "@/components/ds/page";

const PROTOTYPES = [
  {
    href: "/numo-home",
    title: "@numo-home",
    description: "Dashboard homepage with clinical summary, quick actions, and patient timeline.",
    type: "Clinical",
    icon: Monitor,
    iconBg: "border-numo-blue-500/40 bg-numo-blue-400/12",
    iconColor: "text-numo-blue-700 dark:text-numo-blue-400",
  },
  {
    href: "/notes",
    title: "@notes",
    description: "Note interactions including filtering, creation, and editing in patient context.",
    type: "Clinical",
    icon: NotebookText,
    iconBg: "border-numo-teal-500/40 bg-numo-teal-400/12",
    iconColor: "text-numo-teal-700 dark:text-numo-teal-400",
  },
  {
    href: "/tablet-appointment",
    title: "@tablet-appointment",
    description: "Tablet appointment flow with minimized appointment control behavior.",
    type: "Tablet",
    icon: TabletSmartphone,
    iconBg: "border-numo-orange-500/40 bg-numo-orange-400/12",
    iconColor: "text-numo-orange-700 dark:text-numo-orange-400",
  },
  {
    href: "/prototype-login",
    title: "@prototype-login",
    description: "Clinical login and account creation flow integrated with Supabase auth.",
    type: "Auth",
    icon: LogIn,
    iconBg: "border-numo-yellow-600/45 bg-numo-yellow-400/14",
    iconColor: "text-numo-yellow-800 dark:text-numo-yellow-500",
  },
  {
    href: "/user-preferences",
    title: "@user-preferences",
    description: "Post-login preferences and profile update flow for authenticated users.",
    type: "Account",
    icon: Settings2,
    iconBg: "border-numo-slate-500/45 bg-numo-slate-400/14",
    iconColor: "text-numo-slate-700 dark:text-numo-slate-300",
  },
] as const;

export default function PrototypesIndexPage() {
  return (
    <DSPage title="Prototypes" description="Explore all prototype pages." hidePageIntro>
      <section className="mx-auto w-full max-w-180 space-y-7 py-16">
        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">Prototype Directory</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover all internal prototypes for flows, interactions, and page-level UX.
          </p>
          <p className="text-base text-foreground">
            Run a prototype directly from this list and use it as a starting point for refinements.
          </p>
        </div>

        <div className="rounded-2xl border border-numo-yellow-600/40 bg-numo-yellow-400/10 px-5 py-4 text-base font-medium text-foreground">
          Prototype pages are working surfaces. Validate logic, visual hierarchy, and interaction quality.
        </div>

        <div className="rounded-xl border border-border bg-background px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <Search className="h-5 w-5 shrink-0" />
              <span className="truncate text-md">Search prototypes</span>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">{PROTOTYPES.length} prototypes</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background">
          {PROTOTYPES.map((prototype) => {
            const Icon = prototype.icon;
            return (
              <div
                key={prototype.href}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border px-4 py-4 last:border-b-0 md:px-5"
              >
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-md border",
                    prototype.iconBg,
                    prototype.iconColor,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-foreground">{prototype.title}</p>
                    <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {prototype.type}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-base text-muted-foreground">{prototype.description}</p>
                </div>

                <Link
                  href={prototype.href}
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
