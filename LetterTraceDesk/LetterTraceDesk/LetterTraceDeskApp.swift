import SwiftUI

@main
struct LetterTraceDeskApp: App {
    @StateObject private var settings = AppSettings()
    @StateObject private var desk = DeskModel()
    @StateObject private var speaker = LetterSpeaker()
    @StateObject private var unlock = UnlockStore()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(settings)
                .environmentObject(desk)
                .environmentObject(speaker)
                .environmentObject(unlock)
                .tint(AppTheme.primary)
        }
    }
}
