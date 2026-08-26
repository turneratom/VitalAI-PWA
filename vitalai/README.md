# VitalAI PWA Proto
MVP: Camera snap + chat → agent stub.
Backend: OpenClaw image/chat (gateway fix first).
Tiers: Free/Pro/Elite stubs.
UI: MyFitnessPal clean (green/blue).
PWA ready.

## Monetization stack (added)
- **Tools hub** (`tools/`) — 5 SEO health calculators with FAQ schema
- **Affiliate page** (`affiliate/best-ai-health-apps.html`) — comparison content
- **Automation charters** (`automation/`) — Kimi swarm + Grok Bot prompts
- **Deploy** — `vercel.json` at repo root, output `vitalai/`

### Deploy to Vercel
```bash
vercel --prod
```
Point domain to `vitalai.app`, submit `sitemap.xml` to Google Search Console.

