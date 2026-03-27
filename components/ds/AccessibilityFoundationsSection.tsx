const ACCESSIBILITY_EXAMPLES = [
  {
    title: "Clear labels",
    example: "Every interactive control should expose a visible label or an equivalent accessible name.",
    note: "Icon-only actions still need an `aria-label` that explains the outcome.",
  },
  {
    title: "Keyboard focus",
    example: "Interactive elements should be reachable in a logical order with visible focus states.",
    note: "Use the same reading order as the layout and avoid trapping focus unless a dialog is open.",
  },
  {
    title: "Contrast and hierarchy",
    example: "Support meaning with text and structure, not color alone.",
    note: "Status badges, trend lines, and alerts should pair color with labels, icons, or patterns.",
  },
  {
    title: "Helpful feedback",
    example: "Errors, loading states, and summaries should be announced in plain language.",
    note: "Keep assistive text concise so screen reader users hear the important part first.",
  },
] as const;

const ACCESSIBILITY_NOTES = [
  "Prefer semantic HTML first, then add ARIA only when native elements cannot express the interaction.",
  "Decorative artwork and repeated visual flourishes should be hidden from assistive tech.",
  "Charts and dense data views should include a short text summary of the takeaway.",
  "Relative dates like Today and Tomorrow are fine visually, but absolute dates help reduce ambiguity.",
] as const;

export function AccessibilityFoundationsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Accessibility</h2>
          <p className="text-sm text-muted-foreground">
            Practical examples and reminders for inclusive UI across Curie DS surfaces.
          </p>
        </div>
        <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Foundations
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {ACCESSIBILITY_EXAMPLES.map((item) => (
          <article key={item.title} className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm text-foreground">{item.example}</p>
            <p className="mt-3 text-sm text-muted-foreground">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-numo-yellow-600/35 bg-numo-yellow-400/10 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">Notes</h3>
        <div className="mt-3 space-y-2">
          {ACCESSIBILITY_NOTES.map((note) => (
            <p key={note} className="text-sm text-foreground">
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
