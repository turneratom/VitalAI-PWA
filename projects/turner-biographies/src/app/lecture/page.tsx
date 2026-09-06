import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Keynote Lecture",
  description:
    "Book Turner Biographies / The Greatest Humans for stage — Single keynote $7,500 or Three-lecture series $18,000. Direct inquiry by email.",
  openGraph: {
    title: "Keynote Lecture — Turner Biographies",
    description: "Single keynote $7,500 · Three-lecture series $18,000.",
    type: "website",
  },
};

const packages = [
  {
    tag: "Keynote",
    title: "Single keynote",
    price: "$7,500",
    detail:
      "One 45–60 minute keynote drawn from Firebrand / Greatest Humans — talk title, rundown, and Q&A window set in the agreement.",
    href: "mailto:brad@treadcompanies.com?subject=Keynote%20lecture%20%247%2C500&body=I%20want%20a%20Single%20keynote%20(%247%2C500).%0A%0AEvent%20%2F%20audience%3A%0APreferred%20title%20theme%3A%0ADate%20window%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Book keynote — $7,500",
  },
  {
    tag: "Series",
    title: "Three-lecture series",
    price: "$18,000",
    detail:
      "Three related lectures across a season or campus — one agreement covering titles, travel windows, and delivery format.",
    href: "mailto:brad@treadcompanies.com?subject=Lecture%20series%20%2418%2C000&body=I%20want%20a%20Three-lecture%20series%20(%2418%2C000).%0A%0AVenue%20%2F%20series%3A%0AThemes%3A%0ADate%20windows%3A%0AName%3A%0AEmail%3A%0A",
    cta: "Book series — $18,000",
  },
];

export default function LecturePage() {
  return (
    <div className="bg-ink text-bone">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_10%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Turner Biographies · The Greatest Humans
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] md:text-7xl">
            Keynote Lecture
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/80">
            Single keynotes and lecture series drawn from Firebrand and The Greatest Humans —
            from rights memo to stage.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 font-[family-name:var(--font-ui)] text-sm">
            <a href="#packages" className="bg-seal px-5 py-3 uppercase tracking-[0.16em] hover:bg-seal-deep">
              See packages
            </a>
            <Link href="/speaking" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Speaking
            </Link>
            <Link href="/stage" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Stage
            </Link>
            <Link href="/podcast" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Podcast
            </Link>
            <Link href="/documentary-rights" className="border border-bone/30 px-5 py-3 uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
              Documentary
            </Link>
          </div>
        </div>
      </section>

      <section id="packages" className="border-b border-white/10 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-brass">Packages</p>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl md:text-5xl">
            Two lecture tracks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Email brad@treadcompanies.com for invoice and talk memo. Theme, date window,
            and format confirmed in writing before payment.
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
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">Need broader speaking retainers?</h2>
            <p className="mt-2 max-w-xl text-bone/70">Keynote covers one talk or a three-lecture series. Speaking covers multi-event retainers.</p>
          </div>
          <Link href="/speaking" className="inline-flex border border-bone/30 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass">
            Speaking retainers
          </Link>
        </div>
      </section>
    </div>
  );
}
