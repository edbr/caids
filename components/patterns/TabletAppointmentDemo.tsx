"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CalendarClock, Minimize2, Phone } from "lucide-react";
import { MonitoringBarDemo } from "@/components/patterns/MonitoringBarDemo";

type BlobPath = {
  sx: number;
  sy: number;
  ex: number;
  ey: number;
};

export function TabletAppointmentDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const iconRef = React.useRef<HTMLButtonElement | null>(null);

  const [isMinimized, setIsMinimized] = React.useState(false);
  const [travel, setTravel] = React.useState({ x: 0, y: 0 });
  const [showBlob, setShowBlob] = React.useState(false);
  const [blobPath, setBlobPath] = React.useState<BlobPath | null>(null);

  const computeTravel = React.useCallback(() => {
    const cardEl = cardRef.current;
    const iconEl = iconRef.current;
    const shellEl = containerRef.current;
    if (!cardEl || !iconEl || !shellEl) return null;

    const c = cardEl.getBoundingClientRect();
    const i = iconEl.getBoundingClientRect();
    const s = shellEl.getBoundingClientRect();

    const x = i.left + i.width / 2 - (c.left + c.width / 2);
    const y = i.top + i.height / 2 - (c.top + c.height / 2);

    const path: BlobPath = {
      sx: c.left + c.width / 2 - s.left,
      sy: c.top + c.height / 2 - s.top,
      ex: i.left + i.width / 2 - s.left,
      ey: i.top + i.height / 2 - s.top,
    };

    return { x, y, path };
  }, []);

  const handleMinimize = React.useCallback(() => {
    const next = computeTravel();
    if (!next) {
      setIsMinimized(true);
      return;
    }

    setTravel({ x: next.x, y: next.y });
    setBlobPath(next.path);
    setShowBlob(true);
    setIsMinimized(true);

    window.setTimeout(() => setShowBlob(false), 650);
  }, [computeTravel]);

  const handleRestore = React.useCallback(() => {
    setIsMinimized(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-190 overflow-hidden rounded-2xl border border-numo-blue-700/50 p-6 md:p-8 xl:p-10"
      style={{ background: "var(--Nu-blue-500, #203946)" }}
    >
      <svg className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id="goo-tablet">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <header className="relative z-20 flex items-center justify-between gap-4">
        <Image
          src="/numoW.svg"
          alt="Numo"
          width={198}
          height={54}
          priority
          className="h-10 w-auto md:h-12"
        />

        <div className="flex items-center gap-3">
          <button className="font-sans inline-flex h-11 items-center rounded-full border border-numo-teal-500 px-6 font-medium text-2xl text-numo-teal-400 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-numo-teal-500/15">
            Menu
          </button>
          <button
            ref={iconRef}
            onClick={isMinimized ? handleRestore : undefined}
            aria-label="Appointment icon"
            className={[
              "inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all",
              isMinimized
                ? "border-numo-orange-500 bg-numo-orange-500/20 text-numo-orange-400 shadow-[0_0_0_1px_hsl(var(--numo-orange-500)/0.3),0_8px_16px_hsl(var(--numo-orange-900)/0.45)]"
                : "border-numo-slate-700 bg-numo-blue-900/30 text-numo-slate-400",
            ].join(" ")}
          >
            <CalendarClock className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div
        className={[
          "relative z-10 mt-14 grid items-start transition-all duration-500 xl:mt-20",
          isMinimized ? "xl:grid-cols-1" : "xl:grid-cols-[minmax(0,1fr)_410px]",
        ].join(" ")}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className={[
            "text-center",
            isMinimized ? "mx-auto w-full max-w-5xl pl-0" : "pl-2 xl:pl-8",
          ].join(" ")}
        >
          <div className="text-center font-sans text-[120px] font-normal leading-none text-[#82B1C9] ">
            2:14 PM
          </div>
          <div className="mt-3 text-center font-sans text-[36px] font-normal leading-normal text-[#82B1C9] ]">
            September 23, 2022
          </div>
        </motion.div>

        <AnimatePresence initial={false} mode="wait">
          {!isMinimized ? (
            <motion.div
              key="appointment-column"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-102.5 xl:ml-auto"
            >
              <motion.div
                key="appointment-card"
                ref={cardRef}
                initial={{ x: travel.x, y: travel.y, scale: 0.18, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{ x: travel.x, y: travel.y, scale: 0.18, opacity: 0 }}
                transition={{ duration: 0.62, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-3xl border border-numo-blue-600/70 bg-numo-blue-900/55 p-5 text-numo-gray-400 shadow-[0_20px_40px_hsl(var(--numo-blue-900)/0.35)] md:p-6"
              >
                <div className="mb-3.5 flex items-center justify-between border-b border-numo-blue-600/70 pb-3">
                  <h3 className="font-sans text-[28px] leading-[1.02] tracking-tight text-numo-slate-500">
                    Next appointment:
                  </h3>
                  <button
                    onClick={handleMinimize}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-numo-blue-500 text-numo-slate-500 transition-colors hover:bg-numo-blue-600/25"
                    aria-label="Minimize appointment"
                  >
                    <Minimize2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                <p className="font-sans text-[26px] font-medium leading-tight tracking-tight text-numo-orange-400">
                  Apr 01, 2023, 3:00 PM
                </p>

                <button className="mt-4.5 inline-flex rounded-full border border-numo-orange-700 bg-numo-orange-500 px-5 py-2 font-sans text-[20px] font-semibold leading-none tracking-tight text-numo-blue-900 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-numo-orange-700/90">
                  Start Check-in
                </button>

                <div className="mt-6.5 font-sans">
                  <div className="mt-1.5 inline-flex items-center gap-2.5 text-[20px] leading-tight tracking-tight text-numo-slate-500">
                    <Phone className="h-5 w-5 " />
                    (480)336-2774
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 w-[min(1080px,calc(100%-2rem))] -translate-x-1/2">
        <MonitoringBarDemo />
      </div>

      {showBlob && blobPath ? (
        <div className="pointer-events-none absolute inset-0 z-30" style={{ filter: "url(#goo-tablet)" }}>
          <motion.div
            initial={{ x: blobPath.sx - 24, y: blobPath.sy - 24, opacity: 0.95, scale: 1 }}
            animate={{ x: blobPath.ex - 20, y: blobPath.ey - 20, opacity: 0.35, scale: 0.78 }}
            transition={{ duration: 0.62, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute h-12 w-12 rounded-full bg-numo-orange-500/80"
          />
          <motion.div
            initial={{ x: blobPath.sx - 18, y: blobPath.sy - 18, opacity: 0.8, scale: 1 }}
            animate={{ x: blobPath.ex - 16, y: blobPath.ey - 16, opacity: 0.2, scale: 0.55 }}
            transition={{ duration: 0.62, ease: [0.18, 0.78, 0.2, 1] }}
            className="absolute h-9 w-9 rounded-full bg-numo-orange-400/90"
          />
        </div>
      ) : null}
    </div>
  );
}
