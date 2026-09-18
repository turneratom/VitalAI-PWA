# Brad's Mac → TestFlight → App Store runbook

Everything in this file requires Brad's Mac or Apple account. The source is at `LetterTraceDesk/`; no App Store Connect app, product, build, TestFlight result, or sales metric is asserted by this repo.

## 1. One-time Apple account setup

1. Confirm the Apple Developer Program membership is active.
2. In **App Store Connect → Business → Agreements**, make **Paid Apps** active. The Account Holder must accept it and finish any required tax and banking information; In-App Purchases cannot be submitted while it is pending.
3. Decide whether the final bundle ID is `com.lettertracedesk.app`.
   - If yes, register that explicit App ID in Certificates, Identifiers & Profiles.
   - If Apple says it is unavailable, choose a unique reverse-DNS ID and change `PRODUCT_BUNDLE_IDENTIFIER` for the app and test targets before creating the ASC app.
4. In **App Store Connect → Apps → + → New App**, create:
   - Platform: iOS
   - Name: Letter Trace Desk
   - Primary language: English (U.S.)
   - Bundle ID: the final explicit ID
   - SKU: `letter-trace-desk` (or another unique internal SKU)

## 2. Create the live one-time unlock

The checked-in `Configuration.storekit` is local test data only. It does not create the live product.

1. Open the app in App Store Connect → **Monetization → In-App Purchases → +**.
2. Select **Non-Consumable**. Do not select any subscription type.
3. Before clicking Create, verify:
   - Reference Name: `Full Alphabet Unlock`
   - Product ID: `com.lettertracedesk.fullalphabet`
4. Click Create. Apple does not allow changing the product ID or purchase type afterward.
5. Add en-US localization:
   - Display Name: `Full Alphabet Unlock`
   - Description: `Unlock uppercase letters G–Z for Letter Trace Desk sittings. One-time purchase. Not a subscription. Practice helper only.`
6. Set United States as the base storefront and choose **USD $3.99 or $4.99**. Let Apple show localized storefront prices; do not hard-code a price in the app or screenshots.
7. Set intended country/region availability.
8. Turn **Family Sharing ON** only after confirming this is the final product. Apple says it cannot be turned off later.
9. Add the review screenshot after the local parent-gated unlock screen is captured. Add the review note from `ASC-CHECKLIST.md`.
10. Allow up to one hour for product metadata changes to appear in sandbox testing.

## 3. Build and local StoreKit test on Mac

1. Check out the PR branch and open `LetterTraceDesk/LetterTraceDesk.xcodeproj` in Xcode 15.3 or newer.
2. Select the app target → **Signing & Capabilities**:
   - Team: Brad's paid developer team
   - Automatically manage signing: on
   - Bundle Identifier: exactly the final App ID
3. Select scheme **Letter Trace Desk**.
4. Product → Scheme → Edit Scheme → Run → Options → StoreKit Configuration → `Configuration.storekit`.
5. Run on an iOS 17+ iPhone simulator. Then repeat the layout smoke test on an iPad simulator.
6. Product → Test (⌘U). All four XCTest files must pass.
7. Local flow:
   - Accept the welcome fence and complete an A–F sitting offline.
   - Open Parent settings; confirm no purchase UI appears until the two-digit addition gate passes.
   - Confirm the local price is `$4.99`, buy once, and verify G–Z can be selected.
   - Relaunch and confirm the entitlement remains.
   - Use Xcode → Debug → StoreKit → Manage Transactions to remove/revoke the test transaction. Verify the app relocks after entitlement refresh.
   - Test **Restore purchases** and an **Ask to Buy / pending** transaction.
   - Turn on VoiceOver, Larger Text, and Reduce Motion for one smoke pass.
8. Capture real app screenshots—no HTML mockups and no fake prices:
   - 6.9-inch iPhone portrait: at least one; accepted current sizes include 1320×2868, 1290×2796, or 1260×2736.
   - 13-inch iPad portrait: at least one because the app supports iPad; accepted current sizes include 2064×2752 or 2048×2732.
   - Capture Welcome, Pick, Trace, success, and Done. If showing the IAP, show it only after the parent gate.

## 4. Host privacy/support before upload

1. Replace the placeholder Contact section in `docs/privacy.html` / `docs/PRIVACY.md` with a monitored support email or HTTPS support form controlled by the developer. Do not use a home address.
2. Publish the policy at a stable, public **HTTPS** URL with no login.
3. Open that URL in a private browser window and on a phone.
4. Save the same URL in App Store Connect → App Privacy → Privacy Policy.
5. In App Privacy, answer **Data Not Collected** only while the shipped binary remains as audited: no accounts, backend, ads, third-party analytics/crash SDK, trace upload, or tracking.

## 5. Upload build 1

1. In Xcode, set the Run scheme's StoreKit Configuration to **None**. The live/TestFlight build must use the App Store sandbox product, not the local file.
2. Confirm version `1.0.0`, build `1`, Release configuration, final bundle ID, app icon, and no signing warnings.
3. Select **Any iOS Device (arm64)** → Product → Archive.
4. Organizer → Validate App. Resolve every error.
5. Organizer → Distribute App → App Store Connect → Upload.
6. Wait for processing in App Store Connect → TestFlight. Complete the export-compliance prompt; this project declares no non-exempt encryption.

If build `1` already exists in App Store Connect, increment `CURRENT_PROJECT_VERSION` to `2`; never reuse an uploaded build number.

## 6. Internal TestFlight

1. App Store Connect → TestFlight → Internal Testing → create a group.
2. Add Brad (and any other tester) as App Store Connect users with access to this app.
3. Add the processed build to the internal group. Do not mark the upload “TestFlight Internal Only” if external testing or App Store submission may follow.
4. On each device, install Apple's TestFlight app, accept the invitation, and install Letter Trace Desk.
5. TestFlight uses sandbox commerce; testers are not charged. Verify:
   - Fresh install exposes only A–F.
   - Parent settings and purchase stay behind the gate.
   - Product ID resolves and Apple's sheet shows the chosen storefront price.
   - Purchase unlocks G–Z; relaunch keeps access.
   - Restore works after reinstall/on a second device signed into the test account.
   - Ask to Buy pending copy does not unlock early.
   - Family Sharing is reported in the unlock UI after Apple returns the product. Test on a real family test setup if available.
   - Airplane mode still allows A–F and does not claim a purchase succeeded.
   - No outbound link, permission prompt, child-data entry, ad, analytics consent, or account flow appears.

## 7. Optional external TestFlight

1. First create an internal group, then create an external group.
2. TestFlight → Test Information: add the beta description, monitored feedback email, and review contact.
3. Add build `1` and submit it for TestFlight App Review. The first external build requires review; later builds may also be reviewed.
4. Invite only the intended testers by email or controlled public link.

## 8. Submit version 1.0

1. Paste and recheck `APP-STORE-LISTING.md`; its name, subtitle, promotional text, and keywords are within current character limits.
2. App Information:
   - Primary category: Education
   - Age Categories and Override: Made for Kids → **5 and under**
   - Complete the current age-rating questionnaire truthfully; do not assume the calculated result until ASC shows it.
3. Upload the iPhone and iPad screenshot sets.
4. Add the public Privacy Policy URL and Support URL.
5. App Privacy: Data Not Collected.
6. Select build `1` and add `Full Alphabet Unlock` to the version's In-App Purchases section so the first IAP is reviewed with the app.
7. Paste the review notes from `ASC-CHECKLIST.md`. Include exact parent-gate navigation.
8. Check every item in `ASC-CHECKLIST.md`, then **Add for Review / Submit for Review**.

Made for Kids → 5 and under cannot be changed after approval, and future updates remain subject to Kids Category rules.
