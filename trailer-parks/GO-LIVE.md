# How to make Trailer Parks permanently live

Temporary Vercel URLs expire. Do **not** share those for outreach.
Use one of the options below for a stable production URL.

## Option A — Claim this deploy (fastest, ~2 minutes)

1. Open the **claim URL** printed after the latest deploy (also in PINNED-LINKS.md).
2. Sign in / create a free Vercel account with `brad@treadcompanies.com`.
3. Claim the project. You get a stable URL like `trailer-parks.vercel.app`.
4. Optional: add a custom domain (`app.treadcompanies.com` or `trailerparks.com`).

## Option B — Connect the GitHub repo in Vercel (best long-term)

1. Go to https://vercel.com/new
2. Import `turneratom/VitalAI-PWA`
3. Set **Root Directory** to `trailer-parks`
4. Framework: Next.js (auto-detected)
5. Deploy → production URL stays fixed on every push to `main`
6. Set env var `NEXT_PUBLIC_SITE_URL` to that production URL

## Option C — Custom domain under Tread

Point DNS for e.g. `parks.treadcompanies.com` to the Vercel project (Vercel → Domains).

## Test run checklist (before any outreach)

- [ ] Open production URL homepage
- [ ] Marketplace shows Hollins Estates, Yellow Mountain, Meadowbrook
- [ ] Click each Tread park → financials load
- [ ] Owner portal (`/owners`) shows your 3 parks
- [ ] `/list-your-park` form submits
- [ ] `/links` copy buttons show the **current** host (not an old temporary URL)
- [ ] Only then start owner outreach

## Why links broke before

Copy/share links were hardcoded to temporary `*.vercel.app` hosts that expire in ~60 minutes. The site now builds share links from `window.location.origin` so they always match the site you’re on.
