export type Chapter = {
  slug: string;
  title: string;
  roman: string;
  dek: string;
  pullQuote: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const chapters: Chapter[] = [
  {
    slug: "origins",
    title: "Origins",
    roman: "I",
    dek: "The record begins on a date, not a myth. Bradley (Brad) Turner is born. The rest of the house waits to be named.",
    pullQuote:
      "We do not invent a village to give a man a beginning. We begin with the day he arrived, and we keep the page honest.",
    sections: [
      {
        heading: "A date that holds",
        paragraphs: [
          "Bradley (Brad) Turner was born on 7 October 1981. That is the first hard fact in the vault. It is enough. Many family books hurry to fill the years before a name can speak for itself — a town, a schoolyard, a weather report. This house declines the hurry. Origins, here, means the opening of a life that would later build, father, and ask to be remembered in good light.",
          "The Turner line did not begin with Brad. Parents and grandparents stand behind him as reserved plates: chairs at a table whose name-cards have not yet been written. When Brad supplies those names, this chapter will deepen without being rewritten in spirit. Until then, the origin is a man, a date, and a promise not to counterfeit the people who made him.",
        ],
      },
      {
        heading: "What origin is not",
        paragraphs: [
          "Origin is not a scandal, a feud, or a secret the internet would like to chew. The vault’s owner, Jarvis, and its living root, Brad, locked a tone before a single paragraph was set: good light only. That covenant is itself an origin. Families are often archived by their worst day. This one intends to be archived by its craft, its children, and its care.",
          "So the first chapter is deliberately spare. Spareness is not emptiness. It is respect. The unwritten rooms — birthplace, the two parents, the four grandparents, the early work — are marked on the tree as awaiting Brad. A reader who comes later will find those rooms furnished. A reader who comes now will find that we refused to lie about the furniture.",
        ],
      },
      {
        heading: "The seed of a vocation",
        paragraphs: [
          "Even in outline, the life already leans toward making. The man who would build and sell mobile home parks at scale is, at origin, simply a child who will grow into a builder. We do not pretend to know the first hammer, the first ledger, or the first acre. We know the direction: toward shelter, toward enterprise, toward a table with five children around it.",
          "Origins, then, are a date plus a trajectory. 1981. A Turner. A future in which land is assembled into communities, and memory is assembled into a vault. The rest is Brad’s to tell.",
        ],
      },
    ],
  },
  {
    slug: "building",
    title: "Building",
    roman: "II",
    dek: "Parks at scale. Shelter as a craft. The public work of a private man.",
    pullQuote:
      "He built places people could live. The vault is only the same instinct aimed at time.",
    sections: [
      {
        heading: "Parks at scale",
        paragraphs: [
          "The seed of this archive is plain: Brad Turner built and sold mobile home parks at scale. In the language of the trade those are manufactured-housing communities — land, homes, streets, and the unglamorous work of keeping a place habitable. Scale means the work was not a single lot. It was a pattern: find, improve, steward, and, when the season came, sell to the next owner.",
          "This chapter does not list deals, prices, or buyers. Those belong to ledgers and to a public marketplace that lives in another house of the Turner desk. The vault records the vocation, not the term sheet. Building, here, is the fact that a son of 1981 grew into someone who could assemble communities and let them go without the story turning cruel.",
        ],
      },
      {
        heading: "Shelter as character",
        paragraphs: [
          "There is a through-line from the parks to the vault. Both are containers. A park holds households. A vault holds names, photographs, and the narrative a family chooses to keep. Brad’s public craft was shelter. His private craft, begun in 2026, is remembrance.",
          "Good light on building does not mean the work was easy. It means we will not dress commercial life as a morality play with villains. Counterparties, lenders, residents, and partners remain unnamed unless Brad writes them in. The chapter’s claim is modest and true: he built, he sold, he did it at scale, and the work was about homes.",
        ],
      },
      {
        heading: "The other desk",
        paragraphs: [
          "The owner brief is careful to say this vault is a side project. Whop survival and the trading desk stay live in parallel. That sentence belongs in the building chapter because it tells you how the man works: several houses at once, none of them allowed to eat the children. Enterprise is a tool. The line is the point.",
          "When later editors add dates, park names Brad is willing to see in the family book, or photographs of land he loved, they will land in this chapter and in the gallery. Until then, Building is a vocation plate — honest, unfinished, and already enough to understand the root.",
        ],
      },
    ],
  },
  {
    slug: "fatherhood",
    title: "Fatherhood",
    roman: "III",
    dek: "Five children. No invented names. The reason the vault was opened.",
    pullQuote:
      "The five are real. Their legal names are not ours to guess. Love does not require a caption to be true.",
    sections: [
      {
        heading: "The five",
        paragraphs: [
          "Bradley (Brad) Turner is the father of five. That is the second hard fact of the house, after the birthday. This vault will hold a page for each child. Today those pages are reserved plates: First child, Second child, Third child, Fourth child, Fifth child. The ordinals are not nicknames. They are a refusal to mint a legal identity the father has not yet handed over.",
          "A lesser archive would fill the silence with pleasant fiction — a daughter who loves horses, a son who plays ball. This one will not. Children are not prompts. When Brad writes a first name, the plate will take it, the tree will redraw, the script will stop saying “the eldest” as a stand-in, and the photograph wall will have a hook with a true caption.",
        ],
      },
      {
        heading: "A table, not a stage",
        paragraphs: [
          "Fatherhood in good light is ordinary and therefore holy: meals, errands, the long work of being present after the parks and the desks have taken their hours. We do not invent bedtime speeches. We record the intention visible in the brief itself. Brad is building a legacy vault so the line is remembered for its light. That sentence is a father’s sentence. It is written to five people who will one day read it.",
          "The partner plate remains reserved as well. Spouse or partner is added only if Brad approves a good-light entry. Fatherhood here is not used as a back door to name a second adult. The five have a father on the page. The rest of the household arrives when it is welcomed in writing.",
        ],
      },
      {
        heading: "What the children inherit",
        paragraphs: [
          "They inherit a tree with empty chairs that are honest empty chairs. They inherit chapters that can grow without having to recant a lie. They inherit a movie treatment that already knows not to cast them as invented characters. They inherit a gallery of frames waiting for prints Brad actually holds.",
          "That is a strange inheritance and a kind one. Most family internet is a pile of other people’s guesses. This vault is a room the children can trust. Fatherhood, in the Turner telling, is the decision to leave them a clean page.",
        ],
      },
    ],
  },
  {
    slug: "the-vault",
    title: "The Vault",
    roman: "IV",
    dek: "A private Wikipedia, locked in good light, kept by Jarvis, sourced by Brad.",
    pullQuote:
      "The vault is not a museum of wounds. It is a house of record for what the family is willing to keep.",
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "On 21 September 2026, in the small hours Eastern Time, Brad locked the owner brief. The mission is a single charge: Wikipedia on steroids for the Turner family line — photographs, a movie script, a tree, encyclopedia-grade narratives — and only shine the good light. Jarvis owns build, product decisions, and deploy. Brad supplies names, photographs, and stories when ready.",
          "The modules of the first vault are five, matching the five children in a way the archive does not belabor: tree, person pages, photos, script, chapters. Privacy is default. There is a gate on the door. Robots are told not to index. Drama is not scraped. Scandals are not invented. Placeholders stand until the living source fills them.",
        ],
      },
      {
        heading: "Vaultkeeper",
        paragraphs: [
          "Jarvis is the vaultkeeper: an owner of the instrument, not a member of the bloodline. The distinction matters. A family encyclopedia that lets its software invent cousins is a forgery. This one is allowed to design, to keep tone, to refuse a bad sentence, and to wait. Waiting is part of the craft.",
          "The vault is local-first in spirit even when it is a web app. Seed JSON and the owner brief sit in the repository as the law of the house. Derived plates — partner, parents, the five — are marked reserved so that a future edit can replace an ordinal with a legal name without pretending the ordinal was ever a person.",
        ],
      },
      {
        heading: "How the house stays in light",
        paragraphs: [
          "Good light is not flattery. It is a boundary. It means we write work, fatherhood, making, and care. It means we do not publish a wound for sport. It means a photograph URL that does not exist is not replaced with a stranger’s face from the internet. It means the movie treatment can have longing and labour, and cannot have a manufactured villain wearing a relative’s name.",
          "If this chapter is doing its job, a Turner who reads it in twenty years will recognize the room: cream pages, ink headings, a tree that told the truth about what it did not know, and a root named Bradley (Brad) Turner who wanted the line remembered for its light. The vault is open. The chairs are set. The names will come.",
        ],
      },
    ],
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}
