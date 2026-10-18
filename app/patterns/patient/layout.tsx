import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/patterns/patient", "Patient Experience Patterns", "Patient-facing interaction patterns for monitoring, health information, navigation, and time selection.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
