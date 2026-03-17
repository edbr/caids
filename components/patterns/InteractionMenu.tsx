"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type MenuItem = {
  label: string;
  description: string;
  badge?: string;
  icon: string;
};

const ITEMS: MenuItem[] = [
  { label: "Home", description: "Return to your dashboard", icon: "numo.svg" },
  { label: "Care plan", description: "Review tasks and reminders", badge: "1", icon: "folder.svg" },
  { label: "Peak flow", description: "Log a reading in under a minute", icon: "peakFlow.svg" },
  { label: "Pulse oximeter", description: "Check your latest reading", icon: "pulse.svg" },
  { label: "Messages", description: "Open today's care team note", badge: "2", icon: "mail.svg" },
  { label: "Support", description: "Get help with device setup", icon: "help.svg" },
  { label: "Settings", description: "Manage notifications and devices", icon: "settings.svg" },
] as const;

export function InteractionMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((value) => !value)}
        className="font-sans inline-flex h-11 items-center rounded-full border border-numo-teal-500 px-6 py-6 font-medium text-2xl text-numo-teal-400 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] transition-colors hover:bg-numo-teal-500/15"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        Menu
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute right-0 top-[calc(100%+16px)] z-20 w-[min(86vw,340px)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-3 -top-2 h-28 rounded-full"
            />

            <div className="relative p-3 text-white ">
              <div className="mt-3 space-y-2">
                {ITEMS.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex w-full items-center justify-between gap-3 rounded-[22px] border border-[#325762] bg-[#223a44] px-4 py-3 text-left transition-colors hover:bg-[#2e4d59]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-3xl">
                        <Image
                          src={`/menuicon/${item.icon}`}
                          alt=""
                          width={32}
                          height={32}
                          aria-hidden
                          className="h-7 w-7 object-contain"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[22px] font-semibold tracking-[0.03em] text-[#eff7fb]">
                          {item.label}
                        </span>
                      </span>
                    </span>

                    <span className="flex items-center gap-2">
                      {item.badge ? (
                        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[#ff6973] px-2 py-1 text-[11px] font-semibold text-white">
                          {item.badge}
                        </span>
                      ) : null}
                      <ChevronRight className="h-4 w-4 text-[#7fa5b3]" />
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
