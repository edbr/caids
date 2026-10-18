import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { person, site, socialImage } from "@/lib/site";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Curie + Numo Design System" },
  description: site.description,
  authors: [{ name: person.name, url: person.url }],
  creator: person.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body
  className={[
    robotoSans.variable,
    robotoMono.variable,
    "antialiased",
    "min-h-dvh",
    "bg-background",
    "text-foreground",
  ].join(" ")}
>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        person,
        {
          "@type": "WebSite",
          "@id": `${site.url}/#website`,
          name: site.name,
          url: `${site.url}/`,
          description: site.description,
          author: { "@id": person["@id"] },
        },
        {
          "@type": "CreativeWork",
          "@id": `${site.url}/#design-system`,
          name: site.name,
          url: `${site.url}/`,
          description: site.description,
          creator: { "@id": person["@id"] },
          subjectOf: {
            "@type": "WebPage",
            url: site.writeupUrl,
            name: "Healthcare design system case study",
          },
        },
      ],
    }).replace(/</g, "\\u003c") }}
  />
  {children}
</body>
    </html>
  );
}
