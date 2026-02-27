"use client";

import * as React from "react";
import Image from "next/image";
import { DSPage } from "@/components/ds/page";
import { INSIGHT_ACTIONS, RowActions } from "@/components/patterns/RowActions";
import { DSIconButton } from "@/components/ds/icon-button";
import {
  DSPanel,
  DSPanelBody,
  DSPanelHeader,
  DSPanelSubheader,
  DSPanelTitle,
} from "@/components/ds/panel";
import { DSActionLink } from "@/components/ds/action-link";
import { DSInput } from "@/components/ds/input";
import { DSBreadcrumb } from "@/components/ds/breadcrumb";
import { DSAudioPlayButton } from "@/components/ds/audio-play-button";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";
import { PatientTimeSelectionDemo } from "@/components/patterns/PatientTimeSelectionDemo";
import { PatientRecordTabs } from "@/components/patterns/PatientRecordTabs";
import { Calendar, MessageSquare, NotebookPen, Pencil, Share2, Video, X } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

type ComponentId =
  | "brand-logos"
  | "audio-play-button"
  | "breadcrumb"
  | "icon-button"
  | "insight-actions"
  | "panel"
  | "input"
  | "notes-simplified"
  | "action-link"
  | "record-tabs"
  | "curie-header"
  | "monitoring-bar"
  | "time-selection";

const AUDIO_DURATION_S = 30;

function formatAudioTime(totalSeconds: number) {
  const s = Math.max(0, Math.min(AUDIO_DURATION_S, Math.floor(totalSeconds)));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function AudioPlayButtonDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    if (!isPlaying) return;
    const tickMs = 120;
    const id = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + tickMs / 1000;
        if (next >= AUDIO_DURATION_S) {
          window.setTimeout(() => setIsPlaying(false), 0);
          return AUDIO_DURATION_S;
        }
        return next;
      });
    }, tickMs);

    return () => window.clearInterval(id);
  }, [isPlaying]);

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
      <DSAudioPlayButton
        isPlaying={isPlaying}
        elapsedSeconds={elapsed}
        durationSeconds={AUDIO_DURATION_S}
        onToggle={() => {
          if (!isPlaying && elapsed >= AUDIO_DURATION_S) setElapsed(0);
          setIsPlaying((v) => !v);
        }}
      />
      <div className="text-xs text-muted-foreground tabular-nums">
        {formatAudioTime(elapsed)} / {formatAudioTime(AUDIO_DURATION_S)}
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<ComponentId>("audio-play-button");

  const items: Array<{
    id: ComponentId;
    label: string;
    title: string;
    description: string;
    render: React.ReactNode;
    code: string;
  }> = [
    {
      id: "brand-logos",
      label: "Logos",
      title: "Brand Logos",
      description: "Primary product marks and lockups.",
      render: (
        <div className="rounded-xl border border-border bg-background p-6">
          <Image src="/numoLogo.svg" alt="Numo logo" width={260} height={72} className="h-14 w-auto" priority />
        </div>
      ),
      code: `<Image src="/numoLogo.svg" alt="Numo logo" width={260} height={72} className="h-14 w-auto" />`,
    },
    {
      id: "audio-play-button",
      label: "Play Audio Button",
      title: "Play Audio Button",
      description: "Audio play interaction used in the Actionable Insight Table.",
      render: <AudioPlayButtonDemo />,
      code: `<DSAudioPlayButton
  isPlaying={isPlaying}
  elapsedSeconds={elapsed}
  durationSeconds={30}
  onToggle={toggleAudio}
/>`,
    },
    {
      id: "breadcrumb",
      label: "Breadcrumb",
      title: "Breadcrumb",
      description: "Patient context breadcrumb for chart-level navigation.",
      render: (
        <DSBreadcrumb
          sectionLabel="Patients"
          patientName="Brian Lauson"
          current="Notes"
          age="57 yrs"
          gender="Male"
          disease="COPD"
        />
      ),
      code: `<DSBreadcrumb
  sectionLabel="Patients"
  patientName="Brian Lauson"
  current="Notes"
  age="57 yrs"
  gender="Male"
  disease="COPD"
/>`,
    },
    {
      id: "icon-button",
      label: "IconButton",
      title: "IconButton",
      description: "Compact action affordance with tooltip + state ring.",
      render: (
        <div className="flex flex-wrap items-center gap-3">
          <DSIconButton aria-label="Schedule follow-up" tooltip="Schedule follow-up">
            <Calendar className="h-4 w-4" />
          </DSIconButton>
          <DSIconButton aria-label="Send SMS (loading)" tooltip="Send SMS (loading)" state="loading">
            <MessageSquare className="h-4 w-4" />
          </DSIconButton>
          <DSIconButton aria-label="Video call (disabled)" tooltip="Video call (disabled)" state="disabled">
            <Video className="h-4 w-4" />
          </DSIconButton>
          <DSIconButton aria-label="Sent (success)" tooltip="Sent (success)" state="success">
            <MessageSquare className="h-4 w-4" />
          </DSIconButton>
          <DSIconButton aria-label="Needs attention (danger)" tooltip="Needs attention (danger)" state="danger">
            <Calendar className="h-4 w-4" />
          </DSIconButton>
        </div>
      ),
      code: `<DSIconButton aria-label="Schedule follow-up" tooltip="Schedule follow-up">
  <Calendar className="h-4 w-4" />
</DSIconButton>`,
    },
    {
      id: "insight-actions",
      label: "Insight Actions",
      title: "Actionable Insight Actions",
      description: "Icons + state badges pulled from the Insight Table actions.",
      render: (
        <TooltipProvider delayDuration={200}>
          <div className="rounded-xl border border-border bg-card p-4">
            <RowActions actions={INSIGHT_ACTIONS} />
          </div>
        </TooltipProvider>
      ),
      code: `<TooltipProvider delayDuration={200}>
  <RowActions actions={INSIGHT_ACTIONS} />
</TooltipProvider>`,
    },
    {
      id: "panel",
      label: "Panel",
      title: "Panel",
      description: "Standard container for cards, drawers, and structured content blocks.",
      render: (
        <DSPanel className="w-full max-w-lg">
          <DSPanelHeader>
            <DSPanelTitle>Notifications</DSPanelTitle>
            <DSIconButton aria-label="Close" tooltip="Close">
              <X className="h-4 w-4" />
            </DSIconButton>
          </DSPanelHeader>
          <DSPanelSubheader>
            <div className="text-sm font-semibold text-foreground">New</div>
            <DSActionLink onClick={() => {}}>Mark all as read</DSActionLink>
          </DSPanelSubheader>
          <DSPanelBody>
            <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
              Panel body content goes here.
            </div>
          </DSPanelBody>
        </DSPanel>
      ),
      code: `<DSPanel>
  <DSPanelHeader>
    <DSPanelTitle>Notifications</DSPanelTitle>
  </DSPanelHeader>
  <DSPanelSubheader>
    <DSActionLink>Mark all as read</DSActionLink>
  </DSPanelSubheader>
  <DSPanelBody>...</DSPanelBody>
</DSPanel>`,
    },
    {
      id: "input",
      label: "Input",
      title: "Input",
      description: "DS-owned input styling; used by editable cards and search.",
      render: (
        <div className="max-w-md space-y-3">
          <DSInput placeholder="Add diagnosis" />
          <DSInput placeholder="Search patients..." />
        </div>
      ),
      code: `<DSInput placeholder="Add diagnosis" />\n<DSInput placeholder="Search patients..." />`,
    },
    {
      id: "notes-simplified",
      label: "Notes (Simplified)",
      title: "Notes (Simplified)",
      description: "Core note controls: search, filters, add-note CTA, and compact note actions.",
      render: (
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-64 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Search</p>
              <DSInput placeholder="Search notes" />
            </div>
            <label className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Filter</p>
              <select className="h-10 min-w-40 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-numo-blue-500">
                <option>All Notes</option>
                <option>Video Notes</option>
              </select>
            </label>
            <label className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Author</p>
              <select className="h-10 min-w-44 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-numo-blue-500">
                <option>All Authors</option>
                <option>Brian Lauson</option>
                <option>Mariana Krajcik</option>
              </select>
            </label>
            <button
              type="button"
              className="ml-auto inline-flex h-10 items-center gap-2 rounded-md bg-numo-blue-500 px-4 text-sm font-medium text-white transition hover:bg-numo-blue-600"
            >
              <NotebookPen className="h-4 w-4" />
              Add note
            </button>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-sm font-semibold text-numo-blue-800">Brian Lauson 9:06 AM</p>
            <p className="mt-1 text-sm text-numo-slate-800">Patient reports increased cough overnight with mild wheeze after exertion.</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                <Pencil className="h-3 w-3" />
                Edit
              </button>
              <button className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
                <Share2 className="h-3 w-3" />
                Share note
              </button>
            </div>
          </div>
        </div>
      ),
      code: `<DSInput placeholder="Search notes" />\n<select><option>All Notes</option></select>\n<button>Add note</button>`,
    },
    {
      id: "action-link",
      label: "ActionLink",
      title: "ActionLink",
      description: "Text-only secondary actions.",
      render: (
        <div className="flex items-center gap-6">
          <DSActionLink onClick={() => {}}>Mark all as read</DSActionLink>
          <DSActionLink onClick={() => {}}>Reset</DSActionLink>
        </div>
      ),
      code: `<DSActionLink onClick={() => {}}>Mark all as read</DSActionLink>`,
    },
    {
      id: "record-tabs",
      label: "Patient Record Tabs",
      title: "Patient Record Tabs",
      description: "Reusable top-level tabs for patient chart sections.",
      render: <PatientRecordTabs defaultTab="notes" />,
      code: `<PatientRecordTabs defaultTab="notes" />`,
    },
    {
      id: "curie-header",
      label: "Curie Header",
      title: "Curie Header + Notifications",
      description: "Prototype header shell with messages, bell, and user chip.",
      render: (
        <div className="rounded-xl border border-border bg-background p-2 overflow-visible">
          <CurieHeader
            unreadCount={2}
            notificationsOpen={notificationsOpen}
            onToggleNotifications={() => setNotificationsOpen((v) => !v)}
            notificationPanel={notificationsOpen ? <NotificationsPanelDemo showReset={false} /> : null}
          />
        </div>
      ),
      code: `<CurieHeader unreadCount={2} notificationsOpen={notificationsOpen} onToggleNotifications={() => setNotificationsOpen((v) => !v)} />`,
    },
    {
      id: "monitoring-bar",
      label: "Monitoring Bar",
      title: "Monitoring Bar + Contextual Menu",
      description: "Patient monitoring status row with contextual actions.",
      render: (
        <div className="overflow-visible">
          <MonitoringBarDemo />
        </div>
      ),
      code: `<MonitoringBarDemo />`,
    },
    {
      id: "time-selection",
      label: "Time Selection",
      title: "Patient Time Selection",
      description: "Patient appointment slot selector with multi-select interactions.",
      render: (
        <div className="overflow-visible">
          <PatientTimeSelectionDemo />
        </div>
      ),
      code: `<PatientTimeSelectionDemo />`,
    },
  ];

  const coreItems = items.filter((item) => item.id !== "brand-logos");
  const brandItems = items.filter((item) => item.id === "brand-logos");
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <DSPage
      title="Components"
      description="Primitives you'll reuse everywhere. Keep these boring, consistent, and token-driven."
    >
      

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border border-border bg-muted/25 p-2 lg:sticky lg:top-24">
          <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Components
          </p>
          <nav className="space-y-1">
            {coreItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={[
                  "w-full rounded-md px-3 py-2 text-left text-sm transition",
                  activeId === item.id
                    ? "bg-background font-medium text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-3 border-t border-border pt-3">
            <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Brand
            </p>
            <nav className="space-y-1">
              {brandItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={[
                    "w-full rounded-md px-3 py-2 pl-6 text-left text-sm transition",
                    activeId === item.id
                      ? "bg-background font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <section className="rounded-xl bg-muted/30 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{activeItem.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{activeItem.description}</p>
          </div>
          <div className="rounded-xl p-4">{activeItem.render}</div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Code</p>
            <pre className="overflow-x-auto text-xs leading-6 text-foreground">
              <code>{activeItem.code}</code>
            </pre>
          </div>
        </section>
      </div>
    </DSPage>
  );
}
