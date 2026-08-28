# Separate projects (from VitalAI-PWA threads)

All five workstreams below were developed as Cloud Agent **threads** against this one GitHub repo. They are now staged as standalone packages under `projects/` so each can become its own **Cursor project** (own folder + own GitHub repo + own Cloud Agent environment).

**Rule:** name the project / repo / environment after the **product**. Name each chat **thread** after the **job** inside that product.

| # | Product (Cursor project) | Suggested GitHub repo | Staged path | Primary agent thread |
|---|--------------------------|----------------------|-------------|----------------------|
| 1 | **Mobile Home Parks** | `turneratom/mobile-home-parks` | `projects/mobile-home-parks/` | [Mobile home park platform](https://cursor.com/agents/bc-01a03ec3-e6cd-73c0-9b14-99bf01f48522) |
| 2 | **Turner Capital** | `turneratom/turner-capital` | `projects/turner-capital/` | [Turner capital grok bot](https://cursor.com/agents/bc-01a04936-7cc1-7e9b-be4c-27f8081856a5) |
| 3 | **Tread Affiliates** | `turneratom/tread-affiliates` | `projects/tread-affiliates/` | [Affiliate traffic monetization](https://cursor.com/agents/bc-01a04a08-47fc-75a3-b13f-5172eb7b60f1) |
| 4 | **Turner Biographies** | `turneratom/turner-biographies` | `projects/turner-biographies/` | [Great human biographies](https://cursor.com/agents/bc-01a041e3-1c61-7b04-8821-3d1ee6d3200e) |
| 5 | **Project AIS** | `turneratom/project-ais` | `projects/project-ais/` | [Automated income streams](https://cursor.com/agents/bc-01a03ec8-98aa-7d82-b4e0-6ace2ae62597) |

## What each project is

1. **Mobile Home Parks** — Trailer/MHP marketplace, owner outreach, GitHub Pages site (`mhportal` / tread parks).
2. **Turner Capital** — Crypto & equities trading-floor simulation UI.
3. **Tread Affiliates** — TREAD Marketing affiliate traffic / monetization Next app.
4. **Turner Biographies** — Greatest Humans / Firebrand (Thomas Paine) book + film site + KDP package.
5. **Project AIS** — Automated Income Streams: VitalAI health tools, Stripe Pro/Elite, agent automation charters.

## Open as five Cursor projects (after repos exist)

1. Create the five empty GitHub repos listed above (private or public).
2. From this repo root, run:

```bash
./scripts/push-separated-projects.sh
```

3. In Cursor: **Open Project** → pick each new repo (or clone each into its own folder).
4. Start new Cloud Agents **from that project**, not from VitalAI-PWA.
5. Rename old threads with a product prefix only if you keep them for history (e.g. `MHP: …`). Prefer new threads inside the new project.

## Related threads (same product)

| Product | Related threads |
|---------|-----------------|
| Mobile Home Parks | Visual test trailer parks site; Live-test permanent Pages; Verify live github.io links; partner/email pin threads |
| Turner Capital | Test Turner Capital floor; Verify clean floor URL |
| Tread Affiliates | Review TREAD Marketing page; Generate affiliate comparison pages |
| Turner Biographies | All “Write Paine / Firebrand chapter…” agents |
| Project AIS | Generate affiliate comparison pages (health tools) |

## Until the new repos are live

- Keep shipping MHP from this repo / `gh-pages` as today.
- Do **not** mix AIS Stripe keys into MHP deploys (see `projects/project-ais/PROJECT-AIS.md`).
- Prefer new work only inside `projects/<name>/` or after the split push.
