import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buyer Pro — $99/mo | Trailer Parks",
  description:
    "Buyer Pro unlocks full T-12 downloads, saved deal alerts, and underwriting exports for $99/month or $999/year. Invoice by email.",
  openGraph: {
    title: "Buyer Pro — $99/mo",
    description:
      "Full financials, alerts, and exports for serious park buyers. Monthly or annual invoice.",
    type: "website",
    siteName: siteConfig.name,
    url: "/buyer-pro",
  },
};

const email = siteConfig.team.bradley.email;

const MONTHLY = `mailto:${email}?subject=${encodeURIComponent(
  "Buyer Pro — $99/mo"
)}&body=${encodeURIComponent(
  `I want Buyer Pro monthly ($99/mo).\n\nName:\nEmail:\nFirm (optional):\nMarkets of interest:\n\nPlease send invoice.`
)}`;

const ANNUAL = `mailto:${email}?subject=${encodeURIComponent(
  "Buyer Pro annual — $999/yr"
)}&body=${encodeURIComponent(
  `I want Buyer Pro annual ($999/yr — save $189).\n\nName:\nEmail:\nFirm (optional):\nMarkets of interest:\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Full T-12 downloads",
    body: "Export verified trailing-twelve statements on every live listing — not just on-page previews.",
  },
  {
    title: "Deal alerts",
    body: "Instant ping when a park matches your lot band, state, and cap-rate filters.",
  },
  {
    title: "Underwriting exports",
    body: "CSV / sheet-ready packs for your model — occupancy, rent roll summary, expense lines.",
  },
  {
    title: "Priority intro",
    body: "Flagged intros to listing owners when you request contact through Buyer Pro.",
  },
];

export default function BuyerProPage() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 80% 10%, rgba(56,189,248,0.35), transparent 55%), linear-gradient(160deg, #062536 0%, #0a4d68 45%, #041820 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Trailer Parks · Buyer Pro
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Buyer Pro.
            <span className="mt-2 block text-accent">$99 / month.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Free browsing stays free. Buyer Pro unlocks full financial downloads,
            alerts, and underwriting exports for buyers who actually close.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={MONTHLY}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice monthly — $99
            </a>
            <a
              href={ANNUAL}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Annual — $999
            </a>
          </div>
          <p className="mt-4 text-sm text-white/55">
            Annual saves $189 vs twelve months. Cancel before next invoice.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          What you get
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
          Built for buyers who underwrite.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
          Listing a park is still $0. Buyer Pro is optional paid access for the
          side of the market that needs the full packet.
        </p>
        <ul className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
          {perks.map((item) => (
            <li key={item.title} className="border-t border-border pt-6 sm:border-0 sm:pt-0">
              <h3 className="font-display text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-foreground/70">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
            Monthly or annual. Same inbox.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="border border-border bg-background p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Monthly
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-navy">$99</p>
              <p className="mt-2 text-foreground/70">Billed each month. Cancel anytime before renewal.</p>
              <a
                href={MONTHLY}
                className="mt-8 inline-flex bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary/90"
              >
                Request $99/mo invoice
              </a>
            </article>
            <article className="border border-accent/40 bg-background p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Annual · best value
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-navy">$999</p>
              <p className="mt-2 text-foreground/70">Save $189 vs monthly. One invoice for the year.</p>
              <a
                href={ANNUAL}
                className="mt-8 inline-flex bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
              >
                Request $999/yr invoice
              </a>
            </article>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/buyers"
              className="inline-flex border border-border px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy transition hover:border-primary hover:text-primary"
            >
              Free buyer portal
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex border border-border px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy transition hover:border-primary hover:text-primary"
            >
              Browse marketplace
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
