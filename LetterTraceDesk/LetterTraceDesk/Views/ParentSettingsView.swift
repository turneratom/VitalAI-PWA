import SwiftUI

struct ParentSettingsView: View {
    @EnvironmentObject private var settings: AppSettings
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var unlock: UnlockStore

    private let sizes = Array(LetterCatalog.minSessionSize...LetterCatalog.maxSessionSize)

    var body: some View {
        DeskCard {
            Eyebrow(text: "Parent only")
            Text("Parent settings")
                .font(.system(size: 26, weight: .bold))
                .foregroundStyle(AppTheme.ink)
            Text("These controls change the next sitting. They are not a child profile or progress report.")
                .foregroundStyle(AppTheme.inkSoft)

            settingsBlock(title: "Session length", subtitle: "How many letters per sitting (3–8).") {
                LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 8), count: 4), spacing: 8) {
                    ForEach(sizes, id: \.self) { n in
                        Button {
                            settings.sessionSize = n
                        } label: {
                            Text("\(n)")
                                .font(.system(size: 18, weight: .semibold))
                                .frame(maxWidth: .infinity, minHeight: 48)
                                .background(settings.clampedSessionSize() == n ? AppTheme.primary : AppTheme.bg)
                                .foregroundStyle(settings.clampedSessionSize() == n ? Color.white : AppTheme.ink)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                                        .stroke(settings.clampedSessionSize() == n ? AppTheme.primary : AppTheme.line, lineWidth: 1)
                                )
                                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("\(n) letters per sitting")
                        .accessibilityAddTraits(settings.clampedSessionSize() == n ? [.isSelected, .isButton] : .isButton)
                    }
                }
            }

            settingsBlock(title: "Letter pool (uppercase)", subtitle: "Tap to include. The sitting uses the first N in A–Z order. G–Z need the one-time unlock.") {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 48), spacing: 8)], spacing: 8) {
                    ForEach(LetterCatalog.all, id: \.self) { letter in
                        let locked = LetterCatalog.isLocked(letter, unlocked: unlock.isUnlocked)
                        let on = settings.pool.contains(letter)
                        LetterChip(letter: letter, selected: on && !locked, locked: locked) {
                            toggle(letter, locked: locked)
                        }
                    }
                }
            }

            settingsBlock(title: "Spoken letter", subtitle: "After a successful trace, speak the letter name on this device. No cloud voice.") {
                Toggle("Speak letter after a nice path", isOn: $settings.speechEnabled)
                    .tint(AppTheme.primary)
            }

            settingsBlock(title: "Full alphabet", subtitle: "One-time In-App Purchase. Family Sharing can be enabled in App Store Connect. Not a subscription.") {
                HStack {
                    Text(unlock.isUnlocked ? "Unlocked — A–Z available." : "Free: A–F. Locked: G–Z.")
                        .foregroundStyle(AppTheme.inkSoft)
                    Spacer()
                    DeskButton(
                        title: unlock.isUnlocked ? "Manage" : "Continue — unlock",
                        kind: .soft
                    ) {
                        desk.parentDestination = .unlock
                    }
                }
            }

            FenceBox(title: "Privacy on this device", items: [
                "App Store privacy answer: **Data Not Collected**.",
                "On-device preferences only: fence check, sitting length, letter pool, speech, unlock cache.",
                "No analytics SDK, no ads, no child account, no location, no tracking."
            ])

            ActionRow {
                DeskButton(title: "Back to practice", kind: .ghost) {
                    desk.closeParent()
                }
            } trailing: {
                HStack(spacing: 8) {
                    DeskButton(title: "Reset local prefs", kind: .ghost) {
                        settings.resetLocalPreferences()
                    }
                    DeskButton(title: "Continue — save") {
                        settings.pool = LetterCatalog.sanitize(pool: settings.pool, unlocked: unlock.isUnlocked)
                        settings.sessionSize = settings.clampedSessionSize()
                        desk.goToPick(settings: settings, unlocked: unlock.isUnlocked)
                        desk.closeParent()
                    }
                }
            }
        }
    }

    private func toggle(_ letter: Character, locked: Bool) {
        if locked {
            desk.parentDestination = .unlock
            return
        }
        var pool = settings.pool
        if let idx = pool.firstIndex(of: letter) {
            if pool.count > LetterCatalog.minSessionSize {
                pool.remove(at: idx)
            }
        } else {
            pool.append(letter)
        }
        settings.pool = LetterCatalog.sanitize(pool: pool, unlocked: unlock.isUnlocked)
    }

    @ViewBuilder
    private func settingsBlock<Content: View>(title: String, subtitle: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(AppTheme.ink)
            Text(subtitle)
                .font(.system(size: 14))
                .foregroundStyle(AppTheme.inkSoft)
            content()
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(AppTheme.bg)
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(AppTheme.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}
