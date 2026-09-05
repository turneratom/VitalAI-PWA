# Separate projects (from VitalAI-PWA threads)

Cloud Agent **threads** were getting merged into one GitHub repo. Each **product** is its own business: own Cursor project, own GitHub repo, own Cloud Agent environment.

**Rule:** name the project / repo / environment after the **product**. Name each chat **thread** after the **job** inside that product.

| # | Product (Cursor project) | Suggested GitHub repo | Staged path |
|---|--------------------------|----------------------|-------------|
| 1 | **Mobile Home Parks** | `turneratom/mobile-home-parks` | `projects/mobile-home-parks/` |
| 2 | **Turner Capital** | `turneratom/turner-capital` | `projects/turner-capital/` |
| 3 | **Tread Affiliates** | `turneratom/tread-affiliates` | `projects/tread-affiliates/` |
| 4 | **Turner Biographies** | `turneratom/turner-biographies` | `projects/turner-biographies/` |
| 5 | **Project AIS** | `turneratom/project-ais` | `projects/project-ais/` |
| 6 | **Everything Films** | `turneratom/everything-films` | `projects/everything-films/` |
| 7 | **Meridian** | `turneratom/meridian-travel` | `projects/meridian-travel/` **(this PR)** |

## Meridian (this package)

Boutique travel agency. Private journeys planned around place, pace, and people — not brochure packages.

- Site: `projects/meridian-travel/index.html`
- Contact: brad@treadcompanies.com

## Open as its own Cursor project

1. Create empty GitHub repo: `turneratom/meridian-travel`
2. From this repo root:

```bash
./scripts/push-separated-projects.sh
```

3. In Cursor: **Open Project** → `meridian-travel` repo
4. Start new Cloud Agents **from that project**, not from VitalAI-PWA

## Until the new repo is live

- Do **not** merge Meridian into the Mobile Home Parks GitHub Pages root
- Prefer all Meridian work only inside `projects/meridian-travel/` or after the split push
