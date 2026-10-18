import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/oauth/consent", "OAuth Consent Preview", "Preview of the OAuth consent flow within the Curie + Numo design system.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
