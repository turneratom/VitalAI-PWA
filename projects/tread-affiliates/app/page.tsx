import { links } from "@/lib/links";

const wins = [
  "Generate 6 figures from affiliate marketing organically",
  "Build a $20k/month business making Facebook ads for 8–9 figure brands",
  "Grow an X page to 10.7k followers — landing work with the biggest names in the online money space, and 6 figures in 10 months",
  "Drive 13 million views in a single month for one of the fastest-growing affiliate networks in the world",
];

const skillList = [
  {
    name: "D.R. copywriting",
    detail:
      "Urgency and scarcity done right. Pain points portrayed with accuracy. Clear CTAs that move people.",
  },
  {
    name: "Crafting hooks",
    detail:
      "Scroll-stopping visual and verbal hooks built on curiosity and open loops.",
  },
  {
    name: "Landing pages / funnels",
    detail: "Turn attention into action with pages that convert.",
  },
  {
    name: "Offer creation",
    detail: "Package value so the click feels inevitable.",
  },
];

const vehicles = [
  {
    name: "TikTok",
    badge: "First money",
    best: "CPA / CPI, low-friction offers, TikTok Shop affiliate",
    need: "Hook crafting, open loops, constant trend awareness",
    pros: "Traffic is relatively easy. Can print results fast when you hit.",
    cons: "Quality can be soft. Posts die fast — you lean on virality. Ads are a mess.",
  },
  {
    name: "Facebook",
    badge: "Paid S-tier",
    best: "Supplements, mature audiences, Meta ads at scale",
    need: "Hooks, audience research, scriptwriting, patience",
    pros: "Organic compounds once built. Ads can make you rich if you master them.",
    cons: "Organic is slower. Needs capital and skill for ads. Learning curve is real.",
  },
  {
    name: "Instagram",
    badge: "Best organic",
    best: "Supplements, info, CPA / CPI — almost anything",
    need: "Combine Facebook + TikTok skills",
    pros: "Views can ramp fast. Meta ads work well. Extremely valuable audience asset.",
    cons: "Competition is high. You still need sharp packaging every day.",
  },
  {
    name: "X",
    badge: "Authority",
    best: "Skill-backed offers, reputation plays, MMO when you’ve earned it",
    need: "Do real work, build connections, borrow authority carefully",
    pros: "Compounds hard when you have receipts. Opens doors money can’t buy alone.",
    cons: "Hardest to grow cold. Intelligent audience — BS gets smelled instantly.",
  },
  {
    name: "YouTube",
    badge: "Long game",
    best: "Info products, CPA, evergreen monetisation",
    need: "Packaging mastery — title, thumbnail, intro",
    pros: "Once you can push traffic here, money can last for years.",
    cons: "Most time and skill intensive vehicle on this list.",
  },
];

const desires = [
  { pocket: "Make more money", offers: "Info, SaaS" },
  { pocket: "Save money", offers: "Info, SaaS, CPA, CPI" },
  { pocket: "Status", offers: "Beauty, CPA, CPI, Info" },
  { pocket: "Health", offers: "Supplements, Info" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-white md:text-xl">
            TREAD <span className="text-signal">Marketing</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <a href="#skills" className="transition hover:text-signal">
              Skills
            </a>
            <a href="#vehicle" className="transition hover:text-signal">
              Vehicle
            </a>
            <a href="#monetisation" className="transition hover:text-signal">
              Monetisation
            </a>
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

      {/* HERO — one composition: brand, headline, support, CTAs, full-bleed plane */}
      <section id="top" className="hero-plane hero-grain relative min-h-[100svh] overflow-hidden text-white">
        <div className="hero-lanes lane-sweep pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-cone/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-signal/15 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="animate-rise mb-5 flex items-center gap-3">
            <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-signal" />
            <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              TREAD Marketing
            </p>
          </div>

          <h1 className="animate-rise-d1 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Master traffic.
            <span className="mt-2 block text-signal">Monetise attention.</span>
          </h1>

          <p className="animate-rise-d2 mt-6 max-w-xl text-lg text-white/80 md:text-xl">
            The skill that took me from a 9–5 to $30,000 a month in six months —
            and the exact path I’d hand my clueless past self.
          </p>

          <div className="animate-rise-d3 mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#guide"
              className="bg-signal px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-white"
            >
              Read the guide
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
        </div>
      </section>

      {/* Credibility strip — not in hero */}
      <section className="border-b border-line bg-ink text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8 md:py-14">
          {[
            { k: "$30k/mo", v: "In 6 months from a 9–5" },
            { k: "10.7k", v: "X followers · 6 figures in 10 months" },
            { k: "13M", v: "Views in one month for a top network" },
          ].map((item) => (
            <div key={item.k}>
              <p className="font-display text-3xl font-extrabold text-signal md:text-4xl">{item.k}</p>
              <p className="mt-2 text-sm text-white/65">{item.v}</p>
            </div>
          ))}
        </div>
      </section>

      <article id="guide" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
          Traffic generation guide
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
          Generating traffic is the most valuable skill you can learn right now
        </h2>

        <div className="prose-tread mt-8 text-base md:text-lg">
          <p>
            I completely changed my life by learning how to generate traffic.
            Not by chasing every shiny tool. Not by waiting for the perfect
            product. By learning how to capture attention — and convert it.
          </p>
          <p>
            From that one skill I’ve been able to:
          </p>
        </div>

        <ul className="mt-6 space-y-3">
          {wins.map((w) => (
            <li key={w} className="flex gap-3 text-base leading-relaxed text-ink/85 md:text-lg">
              <span className="mt-2 h-2 w-2 shrink-0 bg-signal" />
              <span>{w}</span>
            </li>
          ))}
        </ul>

        <div className="prose-tread mt-8 text-base md:text-lg">
          <p>
            I’ve also spent thousands of dollars and hundreds of hours learning
            this. There are things I wish I’d known earlier — mistakes that
            would’ve been avoided, money that would’ve come faster.
          </p>
          <p>
            So this article breaks down exactly how to become a master at
            generating traffic, how to monetise it, and what I’d tell myself as
            a clueless 9–5 worker trying to get out of the trenches.
          </p>
        </div>

        <div className="mt-12 border-y border-line py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Three steps
          </p>
          <ol className="mt-6 grid gap-8 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Skills",
                d: "What you must learn so any platform can push volume.",
              },
              {
                n: "02",
                t: "Vehicle",
                d: "Which platforms fit which offers — with real pros and cons.",
              },
              {
                n: "03",
                t: "Monetisation",
                d: "How to turn that traffic into money in your pocket.",
              },
            ].map((s) => (
              <li key={s.n}>
                <p className="font-display text-sm font-bold text-cone">{s.n}</p>
                <p className="mt-2 font-display text-xl font-extrabold">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
            By the end you’ll know what traffic generation is, how to start
            today, and how to make money from it. Let’s rock and roll.
          </p>
        </div>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-20 pt-16 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Step 01
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">Skills</h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              In modern traffic conversations, AI shows up everywhere. “Use this
              tool to write copy.” “Claude can launch your ads.” Truth is — it
              doesn’t change the game. Marketing has been more or less the same
              for a hundred years. The vehicles changed. Mail became Facebook
              ads. Capturing attention and converting it did not.
            </p>
            <p>
              When you’re starting, ignore the AI noise. It only makes you feel
              behind and anxious. AI tools won’t save a beginner with no skill —
              they magnify whatever skill you already have. Claude will look
              like it’s writing “good copy” if you know nothing about
              copywriting. Learn the skill first so you can judge the output.
            </p>
            <p>
              Generating traffic merges two major skill sets:{" "}
              <strong>direct response marketing</strong> and{" "}
              <strong>social media marketing</strong>. Direct response has a
              stack of sub-skills underneath it. You don’t need every single one
              on day one — but as you stack them over time, you become dangerous
              at pushing traffic.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {skillList.map((s, i) => (
              <div key={s.name} className="border-l-2 border-signal pl-5">
                <p className="text-xs font-semibold text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-xl font-extrabold">{s.name}</h3>
                <p className="mt-2 text-muted">{s.detail}</p>
              </div>
            ))}
          </div>

          <div className="prose-tread mt-10 text-base md:text-lg">
            <p>
              Learning the first two — copywriting and hooks — is all you need
              in the beginning. And let me be clear: you will not become a
              master copywriter in a week, a month, or even a year. It’s one of
              the hardest skills to master. It’s also one of those skills where
              just learning the fundamentals makes you 100× more competent at
              making money than people who skip it.
            </p>
            <p className="font-semibold text-ink">
              How do you learn copywriting? Three ways. Do all three every day.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-display text-lg font-extrabold">1. Consume media that teaches it</h3>
              <p className="mt-2 text-muted">
                YouTube, books, breakdowns. Start with these:
              </p>
              <ul className="mt-4 space-y-3">
                {links.youtube.map((v) => (
                  <li key={v.href}>
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border border-line bg-paper-deep/60 px-4 py-3 transition hover:border-ink"
                    >
                      <span className="font-semibold text-ink group-hover:text-cone">
                        {v.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{v.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-lg font-extrabold">2. Consume actual good copy</h3>
              <p className="mt-2 leading-relaxed text-muted">
                Once you’ve watched those videos, you’ll know what to look for.
                Study Alex Hormozi sales assets. Watch Instagram outliers.
                Notice YouTube titles and thumbnails that win. And dig through
                swipe files:
              </p>
              <a
                href={links.swipeFiles}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cone"
              >
                Open copywriting swipe files →
              </a>
            </div>

            <div>
              <h3 className="font-display text-lg font-extrabold">3. Practice in public</h3>
              <p className="mt-2 leading-relaxed text-muted">
                This is the most important part — and it doesn’t mean writing
                random Google Docs. Put content out. Instagram, TikTok, YouTube —
                whatever vehicle you choose, don’t delay. Shipping is how you
                learn.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-ink px-6 py-8 text-white md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-signal">
              Bonus skill
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold">AI video</h3>
            <p className="mt-3 leading-relaxed text-white/75">
              Not essential — but it opens doors and makes the other skills
              easier to deploy. Think of AI video as a new package for
              everything above: market without showing your face, repurpose
              content, ship more creative without waiting on a camera day.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* VEHICLE */}
        <section id="vehicle" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Step 02
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">Vehicle</h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              Your vehicle is the answer to:{" "}
              <em>“Which social platform do I want to master?”</em> Each one
              differs in skills required, difficulty, and who’s hanging out
              there. Below: pros, cons, best offers, and what you need to grow.
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {vehicles.map((v) => (
              <div key={v.name} className="border-t border-line pt-8">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-2xl font-extrabold">{v.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cone">
                    {v.badge}
                  </span>
                </div>
                <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2 md:text-base">
                  <div>
                    <dt className="font-semibold text-ink">Best offers</dt>
                    <dd className="mt-1 text-muted">{v.best}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">What’s required</dt>
                    <dd className="mt-1 text-muted">{v.need}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Pros</dt>
                    <dd className="mt-1 text-muted">{v.pros}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Cons</dt>
                    <dd className="mt-1 text-muted">{v.cons}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="prose-tread mt-10 text-base md:text-lg">
            <p>
              <strong>TikTok</strong> was the first platform I ever ran traffic
              from — and the first that made me money. I’ve made six figures
              from TikTok alone in a short span. It’s arguably the best and
              worst platform for both organic and paid: easy volume, softer
              quality, short post life.
            </p>
            <p>
              <strong>X</strong> is my biggest built platform. Hardest to grow.
              Mature, intelligent audience — especially in MMO. If you’re a
              beginner pushing a bogus product, don’t. If you’ve done something
              real, it compounds authority like nothing else. Growth rule: do
              some shit, build connections while you do it, and use those
              relationships to boost authority and growth.
            </p>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        {/* MONETISATION */}
        <section id="monetisation" className="scroll-mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cone">
            Step 03
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Monetisation
          </h2>

          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              You know the basics of pushing traffic. Here’s how you put money
              in your pocket.
            </p>
            <p>
              As a beginner, I wouldn’t recommend building your own product
              first. Promote someone else’s offer that’s already proven to
              convert — clear avatar, clear problem, proven marketing you can
              study. That’s affiliate marketing.
            </p>
            <p>
              Verticals range widely. Your platform choice shapes which offer
              fits. It always comes down to this: can you convince the viewer
              that your product gets them to their desired reality?
            </p>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Desire pockets
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {desires.map((d) => (
              <li key={d.pocket} className="border-l-2 border-cone pl-4">
                <p className="font-display text-lg font-extrabold">{d.pocket}</p>
                <p className="mt-1 text-sm text-muted">{d.offers}</p>
              </li>
            ))}
          </ul>

          <div className="prose-tread mt-10 text-base md:text-lg">
            <p>
              Pick one pocket. Find an offer for it. The best place to find
              offers is an affiliate network — but only reputable ones. You
              should know someone making money there. A lot of networks will
              scrub you, delay payouts, or set impossible thresholds.
            </p>
            <p>
              The best affiliate network I’ve worked with is{" "}
              <strong>Glitchy</strong>. Wide range of tested, proven offers.
              Real support when you hit problems. Free mentorships and bootcamps
              for beginners — that’s actually where I got my start. Scroll back
              far enough and you can see how it began.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={links.glitchy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-signal px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-signal"
            >
              Join Glitchy — free bootcamp
            </a>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-ink px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-white"
            >
              Telegram — AI UGC + Claude skill
            </a>
          </div>
        </section>

        <div className="section-rule my-16 md:my-20" />

        <section className="pb-8">
          <h2 className="font-display text-2xl font-extrabold md:text-3xl">
            That’s the traffic generation guide
          </h2>
          <div className="prose-tread mt-6 text-base md:text-lg">
            <p>
              I kept it simple on purpose — so anyone can understand it and take
              action today. Skills first. Pick a vehicle. Monetise with proven
              offers.
            </p>
            <p>
              Questions? Drop a comment and I’ll help to the best of my ability.
            </p>
          </div>
        </section>
      </article>

      <footer className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-2xl font-extrabold">
              TREAD <span className="text-signal">Marketing</span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
              Traffic skills. Platform vehicles. Affiliate monetisation. Built
              for people who are done waiting for permission to earn.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
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
            <a href="#skills" className="text-white/70 transition hover:text-signal">
              Skills
            </a>
            <a href="#vehicle" className="text-white/70 transition hover:text-signal">
              Vehicle
            </a>
            <a
              href="#monetisation"
              className="text-white/70 transition hover:text-signal"
            >
              Monetisation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
