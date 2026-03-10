"use client";

import * as React from "react";
import { DSPage } from "@/components/ds/page";
import { DSBreadcrumb } from "@/components/ds/breadcrumb";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import { PatientRecordTabs } from "@/components/patterns/PatientRecordTabs";
import { AlwaysOnPatientPanel } from "@/components/patterns/AlwaysOnPatientPanel";

export default function PrototypePatientPage() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  return (
    <DSPage
      title="Prototype Patient"
      description="Starter patient page with header, breadcrumb, and record tabs."
      hideDescriptionOnMobile
      hidePageIntro
    >
      <section className="-mx-6 w-[calc(100%+3rem)]">
        <div className="relative overflow-visible rounded-xl bg-background">
          <div className="sticky top-0 z-40 -mx-4 bg-muted/40 px-4 py-1.5 backdrop-blur-sm md:-mx-6 md:px-6 md:py-2">
            <CurieHeader
              showMobilePreview={false}
              unreadCount={2}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={() => setNotificationsOpen((v) => !v)}
              notificationPanel={
                notificationsOpen ? <NotificationsPanelDemo showReset={false} /> : null
              }
            />
          </div>

          <div className="space-y-4 px-4 pb-5 pt-3 md:px-6 md:pb-8 md:pt-4">
            <DSBreadcrumb
              sectionLabel="Patients"
              patientName="Carlitos Alcaraz"
              current="Overview"
              age="57 yrs"
              gender="Male"
              disease="COPD"
            />

            <div className="grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
              <AlwaysOnPatientPanel />

              <div className="space-y-4 lg:pl-2">
                <PatientRecordTabs defaultTab="reports" />

                <div className="rounded-xl border border-dashed border-border bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
                  Add patient-page modules here.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DSPage>
  );
}
