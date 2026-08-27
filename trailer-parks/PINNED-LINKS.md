# MH Portal — Pinned Links

**Production:** https://www.mhportal.com  
**Contact:** brad@treadcompanies.com  
**Company:** [Tread Companies](https://www.treadcompanies.com)

---

## Live site

| What | URL |
|------|-----|
| **Home** | https://www.mhportal.com/ |
| **Marketplace** | https://www.mhportal.com/marketplace/ |
| **Hollins Estates** | https://www.mhportal.com/parks/tread-hollins/ |
| **Yellow Mountain** | https://www.mhportal.com/parks/tread-yellow-mountain/ |
| **Meadowbrook** | https://www.mhportal.com/parks/tread-meadowbrook/ |
| **Owner portal** | https://www.mhportal.com/owners/ |
| **List form** | https://www.mhportal.com/list-your-park/ |
| **Links page** | https://www.mhportal.com/links/ |

---

## DNS (required once)

Point the domain at GitHub Pages:

| Type | Name | Value |
|------|------|-------|
| **CNAME** | `www` | `turneratom.github.io` |
| **A** | `@` (apex) | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |

Then in GitHub → [Pages settings](https://github.com/turneratom/VitalAI-PWA/settings/pages):
1. Custom domain: `www.mhportal.com`
2. Check **Enforce HTTPS**
3. Optional: redirect apex `mhportal.com` → `www`

Republish: `bash trailer-parks/scripts/publish-github-pages.sh`

Fallback while DNS propagates: https://turneratom.github.io/VitalAI-PWA/

---

## CSV downloads

| File | Path |
|------|------|
| Full prospect CSV | /downloads/owner-prospects.csv |
| Wave dialers | /downloads/campaigns/ |
