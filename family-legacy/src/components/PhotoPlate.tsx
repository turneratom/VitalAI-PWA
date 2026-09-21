import Link from "next/link";
import type { PhotoPlateRecord } from "@/lib/photos";

const aspectClass = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function PhotoPlate({ plate }: { plate: PhotoPlateRecord }) {
  return (
    <figure className="group">
      <div
        className={`${aspectClass[plate.aspect]} photo-mat flex items-center justify-center`}
      >
        <div className="flex h-[86%] w-[86%] flex-col items-center justify-center border border-rule/50 bg-gradient-to-b from-[#efe4cc] to-[#e4d4b4] text-center">
          <span className="font-display text-4xl text-seal/80">T</span>
          <span className="kicker mt-3 text-[0.65rem] text-reserved">
            Awaiting print
          </span>
          <span className="mt-2 max-w-[12rem] px-3 font-display text-sm italic text-ink-soft">
            {plate.title}
          </span>
        </div>
      </div>
      <figcaption className="mt-3">
        <p className="font-display text-lg text-ink">{plate.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{plate.caption}</p>
        {plate.subjectId ? (
          <Link
            href={`/people/${plate.subjectId}`}
            className="kicker mt-2 inline-block text-[0.65rem] text-seal hover:text-ink"
          >
            Open related plate
          </Link>
        ) : null}
      </figcaption>
    </figure>
  );
}
