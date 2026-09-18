import SwiftUI

struct DeskButton: View {
    enum Kind { case primary, soft, ghost }

    let title: String
    var kind: Kind = .primary
    var enabled: Bool = true
    var fillWidth: Bool = false
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 17, weight: .semibold))
                .frame(maxWidth: fillWidth ? .infinity : nil)
                .padding(.horizontal, 22)
                .padding(.vertical, 14)
                .background(background)
                .foregroundStyle(foreground)
                .overlay(
                    Capsule().stroke(border, lineWidth: kind == .ghost ? 1 : 0)
                )
                .clipShape(Capsule())
                .shadow(color: kind == .primary ? AppTheme.primary.opacity(0.22) : .clear, radius: 8, y: 3)
        }
        .buttonStyle(.plain)
        .disabled(!enabled)
        .opacity(enabled ? 1 : 0.45)
        .accessibilityAddTraits(.isButton)
    }

    private var background: Color {
        switch kind {
        case .primary: return AppTheme.primary
        case .soft: return AppTheme.softFill
        case .ghost: return .clear
        }
    }

    private var foreground: Color {
        switch kind {
        case .primary: return .white
        case .soft: return AppTheme.primary
        case .ghost: return AppTheme.inkSoft
        }
    }

    private var border: Color {
        switch kind {
        case .ghost: return AppTheme.line
        case .soft: return Color(red: 197 / 255, green: 214 / 255, blue: 234 / 255)
        case .primary: return .clear
        }
    }
}

struct Eyebrow: View {
    let text: String
    var body: some View {
        Text(text.uppercased())
            .font(.system(size: 12, weight: .semibold))
            .tracking(0.8)
            .foregroundStyle(AppTheme.lavender)
    }
}

struct FenceBox: View {
    var title: String = "Honest fences"
    let items: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(AppTheme.ink)
            VStack(alignment: .leading, spacing: 6) {
                ForEach(items, id: \.self) { item in
                    HStack(alignment: .top, spacing: 8) {
                        Text("•")
                            .foregroundStyle(AppTheme.lavender)
                        Text(.init(item))
                            .foregroundStyle(AppTheme.inkSoft)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(AppTheme.softLav)
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(Color(red: 216 / 255, green: 208 / 255, blue: 232 / 255), lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}

struct StepDots: View {
    let step: DeskStep

    var body: some View {
        HStack(spacing: 6) {
            ForEach(DeskStep.allCases, id: \.rawValue) { item in
                Capsule()
                    .fill(color(for: item))
                    .frame(height: 6)
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Step \(step.rawValue + 1) of \(DeskStep.allCases.count). Always a Continue.")
    }

    private func color(for item: DeskStep) -> Color {
        if item.rawValue < step.rawValue { return AppTheme.accent }
        if item == step { return AppTheme.primary }
        return AppTheme.line
    }
}

struct LetterChip: View {
    let letter: Character
    var selected: Bool = false
    var inSession: Bool = false
    var locked: Bool = false
    var action: (() -> Void)?

    var body: some View {
        let content = Text(String(letter))
            .font(.system(size: 20, weight: .bold))
            .frame(maxWidth: .infinity, minHeight: 48)
            .background(background)
            .foregroundStyle(foreground)
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(border, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            .opacity(locked && !selected ? 0.55 : 1)

        if let action {
            Button(action: action) { content }
                .buttonStyle(.plain)
                .accessibilityLabel(accessibilityLabel)
                .accessibilityAddTraits(selected ? [.isSelected, .isButton] : .isButton)
        } else {
            content
                .accessibilityLabel(accessibilityLabel)
        }
    }

    private var accessibilityLabel: String {
        var parts = ["Letter \(letter)"]
        if locked { parts.append("locked until parent unlock") }
        if selected { parts.append("selected") }
        if inSession { parts.append("in this sitting") }
        return parts.joined(separator: ", ")
    }

    private var background: Color {
        if selected { return AppTheme.primary }
        if inSession { return AppTheme.softGreen }
        return AppTheme.bg
    }

    private var foreground: Color {
        if selected { return .white }
        if inSession { return AppTheme.greenInk }
        return AppTheme.ink
    }

    private var border: Color {
        if selected { return AppTheme.primary }
        if inSession { return Color(red: 181 / 255, green: 212 / 255, blue: 198 / 255) }
        return AppTheme.line
    }
}

struct DeskCard<Content: View>: View {
    @ViewBuilder var content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            content
        }
        .padding(20)
        .frame(maxWidth: 720, alignment: .leading)
        .background(AppTheme.surface)
        .overlay(
            RoundedRectangle(cornerRadius: AppTheme.radius, style: .continuous)
                .stroke(AppTheme.line, lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: AppTheme.radius, style: .continuous))
        .shadow(color: AppTheme.ink.opacity(0.06), radius: 18, y: 8)
    }
}

struct DeskHeader: View {
    var showParent: Bool = true
    var onParent: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            HStack(spacing: 10) {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [AppTheme.primary, AppTheme.accent],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 26, height: 26)
                    .overlay(Circle().stroke(.white.opacity(0.45), lineWidth: 2))
                VStack(alignment: .leading, spacing: 0) {
                    Text("Letter Trace Desk")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(AppTheme.ink)
                    Text("Practice helper · ages 3–5")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(AppTheme.muted)
                }
            }
            Spacer()
            if showParent {
                Button("Parent settings", action: onParent)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(AppTheme.inkSoft)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                    .overlay(Capsule().stroke(AppTheme.line, lineWidth: 1))
                    .accessibilityHint("Opens an adult math check, then settings or unlock.")
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 12)
        .background(AppTheme.bg.opacity(0.94))
    }
}

struct ActionRow<Leading: View, Trailing: View>: View {
    @ViewBuilder var leading: Leading
    @ViewBuilder var trailing: Trailing

    var body: some View {
        ViewThatFits(in: .horizontal) {
            HStack {
                leading
                Spacer(minLength: 8)
                trailing
            }
            VStack(spacing: 10) {
                trailing
                leading
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.top, 8)
    }
}
