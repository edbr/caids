"use client";

import Image from "next/image";

const TABLET_ICONS = [
  { name: "folder", src: "/menuicon/folder.svg" },
  { name: "help", src: "/menuicon/help.svg" },
  { name: "mail", src: "/menuicon/mail.svg" },
  { name: "numo", src: "/menuicon/numo.svg" },
  { name: "peakFlow", src: "/menuicon/peakFlow.svg" },
  { name: "pulse", src: "/menuicon/pulse.svg" },
  { name: "report", src: "/menuicon/report.svg" },
  { name: "settings", src: "/menuicon/settings.svg" },
];

export function DSTabletCustomIconsDemo() {
  return (
    <div className="rounded-xl border border-border bg-numo-blue-800 p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {TABLET_ICONS.map((icon) => (
          <div
            key={icon.name}
            className="rounded-lg border border-numo-blue-700 bg-numo-blue-900/35 p-3 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              <Image src={icon.src} alt={icon.name} width={32} height={32} className="h-8 w-8" />
            </div>
            <p className="mt-2 text-[11px] text-numo-slate-400">{icon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
