"use client";

import * as React from "react";

declare global {
  interface Window {
    Chart?: {
      new (ctx: CanvasRenderingContext2D, config: unknown): {
        destroy: () => void;
      };
    };
  }
}

const LABELS = ["10/23", "10/26", "10/29", "11/01", "11/04", "11/07"];

const SERIES = {
  spo2: [96, 97, 95, 94, 95, 96],
  pulse: [78, 82, 85, 91, 88, 84],
};

const RADIAL_PATIENTS = ["Brian L.", "Mia C.", "Daniel R.", "Ava S.", "Noah T."];
const RADIAL_SERIES = {
  minutesTracked: [142, 124, 98, 160, 116],
  symptoms: [28, 42, 35, 22, 39],
  patientHealth: [86, 72, 78, 90, 75],
};

const TOKEN_COLOR_VARS = {
  orange600: "--numo-orange-600",
  teal600: "--numo-teal-600",
  orange400: "--numo-orange-400",
  slate500: "--numo-slate-500",
  blue600: "--numo-blue-600",
  red600: "--numo-red-600",
  yellow600: "--numo-yellow-600",
} as const;

type TokenKey = keyof typeof TOKEN_COLOR_VARS;

function resolveTokenToCanvasColor(token: TokenKey) {
  if (typeof window === "undefined") return "#000000";
  const varName = TOKEN_COLOR_VARS[token];
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!raw) return "#000000";
  return `hsl(${raw})`;
}

export function DSClinicalEmrGraphsDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<{ destroy: () => void } | null>(null);
  const radialCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const radialChartRef = React.useRef<{ destroy: () => void } | null>(null);
  const [tokens, setTokens] = React.useState<{
    spo2: TokenKey;
    pulse: TokenKey;
  }>({
    spo2: "teal600",
    pulse: "orange600",
  });
  const colors = React.useMemo(
    () => ({
      spo2: resolveTokenToCanvasColor(tokens.spo2),
      pulse: resolveTokenToCanvasColor(tokens.pulse),
    }),
    [tokens]
  );
  const metricColors = React.useMemo(
    () => ({
      minutesTracked: resolveTokenToCanvasColor("teal600"),
      symptoms: resolveTokenToCanvasColor("orange600"),
      patientHealth: resolveTokenToCanvasColor("blue600"),
    }),
    []
  );

  React.useEffect(() => {
    let cancelled = false;

    const ensureChartScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.Chart) {
          resolve();
          return;
        }

        const existing = document.querySelector("script[data-chartjs='true']") as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("Failed to load Chart.js")), {
            once: true,
          });
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.6/dist/chart.umd.min.js";
        script.async = true;
        script.dataset.chartjs = "true";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Chart.js"));
        document.head.appendChild(script);
      });

    const create = async () => {
      try {
        await ensureChartScript();
        if (cancelled || !canvasRef.current || !window.Chart) return;

        const Chart = window.Chart;
        const ctx = canvasRef.current.getContext("2d");
        const radialCtx = radialCanvasRef.current?.getContext("2d");
        if (!ctx || !radialCtx || !Chart) return;

        chartRef.current?.destroy();
        radialChartRef.current?.destroy();

        chartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: LABELS,
            datasets: [
              {
                label: "Oxygen saturation (SpO2)",
                data: SERIES.spo2,
                borderColor: colors.spo2,
                backgroundColor: colors.spo2,
                pointRadius: 3,
                tension: 0.35,
                yAxisID: "y",
              },
              {
                label: "Pulse",
                data: SERIES.pulse,
                borderColor: colors.pulse,
                backgroundColor: colors.pulse,
                pointRadius: 2,
                tension: 0.35,
                yAxisID: "y1",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: {
                position: "bottom",
                labels: { usePointStyle: true, boxWidth: 6, boxHeight: 6, padding: 14 },
              },
              tooltip: {
                callbacks: {
                  label: (context: { dataset: { label: string }; formattedValue: string }) => {
                    const unit = context.dataset.label.includes("SpO2") ? "%" : " bpm";
                    return `${context.dataset.label}: ${context.formattedValue}${unit}`;
                  },
                },
              },
            },
            scales: {
              y: {
                min: 85,
                max: 100,
                title: { display: true, text: "SpO2 (%)" },
                grid: { display: false },
                border: { display: true, color: "rgba(30, 41, 59, 0.15)", width: 1 },
                ticks: { color: "rgba(30, 41, 59, 0.8)" },
              },
              y1: {
                min: 50,
                max: 130,
                position: "right",
                title: { display: true, text: "Pulse (bpm)" },
                grid: { drawOnChartArea: false },
                border: { display: true, color: "rgba(30, 41, 59, 0.15)", width: 1 },
                ticks: { color: "rgba(30, 41, 59, 0.8)" },
              },
              x: {
                grid: {
                  display: true,
                  color: "rgba(30, 41, 59, 0.22)",
                  borderDash: [5, 5],
                  lineWidth: 1,
                },
                border: { display: true, color: "rgba(30, 41, 59, 0.15)", width: 1 },
                ticks: { color: "rgba(30, 41, 59, 0.8)" },
              },
            },
          },
        });

        radialChartRef.current = new Chart(radialCtx, {
          type: "bar",
          data: {
            labels: RADIAL_PATIENTS,
            datasets: [
              {
                label: "Minutes tracked",
                data: RADIAL_SERIES.minutesTracked,
                backgroundColor: metricColors.minutesTracked,
                borderColor: metricColors.minutesTracked,
                borderWidth: 1,
                borderRadius: 6,
              },
              {
                label: "Symptoms",
                data: RADIAL_SERIES.symptoms,
                backgroundColor: metricColors.symptoms,
                borderColor: metricColors.symptoms,
                borderWidth: 1,
                borderRadius: 6,
              },
              {
                label: "Patient health",
                data: RADIAL_SERIES.patientHealth,
                backgroundColor: metricColors.patientHealth,
                borderColor: metricColors.patientHealth,
                borderWidth: 1,
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true,
              animateScale: true,
            },
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: 180,
                grid: { color: "rgba(30, 41, 59, 0.15)" },
                ticks: { color: "rgba(30, 41, 59, 0.8)" },
              },
              x: {
                grid: { display: false },
                ticks: { color: "rgba(30, 41, 59, 0.8)" },
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: { boxWidth: 10, boxHeight: 10, padding: 14 },
              },
              tooltip: {
                callbacks: {
                  label: (context: { dataset: { label: string }; label: string; formattedValue: string }) => {
                    const unit = context.dataset.label === "Minutes tracked" ? " min" : "%";
                    return `${context.label}: ${context.dataset.label} ${context.formattedValue}${unit}`;
                  },
                },
              },
            },
          },
        });
      } catch {
        // Keep silent fallback: empty canvas if Chart.js CDN is unavailable.
      }
    };

    create();

    return () => {
      cancelled = true;
      chartRef.current?.destroy();
      chartRef.current = null;
      radialChartRef.current?.destroy();
      radialChartRef.current = null;
    };
  }, [colors, metricColors]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <ColorControl
          label="SpO2"
          value={tokens.spo2}
          onChange={(value) => setTokens((c) => ({ ...c, spo2: value }))}
        />
        <ColorControl
          label="Pulse"
          value={tokens.pulse}
          onChange={(value) => setTokens((c) => ({ ...c, pulse: value }))}
        />
      </div>

      <div className="rounded-xl border border-border bg-background p-3">
        <p className="mb-2 text-sm font-semibold text-foreground">PULSE OXIMETER TRENDS</p>
        <div className="h-76">
          <canvas ref={canvasRef} />
        </div>
        <ChartCodeNotes
          title="Code notes: Spirometry line chart"
          steps={[
            "Load Chart.js once (CDN script or npm package).",
            "Use `type: \"line\"` with 2 datasets (SpO2 and Pulse).",
            "Keep Y border solid and X grid dashed for the same visual style.",
            "Use dual axes: left for SpO2 (%), right for Pulse (bpm).",
          ]}
          snippet={`new Chart(lineCtx, { type: "line", data: pulseOximeterData, options: pulseOximeterOptions });`}
        />
      </div>

      <div className="rounded-xl border border-border bg-background p-3">
        <p className="mb-2 text-sm font-semibold text-foreground">PATIENT MONITORING BARS</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Grouped bars by patient: Minutes tracked, Symptoms, and Patient health
        </p>
        <div className="h-84">
          <canvas ref={radialCanvasRef} />
        </div>
        <ChartCodeNotes
          title="Code notes: Patient monitoring bar chart"
          steps={[
            "Use `type: \"bar\"` and one label per patient.",
            "Add 3 datasets for minutes tracked, symptoms, and patient health.",
            "Set `borderRadius` on bars for softer cards/prototype style.",
            "In tooltip callback, append `min` for tracked minutes and `%` for health/symptoms.",
          ]}
          snippet={`new Chart(barCtx, { type: "bar", data: monitoringData, options: monitoringOptions });`}
        />
      </div>
    </div>
  );
}

function ChartCodeNotes({ title, steps, snippet }: { title: string; steps: string[]; snippet: string }) {
  return (
    <details className="mt-3 rounded-md border border-border/70 bg-muted/30 p-2.5">
      <summary className="cursor-pointer text-xs font-semibold text-foreground">{title}</summary>
      <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <pre className="mt-2 overflow-x-auto rounded-md border border-border/70 bg-background p-2 text-[11px] text-foreground">
        <code>{snippet}</code>
      </pre>
    </details>
  );
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TokenKey;
  onChange: (value: TokenKey) => void;
}) {
  return (
    <label className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span
        className="h-4 w-4 rounded-sm border border-border"
        style={{ backgroundColor: `hsl(var(${TOKEN_COLOR_VARS[value]}))` }}
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TokenKey)}
        className="h-7 rounded border border-border bg-background px-1.5 text-[11px] outline-none focus:border-numo-blue-500"
      >
        {Object.keys(TOKEN_COLOR_VARS).map((token) => (
          <option key={token} value={token}>
            {token}
          </option>
        ))}
      </select>
    </label>
  );
}
