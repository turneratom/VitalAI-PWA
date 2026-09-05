# Staged companies

Each folder is one **company**. Bradley invents; agents execute inside the matching folder (or its own GitHub repo after split).

| Folder | Company |
|--------|---------|
| `meridian-travel/` | Meridian — boutique travel |
| `everything-films/` | Everything Films — wedding & life movies |
| `mobile-home-parks/` | Mobile Home Parks / Tread parks |
| `turner-capital/` | Turner Capital — trading floor |
| `turner-biographies/` | Turner Biographies / Firebrand |
| `project-ais/` | Project AIS / VitalAI health tools |
| `tread-affiliates/` | Tread Affiliates |

## New company (agent does this when Bradley says “New company: …”)

```bash
./scripts/new-company.sh "Company Name" "one-line idea"
```

That creates `projects/<slug>/` with `CURSOR-PROJECT.md`, `README.md`, and a starter `index.html`.

Then Bradley creates the empty GitHub repo; agent (or `./scripts/push-separated-projects.sh`) pushes it.
