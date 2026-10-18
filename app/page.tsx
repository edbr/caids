import type { Metadata } from "next";
import HomeContent from "./HomeContent";
import { site, socialImage } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
};

export default function Home() {
  return <HomeContent />;
}
