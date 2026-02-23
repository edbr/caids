"use client";

import { motion } from "framer-motion";
import {
  CircleHelp,
  Folder,
  Gauge,
  HeartPulse,
  Home,
  Mail,
  Settings,
} from "lucide-react";

export type MenuIconName =
  | "home"
  | "carePlan"
  | "peakFlow"
  | "pulseOximeter"
  | "messages"
  | "supportHelp"
  | "settings";

type IconProps = {
  name: MenuIconName;
  className?: string;
};

const iconMap = {
  home: Home,
  carePlan: Folder,
  peakFlow: Gauge,
  pulseOximeter: HeartPulse,
  messages: Mail,
  supportHelp: CircleHelp,
  settings: Settings,
} as const;

const floatingTransition = {
  duration: 2.2,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

function iconMotion(name: MenuIconName) {
  switch (name) {
    case "home":
      return { animate: { y: [0, -1.5, 0] }, transition: floatingTransition };
    case "carePlan":
      return { animate: { scale: [1, 1.06, 1] }, transition: floatingTransition };
    case "peakFlow":
      return {
        animate: { rotate: [0, -7, 7, 0] },
        transition: { ...floatingTransition, duration: 2.6 },
      };
    case "pulseOximeter":
      return { animate: { scale: [1, 1.08, 1] }, transition: { ...floatingTransition, duration: 1.6 } };
    case "messages":
      return { animate: { x: [0, 1.8, 0] }, transition: { ...floatingTransition, duration: 2 } };
    case "supportHelp":
      return {
        animate: { rotate: [0, 8, -8, 0] },
        transition: { ...floatingTransition, duration: 2.8 },
      };
    case "settings":
      return {
        animate: { rotate: [0, 360] },
        transition: { duration: 8, repeat: Infinity, ease: "linear" as const },
      };
    default:
      return { animate: undefined, transition: undefined };
  }
}

export function AnimatedMenuIcon({ name, className }: IconProps) {
  const Icon = iconMap[name];
  const motionConfig = iconMotion(name);

  return (
    <motion.span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center"
      animate={motionConfig.animate}
      transition={motionConfig.transition}
      whileHover={{ scale: 1.14 }}
    >
      <Icon className={className ?? "h-5 w-5 text-[#9eeed6]"} strokeWidth={2.25} aria-hidden />
    </motion.span>
  );
}
