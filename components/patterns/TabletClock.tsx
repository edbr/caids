"use client";

import { Bluetooth, Wifi } from "lucide-react";

type TabletClockProps = {
  value: Date | null;
  variant?: "default" | "compact";
};

function formatWeekday(value: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(value);
}

function formatMonth(value: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(value);
}

function formatDay(value: Date) {
  return new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(value);
}

function getClockParts(value: Date) {
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");
  const seconds = String(value.getSeconds()).padStart(2, "0");
  return { hours, minutes, seconds };
}

export function TabletClock({ value, variant = "default" }: TabletClockProps) {
  const hours = value ? getClockParts(value).hours : "--";
  const minutes = value ? getClockParts(value).minutes : "--";
  const seconds = value ? getClockParts(value).seconds : "--";
  const weekday = value ? formatWeekday(value) : "Tuesday";
  const month = value ? formatMonth(value) : "June";
  const day = value ? formatDay(value) : "17";
  const isCompact = variant === "compact";

  return (
    <section
      className={[
        "w-full rounded-[38px] border border-[#315360] bg-[linear-gradient(180deg,#162d36_0%,#13262e_100%)] text-white shadow-[0_24px_70px_rgba(8,16,22,0.32)]",
        isCompact ? "max-w-150 px-6 py-6 sm:px-7 sm:py-7" : "max-w-160 px-7 py-7 sm:px-8 sm:py-8",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 text-[1.1rem] tracking-[0.04em] text-[#9ab6c5] sm:text-[1.65rem]">
        <span>{weekday},</span>
        <span>{month}</span>
        <span>{day}</span>
      </div>

      <div className="mt-7 flex items-start gap-4 font-mono leading-none text-[#8bb7d3]">
        <div className="text-[4.3rem] font-light tracking-[-0.08em] sm:text-[6.9rem]">{hours}</div>
        <div className="pt-2 text-[3.9rem] font-extralight -tracking-widest sm:pt-4 sm:text-[6.2rem]">:</div>
        <div className="text-[4.3rem] font-light tracking-[-0.02em] sm:text-[6.9rem]">{minutes}</div>
        <div className="pt-2 text-[1.85rem] font-extralight tracking-[-0.08em] text-[#a8c7d8] sm:pt-4 sm:text-[3.2rem]">
          {seconds}
        </div>
      </div>

      {!isCompact ? (
        <>
          <div className="mt-8 flex items-center justify-between text-base text-[#dcecf3] sm:text-lg">
            <span className="font-mono">Last Night</span>
            <span className="rounded-2xl bg-[#4fc0a4] px-3 py-1 text-sm font-semibold tracking-[0.08em] text-[#12323d] sm:text-base">
              8H 32M
            </span>
          </div>

          <div className="mt-4 rounded-[26px] border border-[#30545f] bg-[#203942] px-4 py-4 text-[#d8edf5] sm:px-6 sm:py-5">
            <div className="mt-3 flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: 64 }).map((_, index) => (
                <span
                  key={index}
                  className={`block h-2.5 w-0.5 rounded-full bg-[#4fc0a4] ${
                    index > 14 && index < 28 ? "opacity-40" : index > 30 && index < 45 ? "opacity-100" : "opacity-70"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-end justify-between">
            <div className="font-mono text-[2.2rem] font-light tracking-[-0.08em] text-[#90b4c3] sm:text-[2.9rem]">
              54°F
            </div>
            <div className="flex items-center gap-4 text-[#62b2b8]">
              <Wifi className="h-7 w-7" strokeWidth={1.8} />
              <Bluetooth className="h-7 w-7" strokeWidth={1.8} />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-[24px] border border-[#30545f] bg-[#203942] px-4 py-4 sm:px-5 sm:py-4.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: 64 }).map((_, index) => (
              <span
                key={index}
                className={`block h-2.5 w-0.5 rounded-full bg-[#4fc0a4] ${
                  index > 14 && index < 28 ? "opacity-40" : index > 30 && index < 45 ? "opacity-100" : "opacity-70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
