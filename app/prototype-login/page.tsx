"use client";

import { DSPage } from "@/components/ds/page";
import { ClinicalLoginPrototype } from "@/components/patterns/ClinicalLoginPrototype";

export default function PrototypeLoginPage() {
  return (
    <DSPage
      title="Prototypes"
      description="Login experience prototype aligned with the clinical dashboard visual language."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <ClinicalLoginPrototype />

      <section className="rounded-xl border border-border bg-background p-5 md:p-6 mt-12">
        <h2 className="text-lg font-semibold tracking-tight text-numo-blue-900">
          How This Prototype Connects To Supabase
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This flow uses Supabase Auth to create users, confirm email, sign in, and manage account settings.
        </p>

        <ol className="mt-4 space-y-3 text-sm text-foreground">
          <li>
            <span className="font-semibold">1. Create account:</span> the form sends email + password to Supabase
            (`/auth/v1/signup`).
          </li>
          <li>
            <span className="font-semibold">2. Email confirmation:</span> Supabase sends a confirmation email to the
            user.
          </li>
          <li>
            <span className="font-semibold">3. Sign in:</span> after confirmation, sign-in uses Supabase password auth
            (`/auth/v1/token?grant_type=password`).
          </li>
          <li>
            <span className="font-semibold">4. Session storage:</span> access and refresh tokens are stored locally in
            the browser for this prototype.
          </li>
          <li>
            <span className="font-semibold">5. User profile:</span> user info is fetched from Supabase
            (`/auth/v1/user`) and shown in User Preferences.
          </li>
          <li>
            <span className="font-semibold">6. Update profile/password:</span> changes are saved back to Supabase via
            `PUT /auth/v1/user`.
          </li>
        </ol>
      </section>
    </DSPage>
  );
}
