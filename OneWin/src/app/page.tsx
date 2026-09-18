import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <BrandMark />
        <Link
          href="/quiz"
          className="rounded-full bg-ink px-4 py-2 text-sm text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Start quiz
        </Link>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-24 sm:px-8">
        <section className="rise mx-auto max-w-2xl pt-10 text-center sm:pt-16">
          <p className="text-xs tracking-[0.28em] uppercase text-brass-dark">
            Evening close for adults
          </p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Close the day in under a minute.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Log exactly one win today. Name one move for tomorrow. Keep a quiet streak after a real
            evening — not a pet, not a kid game, not a 40-habit stack.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/quiz"
              className="inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Start quiz
            </Link>
            <a
              href="#ritual"
              className="inline-flex rounded-full border border-line bg-card px-7 py-3.5 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70"
            >
              See the ritual
            </a>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-md" aria-hidden>
          <div className="rounded-[28px] border border-line bg-card p-6 shadow-[0_24px_60px_rgba(28,25,21,0.08)]">
            <p className="text-xs tracking-[0.2em] uppercase text-muted">Example close</p>
            <p className="mt-4 text-xs tracking-[0.16em] uppercase text-brass-dark">Win</p>
            <p className="mt-1 font-serif text-2xl leading-snug text-ink">
              Sent the board deck and actually left Slack closed.
            </p>
            <p className="mt-5 text-xs tracking-[0.16em] uppercase text-brass-dark">Tomorrow</p>
            <p className="mt-1 font-serif text-2xl leading-snug text-ink">
              Protect 45 minutes before the 10am.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
              <span className="text-muted">Streak</span>
              <span className="font-serif text-xl text-ink">12</span>
            </div>
          </div>
        </section>

        <section id="ritual" className="mx-auto mt-24 max-w-3xl">
          <p className="text-xs tracking-[0.22em] uppercase text-brass-dark">How it works</p>
          <h2 className="mt-3 font-serif text-3xl text-ink">Two fields. That’s the product.</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Name the win",
                d: "The one thing that actually landed. Not the list of everything that didn’t.",
              },
              {
                n: "02",
                t: "Name tomorrow’s move",
                d: "One opening move. Morning-you should not have to invent the day from scratch.",
              },
              {
                n: "03",
                t: "Keep the streak",
                d: "A close you can finish in 60 seconds survives weeknights. That’s the only mechanic.",
              },
            ].map((item) => (
              <li key={item.n} className="rounded-2xl border border-line bg-card/80 p-5">
                <p className="text-xs tracking-[0.2em] uppercase text-muted">{item.n}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto mt-20 grid max-w-3xl gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-ink">Built for adults with a real 9pm.</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Operators, managers, ICs, freelancers, caregivers who also work. People whose days
              leak. People who don’t want a cartoon companion watching them fail a water streak.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink">Not this.</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              <li>Not for kids.</li>
              <li>Not a pet, Tamagotchi, or self-care creature.</li>
              <li>Not another morning-routine religion.</li>
              <li>Not a stack of 12 new habits you’ll abandon by Thursday.</li>
            </ul>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-3xl rounded-[28px] border border-line bg-card px-6 py-10 text-center">
          <p className="text-xs tracking-[0.22em] uppercase text-brass-dark">Membership</p>
          <p className="mt-3 font-serif text-3xl text-ink">$6.99/mo or $49/year</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Start with a short quiz. We’ll match the close to what actually fails by 9pm. No
            invented results. No countdown clocks.
          </p>
          <Link
            href="/quiz"
            className="mt-6 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Start quiz
          </Link>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-8 text-center text-sm text-muted sm:px-8">
        One Win · Adults only · This MVP stores your close on-device
      </footer>
    </div>
  );
}
