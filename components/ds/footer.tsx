import Link from "next/link";

const SITEMAP_GROUPS = [
  {
    title: "Core",
    links: [
      { href: "/", label: "Home" },
      { href: "/foundations", label: "Foundations" },
      { href: "/components", label: "Components" },
    ],
  },
  {
    title: "Patterns",
    links: [
      { href: "/patterns", label: "Patterns Overview" },
      { href: "/patterns/clinical", label: "Patterns Clinical" },
      { href: "/patterns/patient", label: "Patterns Patient" },
    ],
  },
  {
    title: "Prototypes",
    links: [
      { href: "/numo-home", label: "Clinical Dashboard" },
      { href: "/notes", label: "Notes" },
      { href: "/tablet-appointment", label: "Tablet Appointment" },
      { href: "/prototype-login", label: "Login Experience" },
      { href: "/user-preferences", label: "User Preferences" },
    ],
  },
];

export function DSFooter() {
  return (
    <footer className="border-t border-border px-5 py-16 md:px-6">
      <div className="inline-grid grid-cols-1 items-start gap-x-10 gap-y-4 md:grid-cols-3">
        {SITEMAP_GROUPS.map((group) => (
          <section key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.title}</h3>
            <ul className="mt-2 space-y-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/90 transition hover:text-foreground hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <p className="text-sm text-muted-foreground">
          Designed by{" "}
          <a
            href="https://edbelluti.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground transition hover:text-numo-teal-400"
          >
            edbelluti
          </a>
        </p>
      </div>
    </footer>
  );
}
