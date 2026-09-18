# One Win

Adult end-of-day habit app. Log **exactly one win today** and **one move for tomorrow**. Under 60 seconds. Keep a streak.

Not for kids. Not a pet / Tamagotchi. Not a 40-habit stack.

This app lives in `OneWin/` and does not depend on VitalAI or anything else in the repo.

## Run

```bash
cd OneWin
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Env vars

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_CHECKOUT_MONTHLY` | Checkout URL for **$6.99/mo** | `https://whop.com/checkout/plan_8e6gE2sW5tuNn` |
| `NEXT_PUBLIC_CHECKOUT_YEARLY` | Checkout URL for **$49/year** | `https://whop.com/checkout/plan_FN7cAjfaoPHUb` |
| `NEXT_PUBLIC_APP_URL` | Absolute site URL for metadata / Open Graph | `http://localhost:3000` |

Checkout buttons open those Whop links. Point Whop (or any provider) success URLs at `/thanks`. This app does **not** process cards itself. To demo the close without paying, use **Already through checkout? Open the app** on `/paywall`.

This README does not include revenue, conversion, or spend numbers. There aren’t any to publish yet.

## Product flow

1. `/` — landing, CTA **Start quiz**
2. `/quiz` — 10 steps with progress (chaos, role, what fails by 9pm, and the rest of the close)
3. `/processing` — ~10s theater, then `/paywall`
4. `/paywall` — $6.99/mo and $49/yr
5. `/thanks` — then `/app`
6. `/app` — PWA close: today’s win, tomorrow’s move, streak (localStorage)

Wins are stored in the browser (`localStorage`). Clearing site data clears the streak.

## PWA

`/app` is installable. Manifest is `public/manifest.webmanifest`. A service worker at `/sw.js` precaches the shell.

## Meta ad POV hooks

First-person hooks for Meta. Use as primary text / hook lines. Do not pair them with invented proof, fake comments, or countdown timers.

1. I closed my laptop at 11:17 and still couldn’t name one thing I finished.
2. Every habit app wanted a morning routine. My day is already wrecked by 9pm.
3. I don’t need a pet. I need to remember what actually happened today.
4. By 9pm the inbox, the workout, and dinner had all lost — and Slack was still open.
5. I used to write twelve priorities. I now write one win and one move.
6. Streaks used to shame me. This one only asks for 60 seconds before bed.
7. I’m a manager, not a monk. I needed a close, not a lifestyle.
8. The thing that fails by 9pm is never on my calendar.
9. I stopped stacking habits. I started closing the day.
10. If I can’t name today’s win in one sentence, the day leaked.

## Stack

Next.js App Router, Tailwind CSS v4, TypeScript. No backend required for the MVP.
