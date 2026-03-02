import Link from "next/link";
import { DSPage } from "@/components/ds/page";

export default function OAuthConsentPage() {
  return (
    <DSPage
      title="OAuth Consent"
      description="Preview route for OAuth consent flow."
    >
      <section className="mx-auto max-w-2xl rounded-xl border border-border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-numo-blue-900">Authorization Preview</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This path is implemented and available for provider preview/testing.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/prototype-login"
            className="inline-flex items-center rounded-md border border-numo-blue-300 bg-background px-4 py-2 text-sm font-medium text-numo-blue-800 transition hover:border-numo-blue-500 hover:bg-numo-blue-50"
          >
            Back to Login Prototype
          </Link>
          <Link
            href="/numo-home"
            className="inline-flex items-center rounded-md border border-border bg-muted/20 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/40"
          >
            Go to Clinical Dashboard
          </Link>
        </div>
      </section>
    </DSPage>
  );
}

