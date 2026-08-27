import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook } from "@/lib/series";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <div>
      <section className="grain relative min-h-[85svh] overflow-hidden">
        <Image
          src={book.heroImage}
          alt=""
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0 z-[1]" />
        <div className="relative z-[2] mx-auto flex min-h-[85svh] w-full max-w-6xl flex-col justify-end px-5 pb-14 pt-24 md:px-8">
          <p className="animate-rise font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.35em] text-brass">
            {book.author} · The Greatest Humans
          </p>
          <h1 className="animate-rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-5xl leading-none text-bone md:text-7xl">
            {book.title}
          </h1>
          <p className="animate-rise-delay-2 mt-3 font-[family-name:var(--font-display)] text-2xl text-brass md:text-3xl">
            {book.subtitle}
          </p>
          <p className="animate-rise-delay-3 mt-6 max-w-2xl text-lg text-bone/85">
            {book.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 font-[family-name:var(--font-ui)]">
            <Link
              href={`/books/${book.slug}/read/${book.chapters[0].slug}`}
              className="bg-seal px-5 py-3 text-sm uppercase tracking-[0.16em] text-bone hover:bg-seal-deep"
            >
              Start the book
            </Link>
            <Link
              href={`/books/${book.slug}/film`}
              className="border border-bone/35 px-5 py-3 text-sm uppercase tracking-[0.16em] text-bone hover:border-brass hover:text-brass"
            >
              Film adaptation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              Inside the story
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{book.synopsis}</p>
          </div>

          <ol className="mt-16 grid gap-0 border-t border-ink/15">
            {book.chapters.map((chapter) => (
              <li key={chapter.slug} className="border-b border-ink/15">
                <Link
                  href={`/books/${book.slug}/read/${chapter.slug}`}
                  className="group flex flex-col gap-2 py-6 transition md:flex-row md:items-baseline md:justify-between md:gap-8"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-[family-name:var(--font-ui)] text-sm tracking-[0.2em] text-seal">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-2xl text-ink transition group-hover:text-seal md:text-3xl">
                      {chapter.title}
                    </span>
                  </div>
                  <span className="pl-12 text-ink/60 md:pl-0 md:text-right">
                    {chapter.subtitle}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
