"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function NumoLoader3D() {
  return (
    <div className="relative flex min-h-105 items-center justify-center overflow-hidden rounded-[28px] border border-numo-blue-900/10 bg-[radial-gradient(circle_at_top,hsl(var(--background))_0%,hsl(var(--numo-slate-100)/0.92)_42%,hsl(var(--numo-slate-300)/0.72)_72%,hsl(var(--numo-blue-200)/0.42)_100%)] px-6 py-14">
      <motion.div
        aria-hidden
        className="absolute inset-auto h-80 w-[320px] rounded-full bg-[radial-gradient(circle,hsl(var(--numo-orange-500)/0.30),hsl(var(--numo-orange-400)/0.08)_42%,transparent_70%)] blur-2xl"
        animate={{ scale: [0.92, 1.08, 0.96], opacity: [0.75, 1, 0.8] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute h-61 w-61 rounded-full border border-white/60 bg-white/18 shadow-[inset_0_1px_0_hsl(var(--background)/0.8),0_24px_60px_hsl(var(--numo-blue-900))] backdrop-blur-md"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.span
          className="absolute left-1/2 -top-2.5 h-5 w-5 -translate-x-1/2 rounded-full bg-numo-orange-500 shadow-[0_0_18px_hsl(var(--numo-orange-300)/0.85)]"
          animate={{ scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute bottom-5 right-4 h-3.5 w-3.5 rounded-full bg-numo-blue-500/90 shadow-[0_0_12px_hsl(var(--numo-blue-500)/0.65)]"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </motion.div>

      <motion.div
        className="relative z-10"
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        animate={{ rotateY: [0, 12, -10, 0], rotateX: [0, -7, 6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 translate-y-6 scale-[0.98] blur-xl"
          style={{ transform: "translateZ(-60px)" }}
          animate={{ opacity: [0.22, 0.38, 0.24] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/menuicon/numo.svg" alt="" width={170} height={180} className="h-45 w-42.5 opacity-90" />
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute inset-0 scale-[1.04] opacity-30 blur-[2px]"
          style={{ transform: "translateZ(-24px)" }}
          animate={{ opacity: [0.16, 0.34, 0.18] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/menuicon/numo.svg" alt="" width={170} height={180} className="h-45 w-42.5" />
        </motion.div>

        <motion.div
          className="relative flex h-45 w-42.5 items-center justify-center"
          animate={{ y: [0, -10, 0], rotateZ: [0, 1.5, -1.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[32px] bg-white/18 blur-md"
            animate={{ scale: [0.98, 1.03, 0.99], opacity: [0.24, 0.42, 0.24] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <Image
            src="/menuicon/numo.svg"
            alt="Numo loading"
            width={170}
            height={180}
            priority
            className="relative z-10 h-45 w-42.5 drop-shadow-[0_16px_24px_hsl(var(--numo-blue-900)/0.18)]"
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 w-full max-w-[320px] -translate-x-1/2 text-center">
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-numo-blue-900/60"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          
        </motion.p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/45 shadow-[inset_0_1px_1px_hsl(var(--background)/0.75)]">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--numo-blue-500)/0.35),hsl(var(--numo-orange-500)/0.92),hsl(var(--numo-blue-700)/0.45))]"
            animate={{ x: ["-36%", "112%"] }}
            transition={{ duration: 1.75, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
