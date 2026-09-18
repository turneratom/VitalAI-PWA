import SwiftUI

struct DoneView: View {
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var settings: AppSettings
    @EnvironmentObject private var unlock: UnlockStore

    var body: some View {
        DeskCard {
            Eyebrow(text: "Sitting complete")
            Text("Nice practice")
                .font(.system(size: 26, weight: .bold))
                .foregroundStyle(AppTheme.ink)

            Text("You finished this short letter sitting. Practice helpers end on purpose — no endless loops.")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(AppTheme.greenInk)
                .padding(12)
                .frame(maxWidth: .infinity)
                .background(AppTheme.softGreen)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

            Text(summary)
                .foregroundStyle(AppTheme.inkSoft)

            FenceBox(title: "Still a practice helper.", items: [
                "This sitting is local encouragement only — not a grade, diagnosis, or school report."
            ])

            if !unlock.isUnlocked {
                Text("Grown-up: more letters (G–Z) sit behind a math check and a one-time unlock. Kids stay here.")
                    .font(.system(size: 14))
                    .foregroundStyle(AppTheme.muted)
            }

            ActionRow {
                DeskButton(title: "Practice again", kind: .ghost) {
                    desk.practiceAgain(settings: settings, unlocked: unlock.isUnlocked)
                }
            } trailing: {
                HStack(spacing: 8) {
                    if !unlock.isUnlocked {
                        DeskButton(title: "Grown-up: more letters", kind: .soft) {
                            desk.openParent(destination: .unlock)
                        }
                    }
                    DeskButton(title: "Continue") {
                        desk.step = .welcome
                    }
                }
            }
        }
    }

    private var summary: String {
        if desk.completed.isEmpty {
            return "Letters practiced: (skipped sitting)"
        }
        return "Letters practiced: " + desk.completed.map(String.init).joined(separator: " · ")
    }
}
