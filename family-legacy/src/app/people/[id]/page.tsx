import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  bradBio,
  formatBorn,
  getChildrenOf,
  getPerson,
  people,
  reservedCopy,
} from "@/lib/family";

type PersonPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return people.map((person) => ({ id: person.id }));
}

export async function generateMetadata({
  params,
}: PersonPageProps): Promise<Metadata> {
  const { id } = await params;
  const person = getPerson(id);
  if (!person) return { title: "Unknown plate" };
  return { title: person.displayName };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const person = getPerson(id);
  if (!person) notFound();

  const children = getChildrenOf(person.id);
  const partners = person.partnerIds
    .map((partnerId) => getPerson(partnerId))
    .filter((value) => Boolean(value));
  const parents = person.parentIds
    .map((parentId) => getPerson(parentId))
    .filter((value) => Boolean(value));

  const isBrad = person.id === "brad-turner";

  return (
    <article className="mx-auto max-w-5xl px-6 py-14">
      <p className="kicker text-seal">
        {person.status === "recorded" ? "Recorded person" : "Reserved plate"}
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
        {person.displayName}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">{person.summary}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          {isBrad ? (
            <div className="prose-vault drop-cap text-[1.05rem] leading-[1.75]">
              <p>{bradBio.lede}</p>
              {bradBio.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-rule bg-paper px-6 py-8">
              <h2 className="font-display text-2xl text-ink">{reservedCopy.heading}</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{reservedCopy.body}</p>
              {person.awaiting ? (
                <p className="mt-4 italic text-ink-soft">{person.awaiting}</p>
              ) : null}
            </div>
          )}

          <section className="mt-12">
            <h2 className="font-display text-2xl text-ink">See also</h2>
            <ul className="mt-4 space-y-2 text-ink-soft">
              {parents.map((parent) =>
                parent ? (
                  <li key={parent.id}>
                    Parent plate:{" "}
                    <Link className="underline decoration-rule underline-offset-4" href={`/people/${parent.id}`}>
                      {parent.displayName}
                    </Link>
                  </li>
                ) : null,
              )}
              {partners.map((partner) =>
                partner ? (
                  <li key={partner.id}>
                    Partner plate:{" "}
                    <Link className="underline decoration-rule underline-offset-4" href={`/people/${partner.id}`}>
                      {partner.displayName}
                    </Link>
                  </li>
                ) : null,
              )}
              {children.map((child) => (
                <li key={child.id}>
                  Child plate:{" "}
                  <Link className="underline decoration-rule underline-offset-4" href={`/people/${child.id}`}>
                    {child.displayName}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="underline decoration-rule underline-offset-4" href="/tree">
                  Return to the tree
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <aside className="h-fit border border-rule bg-paper px-5 py-6">
          <div className="photo-mat mx-auto aspect-[3/4] max-w-[13rem]">
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#efe4cc] to-[#e4d4b4] text-center">
              <span className="font-display text-5xl text-seal/80">
                {person.status === "recorded" ? "B" : "T"}
              </span>
              <span className="kicker mt-3 px-3 text-[0.6rem] text-reserved">
                {person.status === "recorded" ? "Portrait awaiting print" : "Name reserved"}
              </span>
            </div>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="kicker text-[0.6rem] text-seal">Role</dt>
              <dd className="mt-1 text-ink">{person.role}</dd>
            </div>
            <div>
              <dt className="kicker text-[0.6rem] text-seal">Relation to root</dt>
              <dd className="mt-1 text-ink">{person.relationToRoot}</dd>
            </div>
            {formatBorn(person.born) ? (
              <div>
                <dt className="kicker text-[0.6rem] text-seal">Born</dt>
                <dd className="mt-1 text-ink">{formatBorn(person.born)}</dd>
              </div>
            ) : (
              <div>
                <dt className="kicker text-[0.6rem] text-seal">Born</dt>
                <dd className="mt-1 text-ink-soft">Not yet recorded</dd>
              </div>
            )}
            <div>
              <dt className="kicker text-[0.6rem] text-seal">Legal name</dt>
              <dd className="mt-1 text-ink">
                {person.legalName ?? "Withheld — awaiting Brad"}
              </dd>
            </div>
            <div>
              <dt className="kicker text-[0.6rem] text-seal">Tags</dt>
              <dd className="mt-1 text-ink">{person.tags.join(" · ")}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
