# OPS — Bradley invents. Agents execute.

## Roles

| Role | Who | Does |
|------|-----|------|
| **Inventor** | Bradley | Company ideas, offers, priorities, approvals (merge, spend, credentials) |
| **Operator** | Cursor / Grok Cloud Agents | Scaffold, build, ship PRs, drafts, playbooks — inside the right company |

Bradley does **not** need to manage folders, branches, or architecture. Say the company and the job. The agent does the rest.

---

## Easy separation (the only rules)

1. **Company** = its own GitHub repo + Cursor project + Cloud Agent environment  
2. **Discussion / agent run** = one **job** inside one company  
3. **Never** mix two companies in one thread

### Naming

| Layer | Name like | Example |
|-------|-----------|---------|
| Company / repo / Cursor project | Product brand | `meridian-travel`, `everything-films` |
| Agent discussion (thread) | The job | `Amalfi itinerary draft`, `Owner wave 4 CSV` |
| Holding note (optional) | Tread | Your idea list only — no product code |

### What Bradley does on mobile

1. Open the **company’s** Cursor project (not VitalAI-PWA, once split).  
2. Start a **new** Cloud Agent.  
3. Type the job in plain language, e.g. `Draft Escape package page for Japan`.  
4. Approve the PR when it looks right.

If the company repo does not exist yet, say:  
`New company: <name>. <one-line idea>.`  
The agent stages `projects/<slug>/` here and tells you the one GitHub click left (create empty repo).

---

## Company list (operating)

| Company | Repo | Staged path |
|---------|------|-------------|
| Mobile Home Parks | `turneratom/mobile-home-parks` | `projects/mobile-home-parks/` (also live in this repo today) |
| Meridian | `turneratom/meridian-travel` | `projects/meridian-travel/` |
| Everything Films | `turneratom/everything-films` | `projects/everything-films/` |
| Turner Capital | `turneratom/turner-capital` | `projects/turner-capital/` |
| Turner Biographies | `turneratom/turner-biographies` | `projects/turner-biographies/` |
| Project AIS | `turneratom/project-ais` | `projects/project-ais/` |
| Tread Affiliates | `turneratom/tread-affiliates` | `projects/tread-affiliates/` |

Until a company has its own repo: agents work **only** under `projects/<slug>/` and do not publish into the MHP GitHub Pages root.

---

## Agent execution checklist (every job)

1. Identify the **company** from the message (or ask once if impossible).  
2. Work only in that company’s folder/repo.  
3. Name the git branch `cursor/<job-slug>-****`.  
4. Ship a PR.  
5. Do not touch other companies in the same run.

## Bradley approval checklist (only human gates)

- Merge / don’t merge  
- Create empty GitHub repo when an agent asks (one click)  
- Add secrets to that company’s Cloud Agent environment  
- Point domains / pay vendors  

Everything else is agent work.

---

## Split status

1. Create empty repos for staged companies (start: `meridian-travel`, `everything-films`).  
2. Run `./scripts/push-separated-projects.sh`.  
3. In Cursor → Open Project on each new repo → create its Cloud Agent environment.  
4. Start job threads **from those projects**.

See `PROJECTS.md` and each `projects/*/CURSOR-PROJECT.md`.
