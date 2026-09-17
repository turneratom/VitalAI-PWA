import SwiftUI

/// Parent preferences only. No child name, no scores, no profiles.
/// Persisted with AppStorage / UserDefaults on-device.
@MainActor
final class AppSettings: ObservableObject {
    static let poolSeparator = ","

    @AppStorage("ltd.fenceAcknowledged") var fenceAcknowledged = false {
        willSet { objectWillChange.send() }
    }

    @AppStorage("ltd.sessionSize") var sessionSize = LetterCatalog.defaultSessionSize {
        willSet { objectWillChange.send() }
    }

    @AppStorage("ltd.letterPool") var letterPoolRaw = "A,B,C,D,E,F" {
        willSet { objectWillChange.send() }
    }

    @AppStorage("ltd.speechEnabled") var speechEnabled = true {
        willSet { objectWillChange.send() }
    }

    /// Local cache of StoreKit entitlement so the UI can stay consistent offline.
    /// Source of truth remains StoreKit 2 `Transaction.currentEntitlements`.
    @AppStorage("ltd.unlockCache") var unlockCache = false {
        willSet { objectWillChange.send() }
    }

    var pool: [Character] {
        get {
            letterPoolRaw
                .split(separator: ",")
                .compactMap { $0.first.flatMap(LetterCatalog.normalize) }
        }
        set {
            let clean = newValue.compactMap(LetterCatalog.normalize)
            letterPoolRaw = clean.map(String.init).joined(separator: Self.poolSeparator)
            objectWillChange.send()
        }
    }

    func clampedSessionSize() -> Int {
        LetterCatalog.clampSessionSize(sessionSize)
    }

    func resetLocalPreferences() {
        fenceAcknowledged = false
        sessionSize = LetterCatalog.defaultSessionSize
        letterPoolRaw = LetterCatalog.defaultPool.map(String.init).joined(separator: Self.poolSeparator)
        speechEnabled = true
        // Do not clear unlockCache here — entitlement is owned by StoreKit.
    }
}
