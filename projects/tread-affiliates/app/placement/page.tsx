import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Featured Comparison Placement — Tread Affiliates",
  description:
    "Featured Comparison Placement — single placement $1,800 or quarterly flight $5,400. Top slot on a comparison rail, creative QA, performance snapshot. Invoice by email.",
  openGraph: {
    title: "Featured Comparison Placement — Tread Affiliates",
    description:
      "Single placement $1,800 · Quarterly flight $5,400. Top slot on a comparison rail.",
    type: "website",
  },
};

const MAIL = (subject: string, body: string) =>
  `mailto:brad@treadcompanies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const packages = [
  {
    tag: "Single",
    title: "Featured placement",
    price: "$1,800",
    cadence: " one-time",
    points: [
      "Top featured slot on one comparison rail",
      "Creative QA against rail template",
      "Tracking links and UTM setup",
      "Issue performance snapshot",
    ],
    href: MAIL(
      "Tread Affiliates Featured placement — $1,800",
      "I want a Featured comparison placement ($1,800).\n\nBrand / offer:\nPreferred rail / category:\nURL:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request placement — $1,800",
  },
  {
    tag: "Quarterly",
    title: "Quarterly flight",
    price: "$5,400",
    cadence: "/quarter",
    points: [
      "Three featured placements across the quarter",
      "Save vs three singles",
      "Priority creative review each cycle",
      "Quarterly performance rollup",
    ],
    href: MAIL(
      "Tread Affiliates Featured quarterly flight — $5,400",
      "I want a Featured quarterly flight ($5,400).\n\nBrand / offer:\nPreferred rails:\nStart month:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request quarterly — $5,400",
  },
];

export default function PlacementPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight md:text-xl">
            TREAD <span className="text-signal">Affiliates</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <Link href="/comparisons" className="transition hover:text-signal">
              Rails
            </Link>
            <Link href="/advertise" className="transition hover:text-signal">
              Advertise
            </Link>
            <Link href="/sponsor" className="transition hover:text-signal">
              Sponsor
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
            <Link href="/email" className="transition hover:text-signal">
              Email
            </Link>
            <Link href="/creative-kit" className="transition hover:text-signal">
              Creative
            </Link>
            <Link href="/tracking" className="transition hover:text-signal">
              Tracking
            </Link>
            <Link href="/media" className="transition hover:text-signal">
              Media
            </Link>
            <Link href="/retail" className="transition hover:text-signal">
              Retail
            </Link>
            <Link href="/catalog" className="transition hover:text-signal">
              Catalog
            </Link>
            <Link href="/bundling" className="transition hover:text-signal">
              Bundling
            </Link>
            <Link href="/partners" className="transition hover:text-signal">
              Partners
            </Link>
            <a
              href="#packages"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              Placement
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cone/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Tread Affiliates · Featured Placement
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Own the top slot on a comparison rail that already converts.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Single featured placement or a quarterly flight — creative QA, tracking,
            and a performance snapshot. Invoice by email until Stripe is live.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#packages"
              className="inline-flex rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white"
            >
              See placement packages
            </a>
            <Link
              href="/comparisons"
              className="inline-flex border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:border-signal hover:text-signal"
            >
              View rails
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
          Packages
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          One featured slot, or a quarter of them.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <article
              key={pkg.title}
              className="flex flex-col border border-line bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
                {pkg.tag}
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold">{pkg.title}</h3>
              <p className="mt-2 text-3xl font-extrabold text-ink">
                {pkg.price}
                <span className="text-base font-semibold text-ink/50">{pkg.cadence}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-ink/75">
                {pkg.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-signal">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={pkg.href}
                className="mt-8 inline-flex justify-center rounded-sm bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-signal hover:text-ink"
              >
                {pkg.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-xl text-white/70">
            Prefer a managed partner desk or operator coaching? Same inbox.
          </p>
          <a
            href="mailto:brad@treadcompanies.com?subject=Tread%20Affiliates%20Featured%20Placement"
            className="inline-flex rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white"
          >
            Email Tread Affiliates
          </a>
        </div>
      </section>
    </div>
  );
}
