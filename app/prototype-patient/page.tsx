"use client";

import * as React from "react";
import { DSPage } from "@/components/ds/page";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import { PatientRecordTabs, type TabKey } from "@/components/patterns/PatientRecordTabs";
import { AlwaysOnPatientPanel } from "@/components/patterns/AlwaysOnPatientPanel";
import { PatientReportsDashboard } from "@/components/patterns/PatientReportsDashboard";

export default function PrototypePatientPage() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabKey>("reports");

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


            <div className="grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
              <div className="lg:sticky lg:top-28">
                <AlwaysOnPatientPanel />
              </div>

              <div className="space-y-4 lg:pl-2">
                <PatientRecordTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === "reports" ? (
                  <PatientReportsDashboard />
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-muted/20 px-4 py-6 text-sm text-muted-foreground">
                    {activeTab === "summary"
                      ? "Health Summary content placeholder."
                      : activeTab === "notes"
                        ? "Notes content placeholder."
                        : "Spirometry content placeholder."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DSPage>
  );
}
