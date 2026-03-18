"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { InteractionMenu } from "@/components/patterns/InteractionMenu";
import { TabletClock } from "@/components/patterns/TabletClock";

export function HomeMenuDemo() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const firstTick = window.setTimeout(() => setNow(new Date()), 0);
    const id = window.setInterval(() => setNow(new Date()), 1_000);
    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-[28px] border border-[#325362] bg-[#1f3946] shadow-[0_32px_100px_rgba(10,20,28,0.38)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,114,132,0.18),transparent_28%),radial-gradient(circle_at_50%_42%,rgba(112,170,208,0.08),transparent_30%)]" />

      <div className="relative min-h-190 px-8 py-7 sm:px-10 sm:py-9">
        <header className="flex items-start justify-between gap-4">
          <div className="pt-1">
            <Image src="/numoW.svg" alt="Numo logo" width={204} height={56} className="h-9 w-auto sm:h-11" priority />
          </div>

          <div className="flex items-center gap-4">
            <InteractionMenu />
          </div>
        </header>

        <main className="flex min-h-155 flex-col items-center justify-center pb-28 pt-10 text-center">
          <TabletClock value={now} />
        </main>
      </div>
    </div>
  );
}
