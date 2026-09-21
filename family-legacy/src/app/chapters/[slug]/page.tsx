import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getChapter } from "@/lib/chapters";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return { title: "Chapter" };
  return { title: chapter.title };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const index = chapters.findIndex((entry) => entry.slug === chapter.slug);
  const previous = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker text-seal">Chapter {chapter.roman}</p>
      <h1 className="mt-3 font-display text-5xl text-ink">{chapter.title}</h1>
      <p className="mt-4 text-lg italic leading-relaxed text-ink-soft">
        {chapter.dek}
      </p>
      <blockquote className="mt-8 border-l-2 border-rule pl-5 font-display text-2xl leading-snug text-seal">
        {chapter.pullQuote}
      </blockquote>
      <div className="prose-vault mt-10 text-[1.07rem] leading-[1.8]">
        {chapter.sections.map((section, sectionIndex) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraph.slice(0, 24)}
                className={
                  sectionIndex === 0 && paragraphIndex === 0 ? "drop-cap" : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <nav className="mt-16 flex items-center justify-between border-t border-rule/40 pt-6 text-sm">
        {previous ? (
          <Link href={`/chapters/${previous.slug}`} className="text-ink-soft hover:text-ink">
            ← {previous.title}
          </Link>
        ) : (
          <Link href="/chapters" className="text-ink-soft hover:text-ink">
            ← All chapters
          </Link>
        )}
        {next ? (
          <Link href={`/chapters/${next.slug}`} className="text-ink-soft hover:text-ink">
            {next.title} →
          </Link>
        ) : (
          <Link href="/tree" className="text-ink-soft hover:text-ink">
            The tree →
          </Link>
        )}
      </nav>
    </article>
  );
}
