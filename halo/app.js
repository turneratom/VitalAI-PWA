const SCENARIOS = {
  coffee: {
    snapshot: {
      ts: "2026-08-31T09:14:00Z",
      location: { place: "Blue Bottle Coffee", indoor: true },
      head_pose: { yaw: 15, pitch: 0 },
      forward: {
        scene: "indoor_cafe",
        people: 4,
        text_visible: ["Blue Bottle", "Pour Over"],
        face_detected: { bearing: "left_front", confidence: 0.92, entity: "Maria Chen" }
      },
      peripheral: { left: { motion: false }, right: { person_approaching: true, bearing: "right" } },
      audio: { ambient_db: 58, speaker: "approaching_person", transcript_partial: "Hey — long time!" },
      privacy_mode: "standard"
    },
    prompts: [
      { q: "who is that", a: "Maria Chen — design review, last Tuesday. She's approaching from your right." },
      { q: "what did she just say", a: "She said: \"Hey — long time!\"" },
      { q: "remind me what we discussed", a: "Mobile checkout flow. She wanted feedback on the payment step by Friday." }
    ],
    intro: "Someone familiar is walking up to your table."
  },
  walk: {
    snapshot: {
      ts: "2026-08-31T17:22:00Z",
      location: { place: "Embarcadero trail", outdoor: true },
      head_pose: { yaw: -5, pitch: 2 },
      forward: { scene: "urban_path", vehicles: 0, pedestrians: 2 },
      peripheral: {
        left: { motion: false },
        right: { motion: false },
        rear: { object: "bicycle", speed_kmh: 28, bearing: "left_rear", closing: true }
      },
      audio: { ambient_db: 45, wind: true },
      privacy_mode: "standard"
    },
    prompts: [
      { q: "anything behind me", a: "Cyclist approaching fast from left rear — about 3 seconds. Drift right." },
      { q: "thanks", a: "You're clear now. Trail continues 0.4 miles to the pier." }
    ],
    intro: "You're walking the waterfront. Halo monitors behind you."
  },
  meeting: {
    snapshot: {
      ts: "2026-08-31T14:00:00Z",
      location: { place: "Conference Room B", indoor: true },
      head_pose: { yaw: 0, pitch: -3 },
      forward: { scene: "meeting_room", people: 5, whiteboard_visible: true },
      audio: {
        speakers: ["Jake", "Sarah", "unknown_male"],
        transcript_partial: "…need to ship by the 15th, Sarah can own QA…",
        continuous_mode: true
      },
      memory: { episode_duration_min: 23, key_topics: ["ship date", "QA ownership", "budget"] },
      privacy_mode: "standard"
    },
    prompts: [
      { q: "who owns qa", a: "Sarah — Jake just assigned QA to her for the the 15th ship date." },
      { q: "summarize so far", a: "23 minutes in. Ship target: the 15th. Sarah owns QA. Budget still open — Jake wants numbers by EOD." },
      { q: "send summary to slack", a: "Posted to #product-ship. Want me to include action items only or full notes?" }
    ],
    intro: "Continuous mode is on. Halo is tracking the meeting."
  },
  travel: {
    snapshot: {
      ts: "2026-08-31T19:45:00Z",
      location: { place: "Trattoria Roma", locale: "it-IT" },
      head_pose: { yaw: 20, pitch: -8 },
      forward: {
        scene: "restaurant_menu",
        ocr_language: "Italian",
        text_visible: ["Antipasti", "Bruschetta al pomodoro — €8", "Carpaccio di manzo — €14"]
      },
      audio: { speaker: "waiter", language: "it", transcript_partial: "Buonasera, avete scelto?" },
      privacy_mode: "standard"
    },
    prompts: [
      { q: "translate the menu", a: "Starters: Tomato bruschetta — €8. Beef carpaccio — €14. Shall I read more as you look?" },
      { q: "what did the waiter say", a: "Good evening, have you decided?" },
      { q: "order the bruschetta for me in italian", a: "Say: \"Prendo la bruschetta al pomodoro, per favore.\"" }
    ],
    intro: "You're at dinner in Rome. Menu and waiter are in Italian."
  }
};

let currentScenario = "coffee";

const snapshotEl = document.getElementById("snapshot-json");
const messagesEl = document.getElementById("conv-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function renderSnapshot(key) {
  snapshotEl.textContent = JSON.stringify(SCENARIOS[key].snapshot, null, 2);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function loadScenario(key) {
  currentScenario = key;
  const s = SCENARIOS[key];
  renderSnapshot(key);
  messagesEl.innerHTML = "";
  addMessage(s.intro, "system");

  document.querySelectorAll(".scenario").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.scenario === key);
    btn.setAttribute("aria-selected", btn.dataset.scenario === key);
  });
}

function findResponse(input) {
  const normalized = input.toLowerCase().trim();
  const prompts = SCENARIOS[currentScenario].prompts;

  for (const p of prompts) {
    const keywords = p.q.split(" ");
    const match = keywords.some((w) => w.length > 3 && normalized.includes(w));
    if (match || normalized.includes(p.q) || p.q.includes(normalized)) {
      return p.a;
    }
  }

  const fallbacks = [
    "I'm picking up context from your brim cameras and sweatband mics. Try asking about who's nearby, what was just said, or request a summary.",
    "World snapshot updated. What would you like to know about your surroundings?",
    "Still listening. You can ask me to describe the scene, translate, or remember something."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    addMessage("…", "halo");
    const last = messagesEl.lastElementChild;
  }, 200);

  setTimeout(() => {
    messagesEl.removeChild(messagesEl.lastElementChild);
    addMessage(findResponse(text), "halo");
  }, 800 + Math.random() * 600);
}

document.querySelectorAll(".scenario").forEach((btn) => {
  btn.addEventListener("click", () => loadScenario(btn.dataset.scenario));
});

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});

document.getElementById("btn-demo").addEventListener("click", () => {
  document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
  userInput.focus();
});

loadScenario("coffee");

// Subtle parallax on hat
document.addEventListener("mousemove", (e) => {
  const hat = document.querySelector(".hat");
  if (!hat) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 4;
  hat.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});
