export type PatternRoute = {
  href: `/patterns/${string}`;
  title: string;
  description: string;
  type: string;
  children: Array<{
    title: string;
    href: `/patterns/${string}/${string}`;
  }>;
};

export const PATTERN_ROUTES: PatternRoute[] = [
  {
    href: "/patterns/clinical",
    title: "Clinical Patterns",
    description: "",
    type: "Clinical",
    children: [
      { title: "Actionable Insight Table", href: "/patterns/clinical/actionable-insight-table" },
      { title: "AI Signal Insights", href: "/patterns/clinical/ai-signal-insights" },
      { title: "Always-On Patient Panel", href: "/patterns/clinical/always-on-patient-panel" },
      { title: "Curie App Header", href: "/patterns/clinical/curie-app-header" },
      { title: "Night Monitoring", href: "/patterns/clinical/night-monitoring" },
      { title: "Numo 3D Loader", href: "/patterns/clinical/numo-3d-loader" },
      { title: "Notes", href: "/patterns/clinical/notes" },
      { title: "Notifications Panel", href: "/patterns/clinical/notifications-panel" },
      { title: "Patient Reports Dashboard", href: "/patterns/clinical/patient-reports-dashboard" },
      { title: "Row Actions", href: "/patterns/clinical/row-actions" },
    ],
  },
  {
    href: "/patterns/patient",
    title: "Patient Patterns",
    description: "",
    type: "Patient",
    children: [
      { title: "Home Menu Overlay", href: "/patterns/patient/home-menu-overlay" },
      { title: "Monitoring Bar + Contextual Menu", href: "/patterns/patient/monitoring-bar-contextual-menu" },
      { title: "Patient Time Selection (Multi-select)", href: "/patterns/patient/patient-time-selection-multi-select" },
    ],
  },
];

export function getPatternNeighbors(currentHref: PatternRoute["href"]) {
  const index = PATTERN_ROUTES.findIndex((pattern) => pattern.href === currentHref);
  if (index < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? PATTERN_ROUTES[index - 1]! : null,
    next: index < PATTERN_ROUTES.length - 1 ? PATTERN_ROUTES[index + 1]! : null,
  };
}

export function getChildNeighbors(
  patternHref: PatternRoute["href"],
  currentChildHref: PatternRoute["children"][number]["href"]
) {
  const pattern = PATTERN_ROUTES.find((item) => item.href === patternHref);
  if (!pattern) {
    return { previous: null, next: null };
  }

  const index = pattern.children.findIndex((child) => child.href === currentChildHref);
  if (index < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? pattern.children[index - 1]! : null,
    next: index < pattern.children.length - 1 ? pattern.children[index + 1]! : null,
  };
}
