import { ClipboardList } from "lucide-react";
import { PrimaryBtn, SecondaryBtn } from "@/components/ds/button";
import { DSPanel, DSPanelBody, DSPanelHeader } from "@/components/ds/panel";
import { reviewLabels, scenarioTransitions, type CareState } from "@/lib/care-demo";

export function ReportFacts({ member = false }: { member?: boolean }) {
  return (
    <dl className={`grid gap-3 rounded-xl p-4 text-sm sm:grid-cols-2 ${
      member ? "bg-muted/60" : "border border-numo-blue-400/20 bg-numo-blue-400/5"
    }`}>
      <div><dt className="text-muted-foreground">Carrier</dt><dd className="font-medium">Marked delivered</dd></div>
      <div><dt className="text-muted-foreground">{member ? "You reported" : "Member reported"}</dt><dd className="font-medium">Kit not received</dd></div>
    </dl>
  );
}

export function ReportTime({ value }: { value: string }) {
  return <time dateTime={value}>{new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</time>;
}

export function RequestActivity({ report, member = false }: {
  report: NonNullable<CareState["request"]>;
  member?: boolean;
}) {
  const activity = [
    { label: member ? "Report saved" : "Missing kit reported", time: report.receivedAt },
    { label: member ? "Care team started review" : "Review started", time: report.reviewedAt },
    { label: "Replacement sent", time: report.shippedAt },
    { label: "Replacement received", time: report.resolvedAt },
  ];

  return (
    <section className="space-y-2">
      <h4 className="font-semibold">{member ? "Kit updates" : "Activity"}</h4>
      <ol className="space-y-2 border-l border-border pl-4 text-sm">
        {activity.map(({ label, time }) => time && (
          <li key={label} className="flex flex-wrap items-baseline justify-between gap-x-4">
            <span>{label}</span><span className="text-muted-foreground"><ReportTime value={time} /></span>
          </li>
        ))}
      </ol>
    </section>
  );
}

const reviewColors = {
  open: "border-numo-yellow-600/40 bg-numo-yellow-400/15",
  in_review: "border-numo-blue-500/40 bg-numo-blue-400/10",
  replacement_shipped: "border-numo-teal-500/40 bg-numo-teal-400/10",
  replacement_received: "border-numo-teal-500/40 bg-numo-teal-400/10",
};

export function CareTeam({ state, mock, busy, error, update }: {
  state?: CareState;
  mock: boolean;
  busy: boolean;
  error: boolean;
  update: (action: string) => void;
}) {
  const report = state?.request;
  const transition = report && report.reviewStatus !== "replacement_received"
    ? scenarioTransitions[report.reviewStatus] : undefined;

  return (
    <DSPanel>
      <DSPanelHeader className="justify-start gap-3">
        <ClipboardList className="shrink-0 text-numo-blue-600 dark:text-numo-blue-400" aria-hidden />
        <h3 className="text-[22px] font-semibold tracking-[-0.01em]">Missing-kit request</h3>
      </DSPanelHeader>
      <DSPanelBody className="space-y-4 px-6">
        <p className="text-sm text-muted-foreground">{mock ? "Scenario controls · affect this browser’s fictional case" : "Read-only view · synced from n8n"}</p>
        <div role="status" className="space-y-3">
          {report ? (
            <>
              <p className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${reviewColors[report.reviewStatus]}`}>{reviewLabels[report.reviewStatus]}</p>
              <p className="text-sm text-muted-foreground">Reference {report.reference} · Received <ReportTime value={report.receivedAt} /></p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">{!state ? "Waiting for kit status…" : state.kitStatus === "delivered" ? "No missing-kit report yet." : "Missing-kit report on file. Request details are unavailable."}</p>
          )}
        </div>
        {state && state.kitStatus !== "delivered" && <ReportFacts />}
        {report && <RequestActivity report={report} />}
        {error && <p role="alert" className="text-sm text-destructive">We couldn’t update the scenario. Please try again.</p>}
        {mock && (report || state?.visitSlot) && (
          <div className="flex flex-wrap gap-2">
            {transition && <PrimaryBtn disabled={busy} className="min-h-11 disabled:pointer-events-none disabled:opacity-50" onClick={() => update(transition.next)}>{transition.label}</PrimaryBtn>}
            <SecondaryBtn disabled={busy} className="min-h-11 disabled:pointer-events-none disabled:opacity-50" onClick={() => update("reset")}>Reset my demo</SecondaryBtn>
          </div>
        )}
      </DSPanelBody>
    </DSPanel>
  );
}
