import XCTest
@testable import LetterTraceDesk

final class LetterCatalogTests: XCTestCase {
    func testFreeLettersAreAThroughF() {
        XCTAssertEqual(LetterCatalog.free, Array("ABCDEF"))
        XCTAssertEqual(LetterCatalog.paid, Array("GHIJKLMNOPQRSTUVWXYZ"))
        XCTAssertEqual(LetterCatalog.all.count, 26)
        XCTAssertEqual(LetterCatalog.free.count + LetterCatalog.paid.count, 26)
    }

    func testLockingDependsOnUnlock() {
        XCTAssertFalse(LetterCatalog.isLocked("A", unlocked: false))
        XCTAssertFalse(LetterCatalog.isLocked("f", unlocked: false))
        XCTAssertTrue(LetterCatalog.isLocked("G", unlocked: false))
        XCTAssertFalse(LetterCatalog.isLocked("G", unlocked: true))
        XCTAssertTrue(LetterCatalog.isLocked("!", unlocked: true))
    }

    func testSanitizeDropsLockedDuplicatesAndUnknown() {
        let mixed: [Character] = ["c", "A", "G", "A", "z", "1"]
        XCTAssertEqual(LetterCatalog.sanitize(pool: mixed, unlocked: false), ["A", "C"])
        XCTAssertEqual(LetterCatalog.sanitize(pool: mixed, unlocked: true), ["A", "C", "G", "Z"])
    }

    func testSanitizeEmptyFallsBackToFreeSet() {
        XCTAssertEqual(LetterCatalog.sanitize(pool: [], unlocked: false), LetterCatalog.defaultPool)
    }

    func testSessionSizeClamp() {
        XCTAssertEqual(LetterCatalog.clampSessionSize(1), 3)
        XCTAssertEqual(LetterCatalog.clampSessionSize(5), 5)
        XCTAssertEqual(LetterCatalog.clampSessionSize(99), 8)
    }
}
