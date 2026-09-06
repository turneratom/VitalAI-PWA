import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Underwriting Pack — $799 | Trailer Parks",
  description:
    "Underwriting Pack: single park $799, or portfolio pack (up to 5 parks) $2,499. T-12 normalize, rent roll summary, lender-ready PDF. Invoice by email.",
  openGraph: {
    title: "Underwriting Pack — $799",
    description:
      "Single pack $799 · Portfolio pack (up to 5 parks) $2,499. T-12, rent roll, lender-ready PDF.",
    type: "website",
    siteName: siteConfig.name,
    url: "/underwriting",
  },
};

const email = siteConfig.team.bradley.email;

const SINGLE = `mailto:${email}?subject=${encodeURIComponent(
  "Underwriting Pack — $799 single"
)}&body=${encodeURIComponent(
  `I want an Underwriting Pack ($799 single).\n\nPark name / city / state:\nSpaces:\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const PORTFOLIO = `mailto:${email}?subject=${encodeURIComponent(
  "Underwriting Pack Portfolio — $2,499 (up to 5 parks)"
)}&body=${encodeURIComponent(
  `I want a Portfolio Underwriting Pack ($2,499 — up to 5 parks).\n\nParks (name / city / state):\nYour name:\nEmail:\nFirm (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "T-12 normalize",
    body: "Trailing twelve months cleaned into a lender-readable format — one consistent sheet per park.",
  },
  {
    title: "Rent roll summary",
    body: "Occupancy, rents, and unit mix summarized so underwriters see the story without digging.",
  },
  {
    title: "Lender-ready PDF",
    body: "A single packet you can attach to a loan ask, valuation follow-up, or Deal Room share.",
  },
  {
    title: "Single or portfolio",
    body: "One park at $799, or up to five parks in a portfolio pack at $2,499.",
  },
];

export default function UnderwritingPage() {
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
            Underwriting Pack.
            <span className="mt-2 block text-accent">$799 · or $2,499.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Single pack at $799, or portfolio pack (up to 5 parks) at $2,499 —
            T-12 normalize, rent roll summary, lender-ready PDF.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice pack — $799
            </a>
            <a
              href={PORTFOLIO}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Portfolio — $2,499
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55">
            <Link href="/valuation" className="underline-offset-4 hover:text-white hover:underline">
              Valuation
            </Link>
            <Link href="/lender-intro" className="underline-offset-4 hover:text-white hover:underline">
              Lender Intro
            </Link>
            <Link href="/deal-room" className="underline-offset-4 hover:text-white hover:underline">
              Deal Room
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
          Built for owners and buyers who need a clean underwriting packet, not a spreadsheet dump.
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
            Two ways into the pack.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
            Single pack $799 · Portfolio pack (up to 5 parks) $2,499. Pair with{" "}
            <Link href="/valuation" className="font-medium text-primary hover:underline">
              Valuation
            </Link>
            ,{" "}
            <Link href="/lender-intro" className="font-medium text-primary hover:underline">
              Lender Intro
            </Link>
            ,{" "}
            <Link href="/deal-room" className="font-medium text-primary hover:underline">
              Deal Room
            </Link>
            , or browse{" "}
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
              Request $799 invoice
            </a>
            <a
              href={PORTFOLIO}
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-background"
            >
              Portfolio $2,499
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
