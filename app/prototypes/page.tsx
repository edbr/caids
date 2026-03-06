import Link from "next/link";
import { DSPage } from "@/components/ds/page";

export default function PrototypesIndexPage() {
  return (
    <DSPage
      title="Prototypes"
      description="Explore all prototype pages."
    >
      <section className="grid gap-3 md:grid-cols-2">
        <Link
          href="/numo-home"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">Clinical Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            End-to-end home workflow with header controls, notifications, and insights.
          </p>
        </Link>

        <Link
          href="/notes"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">Notes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Note interactions including filtering, creation, and editing in patient context.
          </p>
        </Link>

        <Link
          href="/tablet-appointment"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">Tablet Appointment</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tablet appointment flow with minimized appointment control behavior.
          </p>
        </Link>

        <Link
          href="/prototype-login"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">Login Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Clinical login and account creation flow integrated with Supabase auth.
          </p>
        </Link>

        <Link
          href="/user-preferences"
          className="rounded-xl border border-border bg-muted/30 px-5 py-5 transition hover:bg-muted/45"
        >
          <h2 className="text-lg font-semibold">User Preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Post-login preferences and profile update flow for authenticated users.
          </p>
        </Link>
      </section>
    </DSPage>
  );
}
