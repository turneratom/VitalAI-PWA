import CoreGraphics
import Foundation

/// Forgiving dotted-path coverage: sample the letter outline, mark hits
/// when a finger comes within a generous radius. Not handwriting assessment.
struct TraceCoverage: Equatable {
    struct Sample: Equatable {
        var point: CGPoint
        var hit: Bool
    }

    /// Fraction of outline samples that must be touched to enable Continue.
    static let defaultCompleteRatio = 0.40

    var samples: [Sample]
    var radius: CGFloat
    var completeRatio: Double

    init(points: [CGPoint], radius: CGFloat, completeRatio: Double = Self.defaultCompleteRatio) {
        self.samples = points.map { Sample(point: $0, hit: false) }
        self.radius = max(8, radius)
        self.completeRatio = completeRatio
    }

    var hitCount: Int { samples.reduce(0) { $0 + ($1.hit ? 1 : 0) } }

    var ratio: Double {
        guard !samples.isEmpty else { return 0 }
        return Double(hitCount) / Double(samples.count)
    }

    var isComplete: Bool { !samples.isEmpty && ratio >= completeRatio }

    var firstUnhit: CGPoint? {
        samples.first(where: { !$0.hit })?.point
    }

    mutating func register(point: CGPoint) {
        let r2 = radius * radius
        for i in samples.indices where !samples[i].hit {
            let dx = samples[i].point.x - point.x
            let dy = samples[i].point.y - point.y
            if dx * dx + dy * dy <= r2 {
                samples[i].hit = true
            }
        }
    }

    mutating func registerStroke(from: CGPoint, to: CGPoint) {
        let dist = hypot(to.x - from.x, to.y - from.y)
        let steps = max(1, Int(ceil(Double(dist) / 4.0)))
        for s in 0...steps {
            let t = CGFloat(s) / CGFloat(steps)
            register(point: CGPoint(
                x: from.x + (to.x - from.x) * t,
                y: from.y + (to.y - from.y) * t
            ))
        }
    }
}
