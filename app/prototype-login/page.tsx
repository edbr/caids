"use client";

import { DSPage } from "@/components/ds/page";
import { ClinicalLoginPrototype } from "@/components/patterns/ClinicalLoginPrototype";

export default function PrototypeLoginPage() {
  return (
    <DSPage
      title="Prototypes"
      description="Login experience prototype aligned with the clinical dashboard visual language."
      hideDescriptionOnMobile
    >
      <ClinicalLoginPrototype />
    </DSPage>
  );
}
