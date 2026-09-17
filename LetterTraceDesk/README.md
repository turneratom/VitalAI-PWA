# Letter Trace Desk

Native **SwiftUI** iOS app (iOS 17+, iPhone + iPad) for short, finger-friendly **uppercase letter tracing** sittings. Age band **3–5**. Calm, ad-free, offline-capable, **zero child data**.

This folder is a **standalone Xcode project**. It does not wrap the web MVP in a WebView and it does not modify VitalAI.

**Practice helper only — not a curriculum, school assessment, or handwriting diagnosis.**

Status: shippable source for App Store Connect. Not published from this repo. No invented installs, revenue, or P&L.

## What a sitting feels like

1. **Welcome** — parent reads honest fences and checks the box → **Continue**
2. **Pick letters** — preview the short locked set → **Continue — start tracing**
3. **Trace** — follow the dotted path with a finger (forgiving coverage) → soft cheer + spoken letter → **Continue** (or Skip)
4. **Done** — sitting ends on purpose → Practice again or **Continue**

**Parent settings** and **purchases** sit behind an adult **math gate**. Kids Category rule: no buying or outbound links in kid mode.

## Free vs unlock

| | |
|---|---|
| Free | Uppercase **A–F** |
| One-time IAP | **Full Alphabet Unlock** — G–Z |
| Price | Set in App Store Connect. Target band **USD $3.99–$4.99** one-time. UI shows the live StoreKit `displayPrice`. |
| Subscriptions | **None.** Do not add them. |
| Family Sharing | Supported in code (`StoreKit` 2 entitlements). Turn **Family Sharing ON** for the product in App Store Connect. |
| Ask to Buy | Pending purchases wait for a parent; the app does not nag in kid mode. |

Product ID (must match App Store Connect):

`com.lettertracedesk.fullalphabet`

## Privacy

- App Store privacy answer: **Data Not Collected**
- Storage: **AppStorage / UserDefaults only** (fence check, sitting length, letter pool, speech toggle, unlock cache)
- No child name, photos, accounts, chat, location, analytics SDK, ads, or tracking
- Speech: on-device `AVSpeechSynthesizer`
- Tracing strokes stay in memory for the current letter only

See `docs/PRIVACY.md` and `docs/privacy.html`.

## Open in Xcode

1. Install **Xcode 15.3+** on a Mac.
2. Open `LetterTraceDesk.xcodeproj`.
3. Select the **Letter Trace Desk** scheme.
4. Set your **Development Team** on the app target (Signing & Capabilities). In-App Purchase is StoreKit — no extra capability file required.
5. For local IAP: Xcode → Scheme → Edit Scheme → Run → Options → StoreKit Configuration → `Configuration.storekit`.
6. Run on an **iOS 17+** simulator or device.

Bundle ID (change only if you own a different identifier):

`com.lettertracedesk.app`

Display name: **Letter Trace Desk**

## Tests

In Xcode: **Product → Test** (⌘U). Coverage, session planning, free/paid letters, and the parent-gate math are unit-tested without UI.

From this folder on a machine without Xcode, run the static ship check:

```bash
python3 scripts/verify_ship_ready.py
```

## App Store

- Checklist: `docs/ASC-CHECKLIST.md`
- Listing draft: `docs/APP-STORE-LISTING.md`
- Fences / COPPA honesty: `docs/FENCES.md`
- Kids Category: **Made for Kids · 5 and under** (this choice is locked after first approval)

## Out of scope (v1)

- Curriculum, grades, handwriting scoring, or clinical claims
- Subscriptions, ads, kid accounts, cloud sync, analytics SDKs
- Invented revenue or download counts
- WebView wrap of the HTML MVP
- Personal names or mailing addresses in the binary or listing stub

## Layout

```
LetterTraceDesk/
  LetterTraceDesk.xcodeproj/
  LetterTraceDesk/           SwiftUI app
  LetterTraceDeskTests/      XCTest
  Configuration.storekit     Local StoreKit 2 products
  docs/                      Listing, privacy, ASC, fences
  scripts/verify_ship_ready.py
```
