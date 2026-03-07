"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Globe, Moon, Shapes, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

export function DSPage({
  title,
  description,
  hideDescriptionOnMobile = false,
  hidePageIntro = false,
  children,
  className,
}: {
  title: string;
  description?: string;
  hideDescriptionOnMobile?: boolean;
  hidePageIntro?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const [isDark, setIsDark] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem("curie-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("curie-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <main className={cn("isolate min-h-dvh bg-background text-foreground", className)}>
      <div className="mx-autospace-y-10 px-6">
        <header className="relative z-50 space-y-5">
          <div className="sticky top-0 z-50 rounded-xl py-2 backdrop-blur dark:bg-[linear-gradient(135deg,hsl(var(--numo-slate-900)/0.3)_0%,var(--background)_45%,hsl(var(--numo-slate-900)/0.22)_100%)]">
            <div className="hidden items-center justify-between gap-3 md:flex">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-background px-2.5 py-1.5 text-sm font-semibold tracking-tight text-foreground transition hover:bg-muted/55"
                >
                  <Shapes className="h-4 w-4 text-numo-blue-700" />
                  Curie DS
                </Link>
              </div>

              <nav className="flex items-center gap-1 rounded-full border border-border/80 bg-background/70 p-1 text-sm">
                <CenterNavLink href="/foundations" active={isActive("/foundations")}>
                  Foundations
                </CenterNavLink>
                <CenterNavLink href="/components" active={isActive("/components")}>
                  Components
                </CenterNavLink>
                <CenterNavLink href="/patterns" active={isActive("/patterns")}>
                  Patterns
                </CenterNavLink>
                <CenterNavLink
                  href="/prototypes"
                  active={
                    isActive("/prototypes") ||
                    isActive("/prototype-login") ||
                    isActive("/numo-home") ||
                    isActive("/notes") ||
                    isActive("/tablet-appointment") ||
                    isActive("/user-preferences")
                  }
                >
                  Prototypes
                </CenterNavLink>
              </nav>

              <div className="flex items-center gap-1">
                <Link
                  href="https://edbelluti.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-foreground"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/edbr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-foreground"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 md:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-background px-2.5 py-1.5 text-sm font-semibold tracking-tight text-foreground"
              >
                <Shapes className="h-4 w-4 text-numo-blue-700" />
                Curie DS
              </Link>
              <div className="relative z-50">
                <details className="group">
                  <summary className="inline-flex min-h-10 list-none items-center rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted/50 hover:text-foreground [&::-webkit-details-marker]:hidden">
                    Menu
                  </summary>

                  <div className="absolute right-0 top-[calc(100%+0.4rem)] z-[60] w-[min(18rem,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-lg border border-border bg-background p-2 shadow-md">
                    <MobileNavLink href="/">Home</MobileNavLink>
                    <MobileNavLink href="/foundations">Foundations</MobileNavLink>
                    <MobileNavLink href="/components">Components</MobileNavLink>

                    <div className="mt-2 border-t border-border pt-2">
                      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Patterns
                      </p>
                      <MobileNavLink href="/patterns/clinical">Clinical</MobileNavLink>
                      <MobileNavLink href="/patterns/patient">Patient</MobileNavLink>
                    </div>

                    <div className="mt-2 border-t border-border pt-2">
                      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Prototypes
                      </p>
                      <MobileNavLink href="/prototypes">All Prototypes</MobileNavLink>
                      <MobileNavLink href="/numo-home">Clinical Dashboard</MobileNavLink>
                      <MobileNavLink href="/notes">Notes</MobileNavLink>
                      <MobileNavLink href="/tablet-appointment">Tablet Appointment</MobileNavLink>
                      <MobileNavLink href="/prototype-login">Login Experience</MobileNavLink>
                      <MobileNavLink href="/user-preferences">User Preferences</MobileNavLink>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {!hidePageIntro ? (
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {description ? (
                <p
                  className={[
                    "mt-2 text-sm text-muted-foreground",
                    hideDescriptionOnMobile ? "hidden sm:block" : "",
                  ].join(" ")}
                >
                  {description}
                </p>
              ) : null}
            </div>
          ) : null}
        </header>

        {children}
      </div>
    </main>
  );
}

function CenterNavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm transition",
        active
          ? "bg-numo-blue-900 text-white"
          : "text-muted-foreground hover:bg-background hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
    >
      {children}
    </Link>
  );
}
