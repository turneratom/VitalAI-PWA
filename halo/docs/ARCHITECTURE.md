# Halo — Software Architecture

## Overview

Halo runs a **tiered intelligence stack**: always-on edge processing on the hat, with optional cloud augmentation through the phone or LTE.

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACES                          │
│  Voice · Haptics · Brim LED · Companion App · Web Dashboard      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                      HALO RUNTIME (on-device)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │ Perception  │  │ Conversation │  │ Memory & Context Graph  │ │
│  │ Pipeline    │→ │ Orchestrator │← │ (local encrypted store) │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
└───────────────────────────────┬─────────────────────────────────┘
                                │ TLS / WebRTC (when allowed)
┌───────────────────────────────▼─────────────────────────────────┐
│                    CONNECTIVITY LAYER                            │
│         Phone App Bridge · Optional LTE · OTA Updates            │
└───────────────────────────────┬─────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                    CLOUD SERVICES (optional)                     │
│  LLM · Vision API · Memory sync · Skills · Family/shared access  │
└─────────────────────────────────────────────────────────────────┘
```

---

## On-Device Runtime

### Perception Pipeline

Runs continuously at low power; promotes events to full AI when wake word or gesture triggers.

| Stage | Input | Output | Runs on |
|-------|-------|--------|---------|
| Audio VAD | Mic array | Speech segments | DSP |
| Wake word | Audio | "Hey Halo" / custom | NPU |
| Beamforming | 4–6 mics | Clean wearer voice | DSP |
| Head pose | IMU | Gaze proxy for cam selection | MCU |
| Forward vision | Cam-F | Scene labels, OCR, faces (hashed) | NPU |
| Peripheral vision | Cam-L/R/B | Motion, person count, approach vectors | NPU |
| Sensor fusion | All | Unified **World Snapshot** JSON | CPU |

**World Snapshot** (example):

```json
{
  "ts": "2026-08-31T12:04:00Z",
  "location": {"lat": 37.77, "lng": -122.42, "place": "coffee_shop"},
  "head_pose": {"yaw": 12, "pitch": -5},
  "forward": {"scene": "indoor_cafe", "text_visible": ["Blue Bottle", "MENU"], "people": 3},
  "peripheral": {"left": {"motion": false}, "right": {"person_approaching": true, "bearing": "right_rear"}},
  "audio": {"speaker": "wearer", "transcript_partial": "remind me what she said about the deadline"},
  "privacy_mode": "standard"
}
```

### Conversation Orchestrator

State machine + LLM tool loop:

1. **Listen** — STT (Whisper-small on-device; large model via cloud if permitted)
2. **Ground** — inject World Snapshot + recent memory into system prompt
3. **Reason** — local SLM for simple queries; cloud LLM for complex
4. **Act** — tool calls (reminder, message, identify, navigate, summarize)
5. **Respond** — TTS → bone conduction; parallel brim LED pattern

### Memory & Context Graph

Local-first knowledge graph:

- **Episodes** — time-bounded sessions (walk, meeting, meal)
- **Entities** — people (voice print + face hash), places, topics
- **Commitments** — extracted reminders and promises
- **User corrections** — "that wasn't Sarah" → relabel entity

Storage: SQLite + sqlite-vec for embeddings; encrypted at rest (device key + optional user passphrase).

Retention defaults: 7 days on-device raw AV; indefinite text/memory unless user deletes.

---

## Connectivity

### Phone Companion App (iOS / Android)

Primary roles:

- Cloud API key proxy (user owns keys)
- Rich UI for memory search and settings
- Firmware OTA relay
- Share "live context" with trusted contacts (opt-in)

Protocol: BLE for control plane; WiFi Direct or phone hotspot for bulk sync.

### Optional Standalone (LTE-M)

- eSIM profile for users without phone nearby (runners, workers)
- Reduced vision upload; text-first cloud path
- Higher subscription tier

---

## Cloud Services

| Service | Purpose | Privacy note |
|---------|---------|--------------|
| **Halo Sync** | Encrypted backup of memory graph | E2E optional |
| **Halo Skills** | Third-party tools (calendar, Slack, home) | Scoped OAuth per skill |
| **Halo Vision** | Heavy VLM when on-device insufficient | Frame upload user-gated |
| **Halo Translate** | Real-time conversation translation | Processed streams, not stored |

Cloud is **never required** for basic assistant functions if local SLM pack installed.

---

## Key APIs (Internal)

```typescript
// Simplified SDK surface for skill developers

interface HaloContext {
  world: WorldSnapshot;
  memory: MemoryQueryResult;
  wearer: { locale: string; preferences: UserPrefs };
}

interface HaloSkill {
  id: string;
  triggers: string[];  // intent patterns
  execute(ctx: HaloContext, utterance: string): Promise<SkillResult>;
}

// Example: "what am I looking at?"
const describeScene: HaloSkill = {
  id: "describe_scene",
  triggers: ["what am i looking at", "describe this"],
  async execute(ctx) {
    return { speak: ctx.world.forward.scene_description };
  }
};
```

---

## Security Model

| Layer | Mechanism |
|-------|-----------|
| Device | Secure boot, encrypted storage, hardware mute |
| Transport | TLS 1.3, cert pinning, optional E2E for memory sync |
| Cloud | Zero-knowledge memory option; no training on user AV by default |
| Shared access | Time-limited context tokens for family/caregivers |

Threat model priorities: stolen hat, malicious skill, shoulder-surfing via audio, unauthorized recording in private spaces.

---

## Tech Stack (Recommended)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Device OS | Embedded Linux (Yocto) or Zephyr + Linux companion | Mature AV stack |
| On-device ML | ONNX Runtime + Qualcomm SNPE / Google Edge TPU | Hardware NPU use |
| STT | Whisper.cpp (small/base) | Offline capable |
| Local LLM | Phi-3-mini / Gemma 2B quantized | Fits crown NPU |
| TTS | Piper / Coqui (on-device voice) | Low latency |
| Mobile app | React Native or Flutter | Shared logic |
| Cloud | Vercel / Fly.io functions + Postgres + object store | Fast iteration |
| Realtime | WebRTC data channel for live assist | Low latency |

---

## Latency Targets

| Path | Target |
|------|--------|
| Wake word → acknowledgment haptic | < 200 ms |
| Simple query (local SLM) | < 1.5 s |
| Vision describe (on-device) | < 2 s |
| Complex query (cloud LLM) | < 4 s |

---

## MVP Software Milestones

1. **Simulated Halo** — phone + earbuds + single camera hat clip; prove UX
2. **Perception MVP** — multi-cam fusion + World Snapshot on dev board
3. **Memory MVP** — episode recording + "what happened today?"
4. **Hardware beta** — custom brim + crown; 50 dogfooders
5. **Skills platform** — SDK + 3 launch partners (calendar, notes, accessibility)
