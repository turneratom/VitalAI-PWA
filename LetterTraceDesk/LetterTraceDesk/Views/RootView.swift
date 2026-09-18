import SwiftUI

struct RootView: View {
    @EnvironmentObject private var desk: DeskModel
    @EnvironmentObject private var settings: AppSettings
    @EnvironmentObject private var unlock: UnlockStore

    var body: some View {
        VStack(spacing: 0) {
            DeskHeader {
                desk.openParent(destination: .settings)
            }
            Divider().overlay(AppTheme.line)
            ScrollView {
                VStack(alignment: .leading, spacing: 10) {
                    StepDots(step: desk.step)
                    Text("Step \(desk.step.rawValue + 1) of \(DeskStep.allCases.count) · Always a Continue")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(AppTheme.muted)
                    stepBody
                    Text("Letter Trace Desk · practice helper · not a curriculum · parent-gated settings · no child accounts")
                        .font(.system(size: 12))
                        .foregroundStyle(AppTheme.muted)
                        .padding(.top, 8)
                }
                .padding(.horizontal, 20)
                .padding(.vertical, 16)
                .frame(maxWidth: 760, alignment: .leading)
                .frame(maxWidth: .infinity)
            }
            .scrollDismissesKeyboard(.interactively)
        }
        .background(AppTheme.bg.ignoresSafeArea())
        .preferredColorScheme(.light)
        .fullScreenCover(isPresented: $desk.showParentFlow) {
            ParentFlowView()
                .environmentObject(desk)
                .environmentObject(settings)
                .environmentObject(unlock)
                .interactiveDismissDisabled()
        }
        .onAppear {
            unlock.seedCacheIfNeeded(settings.unlockCache)
            settings.sessionSize = settings.clampedSessionSize()
            settings.pool = LetterCatalog.sanitize(pool: settings.pool, unlocked: unlock.isUnlocked)
        }
        .onChange(of: unlock.isUnlocked) { _, value in
            settings.unlockCache = value
            settings.pool = LetterCatalog.sanitize(pool: settings.pool, unlocked: value)
        }
    }

    @ViewBuilder
    private var stepBody: some View {
        switch desk.step {
        case .welcome:
            WelcomeView()
        case .pick:
            PickLettersView()
        case .trace:
            TraceView()
        case .done:
            DoneView()
        }
    }
}

#Preview {
    RootView()
        .environmentObject(AppSettings())
        .environmentObject(DeskModel())
        .environmentObject(LetterSpeaker())
        .environmentObject(UnlockStore())
}
