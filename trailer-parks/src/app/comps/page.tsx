import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Market Comps Report — $349 | Trailer Parks",
  description:
    "Market Comps Report: single market $349, or multi-market pack (3 MSAs) $999. Recent sales, rent comps, occupancy notes, PDF delivery. Invoice by email.",
  openGraph: {
    title: "Market Comps Report — $349",
    description:
      "Single market $349 · Multi-market pack (3 MSAs) $999. Recent sales, rent comps, occupancy notes, PDF.",
    type: "website",
    siteName: siteConfig.name,
    url: "/comps",
  },
};

const email = siteConfig.team.bradley.email;

const SINGLE = `mailto:${email}?subject=${encodeURIComponent(
  "Market Comps Report — $349 single market"
)}&body=${encodeURIComponent(
  `I want a Market Comps Report ($349 single market).\n\nMSA / market:\nPark type / spaces (optional):\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const MULTI = `mailto:${email}?subject=${encodeURIComponent(
  "Market Comps Report Multi-Market — $999 (3 MSAs)"
)}&body=${encodeURIComponent(
  `I want a Multi-Market Comps Pack ($999 — 3 MSAs).\n\nMSAs (up to 3):\nYour name:\nEmail:\nFirm (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Recent sales",
    body: "Comparable park and land sales in the market, dated and sourced for a clean side-by-side.",
  },
  {
    title: "Rent comps",
    body: "Site rent and lot rent benchmarks so you can see where a park sits versus local peers.",
  },
  {
    title: "Occupancy notes",
    body: "Short notes on occupancy patterns and market tightness that buyers and lenders ask about first.",
  },
  {
    title: "PDF delivery",
    body: "A single comps PDF — one market at $349, or three MSAs in a multi-market pack at $999.",
  },
];

export default function CompsPage() {
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
            Trailer Parks · Capital
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Market Comps Report.
            <span className="mt-2 block text-accent">$349 · or $999.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Single market at $349, or multi-market pack (3 MSAs) at $999 —
            recent sales, rent comps, occupancy notes, PDF delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice report — $349
            </a>
            <a
              href={MULTI}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Multi-market — $999
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55">
            <Link href="/loi" className="underline-offset-4 hover:text-white hover:underline">
              LOI Review
            </Link>
            <Link href="/valuation" className="underline-offset-4 hover:text-white hover:underline">
              Valuation
            </Link>
            <Link href="/underwriting" className="underline-offset-4 hover:text-white hover:underline">
              Underwriting
            </Link>
            <Link href="/marketplace" className="underline-offset-4 hover:text-white hover:underline">
              Marketplace
            </Link>
            <Link href="/banks" className="underline-offset-4 hover:text-white hover:underline">
              Banks / lenders
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          What’s included
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
          Built for owners and buyers who need market comps, not a raw data dump.
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
            Two ways into the report.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
            Single market $349 · Multi-market pack (3 MSAs) $999. Pair with{" "}
            <Link href="/valuation" className="font-medium text-primary hover:underline">
              Valuation
            </Link>
            ,{" "}
            <Link href="/underwriting" className="font-medium text-primary hover:underline">
              Underwriting
            </Link>
            , browse the{" "}
            <Link href="/marketplace" className="font-medium text-primary hover:underline">
              Marketplace
            </Link>
            , or check{" "}
            <Link href="/banks" className="font-medium text-primary hover:underline">
              Banks
            </Link>{" "}
            first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-light"
            >
              Request $349 invoice
            </a>
            <a
              href={MULTI}
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-background"
            >
              Multi-market $999
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
