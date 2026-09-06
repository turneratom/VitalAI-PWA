import Link from "next/link";
import { notFound } from "next/navigation";
import { readFilmFile } from "@/lib/content";
import { books, getBook } from "@/lib/series";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

function renderBlocks(text: string) {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  let treatment = "";
  let screenplay = "";
  try {
    treatment = await readFilmFile(book.slug, "treatment");
    screenplay = await readFilmFile(book.slug, "screenplay");
  } catch {
    notFound();
  }

  return (
    <div className="bg-ink text-bone">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(154,52,44,0.28),transparent_45%),linear-gradient(180deg,#1c222b,#12151a)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Motion picture adaptation
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl md:text-7xl">
            {book.filmTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-bone/80">
            Based on the book by Brad Turner. A feature film distilled from the
            same life—Common Sense to the Luxembourg cell to a lonely American
            ending.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 font-[family-name:var(--font-ui)] text-sm">
            <a
              href="#trailer"
              className="bg-seal px-4 py-2.5 uppercase tracking-[0.16em] hover:bg-seal-deep"
            >
              Watch trailer
            </a>
            <a
              href="#treatment"
              className="border border-bone/30 px-4 py-2.5 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Treatment
            </a>
            <a
              href="#screenplay"
              className="border border-bone/30 px-4 py-2.5 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Screenplay
            </a>
            <a
              href="#rights"
              className="border border-bone/30 px-4 py-2.5 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Rights packages
            </a>
            <Link
              href={`/books/${book.slug}/read/${book.chapters[0].slug}`}
              className="px-4 py-2.5 text-fog hover:text-bone"
            >
              ← Back to the book
            </Link>
          </div>
        </div>
      </section>

      <section id="rights" className="border-b border-white/10 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.3em] text-brass">
            Film &amp; adaptation rights
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-bone md:text-5xl">
            Clear packages. Direct inquiry.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-bone/75">
            Option, shopping, or purchase — priced for producers who want a path
            without a twelve-month agent chase. Email opens with the package in the subject.
          </p>
          <div className="mt-12 grid gap-0 border-t border-white/15 md:grid-cols-3">
            <article className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:pr-8 md:py-10">
              <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">
                Option
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-bone">
                $15,000
              </p>
              <p className="mt-3 text-bone/70">
                12-month exclusive option against purchase. Treatment + access to author notes.
              </p>
              <a
                href={`mailto:brad@treadcompanies.com?subject=${encodeURIComponent(`Film option — ${book.filmTitle} ($15,000)`)}&body=${encodeURIComponent(`I want the 12-month film option on ${book.filmTitle} ($15,000).\n\nCompany:\nName:\nEmail:\nTerritory:\nNotes:\n`)}`}
                className="mt-6 inline-block bg-seal px-4 py-2.5 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:bg-seal-deep"
              >
                Inquire · Option
              </a>
            </article>
            <article className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:py-10">
              <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">
                Shopping agreement
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-bone">
                $35,000
              </p>
              <p className="mt-3 text-bone/70">
                18-month shopping window with first-look on purchase. Includes treatment + screenplay access.
              </p>
              <a
                href={`mailto:brad@treadcompanies.com?subject=${encodeURIComponent(`Film shopping — ${book.filmTitle} ($35,000)`)}&body=${encodeURIComponent(`I want the shopping agreement on ${book.filmTitle} ($35,000).\n\nCompany:\nName:\nEmail:\nTerritory:\nNotes:\n`)}`}
                className="mt-6 inline-block bg-seal px-4 py-2.5 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:bg-seal-deep"
              >
                Inquire · Shopping
              </a>
            </article>
            <article className="py-8 md:pl-8 md:py-10">
              <p className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.22em] text-brass">
                Rights purchase
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-bone">
                From $150k
              </p>
              <p className="mt-3 text-bone/70">
                Feature film rights purchase — territory and backend terms negotiated from a written offer.
              </p>
              <a
                href={`mailto:brad@treadcompanies.com?subject=${encodeURIComponent(`Film rights purchase — ${book.filmTitle}`)}&body=${encodeURIComponent(`I want to discuss purchasing film rights for ${book.filmTitle} (from $150,000).\n\nCompany:\nName:\nEmail:\nProposed territory:\nNotes:\n`)}`}
                className="mt-6 inline-block border border-bone/30 px-4 py-2.5 font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
              >
                Inquire · Purchase
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="trailer" className="border-b border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone md:text-4xl">
            Trailer
          </h2>
          <p className="mt-3 max-w-2xl text-fog">
            A short cinematic preview of Firebrand — from Brad Turner’s book to
            the screen.
          </p>
          <div className="mt-8 overflow-hidden rounded-sm bg-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              poster="/thomas-paine-hero.png"
            >
              <source src="/film/firebrand-trailer.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section id="treatment" className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Film treatment
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
            {renderBlocks(treatment).map((block, i) => {
              if (block.startsWith("#")) {
                return (
                  <h3
                    key={i}
                    className="pt-4 font-[family-name:var(--font-display)] text-2xl text-ink"
                  >
                    {block.replace(/^#+\s*/, "")}
                  </h3>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </div>
        </div>
      </section>

      <section id="screenplay" className="bg-paper-deep text-ink">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Screenplay
          </h2>
          <div className="screenplay mt-8 rounded-sm bg-bone/80 p-5 shadow-[0_20px_60px_rgba(18,21,26,0.12)] md:p-8">
            {screenplay}
          </div>
        </div>
      </section>
    </div>
  );
}
