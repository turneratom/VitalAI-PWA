import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Featured Park Listing — $299/mo | Trailer Parks",
  description:
    "Pin your mobile home park at the top of Trailer Parks search and homepage for $299/month. Free listings stay free — Featured is optional paid placement.",
  openGraph: {
    title: "Featured Park Listing — $299/mo",
    description:
      "Homepage + search priority for your park. Invoice by email. Free listings remain free.",
    type: "website",
    siteName: siteConfig.name,
    url: "/featured",
  },
};

const INVOICE_MAIL = `mailto:${siteConfig.team.bradley.email}?subject=${encodeURIComponent(
  "Featured park listing — $299/mo"
)}&body=${encodeURIComponent(
  `I want a Featured park listing ($299/mo).\n\nPark name:\nCity / State:\nLots:\nListing URL or new list:\nMy name:\nBest email:\nPhone:\n\nPlease send invoice.`
)}`;

const benefits = [
  {
    title: "Homepage placement",
    body: "Your park sits in the Featured strip buyers see first — not buried in the free feed.",
  },
  {
    title: "Search priority",
    body: "Featured parks surface above organic matches for the same market and lot band.",
  },
  {
    title: "Buyer alert boost",
    body: "New Featured listings trigger an extra ping to matching buyer alerts in that state.",
  },
  {
    title: "Month-to-month",
    body: "Cancel before the next invoice. Free listing stays live either way.",
  },
];

export default function FeaturedListingPage() {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 80% 10%, rgba(212,168,83,0.35), transparent 55%), linear-gradient(160deg, #0c2438 0%, #14324a 45%, #0a1c2c 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Trailer Parks · Paid placement
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Featured listing.
            <span className="mt-2 block text-accent">$299 / month.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/75">
            Free listings stay free. Featured pins your park where buyers look first —
            homepage strip, search priority, and alert boost.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={INVOICE_MAIL}
              className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:bg-accent-light"
            >
              Request invoice — $299/mo
            </a>
            <Link
              href="/list-your-park"
              className="inline-flex items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
            >
              List free first
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          What you get
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
          Optional paid boost. Same zero-fee sale.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-light text-foreground/70">
          We still charge $0 to list and $0 on close. Featured is placement only —
          invoice monthly until you cancel.
        </p>
        <ul className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
          {benefits.map((item) => (
            <li key={item.title} className="border-t border-border pt-6 sm:border-0 sm:pt-0">
              <h3 className="font-display text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-foreground/70">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
            Three steps. Then buyers see you first.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            <li>
              <p className="font-display text-2xl text-accent">01</p>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">List free</h3>
              <p className="mt-2 text-foreground/70">
                Submit your park on the free list form if it is not live yet.
              </p>
            </li>
            <li>
              <p className="font-display text-2xl text-accent">02</p>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">Email for Featured</h3>
              <p className="mt-2 text-foreground/70">
                Request the $299/mo invoice. We confirm the park and start date.
              </p>
            </li>
            <li>
              <p className="font-display text-2xl text-accent">03</p>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">Go live on top</h3>
              <p className="mt-2 text-foreground/70">
                After payment, your park pins to Featured until you cancel.
              </p>
            </li>
          </ol>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={INVOICE_MAIL}
              className="inline-flex bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary/90"
            >
              Email invoice request
            </a>
            <Link
              href="/list-your-park"
              className="inline-flex border border-border px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition hover:border-primary hover:text-primary"
            >
              Free listing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
