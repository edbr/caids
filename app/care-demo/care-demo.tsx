"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { isCareState, type CareState } from "@/lib/care-demo";

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
  const [reportOpen, setReportOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const reportButton = useRef<HTMLButtonElement>(null);
  const reportTrigger = useRef<HTMLButtonElement>(null);
  const kitStatus = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    loadState("status", { signal: controller.signal })
      .then(setState)
      .catch(() => {
        if (!controller.signal.aborted) setLookupError(true);
      });
    return () => controller.abort();
  }, [lookupAttempt]);

  useEffect(() => {
    if (reportOpen) reportButton.current?.focus();
  }, [reportOpen]);

  async function requestHelp() {
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
      setSaving(false);
    }
  }

  return (
    <main className="min-h-dvh bg-muted/40">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8 sm:py-14">
        <Link href="/prototypes" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} aria-hidden /> Prototypes
        </Link>
        <header className="mb-8 mt-5 space-y-2">
          {mock && <p className="text-sm font-medium text-muted-foreground">Mock mode</p>}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your first two weeks</h1>
          <p className="text-muted-foreground">Track your at-home lab kit and get ready for your first visit.</p>
        </header>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex-row items-center gap-3">
              <Package className="shrink-0 text-muted-foreground" aria-hidden />
              <h2 className="text-lg font-semibold">At-home lab kit</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div role="status">
                <span ref={kitStatus} tabIndex={-1} className={state ? badge : "text-sm text-muted-foreground"}>
                  {state?.kitStatus === "help_requested" ? "Help requested" : state ? "Delivered" : lookupError ? "" : "Checking kit status…"}
                </span>
                {state?.kitStatus === "help_requested" && (
                  <p className="mt-3 text-muted-foreground">We’ll look into what happened with your kit. You can still book your first visit.</p>
                )}
              </div>
              {lookupError && (
                <div className="space-y-3">
                  <p role="alert" className="text-sm text-destructive">We couldn’t load your kit status. Please try again.</p>
                  <Button type="button" variant="outline" className="min-h-11" onClick={() => {
                    setLookupError(false);
                    setLookupAttempt(attempt => attempt + 1);
                  }}>Retry status</Button>
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
                        <Button ref={reportButton} type="button" className="min-h-11" disabled={saving} onClick={requestHelp}>
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

          <Card>
            <CardHeader className="flex-row items-center gap-3">
              <CalendarDays className="shrink-0 text-muted-foreground" aria-hidden />
              <h2 className="text-lg font-semibold">First visit</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={badge}>Ready to book</p>
              <Button type="button" className="min-h-11" aria-expanded={bookingOpen} aria-controls={bookingOpen ? "demo-booking" : undefined} onClick={() => setBookingOpen(open => !open)}>Book my visit</Button>
              {bookingOpen && (
                <section id="demo-booking" aria-labelledby="demo-booking-title" className="space-y-2 rounded-xl border border-border bg-muted/50 p-4">
                  <h3 id="demo-booking-title" className="font-semibold">Demo booking</h3>
                  <p className="text-sm text-muted-foreground">Sample times (Pacific Time)</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    <li>Tuesday at 10:00 a.m.</li>
                    <li>Thursday at 2:30 p.m.</li>
                  </ul>
                </section>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
