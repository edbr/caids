import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/patterns/clinical", "Clinical Workflow Patterns", "Reusable healthcare UX patterns for clinical insights, patient monitoring, notifications, notes, and patient reports.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
