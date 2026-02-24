"use client";

import * as React from "react";
import { DSPage } from "@/components/ds/page";
import { AISignalInsights } from "@/components/patterns/AISignalInsights";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import InsightTableDemo from "@/components/patterns/InsightTableDemo";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";

export default function NumoHomePage() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const unreadCount = 2;

  return (
    <DSPage
      title="Protypes"
      description="Composed pages that reuses the patterns components: home header, bell notifications, and actionable insights."
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

          <div className="space-y-8 px-4 pb-5 pt-3 md:space-y-10 md:px-6 md:pb-8 md:pt-4">
            <AISignalInsights />
            <InsightTableDemo />
          </div>
        </div>
      </section>
    </DSPage>
  );
}
