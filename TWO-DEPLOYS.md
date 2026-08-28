# Two deploys from this repo

This GitHub repo holds **two unrelated businesses**. Do not mix deploys or Stripe accounts.

| Workstream | Source | How it ships | Payments |
|------------|--------|----------------|----------|
| **Project AIS** (Automated Income Streams) | `vitalai/` | Separate Vercel project, **Root Directory = `vitalai`** | **Single Stripe account** (VitalAI / AIS keys) |
| **Mobile Home Parks / Trailer Parks** | `trailer-parks/` + root GitHub Pages | Root `vercel.json` and/or GitHub Pages | Not AIS — do not use AIS Stripe keys here |

See **`PROJECT-AIS.md`**.

## AIS Vercel project (existing `workspace` deploy)

1. Vercel → project **workspace** → Settings → General → **Root Directory** → `vitalai`
2. Env vars: Stripe (one account), Beehiiv, `APP_URL`
3. Config: `vitalai/vercel.json`

Live URL (until custom domain): https://workspace-six-lime-79.vercel.app/

Do not point the MHP GitHub integration at this project, or Trailer Parks will replace AIS.
