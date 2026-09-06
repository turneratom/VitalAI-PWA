import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { books } from "@/lib/series";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Buy Firebrand by Brad Turner — ebook $4.99, paperback $15.99. Book One of The Greatest Humans.",
};

const EBOOK_MAIL =
  "mailto:brad@treadcompanies.com?subject=Buy%20Firebrand%20ebook%20%244.99&body=I%20want%20to%20buy%20Firebrand%20(ebook)%20for%20%244.99.%0A%0APreferred%20format%3A%20Kindle%20%2F%20EPUB%0AEmail%20for%20delivery%3A%0A";

const PAPERBACK_MAIL =
  "mailto:brad@treadcompanies.com?subject=Buy%20Firebrand%20paperback%20%2415.99&body=I%20want%20to%20buy%20Firebrand%20(paperback)%20for%20%2415.99.%0A%0AShip%20to%3A%0A";

export default function ShopPage() {
  const book = books[0];

  return (
    <div>
      <section className="grain relative min-h-[100svh] overflow-hidden">
        <Image
          src={book.heroImage}
          alt="Candlelit printing shop evocative of Thomas Paine’s world"
          fill
          priority
          className="object-cover object-[68%_center] animate-ember"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0 z-[1]" />
        <div className="relative z-[2] mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="animate-rise font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.35em] text-brass">
            The Greatest Humans · Shop
          </p>
          <h1 className="animate-rise-delay-1 mt-4 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-bone md:text-7xl lg:text-8xl">
            Firebrand
          </h1>
          <p className="animate-rise-delay-2 mt-3 font-[family-name:var(--font-display)] text-2xl text-brass md:text-3xl">
            {book.subtitle}
          </p>
          <p className="animate-rise-delay-3 mt-6 max-w-xl text-lg text-bone/85 md:text-xl">
            Own Book One of Brad Turner’s series—ebook or paperback—while Amazon
            listings are still coming online.
          </p>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-seal">
            Choose a format
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight md:text-5xl">
            Clear prices. Direct purchase.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            {book.synopsis}
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div className="border-t border-ink/15 pt-8">
              <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-seal">
                Ebook
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-5xl text-ink">
                $4.99
              </p>
              <p className="mt-3 text-ink/70">
                Kindle or EPUB delivered by email after you write.
              </p>
              <a
                href={EBOOK_MAIL}
                className="mt-8 inline-block bg-seal px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.18em] text-bone transition hover:bg-seal-deep"
              >
                Buy ebook · $4.99
              </a>
            </div>

            <div className="border-t border-ink/15 pt-8">
              <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-seal">
                Paperback
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-5xl text-ink">
                $15.99
              </p>
              <p className="mt-3 text-ink/70">
                Print edition shipped to the address you include.
              </p>
              <a
                href={PAPERBACK_MAIL}
                className="mt-8 inline-block border border-ink/25 px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.18em] text-ink transition hover:border-seal hover:text-seal"
              >
                Buy paperback · $15.99
              </a>
            </div>
          </div>

          <p className="mt-10 max-w-2xl font-[family-name:var(--font-ui)] text-sm text-ink/55">
            Email opens to{" "}
            <span className="text-ink">brad@treadcompanies.com</span> with the
            package in the subject line. Amazon store links will replace these
            when available.
          </p>

          <div className="mt-16 border border-ink/15 bg-ink px-6 py-10 text-bone md:px-10">
            <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.28em] text-brass">
              Rights &amp; screen
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              Film &amp; adaptation rights
            </h3>
            <p className="mt-4 max-w-2xl text-bone/80">
              Firebrand includes a feature treatment and sample pages. Producers,
              studios, and partners can inquire about option / purchase terms.
            </p>
            <a
              href="mailto:brad@treadcompanies.com?subject=Firebrand%20film%20rights%20inquiry&body=Company%3A%0AContact%3A%0AInterest%20(option%20%2F%20purchase%20%2F%20partnership)%3A%0ANotes%3A%0A"
              className="mt-8 inline-block bg-seal px-5 py-3 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.18em] text-bone transition hover:bg-seal-deep"
            >
              Inquire about film rights
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-4 border-t border-ink/15 pt-10 font-[family-name:var(--font-ui)] text-sm">
            <Link
              href="/speaking"
              className="bg-seal px-4 py-2.5 text-bone transition hover:bg-seal-deep"
            >
              Speaking · from $15,000
            </Link>
            <Link
              href="/commission"
              className="bg-ink px-4 py-2.5 text-bone transition hover:bg-seal"
            >
              Commission · from $45,000
            </Link>
            <Link
              href="/serialization"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Serialization · from $25,000
            </Link>
            <Link
              href="/audiobook"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Audiobook · from $15,000
            </Link>
            <Link
              href="/translation"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Translation · from $18,000
            </Link>
            <Link
              href="/reprint"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Reprint rights · from $6,000
            </Link>
            <Link
              href="/serial-print"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Serial print · from $9,000
            </Link>
            <Link
              href="/large-print"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Large print · from $7,500
            </Link>
<Link
              href="/companion"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Companion · from $8,500
            </Link>
<Link
              href="/annotated"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Annotated · from $10,000
            </Link>
<Link
              href="/graphic"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Graphic · from $12,000
            </Link>
<Link
              href="/young-readers"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Young readers · from $11,000
            </Link>
<Link
              href="/study-guide"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Study guide · from $6,500
            </Link>
<Link
              href="/workbook"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Workbook · from $5,500
            </Link>
            <Link
              href="/curriculum"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Curriculum · from $8,500
            </Link>
            <Link
              href="/classroom"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Classroom · from $7,500
            </Link>
            <Link
              href="/syllabus"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Syllabus · from $6,500
            </Link>
            <Link
              href="/lesson-plan"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Lesson plan · from $5,500
            </Link>
            <Link
              href="/quiz-bank"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Quiz bank · from $4,500
            </Link>
            <Link
              href="/answer-key"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Answer key · from $3,500
            </Link>
            <Link
              href="/rubric"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Rubric · from $2,500
            </Link>
            <Link
              href="/worksheet"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Worksheet · from $2,000
            </Link>
            <Link
              href="/flashcards"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Flashcards · from $1,800
            </Link>
            <Link
              href="/glossary"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Glossary · from $1,600
            </Link>
            <Link
              href="/handout"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Handout · from $1,400
            </Link>
            <Link
              href="/poster"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Poster · from $1,200
            </Link>
            <Link
              href="/bookmark"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Bookmark · from $1,000
            </Link>
            <Link
              href="/map"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Map · from $900
            </Link>
            <Link
              href="/atlas"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Atlas · from $800
            </Link>
            <Link
              href="/chronology"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Chronology · from $700
            </Link>
            <Link
              href="/concordance"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Concordance · from $650
            </Link>
            <Link
              href="/gazette"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Gazette · from $600
            </Link>
            <Link
              href="/digest"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Digest · from $550
            </Link>
            <Link
              href="/almanac"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Almanac · from $500
            </Link>
            <Link
              href="/folio"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Folio · from $450
            </Link>
            <Link
              href="/anthology"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Anthology · from $400
            </Link>
            <Link
              href="/reader"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Reader · from $350
            </Link>
            <Link
              href="/primer"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Primer · from $300
            </Link>
            <Link
              href="/lexicon"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Lexicon · from $275
            </Link>
            <Link
              href="/chapbook"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Chapbook · from $250
            </Link>
            <Link
              href="/omnibus"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Omnibus · from $225
            </Link>
            <Link
              href="/codex"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Codex · from $200
            </Link>
            <Link
              href="/estate"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Estate oral history · from $12,000
            </Link>
            <Link
              href="/lecture"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Keynote lecture · from $7,500
            </Link>
            <Link
              href="/podcast"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Podcast rights · from $8,000
            </Link>
            <Link
              href="/screenplay"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Screenplay · from $15,000
            </Link>
            <Link
              href="/documentary-rights"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Documentary rights · from $12,000
            </Link>
            <Link
              href="/foreign-rights"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Foreign rights · from $20,000
            </Link>
            <Link
              href="/stage"
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Stage · from $35,000
            </Link>
            <Link
              href={`/books/${book.slug}/read/${book.chapters[0].slug}`}
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Read sample chapter
            </Link>
            <Link
              href={`/books/${book.slug}/film`}
              className="border border-ink/25 px-4 py-2.5 text-ink transition hover:border-seal hover:text-seal"
            >
              Film adaptation
            </Link>
            <Link
              href={`/books/${book.slug}`}
              className="px-4 py-2.5 text-ink/60 transition hover:text-seal"
            >
              Book overview →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
