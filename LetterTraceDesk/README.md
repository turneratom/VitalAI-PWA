# Letter Trace Desk

Native **SwiftUI** iOS app (iOS 17+, iPhone + iPad) for short, finger-friendly **uppercase letter tracing** sittings. Age band **3–5**. Calm, ad-free, offline-capable, **zero child data**.

This folder is a **standalone Xcode project**. It does not wrap the web MVP in a WebView and it does not modify VitalAI.

**Practice helper only — not a curriculum, school assessment, or handwriting diagnosis.**

Status: source-complete release candidate. Linux static checks pass; a Mac with Xcode and an Apple Developer account are still required for signing, device testing, TestFlight, screenshots, and submission. No App Store metrics are claimed or available from this repo.

## Release handoff

- Brad's exact Mac → TestFlight → App Review sequence: [`docs/BRAD-MAC-TESTFLIGHT.md`](docs/BRAD-MAC-TESTFLIGHT.md)
- App Store Connect checklist: [`docs/ASC-CHECKLIST.md`](docs/ASC-CHECKLIST.md)
- Listing copy: [`docs/APP-STORE-LISTING.md`](docs/APP-STORE-LISTING.md)
- Privacy/COPPA notes: [`docs/PRIVACY.md`](docs/PRIVACY.md)

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
| Family Sharing | Supported by StoreKit 2 entitlement/restore handling. Turn **Family Sharing ON** for the product in App Store Connect; Apple says this cannot later be turned off. |
| Ask to Buy | Pending purchases wait for a parent; the app does not nag in kid mode. |

Product ID (case-sensitive; must match App Store Connect exactly):

`com.lettertracedesk.fullalphabet`

`Configuration.storekit` is only an Xcode-local test catalog. It does **not** create or configure the live product. In App Store Connect create exactly one **Non-Consumable** with the ID above. Apple does not let you edit a product ID or purchase type after creation, so verify both before clicking Create. If the bundle ID must change, the IAP product ID may remain as written, but all code, test configuration, and ASC metadata must still use one identical value.

## Privacy

- App Store privacy answer: **Data Not Collected**
- Storage: **AppStorage / UserDefaults only** (fence check, sitting length, letter pool, speech toggle, unlock cache)
- No child name, photos, accounts, chat, location, analytics SDK, ads, or tracking
- Speech: on-device `AVSpeechSynthesizer`
- Tracing strokes stay in memory for the current letter only

See `docs/PRIVACY.md` and `docs/privacy.html`.

## Mac/Xcode smoke test

1. Install **Xcode 15.3+** on a Mac.
2. Clone/check out this branch, then open `LetterTraceDesk/LetterTraceDesk.xcodeproj`.
3. Select the **Letter Trace Desk** scheme.
4. App target → **Signing & Capabilities** → select the paid Apple Developer **Team** and leave **Automatically manage signing** on.
5. Confirm the bundle ID is owned by that team. If `com.lettertracedesk.app` is unavailable, choose the final ID before creating the App Store Connect app record.
6. Product → Scheme → Edit Scheme → Run → Options → StoreKit Configuration → select `Configuration.storekit`.
7. Choose an **iOS 17+** simulator and press Run.
8. Product → Test (⌘U).
9. Exercise A–F without purchase, solve the parent gate, buy the local Full Alphabet Unlock, confirm G–Z, then use Xcode's StoreKit transaction manager to revoke/delete the transaction and test **Restore purchases**.

Bundle ID (change only if you own a different identifier):

`com.lettertracedesk.app`

Display name: **Letter Trace Desk**

## Tests

In Xcode: **Product → Test** (⌘U). Coverage, session planning, free/paid letters, and the parent-gate math are unit-tested without UI.

From this folder on a machine without Xcode, run the static ship check:

```bash
python3 scripts/verify_ship_ready.py
```

That script also runs the mirrored core-logic tests and checks the listing character limits. It cannot compile Swift, sign an archive, test StoreKit sandbox behavior, or replace the Mac steps.

## TestFlight

The local `.storekit` file is not used by TestFlight. Before uploading, Brad must create the matching non-consumable in App Store Connect and complete the Paid Apps agreement, tax, and banking setup. For the first internal build:

1. Set the scheme StoreKit Configuration to **None** so the archive uses App Store sandbox products.
2. Select **Any iOS Device (arm64)** → Product → Archive.
3. Organizer → **Distribute App** → **App Store Connect** → **Upload**.
4. In App Store Connect → TestFlight, finish export-compliance prompts, add build `1` to an internal group, and install it through the TestFlight app.
5. Run the sandbox checklist in [`docs/BRAD-MAC-TESTFLIGHT.md`](docs/BRAD-MAC-TESTFLIGHT.md). TestFlight In-App Purchases are sandbox transactions and do not charge testers.

Internal testers must be App Store Connect users. External testing is optional and the first external build may require TestFlight App Review.

## App Store files

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
  docs/                      Mac/TestFlight, listing, privacy, ASC, fences
  scripts/verify_ship_ready.py
```
