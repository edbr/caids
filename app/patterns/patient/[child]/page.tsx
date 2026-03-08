import { notFound } from "next/navigation";
import { HomeMenuDemo } from "@/components/patterns/HomeMenuDemo";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";
import { PatternChildBottomNav } from "@/components/patterns/PatternChildBottomNav";
import { PatientTimeSelectionDemo } from "@/components/patterns/PatientTimeSelectionDemo";
import { DSPage } from "@/components/ds/page";

const PATIENT_CHILDREN = {
  "monitoring-bar-contextual-menu": {
    title: "Monitoring Bar + Contextual Menu",
    render: () => <MonitoringBarDemo />,
  },
  "patient-time-selection-multi-select": {
    title: "Patient Time Selection (Multi-select)",
    render: () => <PatientTimeSelectionDemo />,
  },
  "home-menu-overlay": {
    title: "Home Menu Overlay",
    render: () => <HomeMenuDemo />,
  },
} as const;

export default async function PatientChildPatternPage({
  params,
}: {
  params: Promise<{ child: string }>;
}) {
  const { child } = await params;
  const selected = PATIENT_CHILDREN[child as keyof typeof PATIENT_CHILDREN];
  if (!selected) notFound();
  const currentChildHref = `/patterns/patient/${child}` as const;

  return (
    <DSPage
      title={`Patient Patterns / ${selected.title}`}
      description="Single child pattern view."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-muted/30 p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">{selected.title}</h2>
          {selected.render()}
        </section>
        <PatternChildBottomNav
          patternHref="/patterns/patient"
          currentChildHref={currentChildHref}
        />
      </div>
    </DSPage>
  );
}
