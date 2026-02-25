import Link from "next/link";
import { DSPage } from "@/components/ds/page";

const links = [
  { href: "/foundations", label: "Foundations", desc: "Color, type, spacing, radius, motion." },
  { href: "/components", label: "Components", desc: "Primitives: Button, Panel, Input, Tooltip…" },
  { href: "/patterns", label: "Patterns", desc: "Composed flows: notifications, insight rows, cards." },
  { href: "/numo-home", label: "Numo Home", desc: "Composed page using patterns in one tab." },
  { href: "/notes", label: "Notes", desc: "Prototype: browse, add, and edit notes interactions." },
  {
    href: "/tablet-appointment",
    label: "Tablet Appointment",
    desc: "Prototype: next-appointment card minimizing into a nav appointment icon.",
  },
];

export default function Home() {
  return (
    <DSPage
      title="Design System"
      description="Tokens → primitives → patterns. Built with Next.js + shadcn."
    >
      <section className="grid gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-border bg-muted/40 px-4 py-4 hover:bg-muted transition"
          >
            <div className="text-sm font-semibold text-foreground">{l.label}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l.desc}</div>
          </Link>
        ))}
      </section>
    </DSPage>
  );
}
