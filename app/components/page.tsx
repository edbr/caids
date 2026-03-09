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
import { DSConversationModule } from "@/components/ds/conversation-module";
import { DSNotesAddButtonDemo } from "@/components/ds/notes-add-button-demo";
import { DSTabletButtonsDemo } from "@/components/ds/tablet-buttons-demo";
import { DSTabletCustomIconsDemo } from "@/components/ds/tablet-custom-icons-demo";
import { DSClinicalEmrGraphsDemo } from "@/components/ds/clinical-emr-graphs-demo";
import { CurieHeader } from "@/components/patterns/CurieHeader";
import NotificationsPanelDemo from "@/components/patterns/NotificationsPanelDemo";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";
import { PatientTimeSelectionDemo } from "@/components/patterns/PatientTimeSelectionDemo";
import { PatientRecordTabs } from "@/components/patterns/PatientRecordTabs";
import {
  Calendar,
  MessageSquare,
  NotebookPen,
  Pencil,
  Share2,
  Video,
  X,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

type ComponentId =
  | "brand-logos"
  | "brand-illustration"
  | "brand-images"
  | "brand-business-card"
  | "audio-play-button"
  | "conversation-module"
  | "breadcrumb"
  | "icon-button"
  | "graphs"
  | "insight-actions"
  | "panel"
  | "input"
  | "notes-simplified"
  | "action-link"
  | "record-tabs"
  | "curie-header"
  | "tablet-buttons"
  | "tablet-custom-icons"
  | "monitoring-bar"
  | "time-selection"
  | "notes-add-button";

const AUDIO_DURATION_S = 30;
const BRAND_ASSETS_BASE_URL =
  process.env.NEXT_PUBLIC_BRAND_ASSETS_BASE_URL ?? "https://lungds.s3.us-east-2.amazonaws.com";
const BRAND_IMAGE_FILES = [
  "Numo_BrandAssets_V2-6.png",
  "Numo_WarmLeavesStripFinal.png",
  "image1-8.jpeg",
  "image2-9.jpeg",
  "image3-10.jpeg",
  "image4-11.jpeg",
  "image5-12.jpeg",
  "image6-13.jpeg",
  "image7-14.jpeg",
  "image8-15.jpeg",
  "tablet-1.png",
  "tablet-2.png",
  "tablet-3.png",
  "tablet-4.png",
  "tablet-5.png",
  "tablet-frontView.png",
] as const;
const BRAND_BUSINESS_CARD_FILES = [
  "Numo_BusinessCardsOL_020723_Back.pdf",
  "Numo_BusinessCardsOL_020723_FrontSaba.pdf",
] as const;
const CODE_TOKEN_REGEX =
  /(\b(?:import|from|export|default|function|return|const|let|var|class|new|if|else|type|interface|as|await|async)\b)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;

function brandAssetUrl(folder: "logos" | "images" | "tablet" | "businessCard", file: string) {
  return `${BRAND_ASSETS_BASE_URL.replace(/\/$/, "")}/${folder}/${encodeURIComponent(file)}`;
}

function formatAudioTime(totalSeconds: number) {
  const s = Math.max(0, Math.min(AUDIO_DURATION_S, Math.floor(totalSeconds)));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function renderCodeWithColor(code: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(CODE_TOKEN_REGEX)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(code.slice(lastIndex, index));
    }

    if (match[1]) {
      nodes.push(
        <span key={`${index}-kw`} className="text-numo-red-600 dark:text-numo-red-400">
          {token}
        </span>,
      );
    } else if (match[2]) {
      nodes.push(
        <span key={`${index}-str`} className="text-numo-blue-700 dark:text-numo-blue-400">
          {token}
        </span>,
      );
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }

  return nodes;
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
  const [copiedFile, setCopiedFile] = React.useState<string | null>(null);

  const copyFileName = React.useCallback(async (file: string) => {
    try {
      await navigator.clipboard.writeText(file);
      setCopiedFile(file);
      window.setTimeout(() => setCopiedFile((current) => (current === file ? null : current)), 1400);
    } catch {
      setCopiedFile(null);
    }
  }, []);

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
        <div className="space-y-4 rounded-xl border border-border bg-background p-6">
          <div className="flex flex-wrap items-center gap-8">
            <Image
              src="/numoLogo.svg"
              alt="Numo logo"
              width={260}
              height={72}
              className="h-9 w-auto"
              priority
            />
            <Image
              src="/Curie_AI_logo.svg"
              alt="Curie AI logo"
              width={280}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Numo_Logo_1_Centered_Tagline.png",
              "Numo_Logo_2_LeftAligned_Tagline.png",
              "Numo_Logo_3_Centered.png",
              "Numo_Logo_4_LeftAligned.png",
              "Numo_Logo_Icon1_Transparent.png",
              "Numo_Logo_Icon2_Circle.png",
              "Numo_Logo_Icon3_Square.png",
            ].map((file) => (
              <div key={file} className="group relative rounded-lg border border-border bg-muted/20 p-3">
                <Image
                  src={brandAssetUrl("logos", file)}
                  alt={file.replace(".png", "").replaceAll("_", " ")}
                  width={420}
                  height={160}
                  className="h-16 w-auto object-contain"
                />
                <button
                  type="button"
                  title={file}
                  onClick={() => copyFileName(file)}
                  className="absolute bottom-2 left-2 right-2 truncate rounded-md bg-numo-blue-900/90 px-2 py-1 text-left text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  {copiedFile === file ? "Copied" : file}
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `<Image src="/numoLogo.svg" alt="Numo logo" width={260} height={72} className="h-14 w-auto" />
<Image src="/Curie_AI_logo.svg" alt="Curie AI logo" width={280} height={80} className="h-14 w-auto" />
{["Numo_Logo_1_Centered_Tagline.png", "..."].map((file) => (
  <Image key={file} src={brandAssetUrl("logos", file)} alt={file} width={420} height={160} className="h-16 w-auto" />
))}`,
    },
    {
      id: "brand-illustration",
      label: "Illustration",
      title: "Brand Illustration",
      description: "Tablet illustration assets from /public/tablet.",
      render: (
        <div className="grid gap-4 md:grid-cols-2">
          {["tablet-2.pdf", "tablet-3.pdf", "tablet-4.pdf", "tablet-5.pdf"].map((file) => (
            <article key={file} className="group relative rounded-xl border border-border bg-background p-3">
              <object
                data={brandAssetUrl("tablet", file)}
                type="application/pdf"
                className="h-72 w-full rounded-md border border-border bg-muted/20"
              >
                <a
                  href={brandAssetUrl("tablet", file)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-numo-blue-700 underline"
                >
                  Open illustration PDF
                </a>
              </object>
              <button
                type="button"
                title={file}
                onClick={() => copyFileName(file)}
                className="absolute bottom-5 left-5 right-5 truncate rounded-md bg-numo-blue-900/90 px-2 py-1 text-left text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {copiedFile === file ? "Copied" : file}
              </button>
            </article>
          ))}
        </div>
      ),
      code: `{["tablet-2.pdf", "tablet-3.pdf", "tablet-4.pdf", "tablet-5.pdf"].map((file) => (
  <object key={file} data={brandAssetUrl("tablet", file)} type="application/pdf" className="h-72 w-full" />
))}`,
    },
    {
      id: "brand-images",
      label: "Images",
      title: "Brand Images",
      description: "Additional brand imagery from /public/images.",
      render: (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {BRAND_IMAGE_FILES.map((file) => (
            <div key={file} className="group relative min-w-0 overflow-hidden rounded-lg border border-border bg-background p-2.5 sm:p-3">
              <Image
                src={brandAssetUrl("images", file)}
                alt={file.replace(".png", "").replaceAll("_", " ")}
                width={640}
                height={420}
                className="h-32 w-full rounded-md bg-muted/20 object-contain object-center sm:h-40"
              />
              <button
                type="button"
                title={file}
                onClick={() => copyFileName(file)}
                className="mt-2 block w-full truncate rounded-md bg-numo-blue-900/90 px-2 py-1 text-left text-[10px] font-medium text-white sm:absolute sm:bottom-2 sm:left-2 sm:right-2 sm:mt-0 sm:w-auto sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              >
                {copiedFile === file ? "Copied" : file}
              </button>
            </div>
          ))}
        </div>
      ),
      code: `{BRAND_IMAGE_FILES.map((file) => (
  <Image key={file} src={brandAssetUrl("images", file)} alt={file} width={640} height={420} className="h-40 w-full object-contain" />
))}`,
    },
    {
      id: "brand-business-card",
      label: "Business Card",
      title: "Brand Business Card",
      description: "Business card artwork from /public/businessCard.",
      render: (
        <div className="grid gap-4 md:grid-cols-2">
          {BRAND_BUSINESS_CARD_FILES.map((file) => (
            <article key={file} className="group relative rounded-xl border border-border bg-background p-3">
              <object
                data={brandAssetUrl("businessCard", file)}
                type="application/pdf"
                className="h-80 w-full rounded-md border border-border bg-muted/20"
              >
                <a
                  href={brandAssetUrl("businessCard", file)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-numo-blue-700 underline"
                >
                  Open business card PDF
                </a>
              </object>
              <button
                type="button"
                title={file}
                onClick={() => copyFileName(file)}
                className="absolute bottom-5 left-5 right-5 truncate rounded-md bg-numo-blue-900/90 px-2 py-1 text-left text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {copiedFile === file ? "Copied" : file}
              </button>
            </article>
          ))}
        </div>
      ),
      code: `{BRAND_BUSINESS_CARD_FILES.map((file) => (
  <object key={file} data={brandAssetUrl("businessCard", file)} type="application/pdf" className="h-80 w-full" />
))}`,
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
      id: "conversation-module",
      label: "Conversation",
      title: "Conversation Module",
      description: "Auto-rotating patient/clinician conversation preview.",
      render: <DSConversationModule title="Jane Mullgard" />,
      code: `<DSConversationModule title="Jane Mullgard" />`,
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
      id: "graphs",
      label: "Graphs",
      title: "Clinical EMR Graphs",
      description: "Spirometry line chart with hover detail and customizable colors (Chart.js).",
      render: <DSClinicalEmrGraphsDemo />,
      code: `<DSClinicalEmrGraphsDemo />`,
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
            <div className="w-full space-y-1 sm:min-w-64 sm:flex-1">
              <p className="text-xs font-medium text-muted-foreground">Search</p>
              <DSInput placeholder="Search notes" />
            </div>
            <label className="w-full space-y-1 sm:w-auto">
              <p className="text-xs font-medium text-muted-foreground">Filter</p>
              <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none sm:min-w-40 sm:w-auto focus:border-numo-blue-500">
                <option>All Notes</option>
                <option>Video Notes</option>
              </select>
            </label>
            <label className="w-full space-y-1 sm:w-auto">
              <p className="text-xs font-medium text-muted-foreground">Author</p>
              <select className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none sm:min-w-44 sm:w-auto focus:border-numo-blue-500">
                <option>All Authors</option>
                <option>Brian Lauson</option>
                <option>Mariana Krajcik</option>
              </select>
            </label>
            <button
              type="button"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-numo-blue-500 px-4 text-sm font-medium text-white transition hover:bg-numo-blue-600 sm:ml-auto sm:w-auto"
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
      id: "notes-add-button",
      label: "Button",
      title: "Notes Add Button",
      description: "Primary Add note CTA from Notes with icon swap selector.",
      render: <DSNotesAddButtonDemo />,
      code: `<PrimaryBtn>
  <NotebookPen className="h-4 w-4" />
  Add note
</PrimaryBtn>

<SecondaryBtn>
  <NotebookPen className="h-4 w-4" />
  Secondary button
</SecondaryBtn>`,
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
      id: "tablet-buttons",
      label: "Buttons",
      title: "Tablet Buttons",
      description: "Buttons used in the tablet appointment prototype.",
      render: <DSTabletButtonsDemo />,
      code: `<button className="... border-numo-teal-500 ...">Menu</button>
<button className="... border-numo-orange-700 bg-numo-orange-500 ...">Start Check-in</button>
<button className="... rounded-full ..."><CalendarClock /></button>`,
    },
    {
      id: "tablet-custom-icons",
      label: "Custom Icons",
      title: "Tablet Custom Icons",
      description: "SVG icon set from /public/menuicon for tablet surfaces.",
      render: <DSTabletCustomIconsDemo />,
      code: `// 1) Put SVGs in: /public/menuicon
// Example: /public/menuicon/report.svg

// 2) Use with next/image (recommended in Next.js)
import Image from "next/image";

<Image
  src="/menuicon/report.svg"
  alt="Report"
  width={32}
  height={32}
  className="h-8 w-8"
/>;

// 3) Or use plain img (simple fallback)
<img src="/menuicon/report.svg" alt="Report" className="h-8 w-8" />;

// 4) Keep a typed icon map for reuse
const MENU_ICONS = {
  report: "/menuicon/report.svg",
  pulse: "/menuicon/pulse.svg",
  settings: "/menuicon/settings.svg",
} as const;`,
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

  const alphabetical = (a: { label: string }, b: { label: string }) =>
    a.label.localeCompare(b.label);

  const tabletItems = items
    .filter(
      (item) =>
        item.id === "tablet-custom-icons" ||
        item.id === "monitoring-bar" ||
        item.id === "time-selection" ||
        item.id === "tablet-buttons"
    )
    .sort(alphabetical);
  const clinicalItems = items
    .filter(
      (item) =>
        item.id !== "brand-logos" &&
        item.id !== "brand-illustration" &&
        item.id !== "brand-images" &&
        item.id !== "brand-business-card" &&
        item.id !== "tablet-custom-icons" &&
        item.id !== "tablet-buttons" &&
        item.id !== "monitoring-bar" &&
        item.id !== "time-selection"
    )
    .sort(alphabetical);
  const brandItems = items
    .filter(
      (item) =>
        item.id === "brand-logos" ||
        item.id === "brand-illustration" ||
        item.id === "brand-images" ||
        item.id === "brand-business-card"
    )
    .sort(alphabetical);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <DSPage
      title="Components"
      description="Primitives you'll reuse everywhere. Keep these boring, consistent, and token-driven."
      hideDescriptionOnMobile
      hidePageIntro
    >
      

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
        <aside className="mt-8 h-fit rounded-xl border border-border bg-muted/25 p-2 lg:sticky lg:top-24 lg:mt-10">
          <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-foreground">
            Clinical EMR
          </p>
          <nav className="space-y-1">
            {clinicalItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={[
                  "w-full rounded-md px-3 py-2 text-left text-sm text-numo-blue-900 transition",
                  activeId === item.id
                    ? "bg-numo-warm-blue-600 text-white font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-3 border-t border-border pt-3">
            <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              Tablet
            </p>
            <nav className="space-y-1">
              {tabletItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={[
                    "w-full rounded-md px-3 py-2 text-left text-numo-blue-900 text-sm transition",
                    activeId === item.id
                      ? "bg-numo-blue-600 text-white font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-3 border-t border-border pt-3">
            <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-foreground">
              Brand
            </p>
            <nav className="space-y-1">
              {brandItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={[
                    "w-full rounded-md px-3 py-2 pl-6 text-left text-numo-blue-900 text-sm transition",
                    activeId === item.id
                      ? "bg-numo-blue-600 text-white font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <section className="mt-8 w-full max-w-180 space-y-6 rounded-xl px-3 pb-4 pt-2 sm:px-4 md:mt-10 md:space-y-8 lg:mt-16 lg:px-6 lg:pb-6">
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{activeItem.title}</h2>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">{activeItem.description}</p>
          </div>
          <div className="mx-auto w-full max-w-180 min-w-0 overflow-x-auto">{activeItem.render}</div>
          <div className="mx-auto w-full max-w-180 rounded-xl border border-border bg-background p-3 sm:p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Code</p>
            <pre className="overflow-x-auto text-xs leading-6 text-numo-blue-700 dark:text-numo-slate-200">
              <code>{renderCodeWithColor(activeItem.code)}</code>
            </pre>
          </div>
        </section>
      </div>
    </DSPage>
  );
}
