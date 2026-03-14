import { AlwaysOnPatientPanel } from "@/components/patterns/AlwaysOnPatientPanel";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import { AISignalInsights } from "@/components/patterns/AISignalInsights";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import { InsightTableRowActions } from "@/components/patterns/InsightTableRowActions";
import { NightMonitoringDemo } from "@/components/patterns/NightMonitoringDemo";
import { NotesDemo } from "@/components/patterns/NotesDemo";
import { NumoLoader3D } from "@/components/patterns/NumoLoader3D";
import { PatternBottomNav } from "@/components/patterns/PatternBottomNav";
import { PatientReportsDashboard } from "@/components/patterns/PatientReportsDashboard";
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
          <CurieHeader showMobilePreview />
        </section>

        <section className="">
          <AISignalInsights showMobilePreview />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6">
          <NightMonitoringDemo />
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
              showStateGallery
            />
          </aside>
        </section>

        <section className="">
          <InsightTableDemo />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Notes</h2>
          <NotesDemo />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Numo 3D Loader</h2>
          <NumoLoader3D />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Always-On Patient Panel</h2>
          <div className="max-w-[320px]">
            <AlwaysOnPatientPanel />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Patient Data</h2>
          <PatientReportsDashboard />
        </section>

        <PatternBottomNav currentHref="/patterns/clinical" />
      </div>
    </DSPage>
  );
}
