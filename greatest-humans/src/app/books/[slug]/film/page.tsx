import Link from "next/link";
import { notFound } from "next/navigation";
import { readFilmFile } from "@/lib/content";
import { getBook } from "@/lib/series";

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
              href="#treatment"
              className="bg-seal px-4 py-2.5 uppercase tracking-[0.16em] hover:bg-seal-deep"
            >
              Treatment
            </a>
            <a
              href="#screenplay"
              className="border border-bone/30 px-4 py-2.5 uppercase tracking-[0.16em] hover:border-brass hover:text-brass"
            >
              Screenplay
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
