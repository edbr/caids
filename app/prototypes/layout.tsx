import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/prototypes", "Healthcare Interface Prototypes", "Explore healthcare interface prototypes combining design system components into clinical and patient workflows.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
