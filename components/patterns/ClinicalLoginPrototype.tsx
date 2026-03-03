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
    <section className="flex min-h-[calc(100vh-2rem)] items-center justify-center bg-numo-slate-400 px-4 py-8 md:px-8 md:py-12">
      <div className="w-full max-w-300 overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-xl lg:w-2/3">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center p-6 md:p-10 lg:p-12">
            <div className="w-full max-w-md space-y-4">
              <div className="mb-5 flex items-center justify-between gap-4">
                <Image src="/Curie_AI_logo.svg" alt="Curie AI" width={220} height={40} className="h-16 w-auto" priority />
                <span className="inline-flex items-center gap-1 rounded-full border border-numo-teal-500/40 bg-numo-teal-100/40 px-3 py-1 text-xs text-numo-teal-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Secure
                </span>
              </div>

              <p className="inline-flex rounded-full border border-numo-blue-300/70 bg-numo-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-numo-blue-700">
                Curie AI Clinical Access
              </p>
              <div className="mt-5 rounded-xl border border-border bg-muted/20 p-4 md:p-5">
                <div className="relative mb-3 grid grid-cols-2 rounded-md border border-border bg-background p-0.5 text-xs">
                  <span
                    aria-hidden
                    className={[
                      "pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded bg-numo-blue-600 shadow-sm transition-transform duration-300 ease-out",
                      mode === "signup" ? "translate-x-full" : "translate-x-0",
                    ].join(" ")}
                  />
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={[
                      "relative z-10 rounded px-3 py-1.5 transition-colors duration-300",
                      mode === "signin" ? "text-white" : "text-numo-blue-800 hover:bg-muted/60",
                    ].join(" ")}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={[
                      "relative z-10 rounded px-3 py-1.5 transition-colors duration-300",
                      mode === "signup" ? "text-white" : "text-numo-blue-800 hover:bg-muted/60",
                    ].join(" ")}
                  >
                    Create account
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div
                    className={[
                      "grid transition-all duration-300 ease-out",
                      mode === "signup" ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <label className="block space-y-1 pb-1">
                        <span className="text-xs font-medium text-numo-blue-900">Full name</span>
                        <DSInput
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                          placeholder="Jane Smith"
                          autoComplete="name"
                        />
                      </label>
                    </div>
                  </div>

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
                                  <p className="mt-2 text-[11px] text-muted-foreground">
                  {mode === "signup"
                    ? "Password must be at least 6 characters."
                    : "Use the credentials created in your Supabase project."}
                </p>

                  <PrimaryBtn
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full justify-center py-2.5 disabled:cursor-not-allowed disabled:opacity-60 bg-numo-warm-blue-700"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {mode === "signup" ? "Create account" : "Sign in"}
                  </PrimaryBtn>
                </form>



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

          <div className="relative min-h-90 md:min-h-170">
            <Image
              src="https://lungds.s3.us-east-2.amazonaws.com/images/image8-15.jpeg"
              alt="Clinical care overview"
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center opacity-85"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
