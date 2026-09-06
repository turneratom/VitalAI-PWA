import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Translation Rights",
  description:
    "License Turner Biographies / The Greatest Humans for translation — Single-language translation license $18,000 or Multi-language pack (3 languages) $48,000. Direct inquiry by email.",
  openGraph: {
    title: "Translation Rights — Turner Biographies",
    description:
      "Single-language translation $18,000 · Multi-language pack (3 languages) $48,000.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Language",
    title: "Single-language translation license",
    price: "$18,000",
    detail:
      "Rights to translate and publish one Firebrand / Greatest Humans title in a single language — scope, window, and exclusivity set in the agreement.",
    href: "mailto:brad@treadcompanies.com?subject=Translation%20rights%20single-language%20%2418%2C000&body=I%20want%20a%20Single-language%20translation%20license%20(%2418%2C000).%0A%0ATitle%20interest%3A%0ALanguage%20%2F%20market%3A%0AWindow%20%2F%20exclusivity%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License language — $18,000",
  },
  {
    tag: "Multi-language",
    title: "Multi-language pack (3 languages)",
    price: "$48,000",
    detail:
      "Three-language translation pack for one title — one agreement covering three languages with shared credit and window terms.",
    href: "mailto:brad@treadcompanies.com?subject=Translation%20rights%20multi-language%20%2448%2C000&body=I%20want%20a%20Multi-language%20pack%20(%2448%2C000).%0A%0ATitle%20interest%3A%0ALanguages%20(up%20to%203)%3A%0AWindow%20%2F%20exclusivity%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License 3 languages — $48,000",
  },
];

export default function TranslationPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Translation Rights
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Translation licensing for Firebrand and The Greatest Humans titles —
            from language brief to signed deal.
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
              href="/foreign-rights"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Foreign rights
            </Link>
            <Link
              href="/stage"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Stage
            </Link>
            <Link
              href="/audiobook"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Audiobook
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
            Two translation tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Email brad@treadcompanies.com for invoice and translation rights memo.
            Language, exclusivity, and credit terms confirmed in writing before payment.
          </p>

          <div className="mt-12 grid gap-0 border-t border-white/15 md:grid-cols-2">
            {packages.map((pkg) => (
              <article
                key={pkg.title}
                className="flex flex-col border-b border-white/15 p-8 md:border-r md:border-b-0 md:odd:border-r md:[&:nth-child(2n)]:border-r-0"
              >
                <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">
                  {pkg.tag}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl md:text-3xl">
                  {pkg.title}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-ui)] text-3xl text-brass">
                  {pkg.price}
                </p>
                <p className="mt-4 flex-1 text-bone/70">{pkg.detail}</p>
                <a
                  href={pkg.href}
                  className="mt-8 inline-flex w-fit bg-seal px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:bg-seal-deep"
                >
                  {pkg.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0e1116]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
              Need territory rights instead?
            </h2>
            <p className="mt-2 max-w-xl text-bone/70">
              Foreign rights covers territory packs. Translation rights covers language packs.
            </p>
          </div>
          <Link
            href="/foreign-rights"
            className="inline-flex border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
          >
            Foreign rights
          </Link>
        </div>
      </section>
    </div>
  );
}
