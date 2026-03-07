import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import { AISignalInsights } from "@/components/patterns/AISignalInsights";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import { InsightTableRowActions } from "@/components/patterns/InsightTableRowActions";
import { DSPage } from "@/components/ds/page";

export default function ClinicalPatternsPage() {
  return (
    <DSPage
      title="Clinical Patterns"
      description="Composed interactions for clinician-facing workflows."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-muted/30 p-6">
          <CurieHeader />
        </section>

        <section className="">
          <AISignalInsights />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div>
            <NotificationsPanelDemo />
          </div>
          <aside className="rounded-xl border border-border bg-muted/30 p-4">
            <InsightTableRowActions
              scheduleState="default"
              messageState="default"
              videoCallState="default"
            />
          </aside>
        </section>

        <section className="">
          <InsightTableDemo />
        </section>
      </div>
    </DSPage>
  );
}
