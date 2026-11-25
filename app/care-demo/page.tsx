import type { Metadata } from "next";
import { CareDemo } from "./care-demo";

export const metadata: Metadata = { title: "Your first two weeks" };
export const dynamic = "force-dynamic";

export default function CareDemoPage() {
  return <CareDemo mock={process.env.CARE_DEMO_MOCK === "1"} />;
}
