# TREAD Affiliates

Long-form traffic generation guide for **TREAD Marketing** — Skills → Vehicle → Monetisation — plus the **affiliate monetization rail**.

## Monetization rail

The money surface lives at:

[`/comparisons/best-ai-health-apps`](./app/comparisons/best-ai-health-apps/page.tsx)

Ranked tool picks with prominent affiliate CTAs. Affiliate destinations are in `lib/links.ts` under `links.affiliates` (VitalAI, PulseKit, Competitor). Swap the placeholder `example.com/aff/*` URLs when real partner links are ready.

Home (`app/page.tsx`) links into this page with **Compare tools that pay**.

## Run locally

```bash
cd tread-affiliates
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update CTAs

Edit `lib/links.ts` for:

- Affiliate comparison destinations (`affiliates.vitalai`, `affiliates.pulsekit`, `affiliates.competitor`)
- Glitchy signup URL
- Telegram invite
- YouTube resource links
- Swipe-file URL

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · Syne + Figtree
