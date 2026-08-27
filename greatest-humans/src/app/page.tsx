import Image from "next/image";
import Link from "next/link";
import { SERIES, books } from "@/lib/series";

export default function HomePage() {
  const featured = books[0];

  return (
    <div>
      <section className="grain relative min-h-[100svh] overflow-hidden">
        <Image
          src={featured.heroImage}
          alt="Candlelit printing shop evocative of Thomas Paine’s world"
          fill
          priority
          className="object-cover object-[68%_center] animate-ember"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0 z-[1]" />
        <div className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="animate-rise font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.35em] text-brass">
            {SERIES.author}
          </p>
          <h1 className="animate-rise-delay-1 mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-bone md:text-7xl lg:text-8xl">
            The Greatest Humans
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg text-bone/85 md:text-xl">
            {SERIES.promise}
          </p>
          <div className="animate-rise-delay-3 mt-10 flex flex-wrap items-center gap-4 font-[family-name:var(--font-ui)]">
            <Link
              href={`/books/${featured.slug}`}
              className="bg-seal px-5 py-3 text-sm uppercase tracking-[0.18em] text-bone transition hover:bg-seal-deep"
            >
              Enter Firebrand
            </Link>
            <Link
              href={`/books/${featured.slug}/film`}
              className="border border-bone/35 px-5 py-3 text-sm uppercase tracking-[0.18em] text-bone transition hover:border-brass hover:text-brass"
            >
              Watch the film pages
            </Link>
          </div>
        </div>
      </section>

      <section id="series" className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-seal">
            Book One
          </p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h2 className="animate-ink font-[family-name:var(--font-display)] text-4xl leading-tight md:text-6xl">
                {featured.title}
                <span className="mt-2 block text-2xl text-seal md:text-3xl">
                  {featured.subtitle}
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
                {featured.synopsis}
              </p>
            </div>
            <div className="border-l border-ink/15 pl-6 font-[family-name:var(--font-ui)] text-sm text-ink/70 md:pl-10">
              <p>
                <span className="text-ink">Form:</span> narrative biography
              </p>
              <p className="mt-2">
                <span className="text-ink">Shape:</span> 10 chapters · ~{featured.pages}{" "}
                pages
              </p>
              <p className="mt-2">
                <span className="text-ink">Adaptation:</span> feature screenplay
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/books/${featured.slug}/read/${featured.chapters[0].slug}`}
                  className="bg-ink px-4 py-2.5 text-bone transition hover:bg-seal"
                >
                  Read Chapter 1
                </Link>
                <Link
                  href={`/books/${featured.slug}`}
                  className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
                >
                  Book &amp; film
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-soft">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone md:text-4xl">
            How the series works
          </h2>
          <p className="mt-4 max-w-2xl text-fog">
            You name the life. Brad Turner builds the book as a story you can
            inhabit—then turns that story toward cinema.
          </p>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "The life",
                copy: "A subject whose choices still press on the present.",
              },
              {
                step: "02",
                title: "The book",
                copy: "Ten chapters. Roughly two hundred pages. Scene-driven, not lecture-driven.",
              },
              {
                step: "03",
                title: "The film",
                copy: "A treatment and screenplay distilled from the same emotional spine.",
              },
            ].map((item) => (
              <li key={item.step}>
                <p className="font-[family-name:var(--font-ui)] text-xs tracking-[0.28em] text-brass">
                  {item.step}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-bone">
                  {item.title}
                </h3>
                <p className="mt-3 text-fog">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
