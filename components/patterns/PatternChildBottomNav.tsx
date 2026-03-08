import Link from "next/link";
import { ArrowBigRight, ArrowBigRightIcon, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getChildNeighbors, type PatternRoute } from "@/components/patterns/patterns-registry";

export function PatternChildBottomNav({
  patternHref,
  currentChildHref,
}: {
  patternHref: PatternRoute["href"];
  currentChildHref: PatternRoute["children"][number]["href"];
}) {
  const { previous, next } = getChildNeighbors(patternHref, currentChildHref);

  return (
    <nav className="rounded-xl p-3" aria-label="Child pattern navigation">
      <div className="flex items-center justify-between gap-3">
        {previous ? (
          <Link
            href={previous.href}
            className="inline-flex items-center gap-2 rounded-md bg-numo-gray-500 px-4 py-2 text-sm text-foreground transition hover:bg-muted/40"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{previous.title}</span>
          </Link>
        ) : (
          <span className="text-sm text-muted-foreground">No previous child</span>
        )}

        {next ? (
          <Link
            href={next.href}
            className="ml-auto inline-flex items-center gap-2 rounded-md bg-numo-gray-600 px-4 py-2 text-sm text-foreground transition hover:bg-muted/40"
          >
            <span>{next.title}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="ml-auto text-sm text-muted-foreground">No next child</span>
        )}
      </div>
    </nav>
  );
}
