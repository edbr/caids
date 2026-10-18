import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/prototype-patient", "Patient Record Prototype", "A clinical patient record prototype combining reports, notes, monitoring, and record navigation.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
