import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MONITORING_BAR_ROWS = [
  {
    area: "Monitoring message and action labels",
    colors: "Light slate and gray text on dark blue surfaces",
    contrast: "9.7:1 to 11.6:1",
    guidance: "Passes AA for normal text. Baseline for core copy.",
  },
  {
    area: "Action icon inside chip",
    colors: "Teal icon on darker blue icon chip",
    contrast: "About 6.7:1",
    guidance: "Keeps the icon readable without depending on the surrounding row background.",
  },
  {
    area: "Overflow trigger button",
    colors: "Orange text and border on the blue monitoring bar",
    contrast: "About 6.4:1",
    guidance: "Action item.",
  },
  {
    area: "Chevron and secondary indicators",
    colors: "Muted slate icon on dark blue chip",
    contrast: "High contrast in current implementation",
    guidance: "Secondary icons quieter than labels, while easy to see at a glance.",
  },
  {
    area: "Decorative borders and dividers",
    colors: "Blue border on slightly different blue surface",
    contrast: "About 1.5:1",
    guidance: "Fine for decoration only. Do not rely on these low-contrast edges to communicate state, focus, or action.",
  },
  {
    area: "Recording in-progress animation",
    colors: "Animated waveform",
    contrast: "Do not rely on animation alone",
    guidance: "Use the moving waveform as a supporting cue only. Pair it with persistent text such as 'Monitoring is active' so people who cannot perceive motion still get the same status.",
  },
  {
    area: "Status communication",
    colors: "Text status, icon, and menu action labels together",
    contrast: "Keep status text at AA contrast",
    guidance: "The current copy already names each state. Keep that text visible so pause, start, and stop timing are never conveyed by color or animation alone.",
  },
  {
    area: "Menu trigger and actions",
    colors: "Visible button chrome plus text or icon labels",
    contrast: "Keep controls above non-text contrast expectations",
    guidance: "The trigger has an accessible name, but the menu pattern should also support keyboard entry, visible focus, Escape to dismiss, and predictable focus movement between actions.",
  },
  {
    area: "State updates after selection",
    colors: "Updated bar message after an action is chosen",
    contrast: "Announcement matters more than color",
    guidance: "If this pattern becomes production UI, consider announcing the new monitoring state with a polite live region so screen reader users hear the change immediately after choosing an action.",
  },
] as const;

export function MonitoringBarAccessibilityNotes() {
  return (
    <section
      aria-labelledby="monitoring-bar-accessibility-heading"
      className="rounded-2xl bg-card p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Accessibility
          </p>
          <h3 id="monitoring-bar-accessibility-heading" className="mt-1 text-xl font-semibold text-foreground">
            Monitoring bar color and contrast notes
          </h3>
        </div>
        <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Pattern-specific
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[24%]">Area</TableHead>
              <TableHead className="w-[24%]">Colors</TableHead>
              <TableHead className="w-[16%]">Contrast</TableHead>
              <TableHead className="w-[36%]">Accessibility note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MONITORING_BAR_ROWS.map((row) => (
              <TableRow key={row.area}>
                <TableCell className="align-top font-medium text-foreground">{row.area}</TableCell>
                <TableCell className="align-top text-muted-foreground">{row.colors}</TableCell>
                <TableCell className="align-top text-foreground">{row.contrast}</TableCell>
                <TableCell className="max-w-0 whitespace-normal wrap-break-word align-top text-muted-foreground">
                  {row.guidance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
