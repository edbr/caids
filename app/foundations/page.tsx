"use client";

import { DSPage } from "@/components/ds/page";
import { TokenSwatch } from "@/components/ds/token-swatch";

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
const SCALE_BUCKETS = [
  { label: "Backgrounds", from: 1, to: 2 },
  { label: "Interactive components", from: 3, to: 5 },
  { label: "Borders and separators", from: 6, to: 8 },
  { label: "Solid colors", from: 9, to: 10 },
  { label: "Accessible text", from: 11, to: 12 },
] as const;

const SCALE_STEPS = Array.from({ length: 12 }, (_, i) => (i + 1) * 100);

const PALETTE = [
  {
    title: "Teal",
    key: "teal",
  },
  {
    title: "Orange",
    key: "orange",
  },
  {
    title: "Gray",
    key: "gray",
  },
  {
    title: "Yellow",
    key: "yellow",
  },
  {
    title: "Red",
    key: "red",
  },
  {
    title: "Slate",
    key: "slate",
  },
  {
    title: "Blue",
    key: "blue",
  },
  {
    title: "Warm Blue",
    key: "warm-blue",
  },
] as const;

const LIGHT_MIX_STEPS = [10, 18, 28, 42, 60, 82] as const;
const DARK_MIX_STEPS = [0, 20, 40, 60, 80, 100] as const;

function colorForStep(key: string, step: number) {
  if (step <= 600) {
    const mix = LIGHT_MIX_STEPS[Math.floor(step / 100) - 1];
    return `color-mix(in oklab, white ${100 - mix}%, hsl(var(--numo-${key}-400)) ${mix}%)`;
  }
  const mix = DARK_MIX_STEPS[Math.floor((step - 700) / 100)];
  return `color-mix(in oklab, hsl(var(--numo-${key}-400)) ${100 - mix}%, hsl(var(--numo-${key}-900)) ${mix}%)`;
}

function tokenNameForStep(key: string, step: number) {
  if (step <= 600) {
    return `Tint ${step}: mix(white, --numo-${key}-400)`;
  }
  return `Shade ${step}: mix(--numo-${key}-400, --numo-${key}-900)`;
}

export default function FoundationsPage() {
  return (
    <DSPage
      title="Foundations"
      description="Tokens → semantic variables → UI. This page is the living reference for colors, radius, and typography."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <div className="mx-auto w-full max-w-6xl space-y-8 pb-8">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Colors</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">Foundations Directory</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Reference color scales and semantic tokens used across Curie DS surfaces.
          </p>
        </section>

        <section className="rounded-2xl border border-numo-yellow-600/35 bg-numo-yellow-400/10 p-5 text-base font-medium text-foreground">
          Use semantic tokens for UI implementation and map them to base scales for consistent theming.
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Semantic Tokens</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

        <section className="space-y-5">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold">Palette Scales</h2>
            <p className="text-sm text-muted-foreground">Base tokens used by semantic mapping</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span>Light</span>
              <span>Dark</span>
            </div>
            <div className="mb-2 grid grid-cols-12 gap-2">
              {SCALE_BUCKETS.map((bucket) => (
                <div
                  key={bucket.label}
                  className="border-b border-border pb-2 text-center text-xs text-muted-foreground"
                  style={{ gridColumn: `${bucket.from} / ${bucket.to + 1}` }}
                >
                  {bucket.label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-2 text-center text-xs text-muted-foreground">
              {SCALE_STEPS.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {PALETTE.map((group) => (
              <div key={group.title} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold">{group.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    {`--numo-${group.key}-100..1200`}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  {SCALE_STEPS.map((step) => (
                    <div
                      key={`${group.key}-${step}`}
                      className="h-12 rounded-md border border-border/60"
                      style={{ backgroundColor: colorForStep(group.key, step) }}
                      title={tokenNameForStep(group.key, step)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Type</h2>
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <div className="text-3xl font-semibold tracking-tight">Heading / 3xl</div>
            <div className="text-2xl font-semibold tracking-tight">Heading / 2xl</div>
            <div className="text-xl font-semibold tracking-tight">Heading / xl</div>
            <div className="text-base">Body / base - The quick brown fox jumps over the lazy dog.</div>
            <div className="text-sm text-muted-foreground">
              Small / muted - The quick brown fox jumps over the lazy dog.
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              Mono / tokens - --background, --primary, --ring
            </div>
          </div>
        </section>


        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Elevation</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ElevationCard label="xs" varName="--shadow-xs" />
            <ElevationCard label="sm" varName="--shadow-sm" />
            <ElevationCard label="md" varName="--shadow-md" />
            <ElevationCard label="lg" varName="--shadow-lg" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Radius</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RadiusCard label="radius-sm" className="rounded-sm" />
            <RadiusCard label="radius-md" className="rounded-md" />
            <RadiusCard label="radius-lg" className="rounded-lg" />
            <RadiusCard label="radius-xl" className="rounded-xl" />
          </div>
          <p className="text-sm text-muted-foreground">
            Tailwind v4 maps radius utilities from <span className="font-mono">--radius</span> via{" "}
            <span className="font-mono">@theme</span>.
          </p>
        </section>
      </div>
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
