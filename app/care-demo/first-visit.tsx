import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { PrimaryBtn } from "@/components/ds/button";
import { DSPanel, DSPanelBody, DSPanelHeader } from "@/components/ds/panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { isVisitSlot, visitSlots, type CareState, type VisitSlot } from "@/lib/care-demo";

export function MemberFirstVisit({ state, mock, busy, error, book }: {
  state?: CareState;
  mock: boolean;
  busy: boolean;
  error: boolean;
  book: (slot: VisitSlot) => void;
}) {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<VisitSlot>();
  const bookedSlot = state?.visitSlot;
  const confirmed = state?.firstVisitStatus === "confirmed";

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3">
        <CalendarDays className="shrink-0 text-muted-foreground" aria-hidden />
        <h3 className="text-lg font-semibold">First visit</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div role="status" className="space-y-2">
          <p className="w-fit rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium">
            {confirmed ? "Visit confirmed" : bookedSlot ? "Visit booked" : "Ready to book"}
          </p>
          {bookedSlot && (
            <>
              <p className="font-medium">{visitSlots[bookedSlot]} Pacific Time</p>
              <p className="text-sm text-muted-foreground">
                {confirmed ? "Your care team confirmed your demo visit." : "Your care team can see your booking."}
              </p>
            </>
          )}
        </div>
        {!bookedSlot && (
          <>
            <Button type="button" className="min-h-11" aria-expanded={open} aria-controls={open ? "demo-booking" : undefined} onClick={() => setOpen(value => !value)}>
              Book my visit
            </Button>
            {open && (
              <section id="demo-booking" aria-labelledby="demo-booking-title" className="space-y-3 rounded-xl border border-border bg-muted/50 p-4">
                <h4 id="demo-booking-title" className="font-semibold">Demo booking</h4>
                {mock ? (
                  <>
                    <fieldset className="space-y-2" disabled={busy}>
                      <legend className="mb-2 text-sm text-muted-foreground">Choose a fictional time (Pacific Time)</legend>
                      {Object.entries(visitSlots).map(([id, label]) => (
                        <label key={id} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 text-sm">
                          <input type="radio" name="visit-slot" checked={slot === id} onChange={() => { if (isVisitSlot(id)) setSlot(id); }} className="accent-primary" />
                          {label}
                        </label>
                      ))}
                    </fieldset>
                    {error && <p role="alert" className="text-sm text-destructive">We couldn’t book your visit. Please try again.</p>}
                    <Button type="button" className="min-h-11" disabled={!slot || busy} onClick={() => { if (slot) book(slot); }}>Confirm booking</Button>
                  </>
                ) : (
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {Object.values(visitSlots).map(label => <li key={label}>{label} Pacific Time</li>)}
                  </ul>
                )}
              </section>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function ClinicalFirstVisit({ state, busy, error, confirm }: {
  state?: CareState;
  busy: boolean;
  error: boolean;
  confirm: () => void;
}) {
  const slot = state?.visitSlot;
  const confirmed = state?.firstVisitStatus === "confirmed";

  return (
    <DSPanel>
      <DSPanelHeader className="justify-start gap-3">
        <CalendarDays className="shrink-0 text-numo-blue-600 dark:text-numo-blue-400" aria-hidden />
        <h3 className="text-[22px] font-semibold tracking-[-0.01em]">First visit</h3>
      </DSPanelHeader>
      <DSPanelBody className="space-y-4 px-6">
        <div role="status" className="space-y-2">
          {slot ? (
            <>
              <p className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${confirmed
                ? "border-numo-teal-500/40 bg-numo-teal-400/10"
                : "border-numo-blue-500/40 bg-numo-blue-400/10"}`}>
                {confirmed ? "Confirmed" : "Awaiting confirmation"}
              </p>
              <p className="text-sm">{visitSlots[slot]} Pacific Time</p>
            </>
          ) : <p className="text-sm text-muted-foreground">No visit booked yet.</p>}
        </div>
        {error && <p role="alert" className="text-sm text-destructive">We couldn’t confirm the visit. Please try again.</p>}
        {slot && !confirmed && (
          <PrimaryBtn disabled={busy} className="min-h-11 disabled:pointer-events-none disabled:opacity-50" onClick={confirm}>Confirm visit</PrimaryBtn>
        )}
      </DSPanelBody>
    </DSPanel>
  );
}
