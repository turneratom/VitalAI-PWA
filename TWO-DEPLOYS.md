# Two deploys from this repo

This repository contains two products. They must not share one Vercel root config.

| Product | Source | How it ships |
|---------|--------|----------------|
| **Mobile Home Parks / Trailer Parks** | `trailer-parks/` + root GitHub Pages export | Root `vercel.json` (Next.js) and/or GitHub Pages |
| **VitalAI** (health tools + Stripe) | `vitalai/` | Separate Vercel project with **Root Directory = `vitalai`** |

## VitalAI Vercel project (existing `workspace` deploy)

1. Vercel → project **workspace** → Settings → General → **Root Directory** → `vitalai`
2. Env vars stay on that project: Stripe, Beehiiv, `APP_URL`
3. Config: `vitalai/vercel.json` (static site + `/api` serverless routes)

Live URL (until custom domain): https://workspace-six-lime-79.vercel.app/

Do not point the MHP GitHub integration at this project, or Trailer Parks will replace VitalAI.
