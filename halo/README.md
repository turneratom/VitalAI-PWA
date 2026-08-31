# Halo — AI Communication Through a Hat

**Halo** is a wearable AI companion built into a hat. Like smart glasses, it sees your world and hears your conversations — but from the best vantage point on your body: above your eyes, with a wide brim for sensors, and room for all-day battery.

> *You wear the hat. Halo watches your back.*

## Why a Hat?

| Smart Glasses | Halo Hat |
|---------------|----------|
| Forward-facing camera only | 360° awareness (brim ring + forward cam) |
| Battery in temples (heavy, hot) | Battery in crown (balanced, cool) |
| Conflicts with prescription lenses | Works **with** any glasses underneath |
| Obvious "tech face" | Looks like a normal hat |
| ~3–4 hr battery | ~8–12 hr with brim solar assist |

The hat is the most natural place for ambient AI: higher than the crowd, unobtrusive, and socially acceptable everywhere hats already go.

## Core Capabilities

### See Everything
- **Forward camera** — what you're looking at (POV for AI context)
- **Brim ring cameras** — peripheral vision, people approaching from behind, room awareness
- **Optional underside IR** — low-light and gesture detection without visible flash

### Hear Everything
- **Beamforming mic array** in the sweatband — isolates your voice from ambient noise
- **Directional awareness** — knows who is speaking and from where
- **Whisper mode** — sub-vocal input via throat/bone conduction sensor (optional module)

### Interface With You
- **Bone conduction audio** — private responses without earbuds
- **Brim-edge LED strip** — subtle status (listening, thinking, alert) in peripheral vision
- **Haptic buzz** in sweatband — discrete taps for notifications
- **Voice** — natural conversation with on-device + cloud AI
- **Companion app** — transcripts, memory, settings, "what did I miss?"

## Product Line (Concept)

| Model | Form | Target |
|-------|------|--------|
| **Halo Brim** | Baseball cap / trucker | Everyday, sports, outdoors |
| **Halo Wide** | Wide-brim sun hat | Travel, events, all-day sun |
| **Halo Pro** | Structured fedora / bucket | Professional, discreet |
| **Halo Clip** | Brim clip-on module | Use your existing favorite hat |

## Quick Start (Concept Demo)

Open the landing page locally:

```bash
cd halo
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Documentation

- [Product & Hardware Design](./docs/DESIGN.md)
- [Software Architecture](./docs/ARCHITECTURE.md)
- [Interaction Patterns](./docs/INTERACTIONS.md)

## Status

**Concept / design phase** — no hardware prototype. This repo captures product vision, architecture, and a interactive concept demo.

## License

Concept documentation — all rights reserved (placeholder).
