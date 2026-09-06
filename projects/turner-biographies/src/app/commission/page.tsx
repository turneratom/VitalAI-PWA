import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commission a Biography",
  description:
    "Commission Brad Turner for a private biography — Family chronicle $45,000 or Founder / public life $95,000. Direct booking by email.",
  openGraph: {
    title: "Commission a Biography — Turner Biographies",
    description:
      "Family chronicle $45,000 · Founder / public life $95,000. Written as story, ready for print or screen development.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Family",
    title: "Family chronicle",
    price: "$45,000",
    detail:
      "One life or multi-generation family narrative — research interviews, manuscript (~40–60k words), and editorial polish for private or limited print.",
    href: "mailto:brad@treadcompanies.com?subject=Commission%20Family%20chronicle%20%2445%2C000&body=I%20want%20to%20commission%20a%20Family%20chronicle%20(%2445%2C000).%0A%0ASubject%20name%3A%0ARelationship%3A%0ATimeline%20preference%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Commission family — $45,000",
  },
  {
    tag: "Founder",
    title: "Founder / public life",
    price: "$95,000",
    detail:
      "Company founder, civic leader, or public figure — deeper archive work, dual narrative arcs, and a treatment appendix for film/series development.",
    href: "mailto:brad@treadcompanies.com?subject=Commission%20Founder%20biography%20%2495%2C000&body=I%20want%20to%20commission%20a%20Founder%20%2F%20public%20life%20biography%20(%2495%2C000).%0A%0ASubject%20%2F%20company%3A%0AGoals%20(print%20%2F%20film)%3A%0ATimeline%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Commission founder — $95,000",
  },
];

export default function CommissionPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · Commission
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            A life, written as fire.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Private commissions from Brad Turner — the same craft as The Greatest
            Humans series, scoped to the life you need told.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a
              href="#packages"
              className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep"
            >
              See packages
            </a>
            <Link
              href="/speaking"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Speaking instead
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
            Two commission tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Fifty percent to start, remainder on manuscript delivery. Travel for
            interviews billed separately when required.
          </p>

          <div className="mt-12 grid gap-0 border-t border-white/15 md:grid-cols-2">
            {packages.map((pkg, i) => (
              <article
                key={pkg.title}
                className={`border-b border-white/15 py-8 md:border-b-0 md:py-10 ${
                  i < packages.length - 1 ? "md:border-r md:pr-10" : "md:pl-10"
                }`}
              >
                <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">
                  {pkg.tag}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl">
                  {pkg.title}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-brass">
                  {pkg.price}
                </p>
                <p className="mt-4 text-bone/75">{pkg.detail}</p>
                <a
                  href={pkg.href}
                  className="mt-8 inline-block bg-seal px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:bg-seal-deep"
                >
                  {pkg.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-soft">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
            Prefer the published series?
          </h2>
          <p className="mt-3 max-w-xl text-bone/70">
            Firebrand and film rights live on the shop — commissions are private work.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
          >
            Shop Firebrand
          </Link>
        </div>
      </section>
    </div>
  );
}
