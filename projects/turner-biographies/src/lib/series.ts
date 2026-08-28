export type ChapterMeta = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
};

export type BookMeta = {
  slug: string;
  title: string;
  subtitle: string;
  subject: string;
  author: string;
  tagline: string;
  synopsis: string;
  pages: number;
  chapters: ChapterMeta[];
  heroImage: string;
  status: "available" | "coming-soon";
  filmTitle: string;
};

export const SERIES = {
  name: "The Greatest Humans",
  author: "Brad Turner",
  promise:
    "Biographies written as lived stories—ten chapters, roughly two hundred pages—then adapted for the screen.",
};

export const books: BookMeta[] = [
  {
    slug: "firebrand",
    title: "Firebrand",
    subtitle: "Thomas Paine",
    subject: "Thomas Paine",
    author: "Brad Turner",
    tagline: "The pen that taught nations to speak of freedom.",
    synopsis:
      "From a cordwainer's shop in Thetford to the printing presses of Philadelphia and the prisons of Paris, Thomas Paine wrote the sentences that made revolutions feel inevitable. Firebrand puts you beside him—ink on his fingers, exile in his future, and a stubborn faith that ordinary people could remake the world.",
    pages: 200,
    heroImage: "/thomas-paine-hero.png",
    status: "available",
    filmTitle: "Firebrand",
    chapters: [
      {
        number: 1,
        slug: "the-cordwainers-son",
        title: "The Cordwainer's Son",
        subtitle: "Thetford, and the making of a restless mind",
      },
      {
        number: 2,
        slug: "salt-and-failure",
        title: "Salt and Failure",
        subtitle: "Sea, Excise, and the letter that opened America",
      },
      {
        number: 3,
        slug: "atlantic-crossing",
        title: "Atlantic Crossing",
        subtitle: "A sick passenger finds a public voice",
      },
      {
        number: 4,
        slug: "common-sense",
        title: "Common Sense",
        subtitle: "A pamphlet that made independence speakable",
      },
      {
        number: 5,
        slug: "these-are-the-times",
        title: "These Are the Times",
        subtitle: "Crisis papers and the winter of a cause",
      },
      {
        number: 6,
        slug: "secretary-and-scandal",
        title: "Secretary and Scandal",
        subtitle: "Truth-telling that costs a career",
      },
      {
        number: 7,
        slug: "rights-of-man",
        title: "Rights of Man",
        subtitle: "Burke, Britain, and a flight to France",
      },
      {
        number: 8,
        slug: "the-luxembourg-cell",
        title: "The Luxembourg Cell",
        subtitle: "Prison, chalk marks, and The Age of Reason",
      },
      {
        number: 9,
        slug: "the-return",
        title: "The Return",
        subtitle: "A republic that turned its face away",
      },
      {
        number: 10,
        slug: "what-remains",
        title: "What Remains",
        subtitle: "Death, exile of a body, and ink that will not dry",
      },
    ],
  },
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function getChapter(bookSlug: string, chapterSlug: string) {
  const book = getBook(bookSlug);
  if (!book) return null;
  const chapter = book.chapters.find((item) => item.slug === chapterSlug);
  if (!chapter) return null;
  return { book, chapter };
}
