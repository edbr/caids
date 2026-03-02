"use client";

import { DSPage } from "@/components/ds/page";
import { UserPreferencesPrototype } from "@/components/patterns/UserPreferencesPrototype";

export default function UserPreferencesPage() {
  return (
    <DSPage
      title="Prototypes"
      description="User preferences workflow after clinical login."
      hideDescriptionOnMobile
    >
      <UserPreferencesPrototype />

      <section className="rounded-xl border border-border bg-background p-5 md:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-numo-blue-900">
          How User Preferences Works With Supabase
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page reads your authenticated user record from Supabase Auth and lets you safely update account details.
        </p>

        <ol className="mt-4 space-y-3 text-sm text-foreground">
          <li>
            <span className="font-semibold">1. Session check:</span> the page reads the stored auth token from the
            browser and confirms an active session.
          </li>
          <li>
            <span className="font-semibold">2. Load user:</span> user data is fetched from Supabase
            (`GET /auth/v1/user`).
          </li>
          <li>
            <span className="font-semibold">3. Profile updates:</span> name, email, and permissions are saved with
            `PUT /auth/v1/user` (user metadata).
          </li>
          <li>
            <span className="font-semibold">4. Password updates:</span> password is changed securely through Supabase
            using `PUT /auth/v1/user`.
          </li>
          <li>
            <span className="font-semibold">5. Sign out:</span> logout clears local auth tokens and ends session in
            Supabase.
          </li>
        </ol>
      </section>
    </DSPage>
  );
}
