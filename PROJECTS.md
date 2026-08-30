# Separate projects (from VitalAI-PWA threads)

Cloud Agent **threads** were getting merged into one GitHub repo. Each **product** is its own business: own Cursor project, own GitHub repo, own Cloud Agent environment.

**Rule:** name the project / repo / environment after the **product**. Name each chat **thread** after the **job** inside that product.

| # | Product (Cursor project) | Suggested GitHub repo | Staged path |
|---|--------------------------|----------------------|-------------|
| 1 | **Mobile Home Parks** | `turneratom/mobile-home-parks` | `projects/mobile-home-parks/` (see PR #17) |
| 2 | **Turner Capital** | `turneratom/turner-capital` | `projects/turner-capital/` (see PR #17) |
| 3 | **Tread Affiliates** | `turneratom/tread-affiliates` | `projects/tread-affiliates/` (see PR #17) |
| 4 | **Turner Biographies** | `turneratom/turner-biographies` | `projects/turner-biographies/` (see PR #17) |
| 5 | **Project AIS** | `turneratom/project-ais` | `projects/project-ais/` (see PR #17) |
| 6 | **Everything Films** | `turneratom/everything-films` | `projects/everything-films/` **(this PR)** |

## Everything Films (this package)

Wedding movies & life movies. Customers send pictures/videos; we cut the film.

- Site: `projects/everything-films/index.html`
- Outreach desk: `projects/everything-films/outreach/`
- Contact: brad@treadcompanies.com

## Open as its own Cursor project

1. Create empty GitHub repo: `turneratom/everything-films`
2. From this repo root:

```bash
./scripts/push-separated-projects.sh
```

(or push only Everything Films — see script)

3. In Cursor: **Open Project** → `everything-films` repo
4. Start new Cloud Agents **from that project**, not from VitalAI-PWA
5. Archive or ignore the VitalAI-PWA thread that mixed this business in

## Until the new repo is live

- Do **not** merge Everything Films into the Mobile Home Parks GitHub Pages root
- Prefer all Everything Films work only inside `projects/everything-films/` or after the split push
