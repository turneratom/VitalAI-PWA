import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { acts, characters, productionNotes, treatment } from "@/lib/script";

export const metadata: Metadata = {
  title: "Movie script",
};

export default function ScriptPage() {
  return (
    <div className="pb-16">
      <PageHeader
        kicker="Feature treatment"
        title={treatment.workingTitle}
        dek={treatment.logline}
      />
      <div className="mx-auto max-w-3xl px-6">
        <dl className="grid gap-4 border border-rule/60 bg-paper px-6 py-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="kicker text-[0.6rem] text-seal">Format</dt>
            <dd className="mt-1 text-ink">{treatment.format}</dd>
          </div>
          <div>
            <dt className="kicker text-[0.6rem] text-seal">Tone</dt>
            <dd className="mt-1 text-ink">{treatment.tone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="kicker text-[0.6rem] text-seal">Setting</dt>
            <dd className="mt-1 text-ink">{treatment.setting}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="kicker text-[0.6rem] text-seal">Theme</dt>
            <dd className="mt-1 text-ink">{treatment.theme}</dd>
          </div>
        </dl>

        <section className="mt-14">
          <h2 className="font-display text-3xl text-ink">Characters</h2>
          <p className="mt-2 text-sm italic text-ink-soft">
            Bradley (Brad) Turner is the only legal name taken from seed. Children are never assigned invented names.
          </p>
          <ul className="mt-6 divide-y divide-rule/40 border-y border-rule/40">
            {characters.map((character) => (
              <li key={character.name} className="py-5">
                <p className="kicker text-[0.65rem] text-seal">
                  {character.named ? "Named" : "Placeholder — do not invent a legal name"}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink">{character.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{character.role}</p>
                <p className="mt-2 leading-relaxed text-ink">{character.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {acts.map((act) => (
          <section key={act.roman} className="mt-14">
            <p className="kicker text-seal">
              Act {act.roman} · {act.targetPages}
            </p>
            <h2 className="mt-2 font-display text-4xl text-ink">{act.title}</h2>
            <p className="mt-3 italic text-ink-soft">{act.intention}</p>
            <ol className="mt-8 space-y-8">
              {act.beats.map((beat, index) => (
                <li key={beat.heading}>
                  <p className="kicker text-[0.65rem] text-reserved">
                    Beat {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-ink">{beat.heading}</h3>
                  <p className="mt-2 leading-[1.75] text-ink">{beat.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section className="mt-14 border border-rule/60 bg-paper px-6 py-8">
          <h2 className="font-display text-2xl text-ink">Production notes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
            {productionNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
