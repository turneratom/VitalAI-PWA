import XCTest
@testable import LetterTraceDesk

final class ParentGateTests: XCTestCase {
    func testPromptAndAnswer() {
        let challenge = ParentGateChallenge(a: 3, b: 4)
        XCTAssertEqual(challenge.prompt, "What is 3 + 4?")
        XCTAssertEqual(challenge.answer, 7)
        XCTAssertTrue(challenge.matches("7"))
        XCTAssertTrue(challenge.matches(" 7\n"))
        XCTAssertFalse(challenge.matches("8"))
        XCTAssertFalse(challenge.matches("seven"))
        XCTAssertFalse(challenge.matches(""))
    }

    func testRandomUsesInclusiveRange() {
        var rng = SeededGenerator(seed: 42)
        let challenge = ParentGateChallenge.random(using: &rng)
        XCTAssertTrue((2...9).contains(challenge.a))
        XCTAssertTrue((2...9).contains(challenge.b))
    }
}

private struct SeededGenerator: RandomNumberGenerator {
    var seed: UInt64
    mutating func next() -> UInt64 {
        seed = seed &* 6364136223846793005 &+ 1
        return seed
    }
}
