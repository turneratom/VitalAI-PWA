# Project AIS — VitalAI (first Automated Income Stream)

This folder is **Project AIS**, not Mobile Home Parks. One Stripe account for all AIS revenue.

# VitalAI PWA Proto
MVP: Camera snap + chat → agent stub.
Backend: OpenClaw image/chat (gateway fix first).
Tiers: Free/Pro/Elite with Stripe checkout.
UI: MyFitnessPal clean (green/blue).
PWA ready.

## Full monetization stack
| Asset | Count | Path |
|-------|-------|------|
| Health calculators | 15 | `tools/` |
| Affiliate comparisons | 5 | `affiliate/` |
| API routes | 4 | `/api/` (Stripe, newsletter, config) |
| Grok Bot charters | 9 | `automation/` |
| Pinterest pins | 25 | `pinterest/pin-pack-25.txt` |

## Deploy
See **LAUNCH.md** for Stripe, Beehiiv, AdSense, and GSC setup.

```bash
npm install
npx vercel --prod
```

## Revenue streams active
1. **VitalAI Pro/Elite** — Stripe subscriptions ($9.99 / $29.99)
2. **AdSense** — health calculator traffic (high CPC)
3. **Affiliate SEO** — 5 comparison pages
4. **Newsletter** — Beehiiv → sponsors at scale
5. **Pinterest/X/Facebook** — bot charters ready
