import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advertise on Tread Affiliates",
  description:
    "Buy sponsored placements on Tread Affiliates comparison rails — AI health, calorie trackers, fitness wearables, sleep trackers. Featured $1,500/mo · Rail sponsor $4,000/mo.",
  openGraph: {
    title: "Advertise on Tread Affiliates",
    description:
      "Sponsored placements on high-intent comparison rails. Featured listing or full rail sponsorship.",
    type: "website",
  },
};

const MAIL = (subject: string, body: string) =>
  `mailto:brad@treadcompanies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const packages = [
  {
    tag: "Featured slot",
    title: "Featured listing",
    price: "$1,500",
    cadence: "/mo",
    points: [
      "Top placement on one comparison rail",
      "Sponsored badge on the card",
      "Monthly performance snapshot",
    ],
    href: MAIL(
      "Tread Affiliates Featured listing — $1,500/mo",
      "I want a Featured listing on Tread Affiliates ($1,500/mo).\n\nProduct / brand:\nPreferred rail (AI health / calorie / wearables / sleep):\nURL:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request Featured — $1,500/mo",
  },
  {
    tag: "Rail sponsor",
    title: "Own a rail",
    price: "$4,000",
    cadence: "/mo",
    points: [
      "Category sponsor across one full rail",
      "Hero mention + mid-rail module",
      "Priority for new comparison updates",
    ],
    href: MAIL(
      "Tread Affiliates Rail sponsor — $4,000/mo",
      "I want to sponsor a Tread Affiliates rail ($4,000/mo).\n\nProduct / brand:\nRail (AI health / calorie / wearables / sleep):\nURL:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request rail sponsor — $4,000/mo",
  },
];

export default function AdvertisePage() {
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
            <Link href="/sponsor" className="transition hover:text-signal">
              Newsletter
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
            <a
              href="#packages"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              Buy placement
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cone/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Tread Affiliates · Paid media
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Advertise on the rails that convert.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Sponsored placements on AI health, calorie, wearables, and sleep comparison pages —
            month-to-month, invoiced, no network credentials required from you.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#packages"
              className="rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white"
            >
              See packages
            </a>
            <Link
              href="/comparisons"
              className="rounded-sm border border-white/30 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white"
            >
              View rails
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cone">
          Sponsorship packages
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Two ways to buy attention.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Email to request invoice. We confirm rail, creative, and start date within one business day.
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

      <section className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">Ready to place?</h2>
          <p className="mt-3 max-w-xl text-muted">
            Same inbox as the rails. Tell us brand, rail, and budget band.
          </p>
          <a
            href={MAIL(
              "Tread Affiliates advertising inquiry",
              "I want to advertise on Tread Affiliates.\n\nBrand:\nRail interest:\nBudget band:\nName:\nEmail:\n"
            )}
            className="mt-8 inline-flex bg-cone px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-ink"
          >
            Email advertising desk
          </a>
        </div>
      </section>
    </div>
  );
}
