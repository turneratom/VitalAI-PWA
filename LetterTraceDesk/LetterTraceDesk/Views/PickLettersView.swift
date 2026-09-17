import SwiftUI

struct PickLettersView: View {
    @EnvironmentObject private var settings: AppSettings
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var unlock: UnlockStore

    var body: some View {
        DeskCard {
            Eyebrow(text: "Short sitting")
            Text("Letters for this sitting")
                .font(.system(size: 26, weight: .bold))
                .foregroundStyle(AppTheme.ink)
            Text("We’ll practice up to \(desk.session.count) letters. A parent can change the set in Parent settings.")
                .foregroundStyle(AppTheme.inkSoft)

            LazyVGrid(columns: [GridItem(.adaptive(minimum: 52), spacing: 8)], spacing: 8) {
                ForEach(desk.session, id: \.self) { letter in
                    LetterChip(letter: letter, inSession: true)
                }
            }
            .padding(.vertical, 4)
            .accessibilityElement(children: .contain)
            .accessibilityLabel("Session letters \(desk.session.map(String.init).joined(separator: ", "))")

            if !unlock.isUnlocked {
                Text("Free letters are A–F. A grown-up can unlock G–Z as a one-time purchase.")
                    .font(.system(size: 14))
                    .foregroundStyle(AppTheme.muted)
            }

            ActionRow {
                DeskButton(title: "Back", kind: .ghost) {
                    desk.step = .welcome
                }
            } trailing: {
                DeskButton(title: "Continue — start tracing") {
                    desk.startTracing()
                }
            }
        }
    }
}
