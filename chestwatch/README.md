# ChestWatch Twin

Apple Watch on a choker — camera + AI voice companion. This repo folder is the **iPhone digital twin**: a mobile-first installable PWA (App Store later). Standalone product. Not Family Legacy.

Pitch: **Your digital twin on your phone — pairs with the choker.**

One tap: capture (camera) + ask (voice). Then answer. Settings is connect + permissions only. **$9.99/mo**.

## Run

```bash
cd chestwatch
cp .env.example .env.local   # optional; default checkout URL is already wired
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Use `build` + `start` (or HTTPS) when testing **Add to Home Screen**. Service worker registers in production.

## Install on iPhone (PWA)

Safari cannot “install” from localhost over HTTP on a real device. Deploy or use a trusted HTTPS URL, then:

1. Open ChestWatch in **Safari** (not Chrome).
2. Tap the **Share** button.
3. Tap **Add to Home Screen**.
4. Tap **Add**.
5. Launch the gold ChestWatch icon. It opens standalone, like an app.

Android: Chrome menu → **Install app** / **Add to Home Screen**.

## Checkout ($9.99/mo)

CTA links to `NEXT_PUBLIC_CHECKOUT_URL`.

Default placeholder:

```
NEXT_PUBLIC_CHECKOUT_URL=https://whop.com/checkout/PLAN_ID
```

Paste the real Whop plan URL in `.env.local` (and in Vercel env) — no code change required.

## Screens

| Route | What |
| --- | --- |
| `/` | Twin — pitch + one big tap (see + ask) + answer |
| `/history` | Answer history on-device |
| `/settings` | Choker connect, camera, mic |

See → ask → answer runs locally. The companion is a stub with a clear **model hook next** label. Swap `src/app/api/twin/route.ts` for the real vision+voice model.

## Notes

- Easy plugin to iPhone: Add to Home Screen. One tap after that.
- No onboarding wizard. No Family Legacy.
- Camera/mic need a user gesture (the lens tap). If the camera is blocked, use a photo + type, then tap again.
