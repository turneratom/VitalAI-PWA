import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Park Valuation Report — $1,500 | Trailer Parks",
  description:
    "Commission a Trailer Parks valuation report for $1,500. Owner packet with comps, rent roll review, and indicative range. Invoice by email.",
  openGraph: {
    title: "Park Valuation Report — $1,500",
    description:
      "Paid valuation packet for owners preparing to list or refinance. Flat $1,500 invoice.",
    type: "website",
    siteName: siteConfig.name,
    url: "/valuation",
  },
};

const email = siteConfig.team.bradley.email;

const INVOICE = `mailto:${email}?subject=${encodeURIComponent(
  "Park Valuation Report — $1,500"
)}&body=${encodeURIComponent(
  `I want a Park Valuation Report ($1,500).\n\nPark name / city / state:\nSpaces:\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Indicative value range",
    body: "Low / base / high band grounded in recent regional comps and your stated NOI assumptions.",
  },
  {
    title: "Rent roll review",
    body: "Flag occupancy, delinquency, and rent vs market notes that buyers will ask about first.",
  },
  {
    title: "Buyer-ready summary",
    body: "A two-page narrative you can attach to a list packet or lender intro without rewriting.",
  },
  {
    title: "List Free next step",
    body: "If you list after the report, we already have the packet — Featured upgrade still optional at $299/mo.",
  },
];

export default function ValuationPage() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 20% 20%, rgba(251,191,36,0.28), transparent 55%), linear-gradient(160deg, #062536 0%, #0a4d68 45%, #041820 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Trailer Parks · Owners
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Park Valuation Report.
            <span className="mt-2 block text-accent">$1,500 flat.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Listing stays free. When you need a written range before you talk to
            buyers or lenders, commission the packet — invoiced, delivered, done.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={INVOICE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice report — $1,500
            </a>
            <Link
              href="/list-your-park"
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Or list free
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          What’s inside
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
          Built for owners who want a number before the calls start.
        </h2>
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
          <h2 className="mt-3 font-display text-3xl font-bold text-navy">
            One price. One report.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
            $1,500 flat. Typical turn five business days after invoice and source
            docs. Not an appraisal — an operator-grade valuation packet.
          </p>
          <a
            href={INVOICE}
            className="mt-8 inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-light"
          >
            Request invoice — $1,500
          </a>
        </div>
      </section>
    </main>
  );
}
