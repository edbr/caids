import { pageMetadata } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata = pageMetadata("/tablet-appointment", "Tablet Appointment Prototype", "An interactive appointment prototype exploring healthcare scheduling and navigation on tablets.");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
