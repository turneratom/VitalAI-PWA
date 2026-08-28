# VitalAI Ops Email Setup

**Ops email:** `rvaturner@gmail.com`  
Use this address for **every** service below. You sign up once per service, then paste **API keys only** into Cursor Cloud Environment secrets — never passwords in chat.

After all keys are in, tell the agent: **"Ops keys added — deploy everything"**

---

## Flow (one email → many API keys)

```
rvaturner@gmail.com
    ├── Vercel      → VERCEL_TOKEN
    ├── Stripe      → STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_PRICE_*
    ├── Beehiiv     → BEEHIIV_API_KEY, BEEHIIV_PUBLICATION_ID
    ├── Google      → (browser login only — GSC + AdSense, no API key for setup)
    └── GitHub      → already connected to VitalAI-PWA repo
```

Cursor Environment secrets: https://cursor.com/dashboard/cloud-agents/environments

---

## Step 1 — Vercel (hosting) ~3 min

1. Go to https://vercel.com/signup — sign up with **rvaturner@gmail.com** (Google login is fine if it’s this Gmail).
2. Import repo: https://vercel.com/new → `turneratom/VitalAI-PWA`
3. Deploy once (defaults OK — uses `vercel.json`).
4. Create token: https://vercel.com/account/tokens → **Create** → name `vitalai-ops` → scope Full Account.
5. Copy token → add to Cursor secrets as:

| Secret name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | `vercel_...` |
| `APP_URL` | `https://vitalai.app` (or your Vercel URL until domain is set) |

---

## Step 2 — Stripe (get paid) ~10 min

1. Go to https://dashboard.stripe.com/register — email **rvaturner@gmail.com**.
2. Complete business profile (can start in **Test mode** first).
3. API keys: https://dashboard.stripe.com/test/apikeys (switch to Live when ready).

| Secret name | Where |
|-------------|-------|
| `STRIPE_SECRET_KEY` | Secret key `sk_test_...` or `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Publishable key `pk_test_...` or `pk_live_...` |

4. Create products: https://dashboard.stripe.com/products/create

| Product | Price | Billing |
|---------|-------|---------|
| VitalAI Pro | $9.99 | Monthly recurring |
| VitalAI Elite | $29.99 | Monthly recurring |

5. Open each product → copy **Price ID** (`price_...`):

| Secret name | Value |
|-------------|-------|
| `STRIPE_PRICE_PRO` | `price_...` for Pro |
| `STRIPE_PRICE_ELITE` | `price_...` for Elite |

6. Connect bank: https://dashboard.stripe.com/settings/payouts (required for live payouts).

---

## Step 3 — Beehiiv (newsletter) ~5 min

1. Go to https://www.beehiiv.com/ — sign up with **rvaturner@gmail.com**.
2. Create publication: **VitalAI Health Tips**.
3. Settings → Integrations → API: https://app.beehiiv.com/settings/integrations

| Secret name | Where |
|-------------|-------|
| `BEEHIIV_API_KEY` | API key from integrations page |
| `BEEHIIV_PUBLICATION_ID` | Settings → publication ID (UUID) |
| `BEEHIIV_EMBED_ID` | Optional — embed code ID for newsletter page |

---

## Step 4 — Google (same Gmail) ~10 min

Sign in to Google as **rvaturner@gmail.com**:

| Task | URL | API key? |
|------|-----|----------|
| Search Console | https://search.google.com/search-console | No — verify domain, submit `https://vitalai.app/sitemap.xml` |
| AdSense (later) | https://www.google.com/adsense/start/ | After approval → `ADSENSE_CLIENT_ID` = `ca-pub-...` |

Agent cannot complete Google domain verification for you — DNS or HTML file at registrar required once.

---

## Step 5 — Merge code & tell agent

1. Merge PR: https://github.com/turneratom/VitalAI-PWA/pull/1
2. Confirm all secrets above are in Cursor Environment (not in git).
3. Message agent: **"Ops keys added — deploy everything"**

Agent will: deploy Vercel, set production env vars, create/verify Stripe wiring, test `/pricing.html` checkout, test `/newsletter.html` subscribe.

---

## Secret checklist (copy when done)

```
[ ] VERCEL_TOKEN
[ ] APP_URL
[ ] STRIPE_SECRET_KEY
[ ] STRIPE_PUBLISHABLE_KEY
[ ] STRIPE_PRICE_PRO
[ ] STRIPE_PRICE_ELITE
[ ] BEEHIIV_API_KEY
[ ] BEEHIIV_PUBLICATION_ID
[ ] (optional) BEEHIIV_EMBED_ID
[ ] (later) ADSENSE_CLIENT_ID
[ ] PR #1 merged
```

---

## Security rules

- **Never** commit API keys to GitHub.
- **Never** paste secret keys in Cursor chat — use Environment secrets UI only.
- Rotate `VERCEL_TOKEN` if exposed.
- Start Stripe in **test mode**; switch to live keys when ready for real charges.

---

## Test mode first (recommended)

Use Stripe **test** keys and test card `4242 4242 4242 4242` on `/pricing.html` before going live. Same secret names — just `sk_test_` / `pk_test_` values.
