"use client";

import { Minimize2, Phone } from "lucide-react";

type NextAppointmentCardProps = {
  onMinimize?: () => void;
  className?: string;
};

export function NextAppointmentCard({ onMinimize, className }: NextAppointmentCardProps) {
  return (
    <div
      className={[
        "rounded-3xl border border-numo-blue-600/70 bg-numo-blue-900/55 p-4 text-numo-gray-400 shadow-[0_20px_40px_hsl(var(--numo-blue-900)/0.35)] sm:p-5 md:p-6",
        className ?? "",
      ].join(" ")}
    >
      <div className="mb-3.5 flex items-center justify-between border-b border-numo-blue-600/70 pb-3">
        <h3 className="font-sans text-[22px] leading-[1.02] tracking-tight text-numo-slate-500 sm:text-[24px] md:text-[28px]">
          Next appointment:
        </h3>
        {onMinimize ? (
          <button
            onClick={onMinimize}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-numo-blue-500 text-numo-slate-500 transition-colors hover:bg-numo-blue-600/25"
            aria-label="Minimize appointment"
          >
            <Minimize2 className="h-4.5 w-4.5" />
          </button>
        ) : null}
      </div>

      <p className="font-sans text-[21px] font-medium leading-tight tracking-tight text-numo-orange-400 sm:text-[23px] md:text-[26px]">
        Apr 01, 2023, 3:00 PM
      </p>

      <button className="mt-4 inline-flex rounded-full border border-numo-orange-700 bg-numo-orange-500 px-4 py-2 font-sans text-[17px] font-semibold leading-none tracking-tight text-numo-blue-900 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-colors hover:bg-numo-orange-700/90 sm:mt-4.5 sm:px-5 sm:text-[20px]">
        Start Check-in
      </button>

      <div className="mt-6.5 font-sans">
        <div className="mt-1.5 inline-flex items-center gap-2.5 text-[17px] leading-tight tracking-tight text-numo-slate-500 sm:text-[18px] md:text-[20px]">
          <Phone className="h-5 w-5" />
          (480)336-2774
        </div>
      </div>
    </div>
  );
}
