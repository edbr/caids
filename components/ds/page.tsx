import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function DSPage({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("min-h-dvh bg-background text-foreground", className)}>
      <div className="mx-auto max-w-screen-2xl px-6 py-10 space-y-10">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {description ? (
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>

            <nav className="flex items-center gap-2 text-sm">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/foundations">Foundations</NavLink>
              <NavLink href="/components">Components</NavLink>
              <NavMenu label="Patterns">
                <NavMenuLink href="/patterns/clinical">Clinical</NavMenuLink>
                <NavMenuLink href="/patterns/patient">Patient</NavMenuLink>
              </NavMenu>
              <NavMenu label="Protoypes">
                <NavMenuLink href="/numo-home">Clinical Dashboard</NavMenuLink>
                <NavMenuLink href="/notes">Notes</NavMenuLink>
                <NavMenuLink href="/tablet-appointment">Tablet Appointment</NavMenuLink>
              </NavMenu>
            </nav>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
    >
      {children}
    </Link>
  );
}

function NavMenu({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="inline-flex min-h-11 items-center rounded-md px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition group-focus-within:text-foreground group-focus-within:bg-muted/50"
        aria-haspopup="menu"
      >
        {label}
      </button>

      <div aria-hidden className="absolute right-0 top-full h-3 w-44" />

      <div
        className={[
          "absolute right-0 top-[calc(100%+0.15rem)] z-40 min-w-44 rounded-lg border border-border bg-background p-1 shadow-md",
          "invisible translate-y-1 opacity-0 transition duration-150",
          "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        ].join(" ")}
        role="menu"
      >
        {children}
      </div>
    </div>
  );
}

function NavMenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition"
    >
      {children}
    </Link>
  );
}
