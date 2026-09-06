import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Funnel Audit — Tread Affiliates",
  description:
    "Affiliate Funnel Audit — $2,500 flat or $6,000 for audit + 30-day rebuild sprint. Teardown of offer, landing page, and rail creative with written scorecard. Invoice by email.",
  openGraph: {
    title: "Affiliate Funnel Audit — Tread Affiliates",
    description:
      "Audit $2,500 · Audit + 30-day rebuild sprint $6,000. Scorecard and prioritized fixes.",
    type: "website",
  },
};

const MAIL = (subject: string, body: string) =>
  `mailto:brad@treadcompanies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const packages = [
  {
    tag: "Audit",
    title: "Funnel audit",
    price: "$2,500",
    cadence: " flat",
    points: [
      "Teardown of offer, landing page, and rail creative",
      "Written scorecard across conversion levers",
      "Prioritized fix list you can hand to your team",
    ],
    href: MAIL(
      "Tread Affiliates Funnel Audit — $2,500",
      "I want an Affiliate Funnel Audit ($2,500 flat).\n\nOffer / brand:\nLanding URL:\nRail / creative links:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request audit — $2,500",
  },
  {
    tag: "Sprint",
    title: "Audit + 30-day rebuild",
    price: "$6,000",
    cadence: " package",
    points: [
      "Everything in the flat audit",
      "30-day rebuild sprint on copy, LP, and rail creative",
      "Async reviews and a final before/after checklist",
    ],
    href: MAIL(
      "Tread Affiliates Funnel Audit + rebuild — $6,000",
      "I want the Affiliate Funnel Audit + 30-day rebuild sprint ($6,000).\n\nOffer / brand:\nLanding URL:\nRail / creative links:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request sprint — $6,000",
  },
];

export default function AuditPage() {
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
            <Link href="/sponsor" className="transition hover:text-signal">
              Newsletter
            </Link>
            <Link href="/creative" className="transition hover:text-signal">
              Creative
            </Link>
            <Link href="/launch" className="transition hover:text-signal">
              Launch
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
            <a
              href="#packages"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              Audit
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cone/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Tread Affiliates · Audit
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Affiliate Funnel Audit
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Teardown of offer, landing page, and rail creative — with a written
            scorecard and prioritized fixes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#packages"
              className="rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white"
            >
              See packages
            </a>
            <Link
              href="/advertise"
              className="rounded-sm border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white"
            >
              Prefer rail ads
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cone">
          Audit packages
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Scorecard or rebuild sprint.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Email for invoice. We confirm scope and kickoff within one business day.
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
