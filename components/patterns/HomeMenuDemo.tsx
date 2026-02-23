"use client";

import Image from "next/image";
import { InteractionMenu } from "@/components/patterns/InteractionMenu";

export function HomeMenuDemo() {
  return (
    <div className="relative w-full mx-auto">
      <Image
        src="/Home-monitoringpause.webp"
        alt="Home screen"
        width={1600}
        height={1000}
        priority
        className="w-full h-auto rounded-xl border border-border"
      />

      <div className="absolute flex items-center gap-3" style={{ top: 32, right: 18 }}>
        <InteractionMenu />
      </div>
    </div>
  );
}
