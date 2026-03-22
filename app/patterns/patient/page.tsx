import { HomeMenuDemo } from "@/components/patterns/HomeMenuDemo";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";
import { PatientMyHealthDemo } from "@/components/patterns/PatientMyHealthDemo";
import { PatternBottomNav } from "@/components/patterns/PatternBottomNav";
import { PatientTimeSelectionDemo } from "@/components/patterns/PatientTimeSelectionDemo";
import { DSPage } from "@/components/ds/page";

export default function PatientPatternsPage() {
  return (
    <DSPage
      title="Patient Patterns"
      description="Composed interactions for patient-facing experiences."
      hideDescriptionOnMobile
    >
      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Monitoring Bar + Contextual Menu</h2>
          <MonitoringBarDemo />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Patient Time Selection (Multi-select)</h2>
          <PatientTimeSelectionDemo />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">Home Menu Overlay</h2>
          <HomeMenuDemo />
        </section>

        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">My Health</h2>
          <PatientMyHealthDemo />
        </section>

        <PatternBottomNav currentHref="/patterns/patient" />
      </div>
    </DSPage>
  );
}
