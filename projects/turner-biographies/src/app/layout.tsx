import type { Metadata } from "next";
import { Fraunces, Literata, Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Literata({
  variable: "--font-body",
  subsets: ["latin"],
});

const ui = Manrope({
  variable: "--font-ui",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Greatest Humans — Brad Turner",
    template: "%s — The Greatest Humans",
  },
  description:
    "Brad Turner’s biographical series: immersive lives of history’s greatest humans, written as stories and adapted for film. Book One: Firebrand — Thomas Paine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${ui.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <header className="relative z-20 border-b border-white/10 bg-ink/80 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
            <Link href="/" className="group font-[family-name:var(--font-ui)]">
              <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-brass transition group-hover:text-bone">
                Brad Turner
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-bone md:text-xl">
                The Greatest Humans
              </span>
            </Link>
            <nav className="flex items-center gap-5 font-[family-name:var(--font-ui)] text-sm text-fog">
              <Link className="transition hover:text-bone" href="/#series">
                Series
              </Link>
              <Link className="transition hover:text-bone" href="/books/firebrand">
                Firebrand
              </Link>
              <Link
                className="transition hover:text-bone"
                href="/books/firebrand/read/the-cordwainers-son"
              >
                Begin reading
              </Link>
              <Link className="transition hover:text-bone" href="/speaking">
                Speaking
              </Link>
              <Link className="transition hover:text-bone" href="/lecture">
                Lecture
              </Link>
              <Link className="transition hover:text-bone" href="/commission">
                Commission
              </Link>
              <Link className="transition hover:text-bone" href="/serialization">
                Serialization
              </Link>
              <Link className="transition hover:text-bone" href="/audiobook">
                Audiobook
              </Link>
              <Link className="transition hover:text-bone" href="/foreign-rights">
                Foreign rights
              </Link>
              <Link className="transition hover:text-bone" href="/reprint">
                Reprint
              </Link>
              <Link className="transition hover:text-bone" href="/serial-print">
                Serial print
              </Link>
              <Link className="transition hover:text-bone" href="/large-print">
                Large print
              </Link>
              <Link className="transition hover:text-bone" href="/companion">
                Companion
              </Link>
              <Link className="transition hover:text-bone" href="/annotated">
                Annotated
              </Link>
              <Link className="transition hover:text-bone" href="/graphic">
                Graphic
              </Link>
              <Link className="transition hover:text-bone" href="/young-readers">
                Young readers
              </Link>
              <Link className="transition hover:text-bone" href="/study-guide">
                Study guide
              </Link>
              <Link className="transition hover:text-bone" href="/workbook">
                Workbook
              </Link>
              <Link className="transition hover:text-bone" href="/curriculum">
                Curriculum
              </Link>
              <Link className="transition hover:text-bone" href="/classroom">
                Classroom
              </Link>
              <Link className="transition hover:text-bone" href="/syllabus">
                Syllabus
              </Link>
              <Link className="transition hover:text-bone" href="/lesson-plan">
                Lesson plan
              </Link>
              <Link className="transition hover:text-bone" href="/quiz-bank">
                Quiz bank
              </Link>
              <Link className="transition hover:text-bone" href="/answer-key">
                Answer key
              </Link>
              <Link className="transition hover:text-bone" href="/rubric">
                Rubric
              </Link>
              <Link className="transition hover:text-bone" href="/worksheet">
                Worksheet
              </Link>
              <Link className="transition hover:text-bone" href="/flashcards">
                Flashcards
              </Link>
              <Link className="transition hover:text-bone" href="/glossary">
                Glossary
              </Link>
              <Link className="transition hover:text-bone" href="/handout">
                Handout
              </Link>
              <Link className="transition hover:text-bone" href="/poster">
                Poster
              </Link>
              <Link className="transition hover:text-bone" href="/bookmark">
                Bookmark
              </Link>
              <Link className="transition hover:text-bone" href="/map">
                Map
              </Link>
              <Link className="transition hover:text-bone" href="/atlas">
                Atlas
              </Link>
              <Link className="transition hover:text-bone" href="/chronology">
                Chronology
              </Link>
              <Link className="transition hover:text-bone" href="/concordance">
                Concordance
              </Link>
              <Link className="transition hover:text-bone" href="/gazette">
                Gazette
              </Link>
              <Link className="transition hover:text-bone" href="/digest">
                Digest
              </Link>
              <Link className="transition hover:text-bone" href="/almanac">
                Almanac
              </Link>
              <Link className="transition hover:text-bone" href="/folio">
                Folio
              </Link>
              <Link className="transition hover:text-bone" href="/anthology">
                Anthology
              </Link>
              <Link className="transition hover:text-bone" href="/reader">
                Reader
              </Link>
              <Link className="transition hover:text-bone" href="/primer">
                Primer
              </Link>
              <Link className="transition hover:text-bone" href="/lexicon">
                Lexicon
              </Link>
              <Link className="transition hover:text-bone" href="/chapbook">
                Chapbook
              </Link>
              <Link className="transition hover:text-bone" href="/omnibus">
                Omnibus
              </Link>
              <Link className="transition hover:text-bone" href="/codex">
                Codex
              </Link>
              <Link className="transition hover:text-bone" href="/compendium">
                Compendium
              </Link>
              <Link className="transition hover:text-bone" href="/catalogue">
                Catalogue
              </Link>
              <Link className="transition hover:text-bone" href="/volume">
                Volume
              </Link>
              <Link className="transition hover:text-bone" href="/archive">
                Archive
              </Link>
              <Link className="transition hover:text-bone" href="/miscellany">
                Miscellany
              </Link>
              <Link className="transition hover:text-bone" href="/sampler">
                Sampler
              </Link>
              <Link className="transition hover:text-bone" href="/excerpt">
                Excerpt
              </Link>
              <Link className="transition hover:text-bone" href="/leaflet">
                Leaflet
              </Link>
              <Link className="transition hover:text-bone" href="/translation">
                Translation
              </Link>
              <Link className="transition hover:text-bone" href="/estate">
                Estate
              </Link>
              <Link className="transition hover:text-bone" href="/podcast">
                Podcast
              </Link>
              <Link className="transition hover:text-bone" href="/screenplay">
                Screenplay
              </Link>
              <Link className="transition hover:text-bone" href="/documentary-rights">
                Documentary
              </Link>
              <Link className="transition hover:text-bone" href="/stage">
                Stage
              </Link>
              <Link
                className="rounded-sm bg-seal px-3 py-1.5 text-bone transition hover:bg-seal-deep"
                href="/shop"
              >
                Shop
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 bg-ink-soft">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 font-[family-name:var(--font-ui)] text-sm text-fog md:flex-row md:items-end md:justify-between md:px-8">
            <div>
              <p className="font-[family-name:var(--font-display)] text-bone text-lg">
                The Greatest Humans
              </p>
              <p className="mt-1 max-w-md">
                A Brad Turner series. Stories first. Then the screen.
              </p>
            </div>
            <p>© {new Date().getFullYear()} Brad Turner</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
