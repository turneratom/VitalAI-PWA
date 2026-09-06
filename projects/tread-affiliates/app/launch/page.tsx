import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "30-Day Affiliate Launch Sprint — Tread Affiliates",
  description:
    "30-Day Affiliate Launch Sprint — $4,500 flat or $7,500 with creative + media plan. Offer positioning, rail placement plan, 10 creatives, first 30-day calendar. Invoice by email.",
  openGraph: {
    title: "30-Day Affiliate Launch Sprint — Tread Affiliates",
    description:
      "$4,500 flat · or $7,500 with creative + media plan. Launch sprint for affiliate rails.",
    type: "website",
  },
};

const MAIL = (subject: string, body: string) =>
  `mailto:brad@treadcompanies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const packages = [
  {
    tag: "Sprint",
    title: "Launch sprint",
    price: "$4,500",
    cadence: " flat",
    points: [
      "Offer positioning for affiliate rails",
      "Rail placement plan for first 30 days",
      "10 creatives sized for primary placements",
      "First 30-day calendar with launch cadence",
    ],
    href: MAIL(
      "Tread Affiliates Launch Sprint — $4,500",
      "I want a 30-Day Affiliate Launch Sprint ($4,500 flat).\n\nOffer / brand:\nPreferred rail(s):\nExisting creative links (if any):\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request sprint — $4,500",
  },
  {
    tag: "Sprint + plan",
    title: "Sprint with creative + media plan",
    price: "$7,500",
    cadence: " flat",
    points: [
      "Everything in the Launch sprint",
      "Expanded creative set and hook variants",
      "Media plan mapped to rail placements",
      "Budget and cadence notes for the first 30 days",
    ],
    href: MAIL(
      "Tread Affiliates Launch Sprint — $7,500 with creative + media plan",
      "I want a 30-Day Affiliate Launch Sprint with creative + media plan ($7,500).\n\nOffer / brand:\nPreferred rail(s):\nExisting creative links (if any):\nMedia budget band:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request sprint + plan — $7,500",
  },
];

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight md:text-xl">
            TREAD <span className="text-signal">Affiliates</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-white/70">
            <Link href="/comparisons" className="transition hover:text-signal">
              Rails
            </Link>
            <Link href="/advertise" className="transition hover:text-signal">
              Advertise
            </Link>
            <Link href="/creative" className="transition hover:text-signal">
              Creative
            </Link>
            <Link href="/partners" className="transition hover:text-signal">
              Partners
            </Link>
            <Link href="/operator" className="transition hover:text-signal">
              Operator
            </Link>
            <Link href="/placement" className="transition hover:text-signal">
              Placement
            </Link>
            <Link href="/seo" className="transition hover:text-signal">
              SEO
            </Link>
            <Link href="/cro" className="transition hover:text-signal">
              CRO
            </Link>
            <Link href="/audit" className="transition hover:text-signal">
              Audit
            </Link>
            <Link href="/sponsor" className="transition hover:text-signal">
              Newsletter
            </Link>
            <a
              href="#packages"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              Launch
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cone/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Tread Affiliates · Launch
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            30-Day Affiliate Launch Sprint
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Offer positioning, rail placement plan, 10 creatives, and your first
            30-day calendar — flat fee, invoiced by email.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#packages"
              className="rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white"
            >
              See packages
            </a>
            <Link
              href="/creative"
              className="rounded-sm border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white"
            >
              Prefer creative pack
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cone">
          Launch packages
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Sprint alone or with creative + media plan.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Email brad@treadcompanies.com for invoice. We confirm rails and kickoff
          window within one business day.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <article
              key={pkg.title}
              className="flex flex-col border border-line bg-white p-7 shadow-[0_18px_50px_rgba(16,20,26,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cone">{pkg.tag}</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold">{pkg.title}</h3>
              <p className="mt-2 font-display text-4xl font-extrabold text-ink">
                {pkg.price}
                <span className="text-lg font-semibold text-muted">{pkg.cadence}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-muted">
                {pkg.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-signal">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={pkg.href}
                className="mt-8 inline-flex justify-center bg-ink px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-ink-soft"
              >
                {pkg.cta}
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
