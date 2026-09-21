import type { Metadata } from "next";
import Link from "next/link";
import { Seal } from "@/components/Seal";
import { chapters } from "@/lib/chapters";
import { formatBorn, listReserved, rootPerson } from "@/lib/family";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
};

const rooms = [
  {
    href: "/tree",
    label: "Family tree",
    dek: "Lineage from reserved forebears through Brad to the five unnamed children.",
  },
  {
    href: "/people",
    label: "People",
    dek: "Encyclopedia plates. Only Brad is legally named from seed.",
  },
  {
    href: "/photos",
    label: "Photos",
    dek: "A gallery of elegant empty frames. No fake portraits.",
  },
  {
    href: "/script",
    label: "Movie script",
    dek: "Four-act treatment: Origins, Building, Fatherhood, The Vault.",
  },
  {
    href: "/chapters",
    label: "Chapters",
    dek: "Narratives in good light, written to grow as Brad supplies the rest.",
  },
];

export default function HomePage() {
  const reservedCount = listReserved().length;

  return (
    <div>
      <section className="border-b border-rule/40 px-6 pb-16 pt-16 text-center">
        <div className="mx-auto flex justify-center">
          <Seal size="lg" />
        </div>
        <p className="kicker mt-8 text-seal">Private family encyclopedia</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-ink sm:text-7xl">
          {site.vaultTitle}
        </h1>
        <span className="ornament mt-6" />
        <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft">
          {site.mission}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          Owner {site.owner} · Root {rootPerson.displayName}, born{" "}
          {formatBorn(rootPerson.born)} · {reservedCount} reserved plates waiting
          for living names.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px border-b border-rule/40 bg-rule/40 sm:grid-cols-2 lg:grid-cols-5">
        {rooms.map((room) => (
          <Link
            key={room.href}
            href={room.href}
            className="bg-cream px-5 py-8 transition-colors hover:bg-paper"
          >
            <p className="kicker text-[0.65rem] text-seal">{room.label}</p>
            <p className="mt-3 font-display text-2xl text-ink">{room.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{room.dek}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <article>
          <p className="kicker text-seal">Mission</p>
          <h2 className="mt-3 font-display text-3xl text-ink">
            Wikipedia on steroids, kept in the house
          </h2>
          <div className="prose-vault mt-6 text-[1.05rem] leading-[1.75] text-ink">
            <p className="drop-cap">
              This is a private Turner encyclopedia: a tree, person pages, a
              photograph wall, a feature treatment, and four chapters — Origins,
              Building, Fatherhood, The Vault. Jarvis keeps the instrument. Brad
              supplies what is true. The archive will grow without ever having
              to recant a guessed cousin or a scraped wound.
            </p>
            <p>
              Until first names and prints arrive, the five children appear as
              ordinal plates, the partner chair is reserved, and the gallery
              shows mats rather than strangers’ faces. That emptiness is the
              point. It is how a family stays in good light.
            </p>
          </div>
        </article>
        <aside className="border border-rule/60 bg-paper px-6 py-7">
          <p className="kicker text-[0.65rem] text-seal">Covenant</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink">
            <li>Good light only. No scandal.</li>
            <li>Never invent a legal name.</li>
            <li>Never invent a photograph URL.</li>
            <li>Brad is the only named root from seed.</li>
            <li>Placeholders until Brad writes the rest.</li>
          </ul>
          <Link
            href="/chapters/the-vault"
            className="kicker mt-6 inline-block text-[0.65rem] text-seal"
          >
            The Vault chapter →
          </Link>
        </aside>
      </section>

      <section className="border-t border-rule/40 bg-paper/60 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="kicker text-center text-seal">Chapters of the house</p>
          <div className="mt-8 divide-y divide-rule/40 border-y border-rule/40">
            {chapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}`}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-2xl text-ink">
                  <span className="mr-3 text-seal">{chapter.roman}.</span>
                  {chapter.title}
                </span>
                <span className="max-w-md text-sm text-ink-soft sm:text-right">
                  {chapter.dek}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
