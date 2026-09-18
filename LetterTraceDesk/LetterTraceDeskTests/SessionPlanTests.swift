import XCTest
@testable import LetterTraceDesk

final class SessionPlanTests: XCTestCase {
    func testSessionUsesFreeLettersWhenLocked() {
        let session = SessionPlan.make(pool: Array("ABCDEFGHIJ"), size: 5, unlocked: false)
        XCTAssertEqual(session, Array("ABCDE"))
        XCTAssertTrue(session.allSatisfy { LetterCatalog.isFree($0) })
    }

    func testSessionCanIncludePaidLettersWhenUnlocked() {
        let session = SessionPlan.make(pool: Array("GHIJKL"), size: 4, unlocked: true)
        XCTAssertEqual(session, Array("GHIJ"))
    }

    func testSessionFillsMinimumFromFreeSet() {
        let session = SessionPlan.make(pool: ["A"], size: 3, unlocked: false)
        XCTAssertEqual(session.count, 3)
        XCTAssertTrue(Set(session).isSubset(of: Set(LetterCatalog.free)))
    }

    func testSessionClampsToEight() {
        let session = SessionPlan.make(pool: LetterCatalog.all, size: 99, unlocked: true)
        XCTAssertEqual(session.count, LetterCatalog.maxSessionSize)
    }

    func testPaidOnlyPoolWithoutUnlockFallsBackToFree() {
        let session = SessionPlan.make(pool: Array("XYZ"), size: 5, unlocked: false)
        XCTAssertEqual(session, Array("ABCDE"))
    }
}
