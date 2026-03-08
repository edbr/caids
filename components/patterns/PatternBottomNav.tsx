import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPatternNeighbors, type PatternRoute } from "@/components/patterns/patterns-registry";

export function PatternBottomNav({ currentHref }: { currentHref: PatternRoute["href"] }) {
  const { previous, next } = getPatternNeighbors(currentHref);

  return (
    <nav className="rounded-xl border border-border bg-background p-3" aria-label="Pattern navigation">
      <div className="flex items-center justify-between gap-3">
        {previous ? (
          <Link
            href={previous.href}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition hover:bg-muted/40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{previous.title}</span>
          </Link>
        ) : (
          <span className="text-sm text-muted-foreground">No previous pattern</span>
        )}

        {next ? (
          <Link
            href={next.href}
            className="ml-auto inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition hover:bg-muted/40"
          >
            <span>{next.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="ml-auto text-sm text-muted-foreground">No next pattern</span>
        )}
      </div>
    </nav>
  );
}
