import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/notes", "Clinical Notes Prototype", "Explore clinical note interactions for browsing, filtering, adding, and editing notes.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
