import { DSPage } from "@/components/ds/page";
import { DSFooter } from "@/components/ds/footer";
import { HomeInteractiveShowcase } from "@/components/ds/home-interactive-showcase";

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
          Build healthcare products faster.
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground md:text-base">
          One shared language of tokens, components, and patterns.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground md:text-base">
          Consistent UX across clinician and patient workflows. Practical for teams shipping daily.
        </p>
      </section>
<section className="mt-10 rounded-2xl border border-border bg-[radial-gradient(120%_120%_at_10%_0%,hsl(var(--numo-yellow-500)/0.18),hsl(var(--numo-blue-900)/0.04)_40%,transparent)] px-6 py-8 md:px-10 md:py-12">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          Explore the system
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground md:text-base">
          Browse the component library, check out code examples, or dive into the patterns that solve for common clinical and patient use cases.
        </p>
        <HomeInteractiveShowcase />
      </section>
      <DSFooter />
    </DSPage>
  );
}
