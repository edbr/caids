"use client";

import * as React from "react";
import { motion } from "framer-motion";

type TabKey = "reports" | "summary" | "notes" | "spirometry";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "reports", label: "Reports" },
  { key: "summary", label: "Summary" },
  { key: "notes", label: "Notes" },
  { key: "spirometry", label: "Spirometry" },
];

export function PatientRecordTabs({
  activeTab,
  defaultTab = "reports",
  onTabChange,
}: {
  activeTab?: TabKey;
  defaultTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
}) {
  const isControlled = activeTab !== undefined;
  const [internalTab, setInternalTab] = React.useState<TabKey>(defaultTab);
  const currentTab = isControlled ? activeTab : internalTab;
  const tabRefs = React.useRef<Record<TabKey, HTMLButtonElement | null>>({
    reports: null,
    summary: null,
    notes: null,
    spirometry: null,
  });

  function selectTab(next: TabKey) {
    if (!isControlled) setInternalTab(next);
    onTabChange?.(next);
  }

  function moveFocus(current: TabKey, direction: 1 | -1) {
    const idx = TABS.findIndex((t) => t.key === current);
    const nextIdx = (idx + direction + TABS.length) % TABS.length;
    const next = TABS[nextIdx].key;
    tabRefs.current[next]?.focus();
    selectTab(next);
  }

  return (
    <div className="rounded-lg border border-border bg-muted/25 p-1.5">
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="tabs-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="relative inline-flex flex-wrap items-center gap-1"
        role="tablist"
        aria-label="Patient record sections"
        style={{ filter: "url(#tabs-goo)" }}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === currentTab;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[tab.key] = el;
              }}
              type="button"
              onClick={() => selectTab(tab.key)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveFocus(tab.key, 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveFocus(tab.key, -1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  const first = TABS[0].key;
                  tabRefs.current[first]?.focus();
                  selectTab(first);
                } else if (event.key === "End") {
                  event.preventDefault();
                  const last = TABS[TABS.length - 1].key;
                  tabRefs.current[last]?.focus();
                  selectTab(last);
                } else if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectTab(tab.key);
                }
              }}
              className={[
                "relative rounded-md px-3 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
              ].join(" ")}
              role="tab"
              aria-selected={isActive}
              aria-controls={`patient-record-panel-${tab.key}`}
              tabIndex={isActive ? 0 : -1}
            >
              {isActive ? (
                <motion.span
                  layoutId="patient-record-active-pill"
                  className="absolute inset-0 rounded-md bg-numo-yellow-400 shadow-[0_0_0_1px_hsl(var(--numo-yellow-600)/0.1),0_8px_14px_hsl(var(--numo-yellow-900)/0.1)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
                  aria-hidden
                />
              ) : null}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`patient-record-panel-${currentTab}`}
        role="tabpanel"
        aria-label={`${currentTab} content`}
        className="sr-only"
      />
    </div>
  );
}

export type { TabKey };
