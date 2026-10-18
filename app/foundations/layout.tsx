import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/foundations", "Foundations: Colors, Typography & Tokens", "Design foundations for healthcare interfaces, covering color tokens, semantic variables, typography, and reusable visual rules.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
