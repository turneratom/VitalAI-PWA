import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "LOI Review Pack — $599 | Trailer Parks",
  description:
    "LOI Review Pack: single LOI $599, or three-deal pack $1,499. Term redlines, seller ask vs market, walk-away notes. Invoice by email.",
  openGraph: {
    title: "LOI Review Pack — $599",
    description:
      "Single LOI $599 · Three-deal pack $1,499. Term redlines, seller ask vs market, walk-away notes.",
    type: "website",
    siteName: siteConfig.name,
    url: "/loi",
  },
};

const email = siteConfig.team.bradley.email;

const SINGLE = `mailto:${email}?subject=${encodeURIComponent(
  "LOI Review Pack — $599 single LOI"
)}&body=${encodeURIComponent(
  `I want an LOI Review Pack ($599 single LOI).\n\nPark / market:\nAsk price / spaces:\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const PACK = `mailto:${email}?subject=${encodeURIComponent(
  "LOI Review Three-Deal Pack — $1,499"
)}&body=${encodeURIComponent(
  `I want an LOI Review Three-Deal Pack ($1,499).\n\nDeals (up to 3 parks / markets):\nYour name:\nEmail:\nFirm (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Term redlines",
    body: "Marked-up LOI language on price, deposits, diligence windows, and contingencies buyers actually negotiate.",
  },
  {
    title: "Seller ask vs market",
    body: "A short read on whether the ask sits hot, fair, or soft versus recent market comps.",
  },
  {
    title: "Walk-away notes",
    body: "Clear notes on when to walk — so you do not chase a deal that will not close on terms.",
  },
  {
    title: "PDF delivery",
    body: "One review PDF per LOI — single deal at $599, or three deals in a pack at $1,499.",
  },
];

export default function LoiPage() {
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
            LOI Review Pack.
            <span className="mt-2 block text-accent">$599 · or $1,499.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Single LOI at $599, or three-deal pack at $1,499 — term redlines,
            seller ask vs market, walk-away notes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice review — $599
            </a>
            <a
              href={PACK}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Three-deal — $1,499
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55">
            <Link href="/comps" className="underline-offset-4 hover:text-white hover:underline">
              Comps
            </Link>
            <Link href="/underwriting" className="underline-offset-4 hover:text-white hover:underline">
              Underwriting
            </Link>
            <Link href="/valuation" className="underline-offset-4 hover:text-white hover:underline">
              Valuation
            </Link>
            <Link href="/deal-room" className="underline-offset-4 hover:text-white hover:underline">
              Deal Room
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          What’s included
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
          Built for buyers who need LOI clarity before earnest money moves.
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
            Two ways into the review.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
            Single LOI $599 · Three-deal pack $1,499. Pair with{" "}
            <Link href="/comps" className="font-medium text-primary hover:underline">
              Comps
            </Link>
            ,{" "}
            <Link href="/underwriting" className="font-medium text-primary hover:underline">
              Underwriting
            </Link>
            ,{" "}
            <Link href="/valuation" className="font-medium text-primary hover:underline">
              Valuation
            </Link>
            , or open a{" "}
            <Link href="/deal-room" className="font-medium text-primary hover:underline">
              Deal Room
            </Link>{" "}
            once terms hold.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-light"
            >
              Request $599 invoice
            </a>
            <a
              href={PACK}
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-background"
            >
              Three-deal $1,499
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
