import type { Metadata } from "next";

export const site = {
  name: "Curie + Numo Design System",
  url: "https://lungds.edbelluti.com",
  title: "Curie + Numo Healthcare Design System | Eduardo Belluti",
  description:
    "Explore Eduardo Belluti’s healthcare design system: reusable React components, design tokens, clinical workflows, and patient experience patterns.",
  writeupUrl: "https://eduardobelluti.com/projects/ds/lungds",
};

export const person = {
  "@type": "Person",
  "@id": "https://eduardobelluti.com/#person",
  name: "Eduardo Belluti",
  url: "https://eduardobelluti.com/",
  sameAs: ["https://www.linkedin.com/in/edbelluti/", "https://github.com/edbr"],
};

export const socialImage = {
  url: "/clinical.webp",
  alt: "Curie + Numo healthcare interface design system",
};

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export const patternPaths = [
  "/patterns/clinical/curie-app-header",
  "/patterns/clinical/ai-signal-insights",
  "/patterns/clinical/night-monitoring",
  "/patterns/clinical/numo-3d-loader",
  "/patterns/clinical/notifications-panel",
  "/patterns/clinical/row-actions",
  "/patterns/clinical/actionable-insight-table",
  "/patterns/clinical/notes",
  "/patterns/clinical/always-on-patient-panel",
  "/patterns/clinical/patient-reports-dashboard",
  "/patterns/patient/monitoring-bar-contextual-menu",
  "/patterns/patient/patient-time-selection-multi-select",
  "/patterns/patient/home-menu-overlay",
  "/patterns/patient/my-health"
];
