const MY_HEALTH_EXAMPLES = [
  {
    title: "Chart summary",
    text: "Provide a short written takeaway near the trend chart so people do not need to interpret the graph visually to understand the current state.",
  },
  {
    title: "Absolute dates",
    text: "Keep labels like Today and Tomorrow for the interface, but pair them with exact dates in supporting text when decisions depend on timing.",
  },
  {
    title: "Color plus labels",
    text: "The trend legend already uses text labels. Keep that pattern so severity is not communicated by dot color alone.",
  },
  {
    title: "Table reading order",
    text: "Symptom counts work well as a table because the screen reader can announce row labels and values together.",
  },
] as const;

const MY_HEALTH_NOTES = [
  "Use meaningful alt text only for content-bearing imagery. The product logo and decorative icons can stay hidden from assistive tech.",
  "If the interaction menu opens actions, verify the trigger has an accessible name and the menu supports arrow keys and Escape.",
  "If chart tooltips are hover-only, keep a text equivalent on the page so keyboard and touch users still get the same information.",
] as const;

export function PatientMyHealthAccessibilityNotes() {
  return (
    <section
      aria-labelledby="my-health-accessibility-heading"
      className="rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Accessibility
          </p>
          <h3 id="my-health-accessibility-heading" className="mt-1 text-xl font-semibold text-foreground">
            My Health examples and notes
          </h3>
        </div>
        <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Pattern-specific
        </span>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {MY_HEALTH_EXAMPLES.map((item) => (
          <article key={item.title} className="rounded-xl border border-border bg-background p-4">
            <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-numo-blue-200 bg-numo-blue-50/60 p-4 dark:border-numo-blue-900 dark:bg-numo-blue-950/30">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">Implementation notes</h4>
        <div className="mt-3 space-y-2">
          {MY_HEALTH_NOTES.map((note) => (
            <p key={note} className="text-sm text-foreground">
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
