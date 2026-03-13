import { AlwaysOnPatientPanel } from "@/components/patterns/AlwaysOnPatientPanel";
import { notFound } from "next/navigation";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import { AISignalInsights } from "@/components/patterns/AISignalInsights";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import { InsightTableRowActions } from "@/components/patterns/InsightTableRowActions";
import { NightMonitoringDemo } from "@/components/patterns/NightMonitoringDemo";
import { PatternChildBottomNav } from "@/components/patterns/PatternChildBottomNav";
import { PatientReportsDashboard } from "@/components/patterns/PatientReportsDashboard";
import { DSPage } from "@/components/ds/page";

const CLINICAL_CHILDREN = {
  "curie-app-header": {
    title: "Curie App Header",
    render: () => <CurieHeader showMobilePreview />,
  },
  "ai-signal-insights": {
    title: "AI Signal Insights",
    render: () => <AISignalInsights showMobilePreview />,
  },
  "night-monitoring": {
    title: "Night Monitoring",
    render: () => <NightMonitoringDemo />,
  },
  "notifications-panel": {
    title: "Notifications Panel",
    render: () => (
      <div className="mx-auto w-full max-w-[560px]">
        <NotificationsPanelDemo />
      </div>
    ),
  },
  "row-actions": {
    title: "Row Actions",
    render: () => (
      <InsightTableRowActions
        scheduleState="default"
        messageState="default"
        videoCallState="default"
        showStateGallery
      />
    ),
  },
  "actionable-insight-table": {
    title: "Actionable Insight Table",
    render: () => <InsightTableDemo />,
  },
  "always-on-patient-panel": {
    title: "Always-On Patient Panel",
    render: () => (
      <div className="max-w-[320px]">
        <AlwaysOnPatientPanel />
      </div>
    ),
  },
  "patient-reports-dashboard": {
    title: "Patient Reports Dashboard",
    render: () => <PatientReportsDashboard />,
  },
} as const;

export default async function ClinicalChildPatternPage({
  params,
}: {
  params: Promise<{ child: string }>;
}) {
  const { child } = await params;
  const selected = CLINICAL_CHILDREN[child as keyof typeof CLINICAL_CHILDREN];
  if (!selected) notFound();
  const currentChildHref = `/patterns/clinical/${child}` as const;

  return (
    <DSPage
      title={`Clinical Patterns / ${selected.title}`}
      description="Single child pattern view."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <div className="space-y-8">
        <section className="rounded-xl  p-6 overflow-visible">
          <h2 className="mb-4 text-lg font-semibold">{selected.title}</h2>
          {selected.render()}
        </section>
        <PatternChildBottomNav
          patternHref="/patterns/clinical"
          currentChildHref={currentChildHref}
        />
      </div>
    </DSPage>
  );
}
