import Link from "next/link";
import { DSPage } from "@/components/ds/page";

export default function PatternsIndexPage() {
  return (
    <DSPage
      title="Patterns"
      description="Choose a pattern group."
    >
      <section className="grid gap-3 md:grid-cols-2">
        <Link
          href="/patterns/clinical"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">Clinical Patterns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Header, AI signal insights, notifications, and actionable insight table.
          </p>
        </Link>

        <Link
          href="/patterns/patient"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">Patient Patterns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitoring bar contextual states and home menu overlay interactions.
          </p>
        </Link>
      </section>
    </DSPage>
  );
}
