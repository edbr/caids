"use client";

import * as React from "react";
import { DSPage } from "@/components/ds/page";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import { NotesDemo } from "@/components/patterns/NotesDemo";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import { PatientRecordTabs } from "@/components/patterns/PatientRecordTabs";

export default function NotesPage() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const unreadCount = 2;

  return (
    <DSPage
      title="Notes"
      description="Prototype for note interactions: browse, search/filter, add note, and edit note."
    >
      <section className="rounded-xl border border-border bg-muted/25 p-5 md:p-8">
        <div className="relative overflow-visible rounded-xl bg-background">
          <div className="sticky top-0 z-40 -mx-4 bg-muted/40 px-4 py-1.5 backdrop-blur-sm md:-mx-6 md:px-6 md:py-2">
            <CurieHeader
              unreadCount={unreadCount}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={() => setNotificationsOpen((v) => !v)}
              notificationPanel={
                notificationsOpen ? <NotificationsPanelDemo showReset={false} /> : null
              }
            />
          </div>

          <div className="px-4 pb-5 pt-3 md:px-6 md:pb-8 md:pt-4">
            <div className="mb-4 rounded-md border border-border bg-muted/90 px-3 py-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted-foreground">Patients</span>
                <span className="text-muted-foreground/70">/</span>
                <span className="font-medium text-foreground">Brian Lauson</span>
                <span className="text-muted-foreground/70">/</span>
                <span className="rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                  57 yrs
                </span>
                <span className="rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                  Male
                </span>
                <span className="rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                  COPD
                </span>
              </div>
            </div>
            <div className="mb-4">
              <PatientRecordTabs defaultTab="notes" />
            </div>
            <NotesDemo />
          </div>
        </div>
      </section>
    </DSPage>
  );
}
