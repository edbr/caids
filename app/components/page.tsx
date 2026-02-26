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
import { Calendar, MessageSquare, NotebookPen, Pencil, Share2, Video, X } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ComponentsPage() {
  return (
    <DSPage
      title="Components"
      description="Primitives you’ll reuse everywhere. Keep these boring, consistent, and token-driven."
    >
      <div className="flex justify-end">
        <Image
          src="/numoLogo.svg"
          alt="Numo"
          width={176}
          height={48}
          className="h-10 w-auto"
          priority
        />
      </div>

      <Section title="IconButton" description="Compact action affordance with tooltip + state ring.">
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
      </Section>

      <section className="space-y-4">
  <h2 className="text-lg font-semibold">Actionable Insight Actions</h2>
  <p className="text-sm text-muted-foreground">
    Icons + state badges pulled from the Insight Table actions.
  </p>
  <TooltipProvider delayDuration={200}>
    <div className="rounded-xl border border-border bg-card p-4">
      <RowActions actions={INSIGHT_ACTIONS} />
    </div>
  </TooltipProvider>
</section>

      <Section title="Panel" description="Standard container for cards, drawers, and structured content blocks.">
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
      </Section>

      <Section title="Input" description="DS-owned input styling; used by editable cards and search.">
        <div className="max-w-md space-y-3">
          <DSInput placeholder="Add diagnosis" />
          <DSInput placeholder="Search patients…" />
        </div>
      </Section>

      <Section
        title="Notes (Simplified)"
        description="Core note controls: search, filters, add-note CTA, and compact note actions."
      >
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
            <p className="mt-1 text-sm text-numo-slate-800">
              Patient reports increased cough overnight with mild wheeze after exertion.
            </p>
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
      </Section>

      <Section title="ActionLink" description="Text-only secondary actions.">
        <div className="flex items-center gap-6">
          <DSActionLink onClick={() => {}}>Mark all as read</DSActionLink>
          <DSActionLink onClick={() => {}}>Reset</DSActionLink>
        </div>
      </Section>
    </DSPage>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl  bg-muted/30 p-6 space-y-4 ">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="rounded-xl p-4">
        {children}
      </div>
    </section>
  );
}
