import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { chapters } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Chapters",
};

export default function ChaptersIndexPage() {
  return (
    <div className="pb-16">
      <PageHeader
        kicker="Narratives"
        title="Chapters of the Turner vault"
        dek="Four encyclopedia entries, written to the seed and left open for Brad. Origins, Building, Fatherhood, The Vault."
      />
      <div className="mx-auto max-w-3xl px-6">
        <ol className="divide-y divide-rule/40 border-y border-rule/40">
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link href={`/chapters/${chapter.slug}`} className="block py-8">
                <p className="kicker text-[0.65rem] text-seal">Chapter {chapter.roman}</p>
                <h2 className="mt-2 font-display text-3xl text-ink">{chapter.title}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{chapter.dek}</p>
                <p className="mt-4 italic text-ink">{chapter.pullQuote}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
