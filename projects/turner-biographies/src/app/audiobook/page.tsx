import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Audiobook Rights",
  description:
    "License Turner Biographies / The Greatest Humans for audiobook — Narration license $15,000 or Full audiobook production $40,000. Direct inquiry by email.",
  openGraph: {
    title: "Audiobook Rights — Turner Biographies",
    description:
      "Narration license $15,000 · Full audiobook production $40,000.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Narration",
    title: "Narration license",
    price: "$15,000",
    detail:
      "License to narrate an existing Firebrand / series title — rights for recording and distribution scoped by territory and window in the agreement.",
    href: "mailto:brad@treadcompanies.com?subject=Audiobook%20narration%20license%20%2415%2C000&body=I%20want%20a%20Narration%20license%20(%2415%2C000).%0A%0ATitle%20interest%3A%0ATerritory%20%2F%20window%3A%0APlatform%20plans%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License narration — $15,000",
  },
  {
    tag: "Production",
    title: "Full audiobook production",
    price: "$40,000",
    detail:
      "Cast, record, master, and deliver a finished audiobook from an existing title — production through delivery under one package.",
    href: "mailto:brad@treadcompanies.com?subject=Audiobook%20full%20production%20%2440%2C000&body=I%20want%20full%20audiobook%20production%20(%2440%2C000).%0A%0ATitle%20interest%3A%0ACast%20preferences%3A%0ADelivery%20timeline%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Produce audiobook — $40,000",
  },
];

export default function AudiobookPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Audiobook Rights
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Narration licensing and full production for Firebrand and The Greatest
            Humans titles — from rights memo to mastered delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a
              href="#packages"
              className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep"
            >
              See packages
            </a>
            <Link
              href="/serialization"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Serialization
            </Link>
            <Link
              href="/commission"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Commission a life
            </Link>
            <Link
              href="/shop"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Shop Firebrand
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
            Two audiobook tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Email brad@treadcompanies.com for invoice and rights memo. Territory,
            exclusivity, and credit terms confirmed in writing before payment.
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
            Need print serialization or a private commission?
          </h2>
          <p className="mt-3 max-w-xl text-bone/70">
            Audiobook rights cover narration and production. Serialization and new
            lives are licensed separately — or browse Firebrand on the shop.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/serialization"
              className="inline-block border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Serialization
            </Link>
            <Link
              href="/commission"
              className="inline-block border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Commission
            </Link>
            <Link
              href="/shop"
              className="inline-block border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
