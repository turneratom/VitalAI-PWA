# Project AIS — Automated Income Streams

**This workstream is Project AIS.** It is **not** Mobile Home Parks / Trailer Parks / Tread.

AIS = **Automated Income Streams**: agents and systems that research, publish, and sell so revenue can run without daily manual work.

## Money: one Stripe account

All AIS products and agents collect through **one Stripe account** (the keys already on the VitalAI Vercel project):

- `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_PRO` / `STRIPE_PRICE_ELITE`

Do **not** create a second Stripe account for newsletters, affiliates, extra tools, or future AIS agents. Add new **products/prices** in that same dashboard if needed. Payouts go to the bank linked on that account.

## What AIS owns in this repo

| Path | Role |
|------|------|
| `vitalai/` | First AIS product (health tools, Pro/Elite, newsletter capture) |
| `vitalai/automation/` | Agent charters (Grok Bot / Kimi) for AIS |
| `vitalai/api/` | Checkout + subscribe APIs → same Stripe |

Mobile Home Parks lives at repo root / `trailer-parks/` and must stay on a **separate** deploy. See `TWO-DEPLOYS.md`.

## Deploy

Vercel project for AIS: Root Directory = **`vitalai`**.  
Do not use root `vercel.json` (that is Trailer Parks).
