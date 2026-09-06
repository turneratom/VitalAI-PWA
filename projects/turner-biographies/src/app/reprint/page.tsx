import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reprint Rights",
  description:
    "License Turner Biographies / The Greatest Humans for reprint — Single-title reprint $6,000 or Catalog reprint slate $16,000. Direct inquiry by email.",
  openGraph: {
    title: "Reprint Rights — Turner Biographies",
    description: "Single-title reprint $6,000 · Catalog reprint slate $16,000.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Title",
    title: "Single-title reprint",
    price: "$6,000",
    detail:
      "Reprint rights for one Firebrand / Greatest Humans title in a defined territory and format — term and exclusivity set in the agreement.",
    href: "mailto:brad@treadcompanies.com?subject=Reprint%20rights%20single-title%20%246%2C000&body=I%20want%20Single-title%20reprint%20rights%20(%246%2C000).%0A%0ATitle%3A%0ATerritory%20%2F%20format%3A%0ATerm%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License title — $6,000",
  },
  {
    tag: "Catalog",
    title: "Catalog reprint slate",
    price: "$16,000",
    detail:
      "Multi-title reprint slate across Firebrand / Greatest Humans — one agreement for a broader catalog run.",
    href: "mailto:brad@treadcompanies.com?subject=Reprint%20rights%20catalog%20%2416%2C000&body=I%20want%20Catalog%20reprint%20slate%20rights%20(%2416%2C000).%0A%0ATitles%20%2F%20slate%3A%0ATerritory%20%2F%20format%3A%0ATerm%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License slate — $16,000",
  },
];

export default function ReprintPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Reprint Rights
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Title and catalog reprint licensing for Firebrand and The Greatest Humans —
            from rights memo to print run.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a href="#packages" className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep">
              See packages
            </a>
            <Link href="/foreign-rights" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Foreign rights
            </Link>
            <Link href="/translation" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Translation
            </Link>
            <Link href="/serialization" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Serialization
            </Link>
            <Link href="/serial-print" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Serial print
            </Link>
            <Link href="/shop" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Shop
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="border-b border-white/10 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-brass">Packages</p>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl md:text-5xl">
            Two reprint tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Email brad@treadcompanies.com for invoice and rights memo. Title, territory,
            and term confirmed in writing before payment.
          </p>
          <div className="mt-12 grid gap-0 border-t border-white/15 md:grid-cols-2">
            {packages.map((pkg) => (
              <article key={pkg.title} className="flex flex-col border-b border-white/15 p-8 md:border-r md:border-b-0 md:odd:border-r md:[&:nth-child(2n)]:border-r-0">
                <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">{pkg.tag}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl md:text-3xl">{pkg.title}</h3>
                <p className="mt-2 font-[family-name:var(--font-ui)] text-3xl text-brass">{pkg.price}</p>
                <p className="mt-4 flex-1 text-bone/70">{pkg.detail}</p>
                <a href={pkg.href} className="mt-8 inline-flex w-fit bg-seal px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:bg-seal-deep">
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
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">Need translation instead?</h2>
            <p className="mt-2 max-w-xl text-bone/70">Reprint covers same-language print runs. Translation covers new-language editions.</p>
          </div>
          <Link href="/translation" className="inline-flex border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
            Translation rights
          </Link>
        </div>
      </section>
    </div>
  );
}
