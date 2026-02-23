"use client";

import { DSPage } from "@/components/ds/page";
import { INSIGHT_ACTIONS, RowActions } from "@/components/patterns/RowActions";
import { TokenSwatch } from "@/components/ds/token-swatch";
import { TooltipProvider } from "@/components/ui/tooltip";
function ElevationCard({ label, varName }: { label: string; varName: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div
        className="h-20 w-full rounded-lg border border-border bg-background"
        style={{ boxShadow: `var(${varName})` }}
      />
      <div className="mt-3 text-sm font-medium">Elevation {label}</div>
      <div className="text-xs text-muted-foreground font-mono">{varName}</div>
    </div>
  );
}
const PALETTE = [
  {
    title: "Teal",
    items: [
      ["Teal 900", "--numo-teal-900"],
      ["Teal 800", "--numo-teal-800"],
      ["Teal 700", "--numo-teal-700"],
      ["Teal 600", "--numo-teal-600"],
      ["Teal 500", "--numo-teal-500"],
      ["Teal 400", "--numo-teal-400"],
    ] as const,
  },
  {
    title: "Orange",
    items: [
      ["Orange 900", "--numo-orange-900"],
      ["Orange 800", "--numo-orange-800"],
      ["Orange 700", "--numo-orange-700"],
      ["Orange 600", "--numo-orange-600"],
      ["Orange 500", "--numo-orange-500"],
      ["Orange 400", "--numo-orange-400"],
    ] as const,
  },
  {
    title: "Gray",
    items: [
      ["Gray 900", "--numo-gray-900"],
      ["Gray 800", "--numo-gray-800"],
      ["Gray 700", "--numo-gray-700"],
      ["Gray 600", "--numo-gray-600"],
      ["Gray 500", "--numo-gray-500"],
      ["Gray 400", "--numo-gray-400"],
    ] as const,
  },
  {
    title: "Yellow",
    items: [
      ["Yellow 900", "--numo-yellow-900"],
      ["Yellow 800", "--numo-yellow-800"],
      ["Yellow 700", "--numo-yellow-700"],
      ["Yellow 600", "--numo-yellow-600"],
      ["Yellow 500", "--numo-yellow-500"],
      ["Yellow 400", "--numo-yellow-400"],
    ] as const,
  },
  {
    title: "Red",
    items: [
      ["Red 900", "--numo-red-900"],
      ["Red 800", "--numo-red-800"],
      ["Red 700", "--numo-red-700"],
      ["Red 600", "--numo-red-600"],
      ["Red 500", "--numo-red-500"],
      ["Red 400", "--numo-red-400"],
    ] as const,
  },
  {
    title: "Slate",
    items: [
      ["Slate 900", "--numo-slate-900"],
      ["Slate 800", "--numo-slate-800"],
      ["Slate 700", "--numo-slate-700"],
      ["Slate 600", "--numo-slate-600"],
      ["Slate 500", "--numo-slate-500"],
      ["Slate 400", "--numo-slate-400"],
    ] as const,
  },
  {
    title: "Blue",
    items: [
      ["Blue 900", "--numo-blue-900"],
      ["Blue 800", "--numo-blue-800"],
      ["Blue 700", "--numo-blue-700"],
      ["Blue 600", "--numo-blue-600"],
      ["Blue 500", "--numo-blue-500"],
      ["Blue 400", "--numo-blue-400"],
    ] as const,
  },
] as const;

export default function FoundationsPage() {
  return (
    <DSPage
      title="Foundations"
      description="Tokens → semantic variables → UI. This page is the living reference for colors, radius, and typography."
    >

      <section className="space-y-4">
  <h2 className="text-lg font-semibold">Elevation</h2>

  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <ElevationCard label="xs" varName="--shadow-xs" />
    <ElevationCard label="sm" varName="--shadow-sm" />
    <ElevationCard label="md" varName="--shadow-md" />
    <ElevationCard label="lg" varName="--shadow-lg" />
  </div>
</section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Radius</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RadiusCard label="radius-sm" className="rounded-sm" />
          <RadiusCard label="radius-md" className="rounded-md" />
          <RadiusCard label="radius-lg" className="rounded-lg" />
          <RadiusCard label="radius-xl" className="rounded-xl" />
        </div>
        <p className="text-sm text-muted-foreground">
          Note: your Tailwind v4 setup maps these from{" "}
          <span className="font-mono">--radius</span> in globals.css via the{" "}
          <span className="font-mono">@theme</span> block.
        </p>
      </section>

            <section className="space-y-4">
        <h2 className="text-lg font-semibold">Type</h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="text-3xl font-semibold tracking-tight">Heading / 3xl</div>
          <div className="text-2xl font-semibold tracking-tight">Heading / 2xl</div>
          <div className="text-xl font-semibold tracking-tight">Heading / xl</div>
          <div className="text-base">
            Body / base — The quick brown fox jumps over the lazy dog.
          </div>
          <div className="text-sm text-muted-foreground">
            Small / muted — The quick brown fox jumps over the lazy dog.
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            Mono / tokens — --background, --primary, --ring
          </div>
        </div>
      </section>

      <section className="space-y-4">
  <h2 className="text-lg font-semibold">Focus</h2>

  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      <div className="text-sm font-medium">Button</div>
      <button className="h-10 rounded-lg border border-border bg-muted/40 px-3">
        Tab to focus me
      </button>
    </div>

    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      <div className="text-sm font-medium">Input</div>
      <input
        className="h-10 w-full rounded-lg border border-border bg-background px-3"
        placeholder="Tab to focus"
      />
    </div>

    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      <div className="text-sm font-medium">Link</div>
      <a href="#" className="inline-flex rounded-md px-2 py-1">
        Tab to focus link
      </a>
    </div>
  </div>

  <p className="text-sm text-muted-foreground">
    Focus ring is driven by <span className="font-mono">--ds-focus-*</span> tokens.
  </p>
</section>

<section className="space-y-4">
  <h2 className="text-lg font-semibold">DS semantic (intent tokens)</h2>

  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <TokenSwatch label="ds-surface-1" cssVar="--ds-surface-1" />
    <TokenSwatch label="ds-surface-2" cssVar="--ds-surface-2" />
    <TokenSwatch label="ds-surface-3" cssVar="--ds-surface-3" />

    <TokenSwatch label="ds-text-1" cssVar="--ds-text-1" />
    <TokenSwatch label="ds-text-2" cssVar="--ds-text-2" />

    <TokenSwatch label="ds-border-1" cssVar="--ds-border-1" />
    <TokenSwatch label="ds-ring-1" cssVar="--ds-ring-1" />

    <TokenSwatch label="ds-accent" cssVar="--ds-accent" />
    <TokenSwatch label="ds-success" cssVar="--ds-success" />
    <TokenSwatch label="ds-warning" cssVar="--ds-warning" />
    <TokenSwatch label="ds-danger" cssVar="--ds-danger" />
  </div>
</section>

<section className="space-y-4">
  <h2 className="text-lg font-semibold">Actionable Insight Actions</h2>
  <p className="text-sm text-muted-foreground">
    Icons + state badges pulled from the Insight Table actions.
  </p>
  <TooltipProvider delayDuration={200}>
    <div className="rounded-xl border border-border bg-card p-4">
      <RowActions actions={INSIGHT_ACTIONS} />
    </div>
  </TooltipProvider>
</section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Numo palette (base tokens)</h2>
        <p className="text-sm text-muted-foreground">
          Raw palette tokens from brand. Semantic tokens (accent/success/warning/danger) should map to these.
        </p>

        <div className="space-y-8">
          {PALETTE.map((group) => (
            <div key={group.title} className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-semibold">{group.title}</h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {group.items[0][1].replace("--numo-", "numo.")}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(([label, cssVar]) => (
                  <TokenSwatch key={cssVar} label={label} cssVar={cssVar} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </DSPage>
  );
}

function RadiusCard({ label, className }: { label: string; className: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className={"h-14 w-full border border-border bg-muted/40 " + className} />
      <div className="mt-3 text-sm font-medium">{label}</div>
    </div>
  );
}
