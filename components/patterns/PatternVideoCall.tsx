"use client";

import * as React from "react";
import {
  FileText,
  ListChecks,
  Mic,
  MicOff,
  NotebookPen,
  Power,
  Video,
  VideoOff,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PatternVideoCall({
  patientName = "Carlitos Alcaraz",
  onClose,
}: {
  patientName?: string;
  onClose: () => void;
}) {
  const [videoOn, setVideoOn] = React.useState(true);
  const [muted, setMuted] = React.useState(false);
  const [backgroundOn, setBackgroundOn] = React.useState(true);
  const [sessionOn, setSessionOn] = React.useState(true);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[#0f1720] text-white shadow-md">
      <div className="relative h-110">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2d4158_0%,#0f1720_60%)]" />
        <div className="absolute left-4 top-4 rounded-md bg-black/40 px-2 py-1 text-xs font-medium">
          Patient: {patientName}
        </div>
        <div className="absolute left-1/2 top-1/2 w-[94%] max-w-180 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-sm">
          <div className="aspect-video rounded-lg border border-white/10 bg-[linear-gradient(135deg,#182635,#0f1720)]" />
          <div className="mt-2 text-center text-xs text-white/70">Two-way video stream</div>
        </div>

        <div className="absolute right-4 top-4 w-36 rounded-lg border border-white/15 bg-black/35 p-2 backdrop-blur-sm">
          <div className="aspect-video rounded-md border border-white/15 bg-[linear-gradient(135deg,#1f2f42,#182635)]" />
          <p className="mt-1 text-center text-[10px] text-white/75">You</p>
        </div>

        <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] max-w-215 -translate-x-1/2 rounded-xl border border-white/15 bg-black/45 p-3 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <DockButton label="Report" Icon={FileText} />
              <DockButton label="Summary" Icon={ListChecks} />
              <DockButton label="Notes" Icon={NotebookPen} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DockButton
                label={videoOn ? "Hide video" : "Show video"}
                Icon={videoOn ? Video : VideoOff}
                active={videoOn}
                onClick={() => setVideoOn((value) => !value)}
              />
              <DockButton
                label={muted ? "Unmute" : "Mute"}
                Icon={muted ? MicOff : Mic}
                active={!muted}
                onClick={() => setMuted((value) => !value)}
              />
              <DockButton
                label={backgroundOn ? "Background on" : "Background off"}
                Icon={WandSparkles}
                active={backgroundOn}
                onClick={() => setBackgroundOn((value) => !value)}
              />
              <DockButton
                label={sessionOn ? "Turn off" : "Turn on"}
                Icon={Power}
                active={sessionOn}
                onClick={() => setSessionOn((value) => !value)}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DockButton({
  label,
  Icon,
  active = true,
  onClick,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition",
        active
          ? "border-white/20 bg-white/12 text-white hover:bg-white/18"
          : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10",
      ].join(" ")}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
