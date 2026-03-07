"use client";

import { useMemo, useState } from "react";
import { DSPage } from "@/components/ds/page";
import { DSFooter } from "@/components/ds/footer";
import { DSConversationModule } from "@/components/ds/conversation-module";
import { DSClinicalEmrGraphsDemo } from "@/components/ds/clinical-emr-graphs-demo";
import { DSInput } from "@/components/ds/input";
import { PrimaryBtn, SecondaryBtn } from "@/components/ds/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const COLOR_GROUPS = [
  { family: "Teal", shades: ["900", "800", "700", "600", "500", "400"] },
  { family: "Blue", shades: ["900", "800", "700", "600", "500", "400"] },
  { family: "Orange", shades: ["900", "800", "700", "600", "500", "400"] },
  { family: "Red", shades: ["900", "800", "700", "600", "500", "400"] },
];

export default function Home() {
  const [selectedToken, setSelectedToken] = useState("--numo-teal-500");

  const selectedColor = useMemo(
    () =>
      COLOR_GROUPS.flatMap((group) =>
        group.shades.map((shade) => ({
          token: `--numo-${group.family.toLowerCase()}-${shade}`,
          label: `${group.family} ${shade}`,
        })),
      ).find((c) => c.token === selectedToken) ?? { token: "--numo-teal-500", label: "Teal 500" },
    [selectedToken],
  );

  const codebaseInventory = [
    { category: "Source files tracked", count: 59, scope: "ts/tsx/css/json/md" },
    { category: "Route pages", count: 13, scope: "app/**/page.tsx" },
    { category: "Pattern pages", count: 3, scope: "app/patterns/**" },
    { category: "Prototype pages", count: 6, scope: "prototype routes" },
    { category: "DS components", count: 16, scope: "components/ds/*.tsx" },
    { category: "Pattern components", count: 16, scope: "components/patterns/*.tsx" },
    { category: "UI primitives", count: 3, scope: "components/ui/*.tsx" },
    { category: "Total component files", count: 35, scope: "components/**/*" },
    { category: "Public assets", count: 25, scope: "public/**/*" },
    { category: "Design tokens", count: 77, scope: "tokens.css unique vars" },
    { category: "TSX files", count: 49, scope: "repo-wide" },
    { category: "TS files", count: 3, scope: "repo-wide" },
    { category: "CSS files", count: 2, scope: "repo-wide" },
  ];

  return (
    <DSPage
      title=""
      description=""
      hideDescriptionOnMobile
      className="[&_header>div:last-child]:hidden"
    >
      <section className="relative overflow-hidden rounded-2xl px-1 py-6 sm:px-2 md:px-10 md:py-12">
        <div className="absolute inset-x-0 top-0" />
        <div className="flex flex-col gap-10 lg:gap-14 xl:flex-row xl:items-stretch">
          <div className="min-w-0 xl:w-[40%]">
            <p className="inline-flex items-center gap-2 rounded-full border border-numo-slate-500/70 bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-numo-blue-700 backdrop-blur dark:bg-black/25">
              <Sparkles className="h-3.5 w-3.5 text-numo-teal-600" />
              Curie + Numo Design Language
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              One system for rapid, trustworthy healthcare interfaces.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
              Build with tokens, components, and patterns that stay consistent across patient and clinician experiences.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/components"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-numo-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-numo-blue-700"
              >
                Browse Components
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/foundations"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted/55 dark:bg-black/30 dark:hover:bg-black/40"
              >
                Read Foundations
              </Link>
            </div>

            <div className="mt-8 max-w-3xl overflow-hidden rounded-xl border border-border bg-numo-blue-900/95">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-numo-slate-400">
                <span>components/clinician-actions.tsx</span>
                <span>tsx</span>
              </div>
              <pre className="overflow-x-auto p-3 text-[11px] leading-relaxed text-numo-slate-400 sm:p-4 sm:text-xs">
                <code>
                  <span className="text-numo-teal-400">import</span>
                  <span> {"{ CurieButton }"} </span>
                  <span className="text-numo-teal-400">from</span>
                  <span className="text-numo-yellow-500"> &quot;@/components/ds/button&quot;</span>
                  {"\n"}
                  <span className="text-numo-teal-400">import</span>
                  <span> {"{ Tooltip }"} </span>
                  <span className="text-numo-teal-400">from</span>
                  <span className="text-numo-yellow-500"> &quot;@/components/ui/tooltip&quot;</span>
                  {"\n\n"}
                  <span className="text-numo-teal-400">export</span>
                  <span> </span>
                  <span className="text-numo-teal-400">function</span>
                  <span className="text-numo-orange-500"> ClinicianActions</span>
                  <span>() {"{"}</span>
                  {"\n  "}
                  <span className="text-numo-teal-400">return</span>
                  <span> (</span>
                  {"\n    "}
                  <span className="text-numo-slate-500">&lt;</span>
                  <span className="text-numo-blue-400">div</span>
                  <span className="text-numo-red-500"> className</span>
                  <span className="text-numo-slate-500">=</span>
                  <span className="text-numo-yellow-500">&quot;flex items-center gap-2&quot;</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  {"\n      "}
                  <span className="text-numo-slate-500">&lt;</span>
                  <span className="text-numo-blue-400">CurieButton</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  <span>Review Results</span>
                  <span className="text-numo-slate-500">&lt;/</span>
                  <span className="text-numo-blue-400">CurieButton</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  {"\n      "}
                  <span className="text-numo-slate-500">&lt;</span>
                  <span className="text-numo-blue-400">Tooltip</span>
                  <span className="text-numo-red-500"> content</span>
                  <span className="text-numo-slate-500">=</span>
                  <span className="text-numo-yellow-500">&quot;Latest patient insight&quot;</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  {"\n        "}
                  <span className="text-numo-slate-500">&lt;</span>
                  <span className="text-numo-blue-400">button</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  <span>AI Signal</span>
                  <span className="text-numo-slate-500">&lt;/</span>
                  <span className="text-numo-blue-400">button</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  {"\n      "}
                  <span className="text-numo-slate-500">&lt;/</span>
                  <span className="text-numo-blue-400">Tooltip</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  {"\n    "}
                  <span className="text-numo-slate-500">&lt;/</span>
                  <span className="text-numo-blue-400">div</span>
                  <span className="text-numo-slate-500">&gt;</span>
                  {"\n  "}
                  <span>)</span>
                  {"\n"}
                  <span>{"}"}</span>
                </code>
              </pre>
            </div>
          </div>

          <aside className="flex w-full flex-1 flex-col gap-4 sm:gap-6 xl:w-[60%] xl:self-stretch">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"></p>
              <p className="mt-1.5 text-xs text-muted-foreground"></p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-12 xl:gap-7">
              <article className="min-w-0 rounded-xl border border-numo-gray-600 bg-white px-4 pb-3 pt-4 shadow-lg sm:px-6 sm:pb-4 sm:pt-6 xl:col-span-5 xl:col-start-8 xl:row-span-2 xl:px-8 xl:pb-2 xl:pt-8">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">Color picker</h3>
                <p className="mt-1 text-xs text-muted-foreground">Select a design token to preview palette coverage.</p>
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
                <div className="mt-3 rounded-lg border border-border/60 bg-background/70 p-2.5 dark:bg-black/20">
                  <p className="text-xs text-muted-foreground">Selected token</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedColor.token}</p>
                  <div
                    className="mt-2 h-2 w-full rounded-full border border-border/60"
                    style={{ backgroundColor: `hsl(var(${selectedColor.token}))` }}
                  />
                </div>
              </article>

              <article className="min-w-0 rounded-xl border border-numo-gray-600 bg-white p-4 shadow-lg sm:p-6 xl:col-span-5 xl:col-start-8 xl:row-start-3 xl:p-8">
                <div className="space-y-4">
                  <label className="block">
                    <p className="mb-1.5 text-xs font-medium text-foreground">Email</p>
                    <DSInput placeholder="Enter your email" className="py-2" />
                  </label>

                  <label className="block">
                    <p className="mb-1.5 text-xs font-medium text-foreground">Password</p>
                    <DSInput type="password" placeholder="Enter your password" className="py-2" />
                  </label>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <SecondaryBtn className="w-full justify-center border-[#3e63dd] bg-white py-2 text-xs text-[#3e63dd] hover:border-[#3557c3] hover:bg-[#eef3ff] hover:text-[#3557c3]">
                      Create
                    </SecondaryBtn>
                    <PrimaryBtn className="w-full justify-center border-[#3e63dd] bg-[#3e63dd] py-2 text-xs hover:border-[#3557c3] hover:bg-[#3557c3]">
                      Sign in
                    </PrimaryBtn>
                  </div>

                  <button type="button" className="w-full text-center text-xs font-medium text-[#3e63dd] hover:underline">
                    Forgot password?
                  </button>
                </div>
              </article>

              <article className="min-w-0 overflow-hidden rounded-xl border border-numo-gray-600 bg-white p-3 shadow-lg sm:p-4 xl:col-span-7 xl:col-start-1 xl:row-start-3 xl:row-span-2">
                <DSConversationModule className="" />
              </article>

              <article className="min-w-0 overflow-hidden rounded-xl border border-numo-gray-600 bg-white p-4 shadow-lg sm:p-6 xl:col-span-7 xl:col-start-1 xl:row-start-1 xl:row-span-2 xl:p-8">
                <div className="mt-2 sm:mt-3">
                  <DSClinicalEmrGraphsDemo showPatientMonitoringBars={false} />
                </div>
              </article>

            </div>
          </aside>
        </div>
      </section>

      <section className="mt-8  px-6 py-7 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Codebase Inventory</p>
          <p className="text-xs text-muted-foreground">Local workspace snapshot</p>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-background">
          <table className="w-full text-left">
            <thead className="bg-muted/45">
              <tr className="border-b border-border/70 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Count</th>
                <th className="px-4 py-3 font-semibold">Scope</th>
              </tr>
            </thead>
            <tbody>
              {codebaseInventory.map((row) => (
                <tr key={row.category} className="border-b border-border/60 last:border-b-0">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{row.category}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex min-w-12 justify-center rounded-full bg-numo-blue-500/12 px-2.5 py-0.5 text-xs font-semibold text-numo-blue-700">
                      {row.count}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
<div className="h-12" />
      <DSFooter />
    </DSPage>
  );
}
