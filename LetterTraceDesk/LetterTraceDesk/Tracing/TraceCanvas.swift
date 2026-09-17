import SwiftUI

struct TraceCanvas: View {
    let letter: Character
    @Binding var coverage: TraceCoverage
    @Binding var strokes: [[CGPoint]]
    var reducedMotion: Bool
    var resetToken: Int = 0

    @State private var livePath: CGPath = CGMutablePath()
    @State private var lastPoint: CGPoint?
    @State private var pulse = false
    @State private var lastRect: CGRect = .zero

    var body: some View {
        GeometryReader { geo in
            let rect = CGRect(origin: .zero, size: geo.size)
            Canvas { context, size in
                let canvasRect = CGRect(origin: .zero, size: size)
                context.fill(Path(canvasRect), with: .color(AppTheme.bg))

                let letterPath = Path(livePath)
                context.fill(letterPath, with: .color(AppTheme.primary.opacity(0.07)))
                context.stroke(
                    letterPath,
                    with: .color(Color(red: 168 / 255, green: 196 / 255, blue: 227 / 255)),
                    style: StrokeStyle(
                        lineWidth: max(3, size.height * 0.016),
                        lineCap: .round,
                        lineJoin: .round,
                        dash: [8, 11]
                    )
                )

                let lineWidth = max(14, size.height * 0.045)
                for stroke in strokes where stroke.count > 1 {
                    var path = Path()
                    path.addLines(stroke)
                    context.stroke(
                        path,
                        with: .color(AppTheme.primary.opacity(0.88)),
                        style: StrokeStyle(lineWidth: lineWidth, lineCap: .round, lineJoin: .round)
                    )
                }

                if let start = coverage.firstUnhit {
                    let r: CGFloat = max(10, size.height * 0.028)
                    let scale: CGFloat = pulse && !reducedMotion ? 1.12 : 1.0
                    let dot = CGRect(x: start.x - r * scale, y: start.y - r * scale, width: r * 2 * scale, height: r * 2 * scale)
                    context.fill(Path(ellipseIn: dot), with: .color(AppTheme.accent.opacity(0.85)))
                }
            }
            .gesture(
                DragGesture(minimumDistance: 0, coordinateSpace: .local)
                    .onChanged { value in
                        let point = value.location
                        var nextCoverage = coverage
                        var nextStrokes = strokes
                        if let last = lastPoint {
                            if nextStrokes.isEmpty { nextStrokes.append([]) }
                            nextStrokes[nextStrokes.count - 1].append(point)
                            nextCoverage.registerStroke(from: last, to: point)
                        } else {
                            nextStrokes.append([point])
                            nextCoverage.register(point: point)
                        }
                        strokes = nextStrokes
                        coverage = nextCoverage
                        lastPoint = point
                    }
                    .onEnded { _ in
                        lastPoint = nil
                    }
            )
            .onAppear {
                rebuild(in: rect)
                startPulse()
            }
            .onChange(of: letter) { _, _ in
                rebuild(in: rect)
            }
            .onChange(of: resetToken) { _, _ in
                rebuild(in: lastRect.width > 8 ? lastRect : rect)
            }
            .onChange(of: geo.size) { _, newSize in
                rebuild(in: CGRect(origin: .zero, size: newSize))
            }
        }
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .stroke(AppTheme.line, lineWidth: 1)
        )
        .background(AppTheme.bg)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Trace the letter \(letter). Follow the dotted path with a finger.")
        .accessibilityAddTraits(.allowsDirectInteraction)
    }

    private func rebuild(in rect: CGRect) {
        guard rect.width > 8, rect.height > 8 else { return }
        lastRect = rect
        let path = LetterGlyph.path(for: letter, fitting: rect)
        livePath = path
        let spacing = max(10, min(rect.width, rect.height) * 0.028)
        let samples = PathSampler.sample(path, spacing: spacing)
        let radius = max(18, min(rect.width, rect.height) * 0.062)
        coverage = TraceCoverage(points: samples, radius: radius)
        strokes = []
        lastPoint = nil
    }

    private func startPulse() {
        guard !reducedMotion else { return }
        withAnimation(.easeInOut(duration: 1.1).repeatForever(autoreverses: true)) {
            pulse = true
        }
    }
}
