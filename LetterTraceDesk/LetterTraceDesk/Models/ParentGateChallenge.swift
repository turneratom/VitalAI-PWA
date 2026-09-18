import Foundation

/// Adult-level addition check (Kids Category parental gate).
/// Not verifiable parental consent under COPPA — we collect no child data.
struct ParentGateChallenge: Equatable {
    static let firstNumberRange = 20...49
    static let secondNumberRange = 11...39

    let a: Int
    let b: Int

    var prompt: String { "What is \(a) + \(b)?" }
    var answer: Int { a + b }

    static func random<T: RandomNumberGenerator>(using rng: inout T) -> ParentGateChallenge {
        ParentGateChallenge(
            a: Int.random(in: firstNumberRange, using: &rng),
            b: Int.random(in: secondNumberRange, using: &rng)
        )
    }

    static func random() -> ParentGateChallenge {
        var g = SystemRandomNumberGenerator()
        return random(using: &g)
    }

    func matches(_ input: String) -> Bool {
        let trimmed = input.trimmingCharacters(in: .whitespacesAndNewlines)
        guard let n = Int(trimmed) else { return false }
        return n == answer
    }
}
