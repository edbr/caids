"use client";

import * as React from "react";
import { X, RotateCcw } from "lucide-react";
import {
  DSPanel,
  DSPanelBody,
  DSPanelHeader,
  DSPanelSubheader,
  DSPanelTitle,
} from "@/components/ds/panel";
import { DSActionLink } from "@/components/ds/action-link";

type NotificationItem = {
  id: string;
  title: string;
  name: string;
  timeAgo: string;
  read?: boolean;
};

const DEFAULT_ITEMS: NotificationItem[] = [
  { id: "n1", title: "SPO2: 86%, Pulse Rate: 71 bpm", name: "Robert Hansel", timeAgo: "5 min ago", read: false },
  { id: "n2", title: "SPO2: 89%, Pulse Rate: 99 bpm", name: "Joanne Miller", timeAgo: "18 min ago", read: false },
  { id: "n3", title: "SPO2: 88%, Pulse Rate: 84 bpm", name: "Maria Perryman", timeAgo: "45 min ago", read: true },
];

export default function NotificationsPanelDemo() {
  const [items, setItems] = React.useState<NotificationItem[]>(DEFAULT_ITEMS);
  const initialRef = React.useRef<NotificationItem[]>(DEFAULT_ITEMS);

  const reset = () => setItems(initialRef.current);
  const markAllAsRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));
  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={reset}
        className="absolute -top-3 -left-3 z-10 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Reset notifications"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </button>

      <DSPanel className="w-full max-w-140 rounded-xl">
        <DSPanelHeader>
          <DSPanelTitle>Notifications</DSPanelTitle>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close notifications"
          >
            <X className="h-5 w-5" />
          </button>
        </DSPanelHeader>

        <DSPanelSubheader>
          <div className="text-sm font-semibold text-foreground">New</div>
          <DSActionLink onClick={markAllAsRead}>Mark all as read</DSActionLink>
        </DSPanelSubheader>

        <DSPanelBody>
          <div className="overflow-hidden rounded-[18px]">
            {items.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                You’re all caught up.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((n) => (
                  <li key={n.id}>
                    <NotificationRow
                      item={n}
                      longPressMs={520}
                      onDismiss={() => dismiss(n.id)}
                      onMarkRead={() => markRead(n.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </DSPanelBody>
      </DSPanel>
    </div>
  );
}

function NotificationRow({
  item,
  longPressMs,
  onDismiss,
  onMarkRead,
}: {
  item: NotificationItem;
  longPressMs: number;
  onDismiss: () => void;
  onMarkRead: () => void;
}) {
  const timerRef = React.useRef<number | null>(null);
  const [pressing, setPressing] = React.useState(false);
  const [isDismissing, setIsDismissing] = React.useState(false);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startLongPress = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setPressing(true);
    clearTimer();

    timerRef.current = window.setTimeout(() => {
      setIsDismissing(true);
      window.setTimeout(() => onDismiss(), 180);
    }, longPressMs);
  };

  const endLongPress = () => {
    setPressing(false);
    clearTimer();
  };

  const handleClick = () => {
    if (!item.read && !isDismissing) onMarkRead();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      onPointerDown={startLongPress}
      onPointerUp={endLongPress}
      onPointerCancel={endLongPress}
      onPointerLeave={endLongPress}
      title="Press and hold to dismiss"
      className={[
        "relative flex items-start gap-4 px-5 py-3 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        pressing ? "bg-muted/90" : "hover:bg-muted/10",
        "transition-all duration-200 ease-out",
        isDismissing ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
      ].join(" ")}
    >
      <span
        className={[
          "mt-1.5 h-2.5 w-2.5 rounded-full shrink-0",
          item.read ? "bg-muted-foreground/35" : "bg-[hsl(var(--success))]",
        ].join(" ")}
        aria-label={item.read ? "Read" : "Unread"}
      />

      <div className="min-w-0 flex-1">
        <p className="text-[18px] font-semibold leading-snug text-foreground">{item.title}</p>
        <p className="text-[18px] leading-snug text-foreground/90">{item.name}</p>
        <p className="mt-1 text-[16px] leading-snug text-muted-foreground">{item.timeAgo}</p>
      </div>

      <div className="pt-1">
        <span className="inline-flex h-10 w-10 items-center justify-center">
          <img src="/heart.svg" alt="" aria-hidden className="h-8 w-8" />
        </span>
      </div>
    </div>
  );
}
