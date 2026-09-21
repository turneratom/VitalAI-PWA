import seed from "../../data/family.json";

export type PersonStatus = "recorded" | "reserved";

export type Person = {
  id: string;
  displayName: string;
  legalName: string | null;
  born: string | null;
  role: string;
  relationToRoot: string;
  status: PersonStatus;
  summary: string;
  tags: string[];
  generation: number;
  parentIds: string[];
  partnerIds: string[];
  awaiting: string | null;
};

export const familyName = seed.family_name;
export const vaultOwner = seed.owner;
export const tone = seed.tone;
export const placeholders = seed.placeholders;
export const chaptersPlanned = seed.chapters_planned;

export const NAMING_POLICY =
  "Legal names are recorded only when Brad supplies them. This vault never invents a given name, a married name, or a photograph URL.";

const brad: Person = {
  id: seed.root.id,
  displayName: seed.root.display_name,
  legalName: "Bradley Turner",
  born: seed.root.born,
  role: "Patriarch-anchor",
  relationToRoot: "self",
  status: "recorded",
  summary: seed.root.summary_seed,
  tags: [...seed.root.tags],
  generation: 1,
  parentIds: ["parent-one", "parent-two"],
  partnerIds: ["partner-reserved"],
  awaiting: null,
};

const partner: Person = {
  id: "partner-reserved",
  displayName: "Partner (reserved)",
  legalName: null,
  born: null,
  role: "Good-light entry pending",
  relationToRoot: "spouse or partner",
  status: "reserved",
  summary:
    "A chair is held at the table. Spouse or partner is added only if Brad approves a good-light entry. This plate is not a name.",
  tags: ["reserved", "partner"],
  generation: 1,
  parentIds: [],
  partnerIds: [brad.id],
  awaiting: "Add spouse / partner only if Brad approves good-light entry",
};

const parentOne: Person = {
  id: "parent-one",
  displayName: "Parent · plate I",
  legalName: null,
  born: null,
  role: "Forebear",
  relationToRoot: "parent",
  status: "reserved",
  summary:
    "A parent of Bradley (Brad) Turner. Name, dates, and portrait wait for Brad. This vault will not guess a mother or a father into being.",
  tags: ["reserved", "forebear"],
  generation: 0,
  parentIds: [],
  partnerIds: ["parent-two"],
  awaiting: "Add parents / grandparents as Brad supplies",
};

const parentTwo: Person = {
  id: "parent-two",
  displayName: "Parent · plate II",
  legalName: null,
  born: null,
  role: "Forebear",
  relationToRoot: "parent",
  status: "reserved",
  summary:
    "A parent of Bradley (Brad) Turner. The second parental plate. Sides of the house (maternal or paternal) are not assigned until Brad writes them.",
  tags: ["reserved", "forebear"],
  generation: 0,
  parentIds: [],
  partnerIds: ["parent-one"],
  awaiting: "Add parents / grandparents as Brad supplies",
};

const childOrdinals = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
] as const;

const children: Person[] = childOrdinals.map((ordinal, index) => {
  const n = index + 1;
  return {
    id: `child-${n}`,
    displayName: `${ordinal} child`,
    legalName: null,
    born: null,
    role: "Child of the house",
    relationToRoot: "child",
    status: "reserved" as const,
    summary: `One of five children of Bradley (Brad) Turner. Legal first name is not recorded. Plate ${n} of five holds a place in the line until Brad writes the name.`,
    tags: ["reserved", "child", "the-five"],
    generation: 2,
    parentIds: [brad.id],
    partnerIds: [],
    awaiting: "Add five children with first names Brad provides",
  };
});

export const people: Person[] = [
  parentOne,
  parentTwo,
  brad,
  partner,
  ...children,
];

export const peopleById: Record<string, Person> = Object.fromEntries(
  people.map((person) => [person.id, person]),
);

export const rootPerson = brad;

export function getPerson(id: string): Person | undefined {
  return peopleById[id];
}

export function listRecorded(): Person[] {
  return people.filter((person) => person.status === "recorded");
}

export function listReserved(): Person[] {
  return people.filter((person) => person.status === "reserved");
}

export function listGeneration(generation: number): Person[] {
  return people.filter((person) => person.generation === generation);
}

export function getChildrenOf(id: string): Person[] {
  return people.filter((person) => person.parentIds.includes(id));
}

export function formatBorn(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export const bradBio = {
  lede: `${seed.root.display_name} (born ${formatBorn(seed.root.born)}) is the patriarch-anchor of the Turner vault. He is recorded here as a builder, a father of five, and an entrepreneur who built and sold mobile home parks at scale. This private encyclopedia exists so the line is remembered for its light.`,
  infobox: [
    { label: "Born", value: formatBorn(seed.root.born) ?? seed.root.born },
    { label: "House", value: "Turner" },
    { label: "Role", value: "Patriarch-anchor" },
    { label: "Occupations", value: "Builder · father · entrepreneur" },
    { label: "Children", value: "Five (legal names reserved)" },
    { label: "Partner", value: "Entry pending Brad’s good-light approval" },
    { label: "Vaultkeeper", value: seed.owner },
    { label: "Tone", value: "Good light only" },
  ],
  sections: [
    {
      heading: "The recorded man",
      paragraphs: [
        "The seed of this vault names Bradley (Brad) Turner as root. It does not embroider a childhood, invent a hometown, or assign him a scandal. What is known is enough to begin: he was born on 7 October 1981; he built; he fathered five; he asked that the house be written in good light.",
        "In the old sense of the word, a patriarch-anchor is not a throne. It is a stake in the ground. Brad is the first fully named person in this archive because he is the one who opened it. Everyone else arrives when he is ready to write them.",
      ],
    },
    {
      heading: "Builder",
      paragraphs: [
        "Turner built and sold mobile home parks at scale. The work was land, homes, and the quiet dignity of shelter — communities assembled, improved, and passed to the next steward. The public marketplace that grew from that vocation is a separate house of business. This vault records the builder, not a prospectus.",
        "Building, in the Turner telling, is a moral craft: make something that holds people. The parks were that craft at commercial scale. The vault is that craft aimed at memory.",
      ],
    },
    {
      heading: "Father",
      paragraphs: [
        "Five children. Their legal first names are not printed here. Until Brad supplies them, they appear as the first through fifth child of the house — plates in the line, never invented people. Fatherhood is the reason the vault exists: so those five, and whoever comes after, can read a house that chose light.",
      ],
    },
    {
      heading: "The vault",
      paragraphs: [
        "In September 2026 Brad locked the brief: a private-family Wikipedia, owned in product by Jarvis, sourced in life by Brad. Photos, a movie treatment, a tree, encyclopedia chapters. The covenant is short enough to hang over the door. Only shine the good light.",
      ],
    },
  ],
};

export const reservedCopy = {
  heading: "This plate is reserved",
  body: "The Turner vault does not invent legal names, rumours, or photographs. Brad supplies what is true and kind. Until then the chair is held, the caption is honest, and the light stays good.",
};
