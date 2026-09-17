import AVFoundation
import Foundation
import SwiftUI

/// Speaks the letter name after a successful trace. On-device speech, no network.
@MainActor
final class LetterSpeaker: ObservableObject {
    private let synthesizer = AVSpeechSynthesizer()

    func speakLetter(_ letter: Character) {
        stop()
        let utterance = AVSpeechUtterance(string: "Letter \(letter)")
        utterance.rate = AVSpeechUtteranceDefaultSpeechRate * 0.82
        utterance.pitchMultiplier = 1.02
        utterance.preUtteranceDelay = 0.12
        utterance.postUtteranceDelay = 0.05
        utterance.volume = 0.85
        if let voice = AVSpeechSynthesisVoice(language: "en-US") {
            utterance.voice = voice
        }
        synthesizer.speak(utterance)
    }

    func stop() {
        if synthesizer.isSpeaking {
            synthesizer.stopSpeaking(at: .immediate)
        }
    }
}
