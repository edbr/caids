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
              <NavLink href="/patterns">Patterns</NavLink>
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
