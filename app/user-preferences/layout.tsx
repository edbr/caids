import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/user-preferences", "User Preferences Prototype", "Explore user preference and account settings interactions within the healthcare login workflow.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
