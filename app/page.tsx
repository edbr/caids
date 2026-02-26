import { DSPage } from "@/components/ds/page";
import { DSFooter } from "@/components/ds/footer";

export default function Home() {
  return (
    <DSPage
      title="Design System"
      description="A clinical-grade UI foundation for consistent, fast product delivery."
    >
      <section className="rounded-2xl border border-border bg-[radial-gradient(120%_120%_at_10%_0%,hsl(var(--numo-teal-400)/0.18),hsl(var(--numo-blue-900)/0.04)_40%,transparent)] px-6 py-8 md:px-10 md:py-12">
        <p className="inline-flex rounded-full border border-numo-teal-500/60 bg-numo-teal-900/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-numo-teal-600">
          Curie + Numo
        </p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
          Build healthcare experiences faster with one shared language for tokens, components, and patterns.
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground md:text-base">
          This system standardizes interaction quality across clinician and patient surfaces, while keeping implementation practical for day-to-day product teams.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background/70 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Foundations</p>
            <p className="mt-1 text-sm text-foreground">
              Tokenized color, type, spacing, and motion primitives.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background/70 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
            <p className="mt-1 text-sm text-foreground">
              Reusable building blocks with consistent state behavior.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background/70 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Patterns</p>
            <p className="mt-1 text-sm text-foreground">
              Real workflow modules for clinical and patient journeys.
            </p>
          </div>
        </div>
      </section>

      <DSFooter />
    </DSPage>
  );
}
