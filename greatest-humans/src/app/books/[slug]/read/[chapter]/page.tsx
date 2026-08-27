import Link from "next/link";
import { notFound } from "next/navigation";
import {
  estimatePages,
  estimateWords,
  markdownToParagraphs,
  readChapterMarkdown,
} from "@/lib/content";
import { books, getChapter } from "@/lib/series";

export function generateStaticParams() {
  return books.flatMap((book) =>
    book.chapters.map((chapter) => ({
      slug: book.slug,
      chapter: chapter.slug,
    })),
  );
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter: chapterSlug } = await params;
  const match = getChapter(slug, chapterSlug);
  if (!match) notFound();

  const { book, chapter } = match;
  let markdown = "";
  try {
    markdown = await readChapterMarkdown(book.slug, chapter.number);
  } catch {
    notFound();
  }

  const paragraphs = markdownToParagraphs(markdown);
  const words = estimateWords(markdown);
  const pages = estimatePages(markdown);
  const index = book.chapters.findIndex((item) => item.slug === chapter.slug);
  const prev = index > 0 ? book.chapters[index - 1] : null;
  const next = index < book.chapters.length - 1 ? book.chapters[index + 1] : null;

  return (
    <div className="bg-paper text-ink">
      <div className="border-b border-ink/10 bg-paper-deep/70">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-5 py-8 md:px-8">
          <Link
            href={`/books/${book.slug}`}
            className="font-[family-name:var(--font-ui)] text-xs uppercase tracking-[0.24em] text-seal"
          >
            {book.title} · {book.subtitle}
          </Link>
          <p className="font-[family-name:var(--font-ui)] text-sm text-ink/55">
            Chapter {chapter.number} of {book.chapters.length} · ~{pages} pages ·{" "}
            {words.toLocaleString()} words
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight md:text-5xl">
            {chapter.title}
          </h1>
          <p className="text-ink/65">{chapter.subtitle}</p>
        </div>
      </div>

      <article className="prose-chapter mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className={i === 0 ? "animate-rise" : undefined}>
            {paragraph}
          </p>
        ))}
      </article>

      <nav className="border-t border-ink/10 bg-paper-deep/50">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 py-10 font-[family-name:var(--font-ui)] md:flex-row md:items-center md:justify-between md:px-8">
          {prev ? (
            <Link
              href={`/books/${book.slug}/read/${prev.slug}`}
              className="text-ink/70 transition hover:text-seal"
            >
              ← Ch. {prev.number}: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/books/${book.slug}/read/${next.slug}`}
              className="text-ink transition hover:text-seal"
            >
              Ch. {next.number}: {next.title} →
            </Link>
          ) : (
            <Link
              href={`/books/${book.slug}/film`}
              className="text-seal transition hover:text-seal-deep"
            >
              Continue to the film →
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
