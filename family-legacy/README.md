# Family Legacy

Private-family encyclopedia for the Turner line — a Wikipedia-on-steroids vault with a tree, person plates, a photograph gallery of honest empty frames, a four-act movie treatment, and chaptered narratives.

**Owner:** Jarvis (vaultkeeper)  
**Root:** Bradley (Brad) Turner (born 7 October 1981)  
**Tone:** good light only

This app lives in `family-legacy/` and does not change the existing Trailer Parks / VitalAI apps at the repo root.

## Mission

Wikipedia on steroids for the Turner family line. Photos, movie script, family tree/lineage, encyclopedia-grade narratives. **Only shine the good light.**

## Run

```bash
cd family-legacy
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The vault gate asks you to keep the house in good light; that acknowledgment is stored in `localStorage` on this browser only.

```bash
npm run build
```

must pass before ship.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- `next/font` — Cormorant Garamond (headings) and Source Serif 4 (body)

## Pages

| Route | What |
| --- | --- |
| `/` | Vault title, mission, nav into the rooms |
| `/tree` | Family tree from seed JSON + reserved plates |
| `/people` | Index of recorded and reserved people |
| `/people/[id]` | Wikipedia-style person plate |
| `/photos` | Gallery by person / decade / event — elegant placeholders, no fake photo URLs |
| `/script` | Feature treatment *The Light We Keep* (four acts) |
| `/chapters` | Origins, Building, Fatherhood, The Vault |
| `/chapters/[slug]` | Full encyclopedia chapter |

The vault is `noindex`. It is a private family room, not a public scrape target.

## Seed

Faithful copies of the owner brief and family seed:

- `data/OWNER.md`
- `data/family.json`

`src/lib/family.ts` derives reserved plates from the seed placeholders. It does **not** invent legal names.

## Naming policy

- The only legal name taken from seed is **Bradley (Brad) Turner**.
- Five children appear as First–Fifth child until Brad supplies first names.
- Spouse / partner is a reserved chair until Brad approves a good-light entry.
- Parents are plates I and II. Sides of the house are not guessed.
- The movie script refers to children as the five / ordinals — never as invented given names.
- Photographs are cream mats with a Turner seal. No stock faces, no generated likenesses passed off as family.

## Design

Ink on cream. Serif headings. Thin gold rules. A circular **T** seal. Paper grain. The house should feel like an heirloom encyclopedia, not a startup dashboard.

## Adding a name later

When Brad supplies a legal first name:

1. Replace the reserved person in `src/lib/family.ts` (keep the same `id` if you can, so links do not break).
2. Set `status: "recorded"`, `legalName`, and a good-light summary.
3. Do not backfill rumours. Do not add a photograph URL you do not actually have.

## Privacy

Simple client-side vault gate + `robots.txt` disallow. This is not bank-grade auth; it is a family lock on a private room. Deploy behind a further gate if the vault ever leaves this machine.
