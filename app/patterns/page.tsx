import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import { HomeMenuDemo } from "@/components/patterns/HomeMenuDemo";
import { DSPage } from "@/components/ds/page";

export default function PatternsPage() {
  return (
    <DSPage
      title="Patterns"
      description="Composed interactions built from DS primitives."
    >
      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications Panel</h2>
        <NotificationsPanelDemo />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-4">Actionable Insight Table</h2>
        <InsightTableDemo />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
  <h2 className="text-lg font-semibold mb-4">Home Menu Overlay</h2>
  <HomeMenuDemo />
</section>
    </DSPage>
  );
}
