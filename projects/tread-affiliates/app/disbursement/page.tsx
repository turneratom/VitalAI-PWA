import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disbursement Kit — Tread Affiliates",
  description:
    "Affiliate Disbursement Kit — one-time sprint $15 or monthly Disbursement kit $2/mo. Disbursement plan, Disbursement mix, Disbursement pairing. Invoice by email.",
  openGraph: {
    title: "Affiliate Disbursement Kit — Tread Affiliates",
    description: "Sprint $15 · Monthly desk $2/mo. Disbursement plan, Disbursement mix, Disbursement pairing.",
    type: "website",
  },
};

const MAIL = (subject: string, body: string) =>
  `mailto:brad@treadcompanies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const packages = [
  {
    tag: "Sprint",
    title: "Disbursement kit",
    price: "$15",
    period: " one-time",
    points: [
      "Disbursement plan across your primary rails",
      "Creator mix and post bands for primary funnels",
      "Creative-to-creator pairing notes",
      "30-day Disbursement kit execution checklist",
    ],
    href: MAIL(
      "Tread Affiliates Disbursement kit — $15",
      "I want an Affiliate Disbursement kit ($15).\n\nBrand / site:\nPrimary rails:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request sprint — $15",
  },
  {
    tag: "Desk",
    title: "Monthly Disbursement kit",
    price: "$2",
    period: "/mo",
    points: [
      "Everything in the sprint, ongoing",
      "Monthly Disbursement kit and ROAS review",
      "Two new creator or creative swaps per month",
      "Priority Slack/email desk",
    ],
    href: MAIL(
      "Tread Affiliates Disbursement kit — $2/mo",
      "I want a Monthly Disbursement kit ($2/mo).\n\nBrand / site:\nPrimary rails:\nPreferred start:\nName:\nEmail:\n\nPlease send invoice."
    ),
    cta: "Request desk — $2/mo",
  },
];

export default function DisbursementPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight md:text-xl">
            TREAD <span className="text-signal">Affiliates</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <Link href="/comparisons" className="transition hover:text-signal">Rails</Link>
            <Link href="/placement" className="transition hover:text-signal">Placement</Link>
            <Link href="/operator" className="transition hover:text-signal">Operator</Link>
            <Link href="/partners" className="transition hover:text-signal">Partners</Link>
            <Link href="/seo" className="transition hover:text-signal">SEO</Link>
            <Link href="/email" className="transition hover:text-signal">Email</Link>
            <Link href="/creative-kit" className="transition hover:text-signal">Creative</Link>
            <Link href="/tracking" className="transition hover:text-signal">Tracking</Link>
            <Link href="/media" className="transition hover:text-signal">Media</Link>
            <Link href="/retail" className="transition hover:text-signal">Retail</Link>
            <Link href="/catalog" className="transition hover:text-signal">Catalog</Link>
            <Link href="/bundling" className="transition hover:text-signal">Bundling</Link>
            <Link href="/newsletter" className="transition hover:text-signal">Newsletter</Link>
            <Link href="/podcast-ads" className="transition hover:text-signal">Podcast ads</Link>
            <Link href="/shorts" className="transition hover:text-signal">Shorts</Link>
            <Link href="/ugc" className="transition hover:text-signal">UGC</Link>
            <Link href="/influencer" className="transition hover:text-signal">Influencer</Link>
            <Link href="/seeding" className="transition hover:text-signal">Seeding</Link>
            <Link href="/creator-kit" className="transition hover:text-signal">Creator kit</Link>
            <Link href="/brand-kit" className="transition hover:text-signal">Brand kit</Link>
            <Link href="/landing-kit" className="transition hover:text-signal">Landing kit</Link>
            <Link href="/funnel-kit" className="transition hover:text-signal">Funnel kit</Link>
            <Link href="/retarget" className="transition hover:text-signal">Retarget</Link>
            <Link href="/upsell" className="transition hover:text-signal">Upsell</Link>
            <Link href="/cro" className="transition hover:text-signal">CRO</Link>
            <Link href="/rebate" className="transition hover:text-signal">Rebate</Link>
            <Link href="/holdback" className="transition hover:text-signal">Holdback</Link>
            <Link href="/clawback" className="transition hover:text-signal">Clawback</Link>
            <Link href="/reserve" className="transition hover:text-signal">Reserve</Link>
            <Link href="/chargeback" className="transition hover:text-signal">Chargeback</Link>
            <Link href="/escrow" className="transition hover:text-signal">Escrow</Link>
            <Link href="/recoup" className="transition hover:text-signal">Recoup</Link>
            <Link href="/disbursement" className="transition hover:text-signal">Disbursement kit</Link>
<Link href="/remittal" className="transition hover:text-signal">Remittal kit</Link>
<Link href="/transfer" className="transition hover:text-signal">Transfer kit</Link>
<Link href="/wire" className="transition hover:text-signal">Wire kit</Link>
            <Link href="/ach" className="transition hover:text-signal">ACH kit</Link>
            <Link href="/rtp" className="transition hover:text-signal">RTP kit</Link>
            <Link href="/fednow" className="transition hover:text-signal">FedNow kit</Link>
            <Link href="/same-day-ach" className="transition hover:text-signal">Same-Day ACH kit</Link>
            <Link href="/instant-pay" className="transition hover:text-signal">Instant-Pay kit</Link>
            <Link href="/push-pay" className="transition hover:text-signal">Push-Pay kit</Link>
            <Link href="/fast-pay" className="transition hover:text-signal">Fast-Pay kit</Link>
            <a href="#packages" className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white">Disbursement kit</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Tread Affiliates · Disbursement kit</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Disbursement kit packages that convert comparison-rail traffic — not vanity posts.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            One-time sprint or monthly desk: Disbursement plan, Disbursement mix, and Disbursement pairing.
            Invoice by email until Stripe is live.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#packages" className="inline-flex rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white">
              See Disbursement kit packages
            </a>
            <Link href="/comparisons" className="inline-flex border border-white/30 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition hover:border-signal hover:text-signal">
              View rails
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">Packages</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Sprint once, or keep a monthly Disbursement kit.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <article key={pkg.title} className="flex flex-col border border-line bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">{pkg.tag}</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold">{pkg.title}</h3>
              <p className="mt-2 text-3xl font-extrabold text-ink">
                {pkg.price}
                <span className="text-base font-semibold text-ink/50">{pkg.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-ink/75">
                {pkg.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-signal">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a href={pkg.href} className="mt-8 inline-flex justify-center rounded-sm bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-signal hover:text-ink">
                {pkg.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-xl text-white/70">Prefer featured placement or operator coaching? Same inbox.</p>
          <a href="mailto:brad@treadcompanies.com?subject=Tread%20Affiliates%20Media" className="inline-flex rounded-sm bg-signal px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-white">
            Email Tread Affiliates
          </a>
        </div>
      </section>
    </div>
  );
}
