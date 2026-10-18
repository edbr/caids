import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/numo-home", "Clinical Dashboard Prototype", "A healthcare dashboard prototype combining clinical insights, actionable patient tables, and notifications.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
