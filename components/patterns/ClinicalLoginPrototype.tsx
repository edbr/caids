"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { PrimaryBtn } from "@/components/ds/button";
import { DSInput } from "@/components/ds/input";

export function ClinicalLoginPrototype() {
  const router = useRouter();
  const [mode, setMode] = React.useState<"signin" | "signup">("signup");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);

  const missingEnv = React.useMemo(() => {
    const missing: string[] = [];
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return missing;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      setError("Missing environment variables. Add values in .env.local and restart Next.js.");
      return;
    }

    try {
      setLoading(true);
      if (mode === "signup") {
        const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            data: { full_name: name || undefined },
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data?.msg || "Unable to create account.");
          return;
        }
        setStatus("Account created. Check your email for confirmation if email verification is enabled.");
        return;
      }

      const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.msg || "Sign in failed. Check credentials.");
        return;
      }
      if (data?.access_token) {
        localStorage.setItem("supabase_access_token", data.access_token);
      }
      if (data?.refresh_token) {
        localStorage.setItem("supabase_refresh_token", data.refresh_token);
      }
      setStatus("Signed in successfully. Redirecting to preferences...");
      router.push("/user-preferences");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-border bg-muted/25 p-5 gap-12 md:p-8">
      <div className="rounded-xl border border-border bg-background p-6 text-foreground shadow-sm md:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Image src="/Curie_AI_logo.svg" alt="Curie AI" width={300} height={48} className="h-16 w-auto" priority />
          <span className="inline-flex items-center gap-1 rounded-full border border-numo-teal-500/40 bg-numo-teal-100/40 px-3 py-1 text-xs text-numo-teal-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure Sign In
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid gap-20 md:grid-cols-[5fr_2fr]">
            <div className="relative self-stretch overflow-hidden rounded-xl border border-border bg-muted/20">
              <Image
                src="/clinical.webp"
                alt="Clinical care overview"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover object-[50%_76%]"
                priority
              />
            </div>

            <div className="space-y-2.5">
              <p className="inline-flex rounded-full border border-numo-blue-300/70 bg-numo-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-numo-blue-700">
                Curie AI Clinical Access
              </p>
              <h2 className="text-[34px] font-semibold leading-[1.03] tracking-tight text-numo-blue-900">
                Welcome to Curie Clinical
              </h2>
              <p className="max-w-xl text-[15px] leading-6 text-numo-slate-700">
                Sign in to review patient insights, monitor risk signals, and continue coordinated care decisions in one secure workspace.
              </p>

              <div className="mt-6 rounded-xl border border-border bg-muted/20 p-4 md:p-5">
                <div className="mb-3 inline-flex rounded-md border border-border bg-background p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={[
                      "rounded px-3 py-1.5 transition",
                      mode === "signin" ? "bg-numo-blue-800 text-white" : "text-numo-blue-800 hover:bg-muted/60",
                    ].join(" ")}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={[
                      "rounded px-3 py-1.5 transition",
                      mode === "signup" ? "bg-numo-blue-800 text-white" : "text-numo-blue-800 hover:bg-muted/60",
                    ].join(" ")}
                  >
                    Create account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  {mode === "signup" ? (
                    <label className="block space-y-1">
                      <span className="text-xs font-medium text-numo-blue-900">Full name</span>
                      <DSInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                        placeholder="Jane Smith"
                        autoComplete="name"
                      />
                    </label>
                  ) : null}

                  <label className="block space-y-1">
                    <span className="text-xs font-medium text-numo-blue-900">Email</span>
                    <DSInput
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                      placeholder="you@clinic.com"
                      autoComplete="email"
                    />
                  </label>

                  <label className="block space-y-1">
                    <span className="text-xs font-medium text-numo-blue-900">Password</span>
                    <DSInput
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                      placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    />
                  </label>

                  <PrimaryBtn
                    type="submit"
                    disabled={loading}
                    className="w-full justify-center py-2.5 disabled:cursor-not-allowed disabled:opacity-60 mt-6"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {mode === "signup" ? "Create account" : "Sign in"}
                  </PrimaryBtn>
                </form>

                <p className="mt-2 text-[11px] text-muted-foreground">
                  {mode === "signup"
                    ? "Password must be at least 6 characters."
                    : "Use the credentials created in your Supabase project."}
                </p>

                {missingEnv.length > 0 ? (
                  <p className="mt-3 text-xs text-numo-orange-700">
                    Missing env: <span className="font-semibold">{missingEnv.join(", ")}</span>
                  </p>
                ) : null}
                {error ? <p className="mt-2 text-xs text-numo-red-500">{error}</p> : null}
                {status ? <p className="mt-2 text-xs text-numo-teal-700">{status}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
