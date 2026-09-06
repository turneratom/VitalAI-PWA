import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Serialization Rights",
  description:
    "License Turner Biographies / The Greatest Humans for serialization — Magazine / newsletter excerpt $25,000 or Multi-part series $60,000. Direct inquiry by email.",
  openGraph: {
    title: "Serialization Rights — Turner Biographies",
    description:
      "Magazine / newsletter excerpt $25,000 · Multi-part series serialization $60,000.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Excerpt",
    title: "Magazine / newsletter excerpt license",
    price: "$25,000",
    detail:
      "One-time print or digital excerpt rights for a magazine, newsletter, or similar editorial channel — scoped territory and window by agreement.",
    href: "mailto:brad@treadcompanies.com?subject=Serialization%20excerpt%20license%20%2425%2C000&body=I%20want%20a%20Magazine%20%2F%20newsletter%20excerpt%20license%20(%2425%2C000).%0A%0APublication%3A%0ATitle%20%2F%20excerpt%20interest%3A%0ATerritory%20%2F%20window%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License excerpt — $25,000",
  },
  {
    tag: "Series",
    title: "Multi-part series serialization",
    price: "$60,000",
    detail:
      "Multi-installment serialization across a run of issues or episodes — adapted excerpts with scheduling and credit terms negotiated up front.",
    href: "mailto:brad@treadcompanies.com?subject=Serialization%20multi-part%20series%20%2460%2C000&body=I%20want%20multi-part%20series%20serialization%20rights%20(%2460%2C000).%0A%0APublication%20%2F%20platform%3A%0AInstallment%20count%3A%0ATitle%20interest%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License series — $60,000",
  },
];

export default function SerializationPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Serialization Rights
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Excerpt and multi-part licensing for magazines, newsletters, and
            editorial series — from The Greatest Humans catalog and related work.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a
              href="#packages"
              className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep"
            >
              See packages
            </a>
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
            Two serialization tracks.
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
            Need a private commission instead?
          </h2>
          <p className="mt-3 max-w-xl text-bone/70">
            Serialization licenses published work. New lives are commissioned
            separately — or browse Firebrand on the shop.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
