import Image from "next/image";
import { Bell, MessageSquare } from "lucide-react";

export function CurieHeader({
  unreadCount = 92,
  notificationsOpen = false,
  onToggleNotifications,
}: {
  unreadCount?: number;
  notificationsOpen?: boolean;
  onToggleNotifications?: () => void;
}) {
  const iconButtonClass =
    "relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted/60";

  return (
    <header className="w-full overflow-hidden rounded-xl bg-transparent">
      <div className="flex items-center justify-between gap-3 px-3 py-2 md:px-4 md:py-2">
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
            <MessageSquare className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={onToggleNotifications}
            className={iconButtonClass}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -left-1 -top-1 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#e4565d] px-1 text-[9px] font-semibold leading-none text-white">
              {unreadCount}
            </span>
          </button>

          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-semibold uppercase text-foreground">
            BL
          </div>

          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-medium text-[#1f2a33]">Briana Lynch</p>
            <p className="truncate text-[11px] text-[#5b6770]">Last Updated: Monday 08:32:56 AM</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
