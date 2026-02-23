"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
  label: string;
  icon: string; // from /public/menuicon
  badge?: number;
};

const ITEMS: MenuItem[] = [
  { label: "Home", icon: "numo.svg" },
  { label: "Care Plan", icon: "folder.svg", badge: 1 },
  { label: "Peak flow", icon: "peakFlow.svg" },
  { label: "Pulse oximeter", icon: "pulse.svg" },
  { label: "Messages", icon: "mail.svg" },
  { label: "Support help", icon: "help.svg" },
  { label: "Settings", icon: "settings.svg" },
];

export function InteractionMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* MENU BUTTON */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className="
          inline-flex items-center gap-2
          px-6 py-3
          rounded-2xl
          bg-[#0f2a33]
          border-2 border-[#3c9277]
          text-[#69d5b3]
          shadow-[0_0_6px_rgba(72,255,190,0.2)]
          cursor-pointer select-none
        "
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <span className="font-medium text-[22px]">Menu</span>
      </motion.button>

      {/* SLIDING MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute top-0 right-0 mt-16 w-62 space-y-4"
          >
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 12 }}
                transition={{ delay: i * 0.04 }}
              >
                <InteractionMenuItem {...item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InteractionMenuItem({ label, icon, badge }: MenuItem) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-2xl
        border-2 border-[#365b69]
        bg-[#183447]
        px-3.5 py-4
        text-[#f5fbfe]
        shadow-[0_0_8px_rgba(146,226,155,0.15)]
      "
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Image
          src={`/menuicon/${icon}`}
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="h-6 w-6 shrink-0"
        />
        <div className="text-[22px] font-medium leading-[1.2] tracking-[0.01em] text-[#eaf5fb] truncate">
          {label}
        </div>
      </div>

      {typeof badge === "number" ? (
        <span
          className="
            ml-3 inline-flex h-5 min-w-5 items-center justify-center
            rounded-full
            bg-[#ff6c6c]
            px-1.5
            text-[11px] font-semibold leading-none text-white
          "
          aria-label={`${badge} unread`}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}
