import SwiftUI

enum DeskStep: Int, CaseIterable, Equatable {
    case welcome
    case pick
    case trace
    case done
}

enum ParentDestination: Equatable {
    case settings
    case unlock
}

/// In-memory sitting. Cleared when the app leaves the sitting — never a child report.
@MainActor
final class DeskModel: ObservableObject {
    @Published var step: DeskStep = .welcome
    @Published var session: [Character] = []
    @Published var index: Int = 0
    @Published var completed: [Character] = []
    @Published var showParentFlow = false
    @Published var parentDestination: ParentDestination = .settings
    @Published var parentGatePassed = false

    var currentLetter: Character {
        session.indices.contains(index) ? session[index] : "A"
    }

    var letterOrdinalLabel: String {
        let n = max(session.count, 1)
        return "Letter \(index + 1) of \(n)"
    }

    func rebuildSession(settings: AppSettings, unlocked: Bool) {
        session = SessionPlan.make(pool: settings.pool, size: settings.clampedSessionSize(), unlocked: unlocked)
        index = 0
        completed = []
    }

    func goToPick(settings: AppSettings, unlocked: Bool) {
        rebuildSession(settings: settings, unlocked: unlocked)
        step = .pick
    }

    func startTracing() {
        index = 0
        completed = []
        step = .trace
    }

    func markCurrentPracticed() {
        let letter = currentLetter
        if !completed.contains(letter) {
            completed.append(letter)
        }
    }

    func advanceFromTrace(skipped: Bool) {
        if !skipped {
            markCurrentPracticed()
        }
        if index + 1 >= session.count {
            step = .done
        } else {
            index += 1
        }
    }

    func practiceAgain(settings: AppSettings, unlocked: Bool) {
        goToPick(settings: settings, unlocked: unlocked)
    }

    func openParent(destination: ParentDestination) {
        parentDestination = destination
        parentGatePassed = false
        showParentFlow = true
    }

    func closeParent() {
        showParentFlow = false
        parentGatePassed = false
    }
}
