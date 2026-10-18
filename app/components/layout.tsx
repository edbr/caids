import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/components", "React Component Library", "Explore reusable healthcare interface components, including inputs, buttons, conversations, and clinical data visualizations.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
