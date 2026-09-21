import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { listRecorded, listReserved, people } from "@/lib/family";

export const metadata: Metadata = {
  title: "People",
};

function PersonIndexCard({
  id,
  displayName,
  role,
  status,
  summary,
}: {
  id: string;
  displayName: string;
  role: string;
  status: "recorded" | "reserved";
  summary: string;
}) {
  return (
    <Link
      href={`/people/${id}`}
      className="border border-rule/60 bg-paper px-5 py-6 transition-colors hover:border-seal"
    >
      <p className="kicker text-[0.65rem] text-seal">
        {status === "recorded" ? "Recorded" : "Reserved"}
      </p>
      <h2 className="mt-2 font-display text-2xl text-ink">{displayName}</h2>
      <p className="mt-1 text-sm text-ink-soft">{role}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{summary}</p>
    </Link>
  );
}

export default function PeoplePage() {
  const recorded = listRecorded();
  const reserved = listReserved();

  return (
    <div className="pb-16">
      <PageHeader
        kicker="Encyclopedia"
        title="People of the house"
        dek={`${people.length} plates. ${recorded.length} recorded from seed. ${reserved.length} reserved until Brad writes a legal name.`}
      />
      <div className="mx-auto max-w-5xl px-6">
        <p className="kicker mb-4 text-[0.65rem] text-seal">Recorded</p>
        <div className="grid gap-4">
          {recorded.map((person) => (
            <PersonIndexCard key={person.id} {...person} />
          ))}
        </div>
        <p className="kicker mb-4 mt-12 text-[0.65rem] text-seal">Reserved plates</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {reserved.map((person) => (
            <PersonIndexCard key={person.id} {...person} />
          ))}
        </div>
      </div>
    </div>
  );
}
