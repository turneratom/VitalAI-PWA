import CoreGraphics
import XCTest
@testable import LetterTraceDesk

final class TraceCoverageTests: XCTestCase {
    func testForgivingRadiusCountsNearbyStroke() {
        var coverage = TraceCoverage(
            points: [CGPoint(x: 0, y: 0), CGPoint(x: 100, y: 0)],
            radius: 20,
            completeRatio: 0.5
        )
        coverage.register(point: CGPoint(x: 5, y: 5))
        XCTAssertEqual(coverage.hitCount, 1)
        XCTAssertFalse(coverage.isComplete)
        coverage.registerStroke(from: CGPoint(x: 90, y: 0), to: CGPoint(x: 110, y: 0))
        XCTAssertEqual(coverage.hitCount, 2)
        XCTAssertTrue(coverage.isComplete)
        XCTAssertEqual(coverage.ratio, 1.0, accuracy: 0.001)
    }

    func testEmptyPathIsNotComplete() {
        let coverage = TraceCoverage(points: [], radius: 10)
        XCTAssertFalse(coverage.isComplete)
        XCTAssertEqual(coverage.ratio, 0)
    }

    func testProductIdentifierIsNonConsumableUnlock() {
        XCTAssertEqual(UnlockStore.productID, "com.lettertracedesk.fullalphabet")
    }
}
