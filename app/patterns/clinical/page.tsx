import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import { AISignalInsights } from "@/components/patterns/AISignalInsights";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import { DSPage } from "@/components/ds/page";

export default function ClinicalPatternsPage() {
  return (
    <DSPage
      title="Clinical Patterns"
      description="Composed interactions for clinician-facing workflows."
    >
      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="mb-4 text-lg font-semibold">Curie App Header</h2>
        <CurieHeader />
      </section>

      <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
        <h2 className="mb-4 text-lg font-semibold">AI Signal Insights</h2>
        <AISignalInsights />
      </section>

      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="mb-4 text-lg font-semibold">Notifications Panel</h2>
        <NotificationsPanelDemo />
      </section>

      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="mb-4 text-lg font-semibold">Actionable Insight Table</h2>
        <InsightTableDemo />
      </section>
    </DSPage>
  );
}
