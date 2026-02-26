import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
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
  title: "Design System Numo",
  description: "Design system built with Next.js + shadcn",
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
  {children}
</body>
    </html>
  );
}
