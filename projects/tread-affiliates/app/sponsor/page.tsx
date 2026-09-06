import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter Sponsor — Tread Affiliates",
  description:
    "Sponsor the Tread Affiliates weekly — $750 per issue or $2,400 for a 4-issue flight. Invoice by email.",
  openGraph: {
    title: "Newsletter Sponsor — Tread Affiliates",
    description:
      "Single-issue $750 · 4-issue flight $2,400. High-intent health & fitness affiliate audience.",
    type: "website",
  },
};

const MAIL = (subject: string, body: string) =>
  `mailto:brad@treadcompanies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const packages = [
  {
    tag: "Single issue",
    title: "One newsletter slot",
    price: "$750",
    cadence: "/issue",
    points: [
      "Primary sponsor block in one weekly send",
      "Your offer + CTA above the fold",
      "Issue performance snapshot",
    ],
    href: MAIL(
      "Tread Affiliates Newsletter sponsor — $750/issue",
      "I want a newsletter sponsor slot ($750/issue).\n\nBrand / offer:\nPreferred send week:\nURL:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request issue — $750",
  },
  {
    tag: "Flight",
    title: "Four-issue flight",
    price: "$2,400",
    cadence: "/4 issues",
    points: [
      "Four consecutive or paced issues",
      "Save $600 vs four singles",
      "Priority creative review each send",
    ],
    href: MAIL(
      "Tread Affiliates Newsletter flight — $2,400",
      "I want a 4-issue newsletter flight ($2,400).\n\nBrand / offer:\nStart week preference:\nURL:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request flight — $2,400",
  },
];

export default function SponsorPage() {
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
            <Link href="/audit" className="transition hover:text-signal">
              Audit
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
            <Link href="/newsletter" className="transition hover:text-signal">
              Newsletter
            </Link>
            <Link href="/podcast-ads" className="transition hover:text-signal">
              Podcast ads
            </Link>
            <a
              href="#packages"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              Sponsor
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cone/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Tread Affiliates · Newsletter
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Sponsor the weekly that already converts.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            One primary slot per issue — health, fitness, and AI coaching readers who click comparison rails.
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
          Sponsor packages
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Issue or flight.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Email for invoice. We confirm creative and send date within one business day.
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
