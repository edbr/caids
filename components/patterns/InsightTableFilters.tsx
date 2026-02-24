"use client";

import * as React from "react";
import { Building2, Filter, TriangleAlert } from "lucide-react";

export type RiskFilter = "all" | "high" | "moderate" | "low";

type InsightTableFiltersProps = {
  risk: RiskFilter;
  clinic: string;
  abnormalVitalsOnly: boolean;
  clinics: string[];
  onRiskChange: (value: RiskFilter) => void;
  onClinicChange: (value: string) => void;
  onAbnormalVitalsOnlyChange: (value: boolean) => void;
  onClear: () => void;
};

const RISK_OPTIONS: Array<{ value: RiskFilter; label: string }> = [
  { value: "all", label: "All risks" },
  { value: "high", label: "High" },
  { value: "moderate", label: "Moderate" },
  { value: "low", label: "Low" },
];

export function InsightTableFilters({
  risk,
  clinic,
  abnormalVitalsOnly,
  clinics,
  onRiskChange,
  onClinicChange,
  onAbnormalVitalsOnlyChange,
  onClear,
}: InsightTableFiltersProps) {
  const hasActiveFilter = risk !== "all" || clinic !== "all" || abnormalVitalsOnly;

  return (
    <div className="mb-3 rounded-lg border border-border bg-background/80 px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          Filter patients
        </div>

        <label className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs">
          <span className="text-muted-foreground">Risk</span>
          <select
            aria-label="Filter by risk"
            value={risk}
            onChange={(e) => onRiskChange(e.target.value as RiskFilter)}
            className="bg-transparent text-foreground outline-none"
          >
            {RISK_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs">
          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Clinic</span>
          <select
            aria-label="Filter by clinic"
            value={clinic}
            onChange={(e) => onClinicChange(e.target.value)}
            className="bg-transparent text-foreground outline-none"
          >
            <option value="all">All clinics</option>
            {clinics.map((clinicName) => (
              <option key={clinicName} value={clinicName}>
                {clinicName}
              </option>
            ))}
          </select>
        </label>

        <label className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground">
          <input
            type="checkbox"
            checked={abnormalVitalsOnly}
            onChange={(e) => onAbnormalVitalsOnlyChange(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-border accent-[hsl(var(--ds-danger))]"
          />
          <TriangleAlert className="h-3.5 w-3.5 text-[hsl(var(--ds-danger))]" />
          Abnormal vitals only
        </label>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilter}
          className="ml-auto rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
