export type Character = {
  name: string;
  role: string;
  note: string;
  named: boolean;
};

export type Act = {
  roman: string;
  title: string;
  targetPages: string;
  intention: string;
  beats: { heading: string; body: string }[];
};

export const treatment = {
  workingTitle: "The Light We Keep",
  format: "Feature-length treatment · four acts",
  tone: "Good light only. No scandal. No invented legal names.",
  setting:
    "The United States, across the adult life of Bradley (Brad) Turner, with a framing device in a private family vault in 2026.",
  logline:
    "A builder and father of five opens a private encyclopedia so his line will be remembered for its light — and learns that the bravest pages are the ones that wait for true names.",
  theme:
    "Memory as shelter. Building parks and building a vault are the same craft: make a place that can hold a family.",
};

export const characters: Character[] = [
  {
    name: "BRADLEY (BRAD) TURNER",
    role: "Root. Builder. Father of five.",
    note: "The only legal name locked from seed. Born 7 October 1981. Camera can stay on him.",
    named: true,
  },
  {
    name: "THE FIVE",
    role: "His children.",
    note: "Never given invented legal names. In scenes they are the eldest, the second, the middle, the fourth, the youngest — or simply the five. First names enter the script only when Brad writes them.",
    named: false,
  },
  {
    name: "THE PARTNER (RESERVED CHAIR)",
    role: "Spouse or partner, uncast.",
    note: "Present as a place at the table, not a character with a guessed name. If Brad later approves a good-light entry, this role is rewritten. Until then the chair is shown, not filled.",
    named: false,
  },
  {
    name: "THE FOREBEARS",
    role: "Parents and grandparents.",
    note: "Voices off, photographs not yet deposited, a generation labeled on the tree. No guessed mother, father, or hometown.",
    named: false,
  },
  {
    name: "JARVIS",
    role: "Vaultkeeper. Framing device.",
    note: "Not a relative. The unseen archivist who keeps the instrument honest: no scandal, no fake portraits, no names minted for convenience.",
    named: true,
  },
];

export const acts: Act[] = [
  {
    roman: "I",
    title: "Origins",
    targetPages: "1–28",
    intention:
      "Establish Brad, the date, and the house rule. Teach the audience that this story will not counterfeit a childhood.",
    beats: [
      {
        heading: "Opening image — the empty plates",
        body: "A cream room. A family tree drawn in ink, most nodes unlettered. Five small frames without photographs. A single completed plate: BRADLEY (BRAD) TURNER, 7 October 1981. Somewhere a fountain pen is capped. We are not in a courtroom. We are in a vault.",
      },
      {
        heading: "The date",
        body: "Cut to autumn light, 1981. We do not invent a hospital or a city. We give the audience a season and a child who will become a builder. The camera is kind. If we see hands, they are unnamed forebears. If we hear a lullaby, it has no lyric we would have to steal from a living mouth.",
      },
      {
        heading: "The covenant",
        body: "Return to 2026. Brad, a man in the middle of a full life, walks the vault with Jarvis (heard more than seen). He says the sentence that is law: only shine the good light. He will not have his children find a family internet of wounds. He will have them find work, care, and a tree that admits what it does not know.",
      },
      {
        heading: "Act I close",
        body: "Brad stands before the five empty frames. He does not fill them with guesses. He leaves them hanging. The audience understands the dramatic engine: not a mystery of crime, but a mystery of patience.",
      },
    ],
  },
  {
    roman: "II",
    title: "Building",
    targetPages: "29–62",
    intention:
      "Show the vocation. Parks, scale, shelter. Keep commerce human. No invented enemies.",
    beats: [
      {
        heading: "First acre",
        body: "Adult Brad learns to see land as a place people could live. We may show a manufactured-housing community in general light — streets, homes, a child on a bicycle who is not one of the five unless Brad has said so. No fake aerial from a stock website. If we lack a still, we stage the idea: keys, a plat map, a handshake we do not caption with a stranger’s name.",
      },
      {
        heading: "Scale",
        body: "A montage of work done well: improving, stewarding, selling to the next owner when the season comes. Fatigue is allowed. Pride is allowed. A villainous rival is not. Counterparties remain unnamed. The drama is the labour itself, and the question of how much of a man’s hours a park may take.",
      },
      {
        heading: "The other desks",
        body: "A glimpse, not a subplot takeover: other work running in parallel. The point is character. Brad keeps several houses of effort, and he is about to build one more that cannot be sold — the vault.",
      },
      {
        heading: "Act II close",
        body: "A park at ordinary dusk. Lights in windows. Brad in a truck or on a porch, thinking of a table at home. Building has been for strangers. Fatherhood will insist the next structure is for his own.",
      },
    ],
  },
  {
    roman: "III",
    title: "Fatherhood",
    targetPages: "63–98",
    intention:
      "Give the five their gravity without minting names. The heart of the picture.",
    beats: [
      {
        heading: "The table",
        body: "Five children. We shoot faces only if Brad deposits portraits; otherwise we shoot from behind, at hands, at chairs, at a cake whose candles are counted and whose names are not iced. Sound: overlapping talk, a laugh, a request to pass something. The audience is not owed a legal caption to believe the love.",
      },
      {
        heading: "The eldest, the youngest",
        body: "Ordinals may be used as camera notes, never as fake legal names. A bicycle helmet. A homework page. A sleeping weight on a shoulder. Specific objects, unspecific identities. If a child must be addressed on screen, Brad uses whatever true nickname he later supplies — and until then, the line can be a look.",
      },
      {
        heading: "The reserved chair",
        body: "A place setting that may belong to a partner. We do not cast a guessed spouse. If the chair is occupied, the face is withheld or the role is rewritten after Brad’s good-light approval. The film would rather show an empty plate than a counterfeit parent.",
      },
      {
        heading: "Why the vault",
        body: "Brad, late, looking at the five frames. He understands that parks will change hands and desks will go dark, but a clean family book can last. He does not want the children to inherit noise. Act III ends on that decision, which is the same as love.",
      },
    ],
  },
  {
    roman: "IV",
    title: "The Vault",
    targetPages: "99–118",
    intention:
      "Complete the form. The encyclopedia is the ending and the beginning. Light, not spectacle.",
    beats: [
      {
        heading: "Opening the room",
        body: "2026. Cream walls, ink headings, a tree that can be walked. Jarvis keeps the instrument: no index for strangers, no scrape, no invented photograph URLs. Brad walks each module — tree, people, photos, script, chapters — like rooms in a house he is giving his children.",
      },
      {
        heading: "The unfilled names",
        body: "He stops at the five plates. A lesser movie would treat this as failure. This one treats it as ethics. He will write the names when he is ready. The vault is already usable: a reader can know the root, the vocation, the count of children, the covenant.",
      },
      {
        heading: "Closing image — light on paper",
        body: "Morning on a cream page. The heading FAMILY LEGACY. A serif T in a seal. Somewhere the five will one day read this. We do not show their future faces. We show the room waiting, which is the most faithful portrait the house can offer until Brad brings the prints.",
      },
    ],
  },
];

export const productionNotes = [
  "Casting: Brad may be portrayed; the five may not be named in credits with guessed legal names. Child roles can be listed as First Child through Fifth Child.",
  "Photographs: only prints Brad deposits. No stock faces, no generated likenesses passed off as family, no scraped social media.",
  "Antagonism: time, labour, and the temptation to invent. Not a relative written as a villain.",
  "Music: warm strings, piano, no irony. The picture is an heirloom, not a roast.",
  "Rating aim: a film the five could be shown without flinching.",
];
