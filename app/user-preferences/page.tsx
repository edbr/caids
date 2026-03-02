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
    </DSPage>
  );
}
