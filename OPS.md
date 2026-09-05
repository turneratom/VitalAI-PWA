# OPS — Chief of Staff

**Bradley invents. The Chief of Staff executes and fans out work.**

You should never wait on GitHub, Cursor project setup, or “which folder?”  
Drop the idea. CoS starts work the same minute.

---

## Your only habit

Send ideas to the **Chief of Staff** chat (this kind of thread), in plain language:

```
Meridian — Japan Escape package, 7 days, ~$6k
```

```
New company: Halo Hats. AI-designed custom hats. Sell online.
```

```
Everything Films — funeral home partner email wave
```

That is enough. Do not create repos first. Do not open a second project first.

---

## What CoS does immediately (no waiting)

1. **Name the company** (or create one if you said “New company”).
2. **Name the job** (one discussion = one job).
3. **Start work now** under `projects/<company-slug>/` (or that company’s own repo once it exists).
4. **Ship a PR** for that job.
5. **Queue your 1-click leftovers** (create empty GitHub repo, merge, add secrets) in a short “Needs Bradley” list — never block the build on those.

### Separation without slowing you down

| Layer | How it stays separate | What you do |
|-------|----------------------|-------------|
| Company | Own folder/repo + own PRs | Say the company name in the idea |
| Job / discussion | One agent run / one PR | Send one idea; send the next as a new message or new CoS thread |
| Holding | CoS chat only routes | Dump ideas here; don’t manage structure |

Until tomorrow’s GitHub setup: companies live as `projects/<slug>/` inside this repo, **isolated from the MHP site root**. After you create empty repos, CoS (or the push script) splits them. Work does not pause for that.

---

## Roles

| Role | Who | Does |
|------|-----|------|
| Inventor | Bradley | Ideas, priorities, “yes/no” on spend & merges |
| Chief of Staff | This agent | Route, scaffold, start jobs, chase blockers, report what’s live |
| Company operators | Job agents / subagents | Build only inside their company |

---

## Needs Bradley (only human clicks)

- Create empty GitHub repo when CoS asks (batch these on computer days)
- Merge PRs you like
- Paste API keys into that company’s Cloud Agent environment
- Pay vendors / buy domains

Everything else is agent work.

---

## Company map

| Company | Slug / staged path | Own repo (when ready) |
|---------|--------------------|------------------------|
| Mobile Home Parks | `projects/mobile-home-parks/` (+ live site today) | `turneratom/mobile-home-parks` |
| Meridian | `projects/meridian-travel/` | `turneratom/meridian-travel` |
| Everything Films | `projects/everything-films/` | `turneratom/everything-films` |
| Turner Capital | `projects/turner-capital/` | `turneratom/turner-capital` |
| Turner Biographies | `projects/turner-biographies/` | `turneratom/turner-biographies` |
| Project AIS | `projects/project-ais/` | `turneratom/project-ais` |
| Tread Affiliates | `projects/tread-affiliates/` | `turneratom/tread-affiliates` |

New company → `./scripts/new-company.sh "Name" "idea"` (CoS runs this).

---

## Speed rules for agents

1. Never ask Bradley to set up structure before starting.
2. Never mix two companies in one job PR.
3. Prefer shipping a thin first version in <1 cycle over a perfect plan.
4. If an idea spans companies, split into parallel jobs and say so in one line.
5. Keep a running **Needs Bradley** list; keep building meanwhile.

## Computer-day batch (tomorrow)

1. Create empty repos for staged companies (start: `meridian-travel`, `everything-films`).
2. Run `./scripts/push-separated-projects.sh`.
3. Open each as a Cursor project + Cloud Agent environment.
4. Optional: Automations per company for recurring jobs.

Until then, **CoS chat = the accelerator**. Ideas in → work out.
