export type PhotoCategory = "person" | "decade" | "event";

export type PhotoPlateRecord = {
  id: string;
  title: string;
  caption: string;
  category: PhotoCategory;
  subjectId?: string;
  era?: string;
  aspect: "portrait" | "landscape" | "square";
};

export const photoPlates: PhotoPlateRecord[] = [
  {
    id: "brad-portrait",
    title: "Root of the house",
    caption: "Bradley (Brad) Turner — portrait awaiting a print Brad deposits.",
    category: "person",
    subjectId: "brad-turner",
    aspect: "portrait",
  },
  {
    id: "partner-plate",
    title: "Reserved chair",
    caption: "Partner — plate held until Brad approves a good-light entry.",
    category: "person",
    subjectId: "partner-reserved",
    aspect: "portrait",
  },
  {
    id: "the-five",
    title: "The five",
    caption: "Five children of the house. Faces withheld. Names not invented.",
    category: "person",
    subjectId: "child-1",
    aspect: "landscape",
  },
  {
    id: "parents",
    title: "Forebears",
    caption: "Parents of Brad — names and prints to be supplied.",
    category: "person",
    subjectId: "parent-one",
    aspect: "square",
  },
  {
    id: "decade-1980s",
    title: "The 1980s",
    caption: "A decade of origin. Brad is born in 1981. Childhood prints not yet deposited.",
    category: "decade",
    era: "1980s",
    aspect: "square",
  },
  {
    id: "decade-1990s",
    title: "The 1990s",
    caption: "Youth of the builder. Awaiting photographs from Brad.",
    category: "decade",
    era: "1990s",
    aspect: "square",
  },
  {
    id: "decade-2000s",
    title: "The 2000s",
    caption: "The making years. Enterprise beginning. Prints not yet in the vault.",
    category: "decade",
    era: "2000s",
    aspect: "landscape",
  },
  {
    id: "decade-2010s",
    title: "The 2010s",
    caption: "Parks, scale, a growing table. Gallery hooks are ready.",
    category: "decade",
    era: "2010s",
    aspect: "landscape",
  },
  {
    id: "decade-2020s",
    title: "The 2020s",
    caption: "Fatherhood in full. The vault opens in 2026.",
    category: "decade",
    era: "2020s",
    aspect: "square",
  },
  {
    id: "event-building",
    title: "Building",
    caption: "Mobile home parks at scale — land as shelter. No stock aerials. Awaiting Brad’s own stills.",
    category: "event",
    aspect: "landscape",
  },
  {
    id: "event-table",
    title: "The family table",
    caption: "An ordinary meal. The most important set in the picture. Print not deposited.",
    category: "event",
    aspect: "landscape",
  },
  {
    id: "event-vault",
    title: "Opening the vault",
    caption: "21 September 2026. The brief is locked. Good light only.",
    category: "event",
    aspect: "portrait",
  },
];

export const categoryLabels: Record<PhotoCategory, string> = {
  person: "By person",
  decade: "By decade",
  event: "By event",
};
