import XCTest
@testable import LetterTraceDesk

final class ParentGateTests: XCTestCase {
    func testPromptAndAnswer() {
        let challenge = ParentGateChallenge(a: 27, b: 46)
        XCTAssertEqual(challenge.prompt, "What is 27 + 46?")
        XCTAssertEqual(challenge.answer, 73)
        XCTAssertTrue(challenge.matches("73"))
        XCTAssertTrue(challenge.matches(" 73\n"))
        XCTAssertFalse(challenge.matches("74"))
        XCTAssertFalse(challenge.matches("seventy-three"))
        XCTAssertFalse(challenge.matches(""))
    }

    func testRandomUsesInclusiveRange() {
        var rng = SeededGenerator(seed: 42)
        let challenge = ParentGateChallenge.random(using: &rng)
        XCTAssertTrue(ParentGateChallenge.firstNumberRange.contains(challenge.a))
        XCTAssertTrue(ParentGateChallenge.secondNumberRange.contains(challenge.b))
        XCTAssertGreaterThanOrEqual(challenge.answer, 31)
        XCTAssertLessThanOrEqual(challenge.answer, 88)
    }
}

private struct SeededGenerator: RandomNumberGenerator {
    var seed: UInt64
    mutating func next() -> UInt64 {
        seed = seed &* 6364136223846793005 &+ 1
        return seed
    }
}
