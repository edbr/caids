"use client";

import { useState } from "react";
import { CircleHelp, Clock3, Radio, WifiOff } from "lucide-react";
import { DSPanel, DSPanelBody, DSPanelHeader, DSPanelTitle } from "@/components/ds/panel";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEVICE_REPORTING_FIXTURES, QUEUE_AS_OF, QUEUE_TIMEZONE, type ReportingStatus } from "@/lib/device-reporting-fixtures";

type QueueStatus = Exclude<ReportingStatus, "paused">;
type PreviewState = "ready" | "loading" | "empty" | "error";

const STATUS: Record<QueueStatus, { label: string; detail: string; style: string; icon: typeof Clock3 }> = {
  overdue: { label: "Reporting overdue", detail: "Expected report not received; connection unconfirmed", style: "border-[hsl(var(--ds-warning)/0.4)] bg-[hsl(var(--ds-warning)/0.1)]", icon: Clock3 },
  disconnected: { label: "Disconnection confirmed", detail: "Connection loss explicitly confirmed in fixture", style: "border-numo-slate-500/50 bg-numo-slate-400/15", icon: WifiOff },
  unknown: { label: "Connectivity unknown", detail: "Insufficient information to establish connection", style: "border-border bg-muted/50", icon: CircleHelp },
  restored: { label: "Reporting restored", detail: "Reports resumed; retained for review", style: "border-numo-teal-500/40 bg-numo-teal-400/10", icon: Radio },
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: QUEUE_TIMEZONE, month: "short", day: "numeric", year: "numeric",
  hour: "numeric", minute: "2-digit", timeZoneName: "short",
});
const formatTime = (value: string) => dateFormat.format(new Date(value));
const activeRows = DEVICE_REPORTING_FIXTURES.filter(row => row.reportingStatus !== "paused");
const clinics = [...new Set(activeRows.map(row => row.clinic))];
const selectStyle = "rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function DeviceReportingQueue() {
  const [clinic, setClinic] = useState("all");
  const [status, setStatus] = useState("all");
  const [preview, setPreview] = useState<PreviewState>("ready");
  const rows = preview === "empty" ? [] : activeRows.filter(row =>
    (clinic === "all" || row.clinic === clinic) && (status === "all" || row.reportingStatus === status));
  const hasFilters = clinic !== "all" || status !== "all";

  function clearFilters() { setClinic("all"); setStatus("all"); }

  return (
    <section className="mx-auto max-w-7xl space-y-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lung DS · Synthetic prototype</p>
          <h1 className="text-3xl font-semibold tracking-tight">Device reporting queue</h1>
          <p className="max-w-2xl text-muted-foreground">Review reporting gaps and connection status across clinics. Intentionally paused devices are excluded.</p>
        </div>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Prototype state
          <select className={selectStyle} value={preview} onChange={event => setPreview(event.target.value as PreviewState)}>
            <option value="ready">Populated queue</option><option value="loading">Loading</option>
            <option value="empty">Empty queue</option><option value="error">Load error</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm">
        <p className="font-medium">A reporting gap does not establish clinical deterioration.</p>
        <p className="mt-1 text-muted-foreground">Overdue reporting and confirmed disconnection are separate states. Clinical status is documented independently; no clinical thresholds are inferred.</p>
      </div>

      <DSPanel>
        <DSPanelHeader className="flex-wrap gap-3">
          <DSPanelTitle>Reporting review</DSPanelTitle>
          <p className="text-xs text-muted-foreground">Snapshot: <time dateTime={QUEUE_AS_OF}>{formatTime(QUEUE_AS_OF)}</time></p>
        </DSPanelHeader>
        <DSPanelBody className="space-y-4">
          <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-muted/30 p-3">
            <label className="flex flex-col gap-1 text-xs font-medium">Clinic
              <select className={selectStyle} value={clinic} onChange={event => setClinic(event.target.value)}>
                <option value="all">All clinics</option>{clinics.map(name => <option key={name}>{name}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium">Reporting status
              <select className={selectStyle} value={status} onChange={event => setStatus(event.target.value)}>
                <option value="all">All reporting statuses</option>
                {Object.entries(STATUS).map(([value, info]) => <option key={value} value={value}>{info.label}</option>)}
              </select>
            </label>
            <Button variant="outline" onClick={clearFilters} disabled={!hasFilters}>Clear filters</Button>
            <p role="status" className="ml-auto py-2 text-sm text-muted-foreground">
              {preview === "ready" || preview === "empty" ? `${rows.length} devices · 1 paused device excluded` : preview === "loading" ? "Loading devices…" : "Queue unavailable"}
            </p>
          </div>

          {preview === "error" ? (
            <div role="alert" className="rounded-lg border border-border px-6 py-12 text-center">
              <h2 className="font-semibold">Unable to load the reporting queue</h2>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">Reporting and connection status could not be retrieved. This does not indicate a device failure.</p>
              <Button variant="outline" onClick={() => setPreview("ready")}>Retry loading queue</Button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-muted/10" aria-busy={preview === "loading"}>
              <Table className="min-w-240">
                <TableCaption className="px-4 pb-4 text-left">All records are synthetic. Times shown in {QUEUE_TIMEZONE} (PST, UTC−08:00) for this fixed snapshot.</TableCaption>
                <TableHeader className="bg-muted/50">
                  <TableRow>{["Patient", "Clinic", "Reporting status", "Last report", "Clinical status"].map(heading => <TableHead key={heading} scope="col" className="px-4">{heading}</TableHead>)}</TableRow>
                </TableHeader>
                <TableBody>
                  {preview === "loading" ? (
                    <TableRow><TableCell colSpan={5} className="px-6 py-14 text-center text-muted-foreground">Loading reporting data…</TableCell></TableRow>
                  ) : rows.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="whitespace-normal px-6 py-14 text-center">
                      <p className="font-medium">No devices currently meet this queue’s criteria</p>
                      {hasFilters && <Button variant="link" className="mt-2" onClick={clearFilters}>Clear clinic and reporting-status filters</Button>}
                    </TableCell></TableRow>
                  ) : rows.map(row => {
                    const info = STATUS[row.reportingStatus as QueueStatus];
                    const Icon = info.icon;
                    return (
                      <TableRow key={row.patientId}>
                        <TableHead scope="row" className="px-4 py-5 text-foreground"><span className="font-semibold">{row.patientId}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{row.device}</span></TableHead>
                        <TableCell className="px-4">{row.clinic}</TableCell>
                        <TableCell className="px-4"><span className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium ${info.style}`}><Icon aria-hidden="true" className="size-3.5" />{info.label}</span><span className="mt-1 block max-w-60 whitespace-normal text-xs text-muted-foreground">{info.detail}</span></TableCell>
                        <TableCell className="px-4">{row.lastReport ? <time dateTime={row.lastReport}>{formatTime(row.lastReport)}</time> : <span className="text-muted-foreground">Unknown — no timestamp</span>}</TableCell>
                        <TableCell className="px-4">{row.clinicalStatus === "Deterioration documented" ? <span className="rounded-md border border-[hsl(var(--ds-danger)/0.4)] bg-[hsl(var(--ds-danger)/0.1)] px-2 py-1 text-xs font-medium">Deterioration documented</span> : <span className="text-muted-foreground">Not assessed</span>}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </DSPanelBody>
      </DSPanel>
    </section>
  );
}
