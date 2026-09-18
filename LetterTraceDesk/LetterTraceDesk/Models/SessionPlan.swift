import Foundation

/// Builds a short sitting from the parent-chosen pool.
/// In-memory only — sittings are not stored as child progress.
enum SessionPlan {
    static func make(pool: [Character], size: Int, unlocked: Bool) -> [Character] {
        let clean = LetterCatalog.sanitize(pool: pool, unlocked: unlocked)
        let n = LetterCatalog.clampSessionSize(size)
        var session = Array(clean.prefix(n))
        if session.count < LetterCatalog.minSessionSize {
            for ch in LetterCatalog.free where !session.contains(ch) {
                session.append(ch)
                if session.count >= LetterCatalog.minSessionSize { break }
            }
        }
        return Array(session.prefix(n))
    }
}
