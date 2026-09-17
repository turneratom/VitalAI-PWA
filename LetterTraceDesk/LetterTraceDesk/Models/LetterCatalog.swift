import Foundation

/// Uppercase Latin letters used by Letter Trace Desk.
/// Free sitting: A–F. One-time parent unlock: G–Z.
enum LetterCatalog {
    static let all: [Character] = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    static let free: [Character] = Array("ABCDEF")
    static let paid: [Character] = Array("GHIJKLMNOPQRSTUVWXYZ")

    static let minSessionSize = 3
    static let maxSessionSize = 8
    static let defaultSessionSize = 5
    static let defaultPool: [Character] = free

    static func normalize(_ letter: Character) -> Character? {
        guard let up = letter.uppercased().first, all.contains(up) else { return nil }
        return up
    }

    static func isFree(_ letter: Character) -> Bool {
        guard let up = normalize(letter) else { return false }
        return free.contains(up)
    }

    static func isLocked(_ letter: Character, unlocked: Bool) -> Bool {
        guard let up = normalize(letter) else { return true }
        return !unlocked && paid.contains(up)
    }

    static func clampSessionSize(_ size: Int) -> Int {
        min(max(size, minSessionSize), maxSessionSize)
    }

    /// Drops unknown / duplicate / still-locked letters. Falls back to A–F if empty.
    static func sanitize(pool: [Character], unlocked: Bool) -> [Character] {
        var seen = Set<Character>()
        var out: [Character] = []
        for ch in pool {
            guard let up = normalize(ch), !seen.contains(up) else { continue }
            if isLocked(up, unlocked: unlocked) { continue }
            seen.insert(up)
            out.append(up)
        }
        if out.isEmpty { return defaultPool }
        return out.sorted { $0 < $1 }
    }
}
