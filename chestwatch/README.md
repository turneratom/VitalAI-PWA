# ChestWatch Twin

Apple Watch on a choker — camera + AI voice companion. This repo folder is the **iPhone digital twin**: a mobile-first installable PWA (App Store later). Standalone product. Not Family Legacy.

Pitch: **Easy iPhone plugin. One tap. Your digital twin.**

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

Primary CTA **Get your digital twin · $9.99/mo** links to:

```
NEXT_PUBLIC_CHECKOUT_URL=https://whop.com/checkout/plan_AfktzTAx5Hd1c
```

Override in `.env.local` or Vercel env if the plan URL changes.

## Screens

| Route | What |
| --- | --- |
| `/` | Twin — pitch + one big tap (see + ask) + answer |
| `/history` | Answer history on-device |
| `/settings` | Choker connect, camera, mic |

See → ask → answer runs locally. The companion is a stub with a clear **model hook next** label. Swap `src/app/api/twin/route.ts` for the real vision+voice model.

## Notes

- Easy iPhone plugin: Add to Home Screen. One tap after that. Your digital twin.
- No onboarding wizard. No Family Legacy.
- Camera/mic need a user gesture (the lens tap). If the camera is blocked, use a photo + type, then tap again.
