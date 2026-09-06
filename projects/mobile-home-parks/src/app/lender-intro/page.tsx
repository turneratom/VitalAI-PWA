import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lender Intro Desk — $499 | Trailer Parks",
  description:
    "Lender Introduction Desk: single intro packet $499 flat, or Preferred desk $99/mo for priority lender matching. Invoice by email.",
  openGraph: {
    title: "Lender Intro Desk — $499",
    description:
      "Single intro packet $499 flat · Preferred desk $99/mo with priority lender matching.",
    type: "website",
    siteName: siteConfig.name,
    url: "/lender-intro",
  },
};

const email = siteConfig.team.bradley.email;

const SINGLE = `mailto:${email}?subject=${encodeURIComponent(
  "Lender Intro Desk — $499 single packet"
)}&body=${encodeURIComponent(
  `I want a Lender Intro Desk single packet ($499 flat).\n\nPark name / city / state:\nSpaces:\nLoan ask (approx):\nYour name:\nEmail:\nPhone (optional):\n\nPlease send invoice.`
)}`;

const PREFERRED = `mailto:${email}?subject=${encodeURIComponent(
  "Lender Intro Desk Preferred — $99/mo"
)}&body=${encodeURIComponent(
  `I want Preferred Lender Intro Desk ($99/mo — priority lender matching).\n\nPark / portfolio context:\nYour name:\nEmail:\nFirm (optional):\n\nPlease send invoice.`
)}`;

const perks = [
  {
    title: "Single intro packet — $499",
    body: "One curated lender intro pack: park summary, ask, and matched lender shortlist ready to send.",
  },
  {
    title: "Preferred desk — $99/mo",
    body: "Priority lender matching as deals move. Stay in the desk queue for faster re-intros and updates.",
  },
  {
    title: "Tied to the lender map",
    body: "Intros lean on the same lender relationships you see on Banks — not a cold blast list.",
  },
  {
    title: "Works with Featured",
    body: "Listing Featured is still optional at $299/mo if you want marketplace placement while the desk runs intros.",
  },
];

export default function LenderIntroPage() {
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
            Lender Intro Desk.
            <span className="mt-2 block text-accent">$499 · or $99/mo.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Single intro packet at $499 flat, or Preferred desk at $99/mo for
            priority lender matching when you need capital moving.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Invoice packet — $499
            </a>
            <a
              href={PREFERRED}
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              Preferred — $99/mo
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55">
            <Link href="/banks" className="underline-offset-4 hover:text-white hover:underline">
              Banks / lenders
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
          Built for owners and buyers who need a real lender door, not a directory.
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
            Two ways into the desk.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
            $499 flat for a single intro packet, or $99/mo Preferred for priority
            lender matching. Pair with{" "}
            <Link href="/valuation" className="font-medium text-primary hover:underline">
              Valuation
            </Link>
            ,{" "}
            <Link href="/deal-room" className="font-medium text-primary hover:underline">
              Deal Room
            </Link>
            , or browse{" "}
            <Link href="/banks" className="font-medium text-primary hover:underline">
              Banks
            </Link>{" "}
            first — Featured remains $299/mo if you want listing placement too.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SINGLE}
              className="inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-light"
            >
              Request $499 invoice
            </a>
            <a
              href={PREFERRED}
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-background"
            >
              Preferred $99/mo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
