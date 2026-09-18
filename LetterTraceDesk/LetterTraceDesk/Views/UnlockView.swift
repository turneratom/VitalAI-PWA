import SwiftUI

struct UnlockView: View {
    @EnvironmentObject private var unlock: UnlockStore
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var settings: AppSettings

    var body: some View {
        DeskCard {
            Eyebrow(text: "Parent only · one-time unlock")
            Text("Full alphabet")
                .font(.system(size: 26, weight: .bold))
                .foregroundStyle(AppTheme.ink)
            Text("Unlock uppercase G–Z for short sittings. Free letters A–F stay available without a purchase. This is not a subscription.")
                .foregroundStyle(AppTheme.inkSoft)

            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Full Alphabet Unlock")
                        .font(.system(size: 18, weight: .semibold))
                    Spacer()
                    Text(priceLabel)
                        .font(.system(size: 18, weight: .bold))
                        .foregroundStyle(AppTheme.primary)
                }
                Text(familySharingStatus)
                    .font(.system(size: 14))
                    .foregroundStyle(AppTheme.muted)
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(AppTheme.softFill)
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .stroke(Color(red: 197 / 255, green: 214 / 255, blue: 234 / 255), lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

            FenceBox(title: "What you are buying", items: [
                familySharingDetail,
                "**Not** a subscription. **Not** a curriculum. No extra content packs in version 1.",
                "Purchases use StoreKit 2. We do not see your card number."
            ])

            if let message = unlock.statusMessage {
                Text(message)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundStyle(AppTheme.inkSoft)
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(AppTheme.bgAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            }

            if unlock.isUnlocked {
                Text("This Apple ID already has Full Alphabet Unlock.")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(AppTheme.greenInk)
            }

            ActionRow {
                HStack(spacing: 8) {
                    DeskButton(title: "Back to settings", kind: .ghost) {
                        desk.parentDestination = .settings
                    }
                    DeskButton(title: "Back to practice", kind: .ghost) {
                        desk.closeParent()
                    }
                }
            } trailing: {
                HStack(spacing: 8) {
                    DeskButton(title: "Restore purchases", kind: .soft, enabled: !unlock.isLoading) {
                        Task { await unlock.restore() }
                    }
                    DeskButton(
                        title: unlock.isUnlocked ? "Continue" : "Continue — purchase",
                        enabled: !unlock.isLoading
                    ) {
                        if unlock.isUnlocked {
                            settings.pool = LetterCatalog.sanitize(
                                pool: settings.pool,
                                unlocked: true
                            )
                            desk.goToPick(settings: settings, unlocked: true)
                            desk.closeParent()
                        } else {
                            Task { await unlock.purchase() }
                        }
                    }
                }
            }
        }
        .task {
            await unlock.refresh()
        }
        .onChange(of: unlock.isUnlocked) { _, unlocked in
            if unlocked {
                settings.unlockCache = true
            }
        }
    }

    private var priceLabel: String {
        if let price = unlock.displayPrice {
            return price
        }
        return "Price from App Store"
    }

    private var familySharingStatus: String {
        guard unlock.product != nil else {
            return "Non-consumable In-App Purchase. Family Sharing status appears after the App Store loads the product. Ask to Buy may require parent approval."
        }
        if unlock.isFamilyShareable {
            return "Non-consumable In-App Purchase. Family Sharing is available for this product. Ask to Buy may require parent approval."
        }
        return "Non-consumable In-App Purchase. Family Sharing is not currently enabled for this App Store product."
    }

    private var familySharingDetail: String {
        if unlock.isFamilyShareable {
            return "One-time unlock of tracing letters **G–Z**. Apple reports this purchase as **Family Shareable**."
        }
        return "One-time unlock of tracing letters **G–Z**. Family Sharing must be enabled for this product in App Store Connect."
    }
}
