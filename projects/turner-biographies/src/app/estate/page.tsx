import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Estate Oral History",
  description:
    "Commission Turner Biographies / The Greatest Humans for an estate oral history — Interview archive $12,000 or Bound family edition $28,000. Direct inquiry by email.",
  openGraph: {
    title: "Estate Oral History — Turner Biographies",
    description:
      "Interview archive $12,000 · Bound family edition $28,000.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Archive",
    title: "Interview archive",
    price: "$12,000",
    detail:
      "Two recorded interview days with a Turner Biographies interviewer, cleaned transcripts, and a private archive handoff for the estate.",
    href: "mailto:brad@treadcompanies.com?subject=Estate%20oral%20history%20archive%20%2412%2C000&body=I%20want%20an%20Interview%20archive%20(%2412%2C000).%0A%0AEstate%20%2F%20subject%3A%0APreferred%20window%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Commission archive — $12,000",
  },
  {
    tag: "Edition",
    title: "Bound family edition",
    price: "$28,000",
    detail:
      "Interview archive plus a designed, bound family edition (limited print run) ready for heirs and private libraries.",
    href: "mailto:brad@treadcompanies.com?subject=Estate%20oral%20history%20bound%20edition%20%2428%2C000&body=I%20want%20a%20Bound%20family%20edition%20(%2428%2C000).%0A%0AEstate%20%2F%20subject%3A%0APreferred%20window%3A%0APrint%20quantity%20preference%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Commission bound edition — $28,000",
  },
];

export default function EstatePage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Estate Oral History
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Interview archives and bound family editions for estates that want
            the voice kept — not just the documents.
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
            <Link
              href="/audiobook"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Audiobook
            </Link>
            <Link
              href="/translation"
              className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Translation
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
            Two estate tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Email brad@treadcompanies.com for invoice and schedule. Subject,
            window, and delivery format confirmed in writing before payment.
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
              Need a full commissioned life instead?
            </h2>
            <p className="mt-2 max-w-xl text-bone/70">
              Estate oral history captures voice and archive. Commission covers a
              full written life.
            </p>
          </div>
          <Link
            href="/commission"
            className="inline-flex border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
          >
            Commission a life
          </Link>
        </div>
      </section>
    </div>
  );
}
