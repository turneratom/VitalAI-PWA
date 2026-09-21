export const site = {
  name: "Family Legacy",
  vaultTitle: "The Turner Vault",
  familyName: "Turner",
  tagline: "A private encyclopedia of the Turner line.",
  mission:
    "Wikipedia on steroids for the Turner family line. Photos, movie script, family tree, encyclopedia-grade narratives. Only shine the good light.",
  covenant: "Good light only. No scandal. No invented names. No public scrape.",
  owner: "Jarvis",
  ownerRole: "Vaultkeeper",
  rootName: "Bradley (Brad) Turner",
  lock: "Brad lock 21 September 2026",
  privacy:
    "Private vault by default. Local-first seed. Names and photographs wait for Brad.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/tree", label: "Tree" },
  { href: "/people", label: "People" },
  { href: "/photos", label: "Photos" },
  { href: "/script", label: "Script" },
  { href: "/chapters", label: "Chapters" },
] as const;
