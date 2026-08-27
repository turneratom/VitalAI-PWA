# How to make MH Portal permanently live

## Production domain

**https://www.mhportal.com**

Hosted on GitHub Pages from this repo (`main` / `gh-pages`). Custom domain file: `CNAME` → `www.mhportal.com`.

### DNS checklist

| Type | Name | Value |
|------|------|-------|
| CNAME | www | turneratom.github.io |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

GitHub → Settings → Pages → Custom domain = `www.mhportal.com` → Enforce HTTPS.

Republish:

```bash
bash trailer-parks/scripts/publish-github-pages.sh
```

Fallback URL (repo Pages path): https://turneratom.github.io/VitalAI-PWA/

---

## Optional — Vercel (full API routes)

1. https://vercel.com/new → import `turneratom/VitalAI-PWA`
2. Root Directory = `trailer-parks`
3. Add domain `www.mhportal.com` in Vercel (then point DNS to Vercel instead)
4. Env: `NEXT_PUBLIC_SITE_URL=https://www.mhportal.com`

---

## Test run checklist (before outreach)

- [ ] https://www.mhportal.com homepage
- [ ] Marketplace shows Hollins, Yellow Mountain, Meadowbrook
- [ ] Each Tread park loads
- [ ] `/list-your-park` form submits
- [ ] `/links` copy buttons show **www.mhportal.com**
