# App Store Connect checklist — Letter Trace Desk

Use this as a submit-time list. Apple-account work is intentionally unchecked; this repo cannot verify it. Follow `BRAD-MAC-TESTFLIGHT.md` in order.

## 1. Identifiers

| Field | Value |
|---|---|
| App name | Letter Trace Desk |
| Bundle ID | `com.lettertracedesk.app` |
| SKU | `letter-trace-desk` (suggested; any unique SKU is fine) |
| Bundle version | `1.0.0` (MARKETING_VERSION) |
| Build | `1` (CURRENT_PROJECT_VERSION) |
| Primary category | Education |
| Kids Category | **Made for Kids · 5 and under** |
| Age rating | Complete the current questionnaire truthfully and record the rating ASC calculates; do not pre-claim a result. |
| User interface | Light, iPhone + iPad (universal) |
| Minimum OS | iOS 17.0 |

**Warning:** After App Review approves a Made for Kids app, the Kids Category age band **cannot be changed**. All future updates must keep Kids Category rules.

## 2. Signing

- [ ] Apple Developer Program membership active
- [ ] App Store Connect → Business → Agreements: **Paid Apps** active; required tax and banking complete
- [ ] Xcode team selected on the app target
- [ ] New App ID with **In-App Purchase** enabled (default for explicit App IDs)
- [ ] Distribution certificate + App Store provisioning profile (Xcode automatic signing is fine)

## 3. In-App Purchase (required before review if the unlock is shown)

Create **one** product. Do **not** create subscriptions.

| Field | Value |
|---|---|
| Type | **Non-Consumable** |
| Product ID | `com.lettertracedesk.fullalphabet` |
| Reference name | Full Alphabet Unlock |
| Display name (en-US) | Full Alphabet Unlock |
| Description (en-US) | Unlock uppercase letters G–Z for Letter Trace Desk sittings. One-time purchase. Not a subscription. Practice helper only. |
| Price | Choose a **USD $3.99 or $4.99** tier (or regional equivalent). Do not invent other prices in screenshots. |
| Family Sharing | **ON** |
| Review screenshot | Parent unlock screen (math gate passed), not a kid tracing screenshot with a fake price |
| Review notes | “Non-consumable. Free A–F. Parent math gate required before purchase. No subscriptions.” |

Before clicking Create, verify the exact case-sensitive ID and **Non-Consumable** type. Apple does not let you edit either afterward. Turning on Family Sharing is also irreversible. Clear the IAP for sale only after metadata is complete. Submit the first IAP **with** the app binary.

`Configuration.storekit` is local Xcode test data only; it does not create the live ASC product. Local testing uses that file (Family Sharing flag on, type NonConsumable, **empty subscription groups**). Archive/TestFlight testing uses the ASC sandbox product with the scheme StoreKit Configuration set to **None**.

## 4. Privacy

- [ ] App Privacy: **Data Not Collected**
- [ ] Replace the privacy stub's Contact placeholder with a monitored support email or HTTPS form
- [ ] Privacy policy URL: host `docs/privacy.html` on public HTTPS with no login, then verify it in a private browser. A URL is required for every iOS app, including Data Not Collected apps.
- [ ] Privacy Nutrition answers match `PrivacyInfo.xcprivacy` (`NSPrivacyTracking` = false, no collected types)
- [ ] Export compliance: **ITSAppUsesNonExemptEncryption = false** (standard HTTPS only)
- [ ] Do **not** add an ATT tracking prompt
- [ ] Do **not** add third-party analytics or ads

## 5. Version / listing

Paste copy from `docs/APP-STORE-LISTING.md`.

- [ ] Screenshots: 6.9" iPhone (1320×2868, 1290×2796, or 1260×2736 portrait) and 13" iPad (2064×2752 or 2048×2732 portrait); recheck ASC's live specifications at upload
- [ ] Screenshots show Welcome fences, Pick, Trace, Done — calm, no orange, no ads
- [ ] IAP / settings only in a screenshot that is clearly parent-gated if you show them at all
- [ ] No “For Kids” language issues — this app **is** in Kids Category, so age 3–5 in the name/subtitle is allowed
- [ ] Support URL (can be the hosted privacy/support page). Marketing URL optional.
- [ ] Copyright year. **No personal home address** in listing or binary.

## 6. Review notes (paste)

```
Letter Trace Desk is a Kids Category practice helper (ages 3–5), not a curriculum.

No account / no login. No backend. Free letters A–F work offline.

Parental gate: two-digit addition. Required before Parent settings and before the IAP.

IAP: com.lettertracedesk.fullalphabet — non-consumable, one-time Full Alphabet Unlock (G–Z). No subscriptions. Family Sharing intended. Ask to Buy may show pending.

To review IAP: Parent settings → math gate → Continue — unlock. Sandbox Apple ID.

Spoken letter uses on-device AVSpeechSynthesizer (optional, parent toggle).
```

## 7. Kids Category (1.3 / 5.1.4) self-check

- [ ] No ads
- [ ] No third-party analytics SDK
- [ ] No links out of the app in kid mode (privacy text is in-app under the parent gate)
- [ ] Purchasing is **behind the math gate**
- [ ] No chat, social, UGC, or kid-facing web
- [ ] Large, simple controls; sitting ends; Continue on every step
- [ ] Does not send device or child PII to third parties

## 8. Build & submit

- [ ] `python3 scripts/verify_ship_ready.py` is clean
- [ ] Product → Test passes on a Mac
- [ ] Local StoreKit flow passes with `Configuration.storekit`
- [ ] Scheme StoreKit Configuration changed to **None** before Archive
- [ ] Archive (Any iOS Device) → Distribute App → App Store Connect
- [ ] Internal TestFlight flow passes with ASC sandbox product (A–F, gate, buy, G–Z, relaunch, restore, offline)
- [ ] Privacy policy and support URLs are public
- [ ] Select the IAP on the version
- [ ] Submit for review

Official references:

- [Kids Category and parental gates](https://developer.apple.com/kids/)
- [App Review Guidelines 1.3 and 5.1.4](https://developer.apple.com/app-store/review/guidelines/)
- [Create a non-consumable IAP](https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/create-consumable-or-non-consumable-in-app-purchases/)
- [Family Sharing for In-App Purchases](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/turn-on-family-sharing-for-in-app-purchases)
- [TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)

## Not in this checklist

Forecasts, ARPU, “we will make $X”, download goals, or competitor revenue. Keep those out of ASC and out of listing copy.
