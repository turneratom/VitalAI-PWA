import SwiftUI

struct TraceView: View {
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var speaker: LetterSpeaker
    @EnvironmentObject private var settings: AppSettings
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var coverage = TraceCoverage(points: [], radius: 24)
    @State private var strokes: [[CGPoint]] = []
    @State private var didCelebrate = false
    @State private var celebratePulse = false
    @State private var resetToken = 0

    var body: some View {
        DeskCard {
            Eyebrow(text: "Trace with a finger")
            Text("Trace the letter")
                .font(.system(size: 26, weight: .bold))
                .foregroundStyle(AppTheme.ink)

            HStack {
                Text("Letter \(desk.currentLetter)")
                    .font(.system(size: 22, weight: .bold))
                    .foregroundStyle(AppTheme.primary)
                Spacer()
                Text(desk.letterOrdinalLabel)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(AppTheme.muted)
            }

            TraceCanvas(
                letter: desk.currentLetter,
                coverage: $coverage,
                strokes: $strokes,
                reducedMotion: reduceMotion,
                resetToken: resetToken
            )
            .frame(minHeight: 280, idealHeight: 360)
            .frame(maxHeight: 460)

            Text("Follow the dotted guide. When you’ve covered enough of the path, we’ll cheer softly. Then tap Continue.")
                .font(.system(size: 15))
                .foregroundStyle(AppTheme.inkSoft)

            if coverage.isComplete {
                Text("Nice path. That’s enough for this letter.")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(AppTheme.greenInk)
                    .padding(10)
                    .frame(maxWidth: .infinity)
                    .background(AppTheme.softGreen)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .scaleEffect(celebratePulse && !reduceMotion ? 1.02 : 1.0)
                    .accessibilityAddTraits(.updatesFrequently)
            }

            ActionRow {
                DeskButton(title: "Clear stroke", kind: .ghost) {
                    resetCurrent()
                }
            } trailing: {
                HStack(spacing: 8) {
                    DeskButton(title: "Skip letter", kind: .soft) {
                        speaker.stop()
                        desk.advanceFromTrace(skipped: true)
                        didCelebrate = false
                    }
                    DeskButton(title: "Continue", enabled: coverage.isComplete) {
                        speaker.stop()
                        desk.advanceFromTrace(skipped: false)
                        didCelebrate = false
                    }
                }
            }
        }
        .onChange(of: desk.index) { _, _ in
            didCelebrate = false
            celebratePulse = false
        }
        .onChange(of: coverage.isComplete) { _, complete in
            guard complete, !didCelebrate else { return }
            didCelebrate = true
            if settings.speechEnabled {
                speaker.speakLetter(desk.currentLetter)
            }
            if !reduceMotion {
                withAnimation(.easeInOut(duration: 0.35)) {
                    celebratePulse = true
                }
            }
        }
        .sensoryFeedback(.success, trigger: didCelebrate)
        .id(desk.currentLetter)
    }

    private func resetCurrent() {
        didCelebrate = false
        celebratePulse = false
        speaker.stop()
        resetToken += 1
    }
}
