import Link from "next/link";
import {
  getPerson,
  listGeneration,
  rootPerson,
  type Person,
} from "@/lib/family";

function NodeCard({ person, featured = false }: { person: Person; featured?: boolean }) {
  return (
    <Link
      href={`/people/${person.id}`}
      className={`block min-w-[9.5rem] max-w-[12rem] border px-4 py-3 text-center transition-colors hover:border-seal hover:bg-paper ${
        featured
          ? "border-seal bg-paper shadow-[0_8px_30px_rgba(28,22,16,0.08)]"
          : person.status === "reserved"
            ? "border-dashed border-rule/80 bg-cream"
            : "border-rule bg-paper"
      }`}
    >
      <p className="kicker text-[0.6rem] text-seal">
        {person.status === "reserved" ? "Reserved" : "Recorded"}
      </p>
      <p className="mt-1 font-display text-lg leading-snug text-ink">
        {person.displayName}
      </p>
      <p className="mt-1 text-xs text-ink-soft">{person.role}</p>
    </Link>
  );
}

function Connector() {
  return <div className="mx-auto h-8 w-px bg-rule" aria-hidden="true" />;
}

export function FamilyTree() {
  const parents = listGeneration(0);
  const partner = getPerson("partner-reserved");
  const children = listGeneration(2);

  return (
    <div className="overflow-x-auto pb-6">
      <div className="mx-auto flex min-w-[52rem] flex-col items-center px-4">
        <p className="kicker mb-3 text-[0.65rem] text-reserved">Forebears · names awaiting Brad</p>
        <div className="flex items-start justify-center gap-6">
          {parents.map((person) => (
            <NodeCard key={person.id} person={person} />
          ))}
        </div>
        <div className="relative flex h-8 w-56 items-start justify-center">
          <div className="absolute top-0 h-px w-full bg-rule" />
          <div className="h-8 w-px bg-rule" />
        </div>

        <p className="kicker mb-3 text-[0.65rem] text-seal">The house</p>
        <div className="flex items-start justify-center gap-8">
          {partner ? <NodeCard person={partner} /> : null}
          <NodeCard person={rootPerson} featured />
        </div>
        <p className="mt-2 max-w-sm text-center text-xs italic text-ink-soft">
          Partner plate is held until Brad approves a good-light entry. Brad is the only legal name on the tree.
        </p>

        <Connector />
        <div className="relative flex h-8 w-[46rem] items-start justify-center">
          <div className="absolute top-0 h-px w-full bg-rule" />
          <div className="h-8 w-px bg-rule" />
        </div>

        <p className="kicker mb-3 text-[0.65rem] text-seal">The five · legal names reserved</p>
        <div className="flex items-start justify-center gap-3">
          {children.map((person) => (
            <NodeCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
}
