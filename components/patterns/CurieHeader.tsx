import Image from "next/image";
import { Bell, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

export function CurieHeader({
  unreadCount = 92,
  notificationsOpen = false,
  onToggleNotifications,
  notificationPanel,
}: {
  unreadCount?: number;
  notificationsOpen?: boolean;
  onToggleNotifications?: () => void;
  notificationPanel?: ReactNode;
}) {
  const iconButtonClass =
    "relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted/60";

  return (
    <header className="w-full overflow-visible rounded-xl bg-transparent">
      <div className="flex items-center justify-between gap-3 px-3 py-2 md:px-6 md:py-2">
        <div className="flex min-w-0 items-center">
          <Image
            src="/Curie_AI_logo.svg"
            alt="Curie AI"
            width={320}
            height={34}
            className="h-16 w-auto"
            priority
          />
        </div>

        <nav className="flex items-center gap-2 text-[#4e5c67]">
          <button type="button" aria-label="Messages" className={iconButtonClass}>
            <MessageSquare className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={onToggleNotifications}
              className={iconButtonClass}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -left-0.5 -top-0.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#e4565d] px-1 text-[9px] font-semibold leading-none text-white">
                {unreadCount}
              </span>
            </button>

            {notificationsOpen && notificationPanel ? (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-500 w-lg max-w-[calc(100vw-2rem)]">
                {notificationPanel}
              </div>
            ) : null}
          </div>

          <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/30 text-sm font-semibold uppercase text-foreground">
            BL
          </div>
        </nav>
      </div>
    </header>
  );
}
