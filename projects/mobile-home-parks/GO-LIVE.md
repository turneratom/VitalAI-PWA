# How to make Trailer Parks permanently live

## Current permanent host — GitHub Pages

**URL:** https://turneratom.github.io/VitalAI-PWA/

Site files are published on the `gh-pages` branch and also mirrored at the repo root for the existing Pages “main /” source.

### If you see a 404

1. Open https://github.com/turneratom/VitalAI-PWA/settings/pages  
2. Source: **Deploy from a branch**  
3. Branch: **gh-pages** (preferred) or **main**  
4. Folder: **/ (root)** → Save  

Republish anytime from `trailer-parks/`:

```bash
bash scripts/publish-github-pages.sh
```

---

## Option A — Claim a Vercel deploy (full Next.js + APIs)

1. Open the **claim URL** in `PINNED-LINKS.md`.
2. Sign in with `brad@treadcompanies.com`.
3. Claim the project → stable `*.vercel.app` URL with API routes.

## Option B — Connect the GitHub repo in Vercel (best long-term)

1. Go to https://vercel.com/new  
2. Import `turneratom/VitalAI-PWA`  
3. Set **Root Directory** to `trailer-parks`  
4. Deploy → set `NEXT_PUBLIC_SITE_URL` to the production URL  

## Option C — Custom domain under Tread

Point DNS (e.g. `parks.treadcompanies.com`) at the Vercel project.

---

## Test run checklist (before any outreach)

- [ ] Open production URL homepage  
- [ ] Marketplace shows Hollins Estates, Yellow Mountain, Meadowbrook  
- [ ] Click each Tread park → financials load  
- [ ] Owner portal (`/owners`) shows your 3 parks  
- [ ] `/list-your-park` form submits (FormSubmit fallback on Pages)  
- [ ] `/links` copy buttons show the **current** host  
- [ ] Only then start owner outreach  

## Why links broke before

Share links were hardcoded to temporary `*.vercel.app` hosts that expire. The site now builds share links from `window.location.origin`.
