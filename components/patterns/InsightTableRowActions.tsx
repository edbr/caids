"use client";

import * as React from "react";
import { Calendar, MessageSquare, Video } from "lucide-react";
import { RowActions, type ActionState } from "@/components/patterns/RowActions";
import { DSConversationModule } from "@/components/ds/conversation-module";
import { PatternVideoCall } from "@/components/patterns/PatternVideoCall";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ALL_ACTION_STATES: ActionState[] = ["default", "disabled", "loading", "success", "danger"];

export function InsightTableRowActions({
  scheduleState = "default",
  messageState = "default",
  videoCallState = "default",
  disabled = false,
  showStateGallery = false,
}: {
  scheduleState?: ActionState;
  messageState?: ActionState;
  videoCallState?: ActionState;
  disabled?: boolean;
  showStateGallery?: boolean;
}) {
  const [resolvedScheduleState, setResolvedScheduleState] = React.useState<ActionState>(scheduleState);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isConversationOpen, setIsConversationOpen] = React.useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("2026-03-07");
  const [selectedTime, setSelectedTime] = React.useState("09:30");

  React.useEffect(() => {
    setResolvedScheduleState(scheduleState);
  }, [scheduleState]);

  const closeConfirmAndMarkScheduled = React.useCallback(() => {
    setIsConfirmOpen(false);
    setResolvedScheduleState("success");
  }, []);

  return (
    <>
      <RowActions
        actions={[
          {
            key: "schedule",
            Icon: Calendar,
            label: "Schedule follow-up",
            state: disabled ? "disabled" : resolvedScheduleState,
            onClick: disabled ? undefined : () => setIsDatePickerOpen(true),
          },
          {
            key: "message",
            Icon: MessageSquare,
            label: "Send SMS",
            state: disabled ? "disabled" : messageState,
            onClick: disabled ? undefined : () => setIsConversationOpen(true),
          },
          {
            key: "video-call",
            Icon: Video,
            label: "Start video call",
            state: disabled ? "disabled" : videoCallState,
            onClick: disabled ? undefined : () => setIsVideoCallOpen(true),
          },
        ]}
      />
      {showStateGallery ? (
        <div className="mt-4 space-y-3 border-t border-border/70 pt-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            All Icon States
          </p>
          <div className="space-y-2">
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground">Calendar</p>
              <RowActions
                actions={ALL_ACTION_STATES.map((state) => ({
                  key: `calendar-${state}`,
                  Icon: Calendar,
                  label: `Schedule follow-up (${state})`,
                  state,
                }))}
              />
            </div>
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground">Message</p>
              <RowActions
                actions={ALL_ACTION_STATES.map((state) => ({
                  key: `message-${state}`,
                  Icon: MessageSquare,
                  label: `Send SMS (${state})`,
                  state,
                }))}
              />
            </div>
            <div className="grid gap-1">
              <p className="text-xs text-muted-foreground">Video</p>
              <RowActions
                actions={ALL_ACTION_STATES.map((state) => ({
                  key: `video-${state}`,
                  Icon: Video,
                  label: `Start video call (${state})`,
                  state,
                }))}
              />
            </div>
          </div>
        </div>
      ) : null}

      {isDatePickerOpen ? (
        <div className="fixed inset-0 z-[140]">
          <div
            className="absolute inset-0 bg-black/30"
            aria-hidden
            onClick={() => setIsDatePickerOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-time-title"
            className="absolute left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-5 shadow-lg"
          >
            <h3 id="schedule-time-title" className="text-base font-semibold text-foreground">
              Select time
            </h3>
            <div className="mt-4 grid gap-3">
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Date</span>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Time</span>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(event) => setSelectedTime(event.target.value)}
                />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDatePickerOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsDatePickerOpen(false);
                  setIsConfirmOpen(true);
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {isConfirmOpen ? (
        <div className="fixed inset-0 z-[140]">
          <div
            className="absolute inset-0 bg-black/30"
            aria-hidden
            onClick={closeConfirmAndMarkScheduled}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-invite-title"
            className="absolute left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-5 shadow-lg"
          >
            <h3 id="calendar-invite-title" className="text-base font-semibold text-foreground">
              Send calendar invite
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Send calendar invite to Carlitos Alcaraz
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedDate} at {selectedTime}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeConfirmAndMarkScheduled}>
                Cancel
              </Button>
              <Button type="button" onClick={closeConfirmAndMarkScheduled}>
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {isConversationOpen ? (
        <div className="fixed inset-0 z-[140]">
          <div
            className="absolute inset-0 bg-black/30"
            aria-hidden
            onClick={() => setIsConversationOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sms-conversation-title"
            className="absolute left-1/2 top-1/2 w-[min(94vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-3 shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 id="sms-conversation-title" className="text-sm font-semibold text-foreground">
                SMS Conversation
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsConversationOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-2">
              <DSConversationModule />
            </div>
          </div>
        </div>
      ) : null}

      {isVideoCallOpen ? (
        <div className="fixed inset-0 z-[140]">
          <div
            className="absolute inset-0 bg-black/40"
            aria-hidden
            onClick={() => setIsVideoCallOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-call-title"
            className="absolute left-1/2 top-1/2 w-[min(96vw,980px)] -translate-x-1/2 -translate-y-1/2"
          >
            <h3 id="video-call-title" className="sr-only">
              Video Call
            </h3>
            <PatternVideoCall onClose={() => setIsVideoCallOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
