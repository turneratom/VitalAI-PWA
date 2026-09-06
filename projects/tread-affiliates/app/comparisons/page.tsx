import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comparison Rails — Tread Affiliates",
  description:
    "All Tread Affiliates monetization rails in one place. Ranked tool comparisons with affiliate CTAs — AI health, calorie trackers, fitness wearables, and sleep trackers.",
  openGraph: {
    title: "Tread Affiliates — Comparison Rails",
    description:
      "Open the rails that pay: ranked AI health apps, calorie trackers, fitness wearables, and sleep trackers.",
    type: "website",
  },
};

const rails = [
  {
    href: "/comparisons/best-ai-health-apps",
    title: "Best AI health apps",
    angle: "High-intent health traffic → ranked apps with affiliate CTAs that convert.",
    accent: "signal" as const,
  },
  {
    href: "/comparisons/best-calorie-tracker-apps",
    title: "Best calorie tracker apps",
    angle: "Macro / deficit avatars already shopping — promote the trackers that pay.",
    accent: "cone" as const,
  },
  {
    href: "/comparisons/best-fitness-wearables",
    title: "Best fitness wearables",
    angle: "Recovery and band buyers with recurring payout stories worth pitching.",
    accent: "ink" as const,
  },
  {
    href: "/comparisons/best-sleep-trackers",
    title: "Best sleep trackers",
    angle: "Oura rings, Eight Sleep pods, budget apps — sleep traffic with affiliate CTAs.",
    accent: "signal" as const,
  },
];

export default function ComparisonsHubPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight md:text-xl">
            TREAD <span className="text-signal">Affiliates</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-white/70">
            <Link href="/" className="transition hover:text-signal">
              Guide
            </Link>
            <Link href="/advertise" className="transition hover:text-signal">
              Advertise
            </Link>
            <Link href="/sponsor" className="transition hover:text-signal">
              Sponsor
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
            <Link href="/placement" className="transition hover:text-signal">
              Placement
            </Link>
            <Link href="/seo" className="transition hover:text-signal">
              SEO
            </Link>
            <Link href="/cro" className="transition hover:text-signal">
              CRO
            </Link>
            <Link href="/email" className="transition hover:text-signal">
              Email
            </Link>
            <Link href="/creative-kit" className="transition hover:text-signal">
              Creative
            </Link>
            <Link href="/tracking" className="transition hover:text-signal">
              Tracking
            </Link>
            <Link href="/media" className="transition hover:text-signal">
              Media
            </Link>
            <Link href="/retail" className="transition hover:text-signal">
              Retail
            </Link>
            <Link href="/catalog" className="transition hover:text-signal">
              Catalog
            </Link>
            <a
              href="#rails"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              Open rails
            </a>
          </nav>
        </div>
      </header>

      <section className="hero-plane hero-grain relative overflow-hidden text-white">
        <div className="hero-lanes lane-sweep pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cone/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Monetization hub · All rails
          </p>
          <p className="animate-rise-d1 mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Tread Affiliates
          </p>
          <h1 className="animate-rise-d2 mt-4 max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Compare tools that pay
          </h1>
          <p className="animate-rise-d3 mt-6 max-w-xl text-lg text-white/80">
            Every ranked comparison rail in one place. Pick a vertical, open the
            rail, push the affiliate CTAs.
          </p>
          <div className="animate-rise-d3 mt-10">
            <a
              href="#rails"
              className="inline-flex bg-signal px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-white"
            >
              Browse rails
            </a>
          </div>
        </div>
      </section>

      <main id="rails" className="scroll-mt-24 mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cone">
          Rails live now
        </p>
        <p className="prose-tread mt-4 text-base md:text-lg">
          Tread Affiliates turns traffic into commission. Each rail ranks offers
          the way operators do — conversion story, creative ease, payout
          structure — then puts affiliate links on every primary CTA.
        </p>

        <ul className="mt-14 space-y-10">
          {rails.map((rail) => (
            <li
              key={rail.href}
              className={
                rail.accent === "signal"
                  ? "border-l-2 border-signal pl-5"
                  : rail.accent === "cone"
                    ? "border-l-2 border-cone pl-5"
                    : "border-l-2 border-ink pl-5"
              }
            >
              <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                {rail.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {rail.angle}
              </p>
              <Link
                href={rail.href}
                className="mt-6 inline-flex bg-signal px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-signal"
              >
                Open rail →
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 bg-ink px-6 py-8 text-white md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
            Next step
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold">
            Traffic first. Then these rails.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
            Comparisons only pay if you can push attention. Read the TREAD
            traffic guide, then come back and open a rail.
          </p>
          <Link
            href="/advertise"
            className="mt-6 inline-flex bg-signal px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-white"
          >
            Advertise on these rails
          </Link>
          <Link
            href="/"
            className="mt-4 ml-0 inline-flex border border-white/30 px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-white md:ml-3"
          >
            Read the guide
          </Link>
        </div>
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-xl font-extrabold">
              TREAD <span className="text-signal">Affiliates</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-white/55">
              The monetization hub — every comparison rail, clear CTAs, traffic
              that converts.
            </p>
          </div>
          <Link href="/" className="text-sm text-white/70 transition hover:text-signal">
            ← Back to TREAD Marketing guide
          </Link>
        </div>
      </footer>
    </div>
  );
}
