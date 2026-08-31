# Halo — Interaction Patterns

How users talk to Halo, get feedback, and stay in control without looking at a screen.

---

## Input Modalities

### 1. Voice (Primary)

**Wake phrase:** "Hey Halo" (customizable)

Natural language — no command syntax required:

- *"What did Jake just ask me?"*
- *"Remember this — gate code is 4521."*
- *"Who's approaching from behind?"*
- *"Summarize the last five minutes."*
- *"Translate what she's saying to Spanish in my ear."*

**Continuous mode** (meetings): double-tap brim → always listening until double-tap again; LED pulses slowly.

### 2. Sub-vocal / Whisper (Pro)

Throat sensor detects whisper without audible speech — for quiet environments (library, meeting side-comment).

- *quiet whisper:* "note that" → Halo captures last 30s context

### 3. Touch / Gesture

| Gesture | Action |
|---------|--------|
| Single tap brim (front) | Push-to-talk (no wake word) |
| Double tap | Toggle continuous listen |
| Triple tap | Incognito mode |
| Long press | Hardware mute (same as slide switch) |
| Nod 2× (IMU) | Confirm prompt ("Send that message?") |
| Shake once | Cancel / "never mind" |

### 4. App (Secondary)

For settings, memory search, reviewing transcripts, sharing clips with consent.

---

## Output Modalities

### Bone Conduction Audio

Default channel for all responses. Others nearby hear nothing.

- **Voice:** conversational TTS
- **Earcons:** soft tones for confirm / error / alert
- **Spatial cues:** stereo bone conduction for "person on your left"

### Brim LED (Peripheral)

Dim, non-distracting; visible only to wearer (under-brim):

| Pattern | Meaning |
|---------|---------|
| Soft pulse blue | Listening |
| Slow amber breathe | Thinking / processing |
| Green flash | Done / confirmed |
| Red edge sweep | Alert (approach, timer, urgent message) |
| Off | Muted / incognito |

### Haptics

| Pattern | Meaning |
|---------|---------|
| Single short tap | Notification |
| Double tap | Reminder due |
| Long buzz | Urgent (safety: vehicle approaching) |

---

## Scenario Walkthroughs

### Coffee Shop — Name Recall

1. Someone approaches; peripheral cam detects face + voice
2. Halo (quietly): *"That's Maria from the design review — you met last Tuesday."*
3. You: *"Thanks."* — conversation continues

### Walking — Awareness

1. Rear cam detects cyclist approaching fast from behind
2. Haptic + whisper: *"Bike left"* — you drift right without turning

### Meeting — Capture & Summarize

1. Double-tap → continuous mode; LED pulses
2. 45-minute meeting; Halo tracks speakers (voice print) and key points
3. You: *"Send summary to the team Slack."*
4. Halo confirms via nod prompt; posts via skill

### Travel — Translation

1. You: *"Translate menu to English."*
2. Forward cam OCR + vision → bone conduction reads items as you look at each line

### Memory — "What Did I Miss?"

1. You were distracted; partner spoke
2. You: *"What did she just say about dinner?"*
3. Halo replays last 15s transcript + intent: *"She asked if you're free at 7."*

---

## Social Etiquette

Halo must not make wearers creepy or rude.

| Rule | Behavior |
|------|----------|
| Recording consent | LED visible to others when capturing; optional verbal announce in strict jurisdictions |
| Third-party faces | Face IDs stored as hashes; no name unless wearer labeled or public figure policy |
| "Are you recording?" | Voice response: *"I'm listening to help [name]. Recording is off."* (when true) |
| Private spaces | Geo-fenced auto-mute (bathroom, locker room) — user editable |

---

## Accessibility

Halo is especially strong for:

- **Low vision** — scene description, text reading, navigation cues
- **Hearing assist** — direction-of-arrival captioning in app + bone conduction
- **Memory support** — names, appointments, context replay
- **Anxiety / social** — pre-brief before events: *"Three people inside; one you know."*

---

## Personality & Tone

Default: **calm, concise, competent** — like a great chief of staff, not a chatbot.

- Short sentences in bone conduction
- No unsolicited chatter unless safety or scheduled reminder
- User sets verbosity: *minimal / normal / detailed*

Example minimal style:

> *"Maria. Design review. Tuesday."*

Example detailed style:

> *"Maria Chen is walking toward you from the left. You met her at the design review on Tuesday — she mentioned the mobile checkout flow."*
