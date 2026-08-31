# Halo — Product & Hardware Design

## Design Philosophy

Halo should feel like **a hat you'd wear anyway** — not a gadget strapped to your head. Technology hides in the crown, brim, and sweatband. The AI is present but never performative.

Three principles:

1. **Ambient, not attention-seeking** — no screens on your face; feedback through sound, haptics, and peripheral light
2. **Context-rich** — sees and hears more than glasses because of brim placement and mic geometry
3. **Glasses-compatible** — the hat sits above; prescription lenses stay where they belong

---

## Physical Layout

```
                    ┌─────────────────────────┐
                    │      CROWN MODULE       │
                    │  SoC · Battery · Antenna│
                    │  GPS · IMU · BT/WiFi    │
                    └───────────┬─────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │           SWEATBAND RING          │
              │   Mic array · Haptics · HR (opt)  │
              └─────────────────┬─────────────────┘
                                │
    ◉ CAM-L              BRIM EDGE LED         CAM-R ◉
         ╲                    ─────                    ╱
          ╲    ◉ CAM-F (forward, POV)    ◉ CAM-B   ╱
           ╲              (optional)              ╱
            ═══════════════════════════════════
                         BRIM / VISOR
```

### Crown Module (~38mm × 38mm × 12mm)

Sits in a structured insert at the top of the hat, under the fabric panel.

| Component | Purpose |
|-----------|---------|
| Application processor | On-device AI (Whisper-small, vision encoder, wake word) |
| NPU / TPU | Real-time object/person detection, gesture |
| 2,500–4,000 mAh LiPo | All-day use; shaped to crown curve |
| WiFi 6E + Bluetooth 5.3 | Phone relay, OTA updates |
| Optional LTE-M / eSIM | Standalone when phone absent |
| 6-axis IMU | Head pose → camera stabilization, "look that way" |
| GNSS | Location context for memory |

**Weight target:** crown module ≤ 45g; full hat ≤ 120g (comparable to a phone in pocket, not on face).

### Brim Sensor Ring

The brim is Halo's unfair advantage over glasses.

| Sensor | Placement | Function |
|--------|-----------|----------|
| Forward cam | 12 o'clock, underside | 1080p30 POV, HDR, ~90° FOV |
| Left / Right cams | 9 / 3 o'clock | 720p15 peripheral, people & motion |
| Rear cam (Pro) | 6 o'clock | "Someone behind you" alerts |
| IR illuminator | Forward cluster | Night assist, no visible strobe |
| LED status strip | Outer brim edge | RGB dim, per-segment |

Cameras sit **under** the brim lip — invisible from front, protected from rain, angled slightly down for hands/body context.

### Sweatband Interface Ring

Contacts the forehead/temples — ideal for audio and biometrics.

| Component | Function |
|-----------|----------|
| 4–6 MEMS mics | Beamformed pickup of wearer voice |
| Bone conduction transducer | Private audio playback |
| LRA haptic motor | Patterns: nudge, confirm, urgent |
| Optional PPG | Heart rate for "stress" context (opt-in) |
| Optional throat mic patch | Whisper / sub-vocal commands |

---

## Form Factors

### Halo Brim (Baseball / Trucker)

- **Best for:** daily wear, gym, casual
- **Brim:** 6-panel, stiffened front 2 panels for cam mount
- **Solar:** optional thin-film on top of rear panels (trickle charge)
- **Colors:** neutral (black, navy, olive, stone)

### Halo Wide

- **Best for:** outdoor events, travel, sun protection
- **Brim:** 8–10 cm; more room for cam ring + solar
- **Tradeoff:** slightly more wind catch; better thermal for electronics

### Halo Clip (Upgrade Path)

- Clip-on module for existing hats
- Forward cam + 2 side cams + crown puck (battery/SoC)
- Lower cost entry; less 360° coverage

---

## Power & Thermal

| Mode | Crown draw | Estimated life (3,000 mAh) |
|------|------------|----------------------------|
| Standby (wake word only) | ~0.3 W | 30+ hr |
| Active conversation | ~1.5 W | 8–10 hr |
| Continuous vision + AI | ~2.5 W | 5–6 hr |

- **Charging:** USB-C in sweatband seam; Qi in brim dock (hat stand)
- **Thermal:** crown vented through fabric mesh panel; brim acts as heat spreader

---

## Privacy by Design

| Control | Implementation |
|---------|----------------|
| Hardware mute | Physical slide on brim — cuts mics AND cameras electrically |
| Recording indicator | LED mandatory when any sensor records |
| Local-first | Wake word + sensitive parsing on-device; cloud opt-in per feature |
| Memory vault | On-device encrypted store; user can delete by day/session |
| "Incognito brim" | One tap — no cloud, no memory, minimal logging |

---

## Materials & Manufacturing

- **Shell:** recycled polyester ripstop or merino blend (Pro)
- **Structure:** internal PET stiffener in brim; crown ABS insert
- **Water resistance:** IPX4 (splash/sweat); removable electronics for wash (Pro line)
- **Sizes:** S/M/L with adjustable sweatband; one crown module size fits all

---

## Comparison to Meta Ray-Ban / Smart Glasses

| Dimension | Meta Ray-Ban | Halo |
|-----------|--------------|------|
| POV camera | ✅ Forward | ✅ Forward + peripheral |
| Behind-you awareness | ❌ | ✅ |
| Prescription glasses | Replace or clip | Wear together |
| All-day battery | ❌ | ✅ (crown volume) |
| Social signal | "Recording?" | "Nice hat" |
| Audio I/O | Open ear speakers | Bone conduction (private) |

---

## MVP Hardware Bill of Materials (Estimate)

Prototype target using COTS modules:

- Raspberry Pi CM4 or Qualcomm QCS6490 dev kit
- ReSpeaker 4-mic array (sweatband)
- 2× IMX219 or OAK-D Lite (forward + wide)
- 3000 mAh pouch cell
- Bone conduction transducer (AfterShokz teardown class)
- **Prototype unit cost:** ~$180–250 (qty 1)

Production at scale (10k+): target **$95–140** BOM for base model.
