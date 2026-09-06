import type { Metadata } from "next";
import Link from "next/link";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Best Sleep Trackers (2026) — Tread Affiliates",
  description:
    "Ranked comparison of sleep trackers that convert. Oura-style rings, Whoop sleep angles, budget apps — honest picks and affiliate CTAs.",
  openGraph: {
    title: "Best Sleep Trackers — Ranked by Tread Affiliates",
    description:
      "Which sleep trackers are worth promoting? Ranked picks with direct affiliate CTAs.",
    type: "article",
  },
};

const picks = [
  {
    rank: 1,
    name: "Oura",
    tagline: "Best overall — Oura-style ring that sells the score",
    verdict:
      "Clearest sleep story in wearables: readiness, stages, HRV — no screen, all ritual. Highest intent for biohackers and “optimize recovery” traffic. If you only promote one sleep tracker this quarter, make it this.",
    why: [
      "High intent avatar: people already tracking sleep / readiness",
      "Ring form factor demos clean vs. bulky watch creatives",
      "Membership narrative = recurring payout story",
    ],
    watch: "Hardware + membership pitch can confuse cold traffic — lead with the readiness score, then the ring.",
    cta: "Try Oura",
    href: links.affiliates.oura,
    accent: "signal" as const,
  },
  {
    rank: 2,
    name: "Eight Sleep",
    tagline: "Best Whoop sleep angle — bed that owns the night",
    verdict:
      "Wins when your traffic wants recovery like Whoop, but for the mattress. Stronger for IG / YouTube 28–45 than TikTok teens. Solid second placement if Oura is saturated in your niche — pitch temperature, Autopilot, and morning readiness.",
    why: [
      "Premium AOV without competing head-on with ring cults",
      "Creative angles write themselves (hot/cold, deep sleep, Autopilot)",
      "Pairs cleanly with Whoop-style recovery / strain funnels",
    ],
    watch: "Ecosystem + install education takes a beat — use a loom-style walkthrough, not a cold link dump.",
    cta: "Open Eight Sleep",
    href: links.affiliates.eight_sleep,
    accent: "cone" as const,
  },
  {
    rank: 3,
    name: "Sleep Cycle",
    tagline: "Budget app — volume play everyone recognizes",
    verdict:
      "Weaker differentiation, stronger brand recognition and price. Use when you need cheap tests, contrast offers, or cold traffic that already knows the name. Not your hero product — your funnel filler.",
    why: [
      "Instant recognition lowers click friction",
      "Useful as an A/B foil against Oura / Eight Sleep",
      "Low barrier for “best free sleep app” content",
    ],
    watch: "Premium upsell and phone-on-mattress friction — disclose that and lead with familiarity + price.",
    cta: "See Sleep Cycle",
    href: links.affiliates.sleep_cycle,
    accent: "ink" as const,
  },
];

export default function BestSleepTrackersPage() {
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
            <a
              href="#ranked"
              className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
            >
              See ranked picks
            </a>
          </nav>
        </div>
      </header>

      {/* Hero — brand first, one job */}
      <section className="hero-plane hero-grain relative overflow-hidden text-white">
        <div className="hero-lanes lane-sweep pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full bg-signal/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cone/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.28em] text-signal">
            Monetization rail · Comparison
          </p>
          <p className="animate-rise-d1 mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Tread Affiliates
          </p>
          <h1 className="animate-rise-d2 mt-4 max-w-3xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Best sleep trackers — ranked for partners who get paid
          </h1>
          <p className="animate-rise-d3 mt-6 max-w-xl text-lg text-white/80">
            Three sleep offers worth promoting. Clear winners, honest tradeoffs, and
            affiliate CTAs that move the click.
          </p>
          <div className="animate-rise-d3 mt-10 flex flex-wrap gap-4">
            <a
              href="#ranked"
              className="bg-signal px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-white"
            >
              Jump to picks
            </a>
            <a
              href={links.affiliates.oura}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="border border-white/35 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-signal hover:text-signal"
            >
              #1 Oura →
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cone">
          How we rank
        </p>
        <p className="prose-tread mt-4 text-base md:text-lg">
          Tread Affiliates ranks offers the way traffic operators do: conversion
          story, creative ease, payout structure, and whether you’d put your
          name on the recommend. This page is the money surface — every primary
          button below is an affiliate link.
        </p>

        <div id="ranked" className="scroll-mt-24 mt-14 space-y-14">
          {picks.map((pick) => (
            <article
              key={pick.name}
              className="border-t border-line pt-10 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span
                  className={
                    pick.accent === "signal"
                      ? "font-display text-sm font-bold text-signal-deep"
                      : pick.accent === "cone"
                        ? "font-display text-sm font-bold text-cone"
                        : "font-display text-sm font-bold text-muted"
                  }
                >
                  Rank {String(pick.rank).padStart(2, "0")}
                </span>
                <h2 className="font-display text-3xl font-extrabold tracking-tight">
                  {pick.name}
                </h2>
              </div>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                {pick.tagline}
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
                {pick.verdict}
              </p>

              <ul className="mt-6 space-y-2">
                {pick.why.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
                    <span
                      className={
                        pick.accent === "signal"
                          ? "mt-2 h-2 w-2 shrink-0 bg-signal"
                          : pick.accent === "cone"
                            ? "mt-2 h-2 w-2 shrink-0 bg-cone"
                            : "mt-2 h-2 w-2 shrink-0 bg-ink"
                      }
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-l-2 border-line pl-4 text-sm text-muted">
                <span className="font-semibold text-ink">Watch: </span>
                {pick.watch}
              </p>

              <a
                href={pick.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={
                  pick.rank === 1
                    ? "mt-8 inline-flex w-full items-center justify-center bg-signal px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-signal sm:w-auto"
                    : pick.rank === 2
                      ? "mt-8 inline-flex w-full items-center justify-center bg-cone px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-ink sm:w-auto"
                      : "mt-8 inline-flex w-full items-center justify-center border-2 border-ink bg-ink px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-transparent hover:text-ink sm:w-auto"
                }
              >
                {pick.cta} — affiliate link →
              </a>
            </article>
          ))}
        </div>

        <div className="section-rule my-16" />

        <section>
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">
            Quick compare
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
                  <th className="pb-3 pr-4 font-semibold">Offer</th>
                  <th className="pb-3 pr-4 font-semibold">Best for</th>
                  <th className="pb-3 font-semibold">CTA</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="py-4 pr-4 font-display font-bold">Oura</td>
                  <td className="py-4 pr-4 text-muted">Overall / ring readiness</td>
                  <td className="py-4">
                    <a
                      href={links.affiliates.oura}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="font-semibold text-cone underline-offset-2 hover:underline"
                    >
                      Get Oura
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="py-4 pr-4 font-display font-bold">Eight Sleep</td>
                  <td className="py-4 pr-4 text-muted">Whoop sleep / bed recovery</td>
                  <td className="py-4">
                    <a
                      href={links.affiliates.eight_sleep}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="font-semibold text-cone underline-offset-2 hover:underline"
                    >
                      Get Eight Sleep
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-display font-bold">Sleep Cycle</td>
                  <td className="py-4 pr-4 text-muted">Budget / volume tests</td>
                  <td className="py-4">
                    <a
                      href={links.affiliates.sleep_cycle}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="font-semibold text-cone underline-offset-2 hover:underline"
                    >
                      Get Sleep Cycle
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-muted">
            Disclosure: links on this page are affiliate links. Tread Affiliates
            may earn a commission when you buy through them — at no extra cost
            to you.
          </p>
        </section>

        <div className="mt-14 bg-ink px-6 py-8 text-white md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
            Next step
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold">
            Traffic first. Then these links.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
            Comparisons only pay if you can push attention. Read the TREAD
            traffic guide, then come back and promote the #1 pick.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-signal px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-white"
            >
              Read the guide
            </Link>
            <a
              href={links.affiliates.oura}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="border border-white/30 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-signal hover:text-signal"
            >
              Promote Oura
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-xl font-extrabold">
              TREAD <span className="text-signal">Affiliates</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-white/55">
              The monetization rail — ranked tools, clear CTAs, traffic that
              converts.
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
