import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/patterns", "Healthcare UX Patterns", "Explore clinical and patient experience patterns in the Curie + Numo healthcare design system.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
