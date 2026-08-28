# How to keep Mobile Home Parks links working

## Live site (use this now)

**https://turneratom.github.io/VitalAI-PWA/**

Full link list: `PINNED-LINKS.md` or https://turneratom.github.io/VitalAI-PWA/links/

Republish:

```bash
bash trailer-parks/scripts/publish-github-pages.sh
```

## Why links broke

1. Temporary Vercel URLs expire.
2. Setting GitHub Pages custom domain `www.mhportal.com` **before DNS** made github.io **redirect** to a parking lander — every link died.

**Rule:** Do not add a `CNAME` / custom domain until `www` DNS is `turneratom.github.io`.

## www.mhportal.com (when ready)

| Type | Name | Value |
|------|------|-------|
| CNAME | www | turneratom.github.io |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Then Pages → Custom domain → Enforce HTTPS → republish with CNAME.

## Test checklist

- [ ] Home, marketplace, 3 demo parks load on github.io
- [ ] `/links/` copy buttons include `/VitalAI-PWA`
- [ ] CSV downloads open (not 404)
- [ ] Only then share with owners
