import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/prototype-login", "Healthcare Login Prototype", "Explore the login experience prototype in the Curie + Numo clinical design language.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
