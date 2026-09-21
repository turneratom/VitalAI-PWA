import type { Metadata } from "next";
import { FamilyTree } from "@/components/FamilyTree";
import { PageHeader } from "@/components/PageHeader";
import { NAMING_POLICY, placeholders } from "@/lib/family";

export const metadata: Metadata = {
  title: "Family tree",
};

export default function TreePage() {
  return (
    <div className="pb-16">
      <PageHeader
        kicker="Lineage"
        title="Family tree"
        dek="Brad Turner is the recorded root. Every other node is a reserved plate — a chair in the line, not a guessed person."
      />
      <FamilyTree />
      <div className="mx-auto mt-10 max-w-2xl px-6 text-center">
        <p className="text-sm leading-relaxed text-ink-soft">{NAMING_POLICY}</p>
        <ul className="mt-6 space-y-2 text-sm italic text-ink-soft">
          {placeholders.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
