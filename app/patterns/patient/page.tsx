import { HomeMenuDemo } from "@/components/patterns/HomeMenuDemo";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";
import { PatientTimeSelectionDemo } from "@/components/patterns/PatientTimeSelectionDemo";
import { DSPage } from "@/components/ds/page";

export default function PatientPatternsPage() {
  return (
    <DSPage
      title="Patient Patterns"
      description="Composed interactions for patient-facing experiences."
    >
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
    </DSPage>
  );
}
