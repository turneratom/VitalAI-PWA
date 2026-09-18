# Privacy stub — Letter Trace Desk

**App Store privacy nutrition label: Data Not Collected.**

This is a privacy-policy release draft. Before publishing, replace `SUPPORT_EMAIL_OR_HTTPS_FORM` below with a monitored business support channel. Then host `privacy.html` at a public HTTPS URL and add that URL in App Store Connect. A privacy policy URL is required for every iOS app; Kids Category rules add stricter data protections.

Last updated: 2026-09-18

## Who this is for

Letter Trace Desk is a practice-helper app for children ages 3–5, used with a parent or caregiver. It is intended for the App Store **Kids Category** (5 and under).

## What we collect

**We do not collect personal data.** The app does not create child accounts, does not ask for a child’s name, and does not upload traces, photos, or audio.

The developer does not operate an analytics SDK, advertising SDK, or crash-reporting SDK in this app.

## What stays on the device

The app may store these **on-device preferences** using Apple’s AppStorage / UserDefaults (not sent to our servers — we do not run an app backend):

- Whether the parent acknowledged the practice-helper fences
- Letters-per-sitting (3–8) and which letters are in the pool
- Whether spoken letter names are enabled
- A local cache of whether Full Alphabet Unlock is already owned

Apple may process **In-App Purchases** (including Family Sharing and Ask to Buy) under Apple’s privacy policy. We do not receive card numbers.

On-device speech uses Apple’s `AVSpeechSynthesizer`. That speech is not recorded by this app.

## Tracking

This app does **not** track users. It does not call App Tracking Transparency. It does not use the advertising identifier.

## Children’s privacy (COPPA and similar)

We do not knowingly collect personal information from children. The in-app math gate is an adult check for settings and purchase, not consent to collect child data.

## Third parties

No third-party analytics or ads. StoreKit / App Store commerce is provided by Apple.

## Contact

Questions about this policy: **SUPPORT_EMAIL_OR_HTTPS_FORM**

Use a monitored business email address or HTTPS support form. Do not publish a personal home address.

## Changes

If data practices change, update this policy, the privacy manifest, and the App Store privacy nutrition answers **before** shipping that version.

## Release privacy / COPPA / Kids Category checklist

- [ ] No child name, birth date, email, account, photo, audio recording, precise location, drawing/trace upload, chat, or user-generated content
- [ ] No backend, third-party analytics/crash SDK, advertising SDK, IDFA access, fingerprinting, or ATT prompt
- [ ] `PrivacyInfo.xcprivacy` says no tracking and no collected data; UserDefaults reason `CA92.1` remains accurate
- [ ] Tracing strokes and sitting results remain memory-only; preferences remain on-device
- [ ] StoreKit is the only commerce path; purchase, restore, and any outbound support/privacy destination remain in the parent area
- [ ] Parent gate is an adult-level task and is not described as COPPA consent
- [ ] Hosted policy has a real contact, public HTTPS URL, no login, and matches the binary
- [ ] App Store App Privacy answer is **Data Not Collected**
- [ ] Made for Kids age band is **5 and under**; listing/screenshots are age-appropriate
- [ ] Any future data collection or third-party SDK change triggers a fresh legal/privacy review before release
