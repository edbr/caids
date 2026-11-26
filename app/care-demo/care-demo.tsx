"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BatteryFull, Package, Signal, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { isCareState, kitLabels, type CareState, type VisitSlot } from "@/lib/care-demo";

import { CareTeam, ReportFacts, ReportTime, RequestActivity } from "./care-team";
import { ClinicalFirstVisit, MemberFirstVisit } from "./first-visit";

async function loadState(path: string, options?: RequestInit) {
  const response = await fetch(`/api/care-demo/${path}`, { cache: "no-store", ...options });
  if (!response.ok) throw new Error("Care demo request failed");
  const state: unknown = await response.json();
  if (!isCareState(state)) throw new Error("Invalid care demo state");
  return state;
}

const badge = "w-fit rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium";

export function CareDemo({ mock }: { mock: boolean }) {
  const [state, setState] = useState<CareState>();
  const [lookupError, setLookupError] = useState(false);
  const [lookupAttempt, setLookupAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [scenarioError, setScenarioError] = useState<string>();
  const [scenarioVersion, setScenarioVersion] = useState(0);
  const mutation = useRef(false);
  const reportButton = useRef<HTMLButtonElement>(null);
  const reportTrigger = useRef<HTMLButtonElement>(null);
  const kitStatus = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    loadState("status", { signal: controller.signal })
      .then(setState)
      .catch(() => {
        if (!controller.signal.aborted) setLookupError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setRefreshing(false);
      });
    return () => controller.abort();
  }, [lookupAttempt]);

  useEffect(() => {
    if (reportOpen) reportButton.current?.focus();
  }, [reportOpen]);

  async function requestHelp() {
    if (mutation.current) return;
    mutation.current = true;
    setSaving(true);
    setSaveError(false);
    try {
      const savedState = await loadState("report-missing-kit", { method: "POST" });
      setState(savedState);
      setReportOpen(false);
      kitStatus.current?.focus();
    } catch {
      setSaveError(true);
    } finally {
      mutation.current = false;
      setSaving(false);
    }
  }

  async function updateScenario(action: string, slot?: VisitSlot) {
    if (mutation.current) return;
    mutation.current = true;
    setUpdating(true);
    setScenarioError(undefined);
    try {
      setState(await loadState("scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, slot }),
      }));
      if (action === "reset") {
        setScenarioVersion(version => version + 1);
        setReportOpen(false);
        setSaveError(false);
      }
    } catch {
      setScenarioError(action);
    } finally {
      mutation.current = false;
      setUpdating(false);
    }
  }

  function refreshStatus() {
    setLookupError(false);
    setRefreshing(true);
    setLookupAttempt(attempt => attempt + 1);
  }

  return (
    <main className="min-h-dvh bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-14">
        <Link href="/prototypes" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} aria-hidden /> Prototypes
        </Link>
        <header className="mb-8 mt-5 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Demo · fictional member data</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your first two weeks</h1>
          <p className="text-muted-foreground">Track your at-home lab kit and get ready for your first visit.</p>
          {!mock && <Button type="button" variant="outline" disabled={refreshing || saving || updating} onClick={refreshStatus}>Refresh status</Button>}
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,390px)_minmax(0,1fr)]">
          <section aria-labelledby="member-view" className="mx-auto w-full min-w-0 max-w-[390px] space-y-4">
            <h2 id="member-view" className="text-xl font-semibold">Member view</h2>
            <div data-phone-frame className="overflow-hidden rounded-[2.75rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-xl ring-1 ring-border dark:border-zinc-700">
              <div className="relative flex h-10 items-center justify-end gap-1.5 rounded-t-[2.35rem] bg-background pr-5 text-foreground" aria-hidden>
                <div className="absolute left-1/2 h-5 w-[4.5rem] -translate-x-1/2 rounded-full bg-zinc-900" />
                <Signal size={13} />
                <Wifi size={13} />
                <BatteryFull size={18} />
              </div>
              <div role="region" aria-label="Phone screen" tabIndex={0} className="h-[min(70dvh,42rem)] min-h-[26rem] space-y-3 overflow-y-auto overscroll-contain bg-muted/40 px-3 py-3 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
                <Card>
                  <CardHeader className="flex-row items-center gap-3">
                    <Package className="shrink-0 text-muted-foreground" aria-hidden />
                    <h3 className="text-lg font-semibold">At-home lab kit</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div role="status">
                      <span ref={kitStatus} tabIndex={-1} className={state ? badge : "text-sm text-muted-foreground"}>
                        {state ? kitLabels[state.kitStatus] : lookupError ? "" : "Checking kit status…"}
                      </span>
                      {state?.kitStatus === "delivered" && <p className="mt-3 text-muted-foreground">The carrier marked your kit delivered. Can’t find it?</p>}
                      {state?.kitStatus === "help_requested" && (
                        <p className="mt-3 text-muted-foreground">We received your report. Your care team will review it. You can still book your first visit.</p>
                      )}
                      {state?.kitStatus === "replacement_shipped" && <p className="mt-3 text-muted-foreground">A replacement kit is on its way.</p>}
                      {state?.kitStatus === "replacement_received" && <p className="mt-3 text-muted-foreground">Your replacement kit arrived. Here’s what to do next.</p>}
                    </div>
                    {state && state.kitStatus !== "delivered" && (
                      <div className="space-y-3">
                        <p className="font-semibold">Your report has been saved</p>
                        {state.request && <p className="text-sm text-muted-foreground">Reference {state.request.reference} · Saved <ReportTime value={state.request.receivedAt} /></p>}
                        <ReportFacts member />
                        {state.request && <RequestActivity report={state.request} member />}
                      </div>
                    )}
                    {state?.kitStatus === "replacement_received" && (
                      <details className="rounded-xl border border-border p-4">
                        <summary className="cursor-pointer font-medium">View kit instructions</summary>
                        <p className="mt-2 text-sm text-muted-foreground">Open your kit and follow the instructions included in the box.</p>
                      </details>
                    )}
                    {lookupError && (
                      <div className="space-y-3">
                        <p role="alert" className="text-sm text-destructive">We couldn’t load your kit status. Please try again.</p>
                        <Button type="button" variant="outline" className="min-h-11" onClick={refreshStatus}>Try again</Button>
                      </div>
                    )}
                    {state?.kitStatus === "delivered" && (
                      <>
                        <Button ref={reportTrigger} type="button" variant="outline" className="min-h-11" aria-expanded={reportOpen} aria-controls={reportOpen ? "missing-kit-panel" : undefined} onClick={() => setReportOpen(true)}>
                          I didn’t receive it
                        </Button>
                        {reportOpen && (
                          <div id="missing-kit-panel" className="space-y-4 rounded-xl border border-border bg-muted/50 p-4">
                            <p>The carrier marked your kit as delivered. We can help look into it. You can still book your first visit.</p>
                            {saveError && <p role="alert" className="text-sm text-destructive">We couldn’t save your request. Please try again.</p>}
                            <div className="flex flex-wrap gap-2">
                              <Button ref={reportButton} type="button" className="min-h-11" disabled={refreshing || saving || updating} onClick={requestHelp}>
                                {saving ? "Requesting help…" : "Request help"}
                              </Button>
                              <Button type="button" variant="ghost" className="min-h-11" disabled={saving} onClick={() => {
                                setReportOpen(false);
                                setSaveError(false);
                                reportTrigger.current?.focus();
                              }}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                <MemberFirstVisit
                  key={scenarioVersion}
                  state={state}
                  busy={refreshing || saving || updating || !state}
                  error={scenarioError === "book"}
                  book={slot => updateScenario("book", slot)}
                />
              </div>
              <div className="flex h-6 items-center justify-center rounded-b-[2.35rem] bg-background" aria-hidden>
                <div className="h-1 w-24 rounded-full bg-foreground/80" />
              </div>
            </div>
          </section>
          <section aria-labelledby="clinical-view" className="min-w-0 space-y-4">
            <h2 id="clinical-view" className="text-xl font-semibold">Clinical view</h2>
            <CareTeam state={state} mock={mock} busy={refreshing || saving || updating} error={!!scenarioError && scenarioError !== "book" && scenarioError !== "confirm_visit"} update={updateScenario} />
            <ClinicalFirstVisit
              state={state}
              busy={refreshing || saving || updating}
              error={scenarioError === "confirm_visit"}
              confirm={() => updateScenario("confirm_visit")}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
