import CoreText
import UIKit

enum LetterGlyph {
    static func path(for letter: Character, fitting rect: CGRect) -> CGPath {
        let font = UIFont.systemFont(ofSize: 280, weight: .bold)
        let string = String(letter) as NSString
        var chars = [UniChar](repeating: 0, count: string.length)
        string.getCharacters(&chars)
        var glyphs = [CGGlyph](repeating: 0, count: string.length)
        guard CTFontGetGlyphsForCharacters(font, &chars, &glyphs, string.length),
              let glyphPath = CTFontCreatePathForGlyph(font, glyphs[0], nil) else {
            return fallbackPath(in: rect)
        }
        let bounds = glyphPath.boundingBoxOfPath
        guard bounds.width > 1, bounds.height > 1 else {
            return fallbackPath(in: rect)
        }
        let inset = rect.insetBy(dx: rect.width * 0.14, dy: rect.height * 0.12)
        let scale = min(inset.width / bounds.width, inset.height / bounds.height)
        var transform = CGAffineTransform.identity
        transform = transform.translatedBy(x: inset.midX, y: inset.midY)
        transform = transform.scaledBy(x: scale, y: -scale)
        transform = transform.translatedBy(x: -bounds.midX, y: -bounds.midY)
        let fitted = CGMutablePath()
        fitted.addPath(glyphPath, transform: transform)
        return fitted
    }

    private static func fallbackPath(in rect: CGRect) -> CGPath {
        CGPath(roundedRect: rect.insetBy(dx: rect.width * 0.22, dy: rect.height * 0.16),
               cornerWidth: 18,
               cornerHeight: 18,
               transform: nil)
    }
}

enum PathSampler {
    static func sample(_ path: CGPath, spacing: CGFloat) -> [CGPoint] {
        let step = max(6, spacing)
        var points: [CGPoint] = []
        var start = CGPoint.zero
        var current = CGPoint.zero
        path.applyWithBlock { pointer in
            let element = pointer.pointee
            switch element.type {
            case .moveToPoint:
                current = element.points[0]
                start = current
                points.append(current)
            case .addLineToPoint:
                appendLine(from: current, to: element.points[0], spacing: step, into: &points)
                current = element.points[0]
            case .addQuadCurveToPoint:
                let control = element.points[0]
                let end = element.points[1]
                appendQuad(from: current, control: control, to: end, spacing: step, into: &points)
                current = end
            case .addCurveToPoint:
                let c1 = element.points[0]
                let c2 = element.points[1]
                let end = element.points[2]
                appendCubic(from: current, c1: c1, c2: c2, to: end, spacing: step, into: &points)
                current = end
            case .closeSubpath:
                appendLine(from: current, to: start, spacing: step, into: &points)
                current = start
            @unknown default:
                break
            }
        }
        return densify(points, spacing: step)
    }

    private static func appendLine(from: CGPoint, to: CGPoint, spacing: CGFloat, into points: inout [CGPoint]) {
        let dist = hypot(to.x - from.x, to.y - from.y)
        let count = max(1, Int(dist / spacing))
        if count == 1 {
            points.append(to)
            return
        }
        for i in 1...count {
            let t = CGFloat(i) / CGFloat(count)
            points.append(CGPoint(x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t))
        }
    }

    private static func appendQuad(from: CGPoint, control: CGPoint, to: CGPoint, spacing: CGFloat, into points: inout [CGPoint]) {
        let approx = hypot(control.x - from.x, control.y - from.y) + hypot(to.x - control.x, to.y - control.y)
        let count = max(4, Int(approx / spacing))
        for i in 1...count {
            let t = CGFloat(i) / CGFloat(count)
            let a = lerp(from, control, t)
            let b = lerp(control, to, t)
            points.append(lerp(a, b, t))
        }
    }

    private static func appendCubic(from: CGPoint, c1: CGPoint, c2: CGPoint, to: CGPoint, spacing: CGFloat, into points: inout [CGPoint]) {
        let approx = hypot(c1.x - from.x, c1.y - from.y)
            + hypot(c2.x - c1.x, c2.y - c1.y)
            + hypot(to.x - c2.x, to.y - c2.y)
        let count = max(6, Int(approx / spacing))
        for i in 1...count {
            let t = CGFloat(i) / CGFloat(count)
            points.append(cubic(from: from, c1: c1, c2: c2, to: to, t: t))
        }
    }

    private static func densify(_ points: [CGPoint], spacing: CGFloat) -> [CGPoint] {
        guard points.count > 1 else { return points }
        var out: [CGPoint] = [points[0]]
        for p in points.dropFirst() {
            guard let last = out.last else { continue }
            if hypot(p.x - last.x, p.y - last.y) >= spacing * 0.45 {
                out.append(p)
            }
        }
        return out
    }

    private static func lerp(_ a: CGPoint, _ b: CGPoint, _ t: CGFloat) -> CGPoint {
        CGPoint(x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t)
    }

    private static func cubic(from: CGPoint, c1: CGPoint, c2: CGPoint, to: CGPoint, t: CGFloat) -> CGPoint {
        let u = 1 - t
        let uu = u * u
        let tt = t * t
        let x = uu * u * from.x + 3 * uu * t * c1.x + 3 * u * tt * c2.x + tt * t * to.x
        let y = uu * u * from.y + 3 * uu * t * c1.y + 3 * u * tt * c2.y + tt * t * to.y
        return CGPoint(x: x, y: y)
    }
}
