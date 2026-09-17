# App Store Connect checklist — Letter Trace Desk

Use this as a submit-time list. Items marked **you** need a paid Apple Developer account. This repo does not log into App Store Connect for you.

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
| Age rating | Complete the questionnaire. Expected **4+** / no unrestricted web, no mature content. |
| User interface | Light, iPhone + iPad (universal) |
| Minimum OS | iOS 17.0 |

**Warning:** After App Review approves a Made for Kids app, the Kids Category age band **cannot be changed**. All future updates must keep Kids Category rules.

## 2. Signing

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

Clear the IAP for sale only after metadata is complete. Submit the IAP **with** the app binary.

Local testing: scheme StoreKit config `Configuration.storekit` (Family Sharing flag on, type NonConsumable, **empty subscription groups**).

## 4. Privacy

- [ ] App Privacy: **Data Not Collected**
- [ ] Privacy policy URL: host `docs/privacy.html` or `docs/PRIVACY.md` on HTTPS. Kids Category requires a policy URL even when you collect nothing.
- [ ] Privacy Nutrition answers match `PrivacyInfo.xcprivacy` (`NSPrivacyTracking` = false, no collected types)
- [ ] Export compliance: **ITSAppUsesNonExemptEncryption = false** (standard HTTPS only)
- [ ] Do **not** add an ATT tracking prompt
- [ ] Do **not** add third-party analytics or ads

## 5. Version / listing

Paste copy from `docs/APP-STORE-LISTING.md`.

- [ ] Screenshots: 6.7" iPhone and 12.9" iPad (plus other sizes ASC currently requires)
- [ ] Screenshots show Welcome fences, Pick, Trace, Done — calm, no orange, no ads
- [ ] IAP / settings only in a screenshot that is clearly parent-gated if you show them at all
- [ ] No “For Kids” language issues — this app **is** in Kids Category, so age 3–5 in the name/subtitle is allowed
- [ ] Support URL (can be the hosted privacy/support page). Marketing URL optional.
- [ ] Copyright year. **No personal home address** in listing or binary.

## 6. Review notes (paste)

```
Letter Trace Desk is a Kids Category practice helper (ages 3–5), not a curriculum.

No account / no login. No backend. Free letters A–F work offline.

Parental gate: addition of two numbers between 2 and 9. Required before Parent settings and before the IAP.

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
- [ ] Archive (Any iOS Device) → Distribute App → App Store Connect
- [ ] Select the IAP on the version
- [ ] Submit for review

## Not in this checklist

Forecasts, ARPU, “we will make $X”, download goals, or competitor revenue. Keep those out of ASC and out of listing copy.
