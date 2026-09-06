import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Firepit Diligence Pack — $149 | Trailer Parks",
  description:
    "Firepit Diligence Pack: single park $149, or three-park pack $299. Firepit flag notes, variance gap list, lender-ready summary. Invoice by email.",
  openGraph: {
    title: "Firepit Diligence Pack — $149",
    description:
      "Single park $149 · Three-park pack $299. Firepit flag notes, variance gap list, lender-ready summary.",
    type: "website",
    siteName: siteConfig.name,
    url: "/firepit",
  },
};

const email = siteConfig.team.bradley.email;

const SINGLE = `mailto:${email}?subject=${encodeURIComponent(
  "Firepit Diligence Pack — $149 single park"
)}&body=${encodeURIComponent(
  `I want a Firepit Diligence Pack ($149 single park).\n\nPark / market:\nSpaces / occupancy (if known):\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const PACK = `mailto:${email}?subject=${encodeURIComponent(
  "Firepit Diligence Pack Three-Park Pack — $299"
)}&body=${encodeURIComponent(
  `I want a Firepit Diligence Pack Three-Park Pack ($299).\n\nParks (up to 3):\nYour name:\nEmail:\nFirm (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Firepit flag notes",
    body: "Amenities, hours, and compliance flags after reviewing the park’s firepit file and recent tests.",
  },
  {
    title: "Amenities gap list",
    body: "Clear flags on amenities mismatches, missing tests, and what a lender or buyer counsel may push back on.",
  },
  {
    title: "Firepit hygiene",
    body: "Line-item notes where firepit docs look soft, padded, or missing for IC review.",
  },
  {
    title: "PDF delivery",
    body: "One memo PDF per park — single park at $149, or three parks in a pack at $299.",
  },
];

export default function FirepitPage() {
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
            Firepit Diligence Pack.
            <span className="mt-2 block text-accent">$149 · or $299.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Single park at $149, or three-park pack at $299 — firepit flag notes,
            variance gap list, lender-ready summary.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice memo — $149
            </a>
            <a
              href={PACK}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Three-park — $299
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55">
            <Link href="/epa" className="underline-offset-4 hover:text-white hover:underline">EPA</Link>
            <Link href="/septic" className="underline-offset-4 hover:text-white hover:underline">
              Cap Rate
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
          Built for buyers and lenders who need a clean firepit picture before they argue price.
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
            Single park $149 · Three-park pack $299. Pair with{" "}
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
            once well capacity is clear.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-light"
            >
              Request $149 invoice
            </a>
            <a
              href={PACK}
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-background"
            >
              Three-park $299
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
