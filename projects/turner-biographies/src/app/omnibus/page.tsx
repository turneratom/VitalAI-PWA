import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Omnibus Rights",
  description:
    "License Turner Biographies / The Greatest Humans for omnibus — Single-title omnibus $225 or Catalog omnibus slate $750. Direct inquiry by email.",
  openGraph: {
    title: "Omnibus Rights — Turner Biographies",
    description: "Single-title omnibus $225 · Catalog omnibus slate $750.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Title",
    title: "Single-title omnibus",
    price: "$225",
    detail:
      "Rights to license one Firebrand / Greatest Humans title as a omnibus — territory, term, and exclusivity set in the agreement.",
    href: "mailto:brad@treadcompanies.com?subject=Omnibus%20rights%20single-title%20%24225&body=I%20want%20Single-title%20omnibus%20rights%20(%24225).%0A%0ATitle%3A%0AFormat%20%2F%20modules%3A%0AWindow%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License title — $225",
  },
  {
    tag: "Slate",
    title: "Catalog omnibus slate",
    price: "$750",
    detail:
      "Multi-title or multi-issue omnibus slate across Firebrand / Greatest Humans — one agreement for a broader omnibus slate.",
    href: "mailto:brad@treadcompanies.com?subject=Omnibus%20rights%20catalog%20slate%20%24750&body=I%20want%20Catalog%20omnibus%20slate%20rights%20(%24750).%0A%0ATitles%20%2F%20slate%3A%0AModules%20planned%3A%0AWindow%3A%0AName%3A%0AEmail%3A%0A",
    cta: "License slate — $750",
  },
];

export default function OmnibusPage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Omnibus Rights
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Run and slate omnibus licensing for Firebrand and The Greatest Humans —
            from rights memo to issue schedule.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a href="#packages" className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep">
              See packages
            </a>
            <Link href="/codex" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Codex
            </Link>
            <Link href="/compendium" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Compendium
            </Link>
            <Link href="/catalogue" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Catalogue
            </Link>
            <Link href="/volume" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Volume
            </Link>
            <Link href="/archive" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Archive
            </Link>
            <Link href="/miscellany" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Miscellany
            </Link>
            <Link href="/sampler" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Sampler
            </Link>
            <Link href="/excerpt" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Excerpt
            </Link>
            <Link href="/leaflet" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Leaflet
            </Link>
            <Link href="/pamphlet" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Pamphlet
            </Link>
            <Link href="/handbill" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Handbill
            </Link>
            <Link href="/circular" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Circular
            </Link>
            <Link href="/flyer" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Flyer
            </Link>
            <Link href="/broadsheet" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Broadsheet
            </Link>
            <Link href="/playbill" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Playbill
            </Link>
            <Link href="/program" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Program
            </Link>
            <Link href="/chapbook" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Gazette
            </Link>
            <Link href="/reprint" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Reprint
            </Link>
            <Link href="/translation" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Translation
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
            Two omnibus tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Email brad@treadcompanies.com for invoice and rights memo. Title, issues,
            and window confirmed in writing before payment.
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
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">Need chapbook instead?</h2>
            <p className="mt-2 max-w-xl text-bone/70">Omnibus covers classroom omnibus packs. Anthology covers multi-title collections.</p>
          </div>
          <Link href="/chapbook" className="inline-flex border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass">Chapbook
          </Link>
        </div>
      </section>
    </div>
  );
}
