import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import { HomeMenuDemo } from "@/components/patterns/HomeMenuDemo";
import { AISignalInsights } from "@/components/patterns/AISignalInsights";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";
import { DSPage } from "@/components/ds/page";

export default function PatternsPage() {
  return (
    <DSPage
      title="Patterns"
      description="Composed interactions built from DS primitives."
    >
      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-4">Curie App Header</h2>
        <CurieHeader />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
        <h2 className="text-lg font-semibold mb-4">AI Signal Insights</h2>
        <AISignalInsights />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications Panel</h2>
        <NotificationsPanelDemo />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold mb-4">Actionable Insight Table</h2>
        <InsightTableDemo />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
        <h2 className="text-lg font-semibold mb-4">Monitoring Bar + Contextual Menu</h2>
        <MonitoringBarDemo />
      </section>
      <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
  <h2 className="text-lg font-semibold mb-4">Home Menu Overlay</h2>
  <HomeMenuDemo />
</section>
    </DSPage>
  );
}
