import SwiftUI

struct ParentFlowView: View {
    @EnvironmentObject private var desk: DeskModel

    var body: some View {
        VStack(spacing: 0) {
            DeskHeader(showParent: false, onParent: {})
            ScrollView {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Parent gate · settings")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(AppTheme.muted)
                    if desk.parentGatePassed {
                        switch desk.parentDestination {
                        case .settings:
                            ParentSettingsView()
                        case .unlock:
                            UnlockView()
                        }
                    } else {
                        ParentGateView()
                    }
                }
                .padding(20)
                .frame(maxWidth: 760)
                .frame(maxWidth: .infinity)
            }
        }
        .background(AppTheme.bg.ignoresSafeArea())
        .preferredColorScheme(.light)
    }
}

struct ParentGateView: View {
    @EnvironmentObject private var desk: DeskModel
    @State private var challenge = ParentGateChallenge.random()
    @State private var answer = ""
    @State private var hint = "Grown-up math check so little fingers don’t change the letter set or buy unlocks."
    @State private var attempts = 0
    @FocusState private var focused: Bool

    var body: some View {
        DeskCard {
            Eyebrow(text: "Parent only")
            Text("Grown-up check")
                .font(.system(size: 26, weight: .bold))
                .foregroundStyle(AppTheme.ink)
            Text("This math question keeps purchases and settings out of kid mode. It is not COPPA consent — this app does not collect child data.")
                .foregroundStyle(AppTheme.inkSoft)

            VStack(alignment: .leading, spacing: 12) {
                Text(challenge.prompt)
                    .font(.system(size: 22, weight: .semibold))
                    .foregroundStyle(AppTheme.ink)
                    .accessibilityAddTraits(.isHeader)

                HStack(spacing: 10) {
                    TextField("Answer", text: $answer)
                        .keyboardType(.numberPad)
                        .font(.system(size: 22, weight: .semibold))
                        .padding(12)
                        .frame(width: 120)
                        .background(AppTheme.surface)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .stroke(AppTheme.line, lineWidth: 1)
                        )
                        .focused($focused)
                        .accessibilityLabel("Parent gate answer")
                        .onSubmit(submit)

                    DeskButton(title: "Unlock", enabled: !answer.isEmpty, action: submit)
                }

                Text(hint)
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

            ActionRow {
                DeskButton(title: "Back to practice", kind: .ghost) {
                    desk.closeParent()
                }
            } trailing: {
                EmptyView()
            }
        }
        .onAppear { focused = true }
    }

    private func submit() {
        if challenge.matches(answer) {
            desk.parentGatePassed = true
            return
        }
        attempts += 1
        answer = ""
        if attempts >= 3 {
            challenge = ParentGateChallenge.random()
            attempts = 0
            hint = "Not quite. New question — parent only."
        } else {
            hint = "Not quite — try again (parent only)."
        }
    }
}
