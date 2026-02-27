"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, RefreshCw } from "lucide-react";
import { DSInput } from "@/components/ds/input";

type RiskLevel = "High" | "Moderate" | "Low";

type InsightRow = {
  id: string;
  patient: string;
  clinic: string;
  risk: RiskLevel;
  abnormalVitals: number;
};

type ConversationLine = {
  id: string;
  speaker: "Patient" | "Clinician";
  text: string;
};

const COLOR_GROUPS = [
  {
    family: "Teal",
    shades: ["900", "800", "700", "600", "500", "400"],
  },
  {
    family: "Blue",
    shades: ["900", "800", "700", "600", "500", "400"],
  },
  {
    family: "Orange",
    shades: ["900", "800", "700", "600", "500", "400"],
  },
  {
    family: "Red",
    shades: ["900", "800", "700", "600", "500", "400"],
  },
];

const BASE_ROWS: InsightRow[] = [
  { id: "1", patient: "Brian Lawson", clinic: "Pulmonology", risk: "High", abnormalVitals: 4 },
  { id: "2", patient: "Ari Kim", clinic: "Cardiology", risk: "Moderate", abnormalVitals: 2 },
  { id: "3", patient: "Maya Patel", clinic: "Pulmonology", risk: "Low", abnormalVitals: 1 },
];

const CONVERSATION_LINES: ConversationLine[] = [
  { id: "c1", speaker: "Patient", text: "I had more shortness of breath this morning." },
  { id: "c2", speaker: "Clinician", text: "Thanks for sharing. Did it happen at rest or with activity?" },
  { id: "c3", speaker: "Patient", text: "Mostly when walking upstairs, and my cough increased." },
  { id: "c4", speaker: "Clinician", text: "Understood. We should keep your 3:00 PM follow-up and review inhaler use." },
  { id: "c5", speaker: "Patient", text: "Okay, I can do that. Should I log symptoms tonight too?" },
  { id: "c6", speaker: "Clinician", text: "Yes, please track symptoms and oxygen readings before bedtime." },
];

function formatTime(value: Date) {
  return value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function randomizeRows(rows: InsightRow[]) {
  return rows.map((row) => {
    const riskRand = Math.random();
    const risk: RiskLevel = riskRand > 0.72 ? "High" : riskRand > 0.35 ? "Moderate" : "Low";
    const abnormalVitals = risk === "High" ? 3 + Math.floor(Math.random() * 3) : risk === "Moderate" ? 1 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2);
    return { ...row, risk, abnormalVitals };
  });
}

function riskClass(risk: RiskLevel) {
  if (risk === "High") return "text-numo-red-600";
  if (risk === "Moderate") return "text-numo-orange-600";
  return "text-numo-teal-600";
}

export function HomeInteractiveShowcase() {
  const [selectedToken, setSelectedToken] = useState("--numo-teal-500");
  const [fieldValue, setFieldValue] = useState("");
  const [rows, setRows] = useState<InsightRow[]>(BASE_ROWS);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [conversationIndex, setConversationIndex] = useState(2);
  const conversationScrollRef = useRef<HTMLDivElement | null>(null);

  const selectedColor = useMemo(
    () =>
      COLOR_GROUPS.flatMap((group) =>
        group.shades.map((shade) => ({
          token: `--numo-${group.family.toLowerCase()}-${shade}`,
          label: `${group.family} ${shade}`,
        }))
      ).find((c) => c.token === selectedToken) ?? { token: "--numo-teal-500", label: "Teal 500" },
    [selectedToken]
  );
  const isFieldValid = fieldValue.trim().length >= 8;

  const riskCounts = useMemo(
    () => ({
      high: rows.filter((r) => r.risk === "High").length,
      moderate: rows.filter((r) => r.risk === "Moderate").length,
      low: rows.filter((r) => r.risk === "Low").length,
    }),
    [rows]
  );

  function handleReload() {
    setLoading(true);
    window.setTimeout(() => {
      setRows(randomizeRows(BASE_ROWS));
      setLastUpdated(new Date());
      setLoading(false);
    }, 600);
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setConversationIndex((prev) => {
        const next = prev + 1;
        return next > CONVERSATION_LINES.length ? 2 : next;
      });
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, []);

  const visibleConversation = useMemo(
    () => CONVERSATION_LINES.slice(0, conversationIndex),
    [conversationIndex]
  );

  useEffect(() => {
    if (!conversationScrollRef.current) return;
    conversationScrollRef.current.scrollTo({
      top: conversationScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleConversation]);

  return (
    <div className="mt-8 grid gap-3 md:grid-cols-3">
      <div className="rounded-xl border border-border bg-background/70 p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Foundations</p>
        <p className="mt-1 text-sm text-foreground">Tokenized color selection preview.</p>

        <div className="mt-3 space-y-2">
          {COLOR_GROUPS.map((group) => (
            <div key={group.family}>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {group.family}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.shades.map((shade) => {
                  const token = `--numo-${group.family.toLowerCase()}-${shade}`;
                  const label = `${group.family} ${shade}`;
                  return (
                    <button
                      key={token}
                      type="button"
                      onClick={() => setSelectedToken(token)}
                      className={[
                        "h-6 w-6 rounded-full border-2 transition",
                        selectedToken === token ? "border-foreground scale-105" : "border-border hover:border-foreground/60",
                      ].join(" ")}
                      style={{ backgroundColor: `hsl(var(${token}))` }}
                      aria-label={`Select ${label}`}
                      title={label}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-border p-2.5">
          <p className="text-xs text-muted-foreground">Selected token</p>
          <p className="mt-1 text-sm font-medium text-foreground">{selectedColor.token}</p>
          <div
            className="mt-2 h-2 w-full rounded-full border border-border/60"
            style={{ backgroundColor: `hsl(var(${selectedColor.token}))` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/70 p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
        <p className="mt-1 text-sm text-foreground">Conversation between patient and clinician</p>

       
        <div className="mt-4 rounded-lg border border-border bg-background/80 p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-foreground">Jane Mullgard</p>
          </div>
          <div ref={conversationScrollRef} className="h-36 space-y-1.5 overflow-y-auto pr-1">
            {visibleConversation.map((line) => {
              const isPatient = line.speaker === "Patient";
              return (
                <div
                  key={line.id}
                  className={[
                    "max-w-[92%] rounded-md px-2 py-1.5 text-xs leading-5",
                    isPatient
                      ? "border border-numo-blue-700/10 bg-numo-gray-500 text-numo-blue-900"
                      : "ml-auto border border-numo-blue-700/05 bg-numo-blue-500 text-numo-gray-400",
                  ].join(" ")}
                >

                  {line.text}
                </div>
              );
            })}
          </div>
        </div>
         <div className="mt-3 space-y-2">
          <DSInput
            placeholder="Add note title..."
            value={fieldValue}
            onChange={(event) => setFieldValue(event.target.value)}
            className={[
              "transition",
              fieldValue.length === 0 ? "" : isFieldValid ? "border-numo-teal-500/70" : "border-numo-orange-500/70",
            ].join(" ")}
          />
          <div className="flex items-center justify-between text-xs">
            <p className={isFieldValid || fieldValue.length === 0 ? "text-muted-foreground" : "text-numo-orange-700"}>
              {fieldValue.length === 0
                ? "Enter at least 8 characters."
                : isFieldValid
                  ? "Looks good."
                  : "Keep typing..."}
            </p>
            <p className="text-muted-foreground">{fieldValue.length}/60</p>
          </div>
        </div>

      </div>

      <div className="rounded-xl border border-border bg-background/70 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Patterns</p>
            <p className="mt-1 text-sm text-foreground">Simplified AI Signal Insights preview.</p>
          </div>
          <button
            type="button"
            onClick={handleReload}
            className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
          >
            <RefreshCw className={["h-3.5 w-3.5", loading ? "animate-spin" : ""].join(" ")} />
            Reload
          </button>
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">Last updated: {formatTime(lastUpdated)}</p>

        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md border border-border bg-background px-2 py-1.5">
            <p className="text-[11px] text-muted-foreground">High</p>
            <p className="text-sm font-semibold text-numo-red-600">{riskCounts.high}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-2 py-1.5">
            <p className="text-[11px] text-muted-foreground">Moderate</p>
            <p className="text-sm font-semibold text-numo-orange-600">{riskCounts.moderate}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-2 py-1.5">
            <p className="text-[11px] text-muted-foreground">Low</p>
            <p className="text-sm font-semibold text-numo-teal-600">{riskCounts.low}</p>
          </div>
        </div>

        <div className="mt-2 space-y-1.5">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between rounded-md border border-border bg-background px-2 py-1.5">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">{row.patient}</p>
                <p className="text-[11px] text-muted-foreground">{row.clinic}</p>
              </div>
              <div className="ml-2 flex items-center gap-2">
                <span className={["text-xs font-medium", riskClass(row.risk)].join(" ")}>{row.risk}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  {row.abnormalVitals}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
