import Image from "next/image";
import { Bell, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

export function CurieHeader({
  unreadCount = 92,
  notificationsOpen = false,
  onToggleNotifications,
  notificationPanel,
  showMobilePreview = false,
}: {
  unreadCount?: number;
  notificationsOpen?: boolean;
  onToggleNotifications?: () => void;
  notificationPanel?: ReactNode;
  showMobilePreview?: boolean;
}) {
  const iconButtonClass =
    "relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted/60";

  return (
    <header className="w-full overflow-visible border-b border-numo-slate-300 shadow-xs bg-numo-slate-400/10">
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

      {showMobilePreview ? (
        <div className="px-3 pb-2 pt-6 md:px-6">
          <p className="mb-2 py-4 pt-12 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Mobile Preview
          </p>
          <div className="mx-auto w-full max-w-95 rounded-2xl bg-background p-2.5">
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-3 py-2">
              <Image
                src="/Curie_AI_logo.svg"
                alt="Curie AI"
                width={180}
                height={24}
                className="h-8 w-auto"
              />
              <div className="flex items-center gap-1.5 text-[#4e5c67]">
                <button type="button" aria-label="Messages (mobile)" className={iconButtonClass}>
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Notifications (mobile)" className={iconButtonClass}>
                  <Bell className="h-4 w-4" />
                  <span className="absolute -left-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e4565d] px-1 text-[8px] font-semibold leading-none text-white">
                    {unreadCount}
                  </span>
                </button>
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/30 text-xs font-semibold uppercase text-foreground">
                  BL
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
