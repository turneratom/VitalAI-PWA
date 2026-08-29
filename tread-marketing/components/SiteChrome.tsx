import Link from "next/link";
import { links } from "@/lib/links";

type NavLink = { href: string; label: string };

export function SiteHeader({
  links: navLinks,
  light = false,
}: {
  links: NavLink[];
  light?: boolean;
}) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className={`font-display text-lg font-extrabold tracking-tight md:text-xl ${
            light ? "text-ink" : "text-white"
          }`}
        >
          TREAD <span className="text-signal">Marketing</span>
        </Link>
        <nav
          className={`hidden items-center gap-6 text-sm sm:flex ${
            light ? "text-muted" : "text-white/70"
          }`}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition ${light ? "hover:text-ink" : "hover:text-signal"}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={links.glitchy}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-signal px-3 py-1.5 font-semibold text-ink transition hover:bg-white"
          >
            Join Glitchy
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-extrabold">
            TREAD <span className="text-signal">Marketing</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Traffic skills. Hands-off systems. Affiliate monetisation. Built for
            people who are done trading hours for another job.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-white/70 transition hover:text-signal">
            Traffic guide
          </Link>
          <Link
            href="/hands-off"
            className="text-white/70 transition hover:text-signal"
          >
            Hands-off roadmap
          </Link>
          <a
            href={links.glitchy}
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal transition hover:text-white"
          >
            Glitchy
          </a>
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition hover:text-signal"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}

export function HeroShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="hero-plane hero-grain relative min-h-[100svh] overflow-hidden text-white">
      <div className="hero-lanes lane-sweep pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-cone/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-signal/15 blur-3xl" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
        {children}
      </div>
    </section>
  );
}
