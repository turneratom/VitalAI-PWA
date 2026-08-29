import type { Metadata } from "next";
import Link from "next/link";
import { HeroShell, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { links } from "@/lib/links";

export const metadata: Metadata = {
  title: "Hands-Off Affiliate Roadmap",
  description:
    "The step-by-step path from knowing nothing to building an organic affiliate system that can run without you. Weeks 1–2 through Month 6.",
  openGraph: {
    title: "Hands-Off Affiliate Roadmap | TREAD Marketing",
    description:
      "Learn one workflow. Make your first dollars. Reinvest. Build a team around what already works.",
    type: "article",
  },
};

const roadmap = [
  {
    id: "weeks-1-2",
    phase: "Weeks 1–2",
    title: "Learn the game",
    aim: "Leave knowing exactly what to do every day.",
  },
  {
    id: "month-1",
    phase: "Month 1",
    title: "Execute until it clicks",
    aim: "Find signals — not scale fantasies.",
  },
  {
    id: "month-2",
    phase: "Month 2",
    title: "Build volume & winners",
    aim: "Put capacity behind what deserves it.",
  },
  {
    id: "month-3",
    phase: "Month 3",
    title: "Hire your first VA",
    aim: "Unblock content production.",
  },
  {
    id: "month-4",
    phase: "Month 4",
    title: "Separate content from strategy",
    aim: "Stop making creatives. Start operating.",
  },
  {
    id: "month-5",
    phase: "Month 5",
    title: "Remove yourself from posting",
    aim: "Hand off the process, not chaos.",
  },
  {
    id: "month-6",
    phase: "Month 6",
    title: "Hands off",
    aim: "Someone else keeps the machine moving.",
  },
];

const dailySignals = [
  "Which offers get attention",
  "Which hooks pull views",
  "Which angles get clicks",
  "Which traffic actually converts",
];

const marketHabits = [
  "Study the market",
  "Watch what is performing",
  "Save strong hooks",
  "Look at new angles",
  "Notice what keeps appearing",
];

const swipeLibrary = [
  "Strong openings",
  "Proven formats",
  "Curiosity hooks",
  "Emotional hooks",
  "Product angles",
  "Content structures",
];

const managerTracks = [
  "What offers are running",
  "What content is being produced",
  "What needs to be posted",
  "What each teammate is working on",
  "What angles are being tested",
  "What competitors are doing",
  "What new opportunities are appearing",
];

export default function HandsOffPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader
        links={[
          { href: "/#guide", label: "Traffic guide" },
          { href: "#roadmap", label: "Roadmap" },
          { href: "#month-6", label: "Hands off" },
        ]}
      />

      <HeroShell>
        <div className="animate-rise mb-5 flex items-center gap-3">
          <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-signal" />
          <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            TREAD Marketing
          </p>
        </div>

        <h1 className="animate-rise-d1 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          From zero to
          <span className="mt-2 block text-signal">hands-off.</span>
        </h1>

        <p className="animate-rise-d2 mt-6 max-w-xl text-lg text-white/80 md:text-xl">
          The step-by-step path from knowing nothing to an affiliate system that
          doesn’t need you on every post.
        </p>

        <div className="animate-rise-d3 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#roadmap"
            className="bg-signal px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-white"
          >
            See the roadmap
          </a>
          <a
            href={links.glitchy}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/35 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-signal hover:text-signal"
          >
            Start with Glitchy
          </a>
        </div>
      </HeroShell>

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
          Affiliate business research
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
          Nobody starts with a team. Everyone starts with one workflow.
        </h2>

        <div className="prose-tread mt-8 text-base md:text-lg">
          <p>
            Everyone you see making serious money with organic affiliate
            marketing started exactly where you are now.
          </p>
          <p>
            When you look at people running multiple offers, dozens of accounts,
            and entire teams, it can feel like you’re miles behind. But nobody
            starts there.
          </p>
          <p>
            You start by learning one workflow. Run it yourself. Make your first
            dollars online. Then you reinvest — more devices, more content, more
            volume. Eventually you build a team around what you’ve already proven
            works.
          </p>
          <p>
            That’s how you go from doing everything yourself to having an actual
            operation. Because if every new piece of content requires your time,
            you haven’t built a business. You’ve built yourself another job.
          </p>
          <p className="font-semibold text-ink">The roadmap is simple.</p>
        </div>

        {/* Roadmap visual — replaces draft "Image" placeholders */}
        <section id="roadmap" className="scroll-mt-20 mt-12 border-y border-line py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            6-month path
          </p>
          <ol className="mt-8 space-y-0">
            {roadmap.map((step, i) => (
              <li key={step.id} className="relative flex gap-5 pb-8 last:pb-0">
                {i < roadmap.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-line"
                  />
                )}
                <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center bg-ink font-display text-xs font-bold text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pt-0.5">
                  <a href={`#${step.id}`} className="group block">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cone">
                      {step.phase}
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold group-hover:text-cone">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{step.aim}</p>
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-ink">
            Let’s get into it.
          </p>
        </section>

        {/* WEEKS 1–2 */}
        <section id="weeks-1-2" className="scroll-mt-20 pt-16 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Weeks 1–2
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Learn the game
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              The first mistake most beginners make is trying to figure
              everything out alone. They join a platform. Pick a random offer.
              Watch 50 YouTube videos. Test random content. Get confused. Then
              quit.
            </p>
            <p>
              The first two weeks should be about removing that confusion.
            </p>
            <p>
              <strong>Join Glitchy.</strong> Pick whether you want to start with
              CPA offers or ecommerce offers. Then join a bootcamp.
            </p>
            <p>
              The goal of those first two weeks isn’t to make $30K. It’s to leave
              knowing exactly what you need to do every day.
            </p>
          </div>

          <div className="mt-8 bg-ink px-6 py-8 text-white md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Daily clarity
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Find offers",
                "Understand what angles work",
                "Create content",
                "Set up your workflow",
                "Post consistently",
                "Track what works",
                "Understand why something converts",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="prose-tread mt-8 text-base md:text-lg">
            <p>
              Because you’re learning in a small group, you can ask questions when
              you get stuck instead of spending three days solving a problem
              alone. By the end of the bootcamp, the goal is simple:{" "}
              <strong>you have a repeatable workflow.</strong>
            </p>
          </div>

          <a
            href={links.glitchy}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex bg-signal px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-signal"
          >
            Join Glitchy bootcamp →
          </a>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONTH 1 */}
        <section id="month-1" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Month 1
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Execute until it starts making sense
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              This is where most of the real learning happens. You’re running the
              workflow. Posting. Testing. Tracking. Finding out what actually
              works for you.
            </p>
            <p>
              Don’t obsess over scaling. Your job is to understand the game and
              start finding signals.
            </p>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Pay attention to
          </p>
          <ul className="mt-4 space-y-3">
            {dailySignals.map((s) => (
              <li key={s} className="flex gap-3 text-base text-ink/85">
                <span className="mt-2 h-2 w-2 shrink-0 bg-signal" />
                {s}
              </li>
            ))}
          </ul>

          <div className="prose-tread mt-8 text-base md:text-lg">
            <p>
              At the same time, watch what everyone else in the space is running.
              This isn’t a business where you find one winning angle and retire.
              Things change. Angles get saturated. Products trend. New
              opportunities appear. The people who stay on top usually spot
              changes first.
            </p>
            <p className="font-semibold text-ink">
              So start building the habit early. Every day:
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {marketHabits.map((h) => (
              <li
                key={h}
                className="border-l-2 border-cone pl-4 text-base text-ink/85"
              >
                {h}
              </li>
            ))}
          </ul>

          <div className="prose-tread mt-8 text-base md:text-lg">
            <p>
              You’re not copying content. You’re learning to recognize patterns.
              That skill becomes more valuable as you scale.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONTH 2 */}
        <section id="month-2" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Month 2
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Build volume and find your first winners
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              By now you should know what you’re doing. You don’t need another 20
              hours of research. Your goal is simple: find what deserves more
              volume.
            </p>
            <p>
              Test different offers. Different angles. Different hooks. Different
              formats. Over time, the data makes your best opportunities obvious
              — the ones you understand and can confidently keep putting volume
              behind. Those become your main offers. Over time, they become the
              core of your operation.
            </p>
            <p>
              When money starts coming in, reinvest it. Not into random courses.
              Not into things you don’t need. Into more capacity. And scale
              without creating chaos.
            </p>
          </div>

          <div className="mt-10 border border-line bg-paper-deep/50 px-6 py-8 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cone">
              Device structure
            </p>
            <p className="mt-3 font-display text-2xl font-extrabold">
              One main offer per device
            </p>
            <p className="mt-3 text-muted">
              Keeps everything clean so you always know what offer is running,
              what content belongs to it, what angles are being tested, and where
              results are coming from.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-display text-lg font-extrabold">Main devices</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Your current winners. Dedicated structure. Steady volume that
                  pays the bills.
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-extrabold">Test devices</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  New offers. New niches. Untapped opportunities. Your winners
                  make money — your testing finds the next ones. You need both.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONTH 3 */}
        <section id="month-3" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Month 3
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Hire your first VA
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              At some point, content production becomes the bottleneck. You’re
              spending time researching, creating, editing, posting, testing —
              and there are only so many hours in the day. This is when I’d hire
              the first VA.
            </p>
            <p>
              Their job is to help with content production. But don’t hire
              someone and say “make content.” Teach them your workflow, your
              standards, your examples, your process.
            </p>
            <p>
              For the first few weeks, you’re still involved. You’re making some
              content yourself. You’re showing them what good creatives look
              like. You’re telling them: run this offer, test this angle, use this
              format. They produce. You direct and post.
            </p>
            <p>
              And while this is happening, start building one of the most
              valuable assets in the entire operation:
            </p>
          </div>

          <div className="mt-8 bg-ink px-6 py-8 text-white md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Build this early
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold">
              Your content swipe file
            </h3>
            <p className="mt-3 leading-relaxed text-white/75">
              Every piece of content worth studying gets saved — not just yours.
              Everyone’s. If something stops your scroll, save it. If a format
              keeps going viral, save it. If the same opening works across
              multiple accounts, save it.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {swipeLibrary.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-cone" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-white/65">
              Later, new hires don’t start from zero. You hand them hundreds of
              examples of what good looks like.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONTH 4 */}
        <section id="month-4" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Month 4
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Separate content from strategy
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              By month four, you start thinking differently. This is where I’d
              bring in another content VA — double the production capacity. One
              person on one set of content. Another on another. Or both producing
              variations around your main offers.
            </p>
            <p>
              The important part: you are no longer responsible for physically
              making anything. Your role changes.
            </p>
          </div>

          <div className="mt-8 grid gap-8 border-y border-line py-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                You
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/85 md:text-base">
                {[
                  "Study the market",
                  "Find new angles",
                  "Hunt winning content",
                  "Post",
                  "Decide what deserves more testing",
                  "Tell the team what to run",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Team
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink/85 md:text-base">
                {[
                  "Execute the brief",
                  "Produce creatives",
                  "Send finished work your way",
                  "Iterate on your feedback",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cone" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="prose-tread mt-8 text-base md:text-lg">
            <p>
              This is a major shift. You’re no longer just a content creator.
              You’re becoming an operator.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONTH 5 */}
        <section id="month-5" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Month 5
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Remove yourself from posting
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>Posting should be the next thing to leave your plate. By now you should have:</p>
          </div>

          <ul className="mt-6 space-y-3">
            {[
              "Main offers",
              "Testing offers",
              "Content production",
              "Multiple devices",
              "A hook swipe file",
              "Clear workflows",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-base text-ink/85">
                <span className="mt-2 h-2 w-2 shrink-0 bg-signal" />
                {item}
              </li>
            ))}
          </ul>

          <div className="prose-tread mt-8 text-base md:text-lg">
            <p>
              Now hire someone to post. Give them a system: the device structure,
              posting rules, content folders, your instructions, the swipe file.
              Everything should be organized enough that another person can follow
              the process without asking you what to do every five minutes.
            </p>
            <p>
              At this point, real scale starts becoming possible.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONTH 6 */}
        <section id="month-6" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Month 6
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Hands off
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              Now build the final layer. Bring in someone to manage the
              operation. Their job is to keep the machine moving.
            </p>
          </div>

          <div className="mt-8 border-l-2 border-signal pl-5 md:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              The manager tracks
            </p>
            <ul className="mt-4 space-y-2">
              {managerTracks.map((item) => (
                <li key={item} className="text-base text-ink/85">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="prose-tread mt-8 text-base md:text-lg">
            <p>
              Now you have an actual hands-off operation running.
            </p>
          </div>

          {/* Machine visual */}
          <div className="mt-10 overflow-hidden bg-ink px-6 py-10 text-white md:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
              The machine
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { t: "Content VAs", d: "Produce creatives from your briefs & swipe file" },
                { t: "Poster", d: "Runs devices, folders, and posting rules" },
                { t: "Manager", d: "Keeps offers, people, and tests moving" },
              ].map((layer) => (
                <div key={layer.t}>
                  <p className="font-display text-xl font-extrabold text-signal">
                    {layer.t}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {layer.d}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/70">
              Your job: find what works next.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        <section className="pb-8">
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">
            The goal isn’t to work 18 hours a day forever
          </h2>
          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              Anyone can temporarily work harder. That’s not difficult. Scaling is
              about increasing output without increasing your personal workload at
              the same rate.
            </p>
            <p>
              At the start, you do everything because you need to understand every
              part of the machine. Once you understand it, start replacing
              yourself — first in content, then in posting, then in management —
              until your main job becomes finding what works next.
            </p>
            <p>
              That’s what hands-off really means. Not building something that
              requires no work. Building something where your work actually
              matters.
            </p>
            <p className="font-semibold text-ink">
              Learn the system. Build the volume. Find the winners. Organize the
              chaos. Build the team. Then slowly take your hands off the things
              that don’t need them.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={links.glitchy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-signal px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-signal"
            >
              Join Glitchy — start week 1
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-ink px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-white"
            >
              Read the traffic guide
            </Link>
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
