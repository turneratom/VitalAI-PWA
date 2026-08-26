# VitalAI Launch Checklist — Complete Monetization Stack

Everything in code is done. These steps require your accounts (15 min each).

## 1. Deploy to Vercel (5 min)
```bash
npm install
npx vercel link
npx vercel env pull
npx vercel --prod
```
Set custom domain: `vitalai.app`

## 2. Stripe — Pro & Elite subscriptions (10 min)
1. Create products at https://dashboard.stripe.com/products
   - VitalAI Pro — $9.99/mo recurring
   - VitalAI Elite — $29.99/mo recurring
2. Copy Price IDs to Vercel env:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_PRICE_PRO`
   - `STRIPE_PRICE_ELITE`
   - `APP_URL=https://vitalai.app`

## 3. Beehiiv Newsletter (5 min)
1. Create publication at https://app.beehiiv.com
2. Set Vercel env:
   - `BEEHIIV_API_KEY`
   - `BEEHIIV_PUBLICATION_ID`
   - `BEEHIIV_EMBED_ID` (optional embed on newsletter.html)
3. Paste `automation/newsletter-bot-charter.txt` into Grok Bot

## 4. Google Search Console (5 min)
1. Add property `vitalai.app`
2. Submit sitemap: `https://vitalai.app/sitemap.xml`
3. Request indexing for `/tools/` and top 5 calculators

## 5. Google AdSense (apply, 1–7 day approval)
1. Apply at https://adsense.google.com with vitalai.app
2. Add `ADSENSE_CLIENT_ID` to env (auto-injected on tool pages)

## 6. Affiliate programs (apply)
| Program | Commission | Apply |
|---------|-----------|-------|
| MyFitnessPal / Under Armour | Varies | Impact Radius |
| Noom | $10–$30/lead | ShareASale |
| Amazon Associates | 1–4% | affiliate-program.amazon.com |
| iHerb supplements | 5–10% | iHerb affiliate |

Add approved links to affiliate pages in `vitalai/affiliate/`.

## 7. Grok Bot — paste all charters
Files in `vitalai/automation/`:
- tool-factory-bot-charter.txt (daily new tools — queue empty, all 15 built)
- affiliate-seo-bot-charter.txt
- newsletter-bot-charter.txt
- pinterest-bot-charter.txt
- x-content-bot-charter.txt
- facebook-content-bot-charter.txt
- youtube-research-bot-charter.txt
- kdp-publisher-bot-charter.txt
- directory-bot-charter.txt (optional, later)

## 8. Kimi Agent Swarm — run once
Paste `kimi-health-tools-swarm.txt` for next 20 tool keywords (Phase 2).

## 9. Pinterest — schedule 25 pins
Upload from `pinterest/pin-pack-25.txt` via Tailwind (5/day).

## 10. Revenue timeline
| Week | Action | Expected |
|------|--------|----------|
| 1 | Deploy + GSC + Pinterest pins | $0 |
| 2–4 | Indexing begins, newsletter issue 1 | $0–$50 affiliate |
| 6–8 | Calculator rankings | $100–$500/mo |
| 12 | 15 tools + 5 affiliate pages | $800–$2,500/mo |

## What's already built
- 15 health calculators with FAQ schema
- 5 affiliate comparison pages
- Stripe checkout API (`/api/create-checkout`)
- Newsletter API (`/api/subscribe` → Beehiiv)
- Pro/Elite tier gating in app
- 25 Pinterest pins written
- 9 Grok Bot charters
- sitemap + robots.txt + Vercel config
