import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tax Basis Memo — $399 | Trailer Parks",
  description:
    "Tax Basis Memo: single park $399, or three-park pack $1,099. Tax basis notes, depreciation flags, CPA-ready summary. Invoice by email.",
  openGraph: {
    title: "Tax Basis Memo — $399",
    description:
      "Single park $399 · Three-park pack $1,099. Tax basis notes, depreciation flags, CPA-ready summary.",
    type: "website",
    siteName: siteConfig.name,
    url: "/tax",
  },
};

const email = siteConfig.team.bradley.email;

const SINGLE = `mailto:${email}?subject=${encodeURIComponent(
  "Tax Basis Memo — $399 single park"
)}&body=${encodeURIComponent(
  `I want a Tax Basis Memo ($399 single park).\n\nPark / market:\nSpaces / occupancy (if known):\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const PACK = `mailto:${email}?subject=${encodeURIComponent(
  "Tax Basis Memo Three-Park Pack — $1,099"
)}&body=${encodeURIComponent(
  `I want a Tax Basis Memo Three-Park Pack ($1,099).\n\nParks (up to 3):\nYour name:\nEmail:\nFirm (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Tax basis notes",
    body: "A stated tax basis notes after cleaning one-time noise and owner-specific add-backs.",
  },
  {
    title: "Depreciation flags",
    body: "Clear flags on what was added back — and what a lender may push back on.",
  },
  {
    title: "Basis hygiene",
    body: "Line-item notes where expenses look soft, padded, or missing for IC review.",
  },
  {
    title: "PDF delivery",
    body: "One memo PDF per park — single park at $399, or three parks in a pack at $1,099.",
  },
];

export default function TaxPage() {
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
            Tax Basis Memo.
            <span className="mt-2 block text-accent">$399 · or $1,099.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Single park at $399, or three-park pack at $1,099 — tax basis notes,
            depreciation flags, CPA-ready summary.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice memo — $399
            </a>
            <a
              href={PACK}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Three-park — $1,099
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55">
            <Link href="/noi" className="underline-offset-4 hover:text-white hover:underline">
              Cap Rate
            </Link>
            <Link href="/insurance" className="underline-offset-4 hover:text-white hover:underline">
              Insurance
            </Link>
            <Link href="/survey" className="underline-offset-4 hover:text-white hover:underline">
              Site Survey
            </Link>
            <Link href="/rent-roll" className="underline-offset-4 hover:text-white hover:underline">
              Rent Roll
            </Link>
            <Link href="/loi" className="underline-offset-4 hover:text-white hover:underline">
              LOI Review
            </Link>
            <Link href="/comps" className="underline-offset-4 hover:text-white hover:underline">
              Comps
            </Link>
            <Link href="/underwriting" className="underline-offset-4 hover:text-white hover:underline">
              Underwriting
            </Link>
            <Link href="/valuation" className="underline-offset-4 hover:text-white hover:underline">
              Valuation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          What’s included
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
          Built for buyers and lenders who need a clean NOI before they argue price.
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
            Two ways into the memo.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
            Single park $399 · Three-park pack $1,099. Pair with{" "}
            <Link href="/cap-rate" className="font-medium text-primary hover:underline">
              Cap Rate
            </Link>
            ,{" "}
            <Link href="/rent-roll" className="font-medium text-primary hover:underline">
              Rent Roll
            </Link>
            ,{" "}
            <Link href="/comps" className="font-medium text-primary hover:underline">
              Comps
            </Link>
            ,{" "}
            <Link href="/underwriting" className="font-medium text-primary hover:underline">
              Underwriting
            </Link>
            , or{" "}
            <Link href="/valuation" className="font-medium text-primary hover:underline">
              Valuation
            </Link>{" "}
            once NOI is clean.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-light"
            >
              Request $399 invoice
            </a>
            <a
              href={PACK}
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-background"
            >
              Three-park $1,099
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
