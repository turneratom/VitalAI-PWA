import SwiftUI

struct WelcomeView: View {
    @EnvironmentObject private var settings: AppSettings
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var unlock: UnlockStore

    var body: some View {
        DeskCard {
            Eyebrow(text: "Parent-gated · ages 3–5 · short sitting")
            Text("Letter Trace Desk")
                .font(.system(size: 30, weight: .bold))
                .foregroundStyle(AppTheme.ink)
            Text("Finger-friendly letter path practice. Kid mode stays on a short locked set. Grown-ups unlock settings and the full alphabet.")
                .foregroundStyle(AppTheme.inkSoft)

            FenceBox(title: "Honest fences (read before Continue)", items: [
                "**Practice helper only** — not a curriculum, school assessment, or handwriting diagnosis.",
                "Parent math gate for settings and purchases. No social, chat, ads, or open web.",
                "**No child accounts** · no child name or photos · no handwriting uploaded.",
                "Works **offline**. Free letters **A–F**. Full **A–Z** is a one-time parent unlock, not a subscription.",
                "Zero child data collected. Preferences stay on this device."
            ])

            Toggle(isOn: $settings.fenceAcknowledged) {
                Text("I understand this is a practice helper, not a curriculum, and I’ll Continue on that basis.")
                    .foregroundStyle(AppTheme.inkSoft)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .tint(AppTheme.primary)
            .padding(.top, 4)
            .accessibilityLabel("Acknowledge practice-helper fences")

            ActionRow {
                EmptyView()
            } trailing: {
                DeskButton(
                    title: "Continue",
                    enabled: settings.fenceAcknowledged
                ) {
                    desk.goToPick(settings: settings, unlocked: unlock.isUnlocked)
                }
            }
        }
    }
}
