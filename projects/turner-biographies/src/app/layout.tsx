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
                className="rounded-sm bg-seal px-3 py-1.5 text-bone transition hover:bg-seal-deep"
                href="/books/firebrand/read/the-cordwainers-son"
              >
                Begin reading
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
