import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Speaking & Appearances",
  description:
    "Book Brad Turner for keynotes, half-day workshops, and multi-day residencies on Firebrand, biography craft, and adaptation. From $15,000.",
  openGraph: {
    title: "Speaking & Appearances — Turner Biographies",
    description:
      "Keynote $15,000 · Half-day $25,000 · Residency from $50,000. Direct booking by email.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Keynote",
    title: "60–90 minute keynote",
    price: "$15,000",
    detail:
      "Stage talk on Firebrand, biography as civic fire, or adapting true lives for screen. Q&A included.",
    href: "mailto:brad@treadcompanies.com?subject=Speaking%20keynote%20%2415%2C000&body=I%20want%20to%20book%20a%20Brad%20Turner%20keynote%20(%2415%2C000).%0A%0AEvent%3A%0ADate%20%2F%20city%3A%0AAudience%20size%3A%0ATopic%20preference%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Book keynote — $15,000",
  },
  {
    tag: "Workshop",
    title: "Half-day workshop",
    price: "$25,000",
    detail:
      "Up to three hours: craft session for writers, producers, or leadership teams working with life stories.",
    href: "mailto:brad@treadcompanies.com?subject=Speaking%20workshop%20%2425%2C000&body=I%20want%20to%20book%20a%20half-day%20workshop%20(%2425%2C000).%0A%0AOrg%3A%0ADate%20%2F%20city%3A%0AAudience%3A%0AGoals%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Book workshop — $25,000",
  },
  {
    tag: "Residency",
    title: "Multi-day residency",
    price: "From $50,000",
    detail:
      "Two to three days on campus or at retreat — lectures, masterclass, private producer sessions.",
    href: "mailto:brad@treadcompanies.com?subject=Speaking%20residency%20from%20%2450%2C000&body=I%20want%20to%20discuss%20a%20multi-day%20residency%20(from%20%2450%2C000).%0A%0AOrg%3A%0ADates%3A%0AFormat%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Inquire residency",
  },
];

export default function SpeakingPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_18%_0%,rgba(154,52,44,0.32),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · Appearances
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Speaking that carries fire.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Keynotes, workshops, and residencies on biography, adaptation, and
            the lives that remake nations — booked direct, priced clear.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a
              href="#packages"
              className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep"
            >
              See packages
            </a>
            <Link
              href="/shop"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Shop Firebrand
            </Link>
            <Link
              href="/commission"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Commission a life
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="border-b border-white/10 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-brass">
            Packages
          </p>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl md:text-5xl">
            Three ways onto the stage.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Travel and lodging billed separately when required. Email opens with
            the package already in the subject line.
          </p>

          <div className="mt-12 grid gap-0 border-t border-white/15 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <article
                key={pkg.title}
                className={`border-b border-white/15 py-8 md:border-b-0 md:py-10 ${
                  i < packages.length - 1 ? "md:border-r md:pr-8" : ""
                } ${i > 0 ? "md:pl-8" : ""}`}
              >
                <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">
                  {pkg.tag}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl">
                  {pkg.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-bone">
                  {pkg.price}
                </p>
                <p className="mt-3 text-bone/70">{pkg.detail}</p>
                <a
                  href={pkg.href}
                  className="mt-6 inline-block bg-seal px-4 py-2.5 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:bg-seal-deep"
                >
                  {pkg.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-seal">
            Also available
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Film rights live on the book page.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            Option, shopping, and purchase packages for Firebrand sit with the
            adaptation materials — separate from speaking fees.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <Link
              href="/books/firebrand/film"
              className="bg-ink px-5 py-3 uppercase tracking-[0.16em] text-bone hover:bg-seal"
            >
              Film rights packages
            </Link>
            <Link
              href="/shop"
              className="border border-ink/25 px-5 py-3 uppercase tracking-[0.16em] hover:border-seal hover:text-seal"
            >
              Buy the book
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
