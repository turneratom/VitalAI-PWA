export type TwinReply = {
  answer: string;
  stub: true;
  hook: "model hook next";
};

function pick(question: string, hasImage: boolean): string {
  const q = question.toLowerCase();

  if (!hasImage && !q.trim()) {
    return "I'm here. Tap again, show me what's in front of you, and speak — I'll answer as your twin.";
  }

  if (q.includes("who") && (q.includes("you") || q.includes("twin"))) {
    return "I'm your ChestWatch twin on this phone. I pair with the choker so what you see and say can live here — one tap, then I answer.";
  }

  if (q.includes("price") || q.includes("cost") || q.includes("subscribe")) {
    return "ChestWatch Twin is $9.99 a month. Easy iPhone plugin — one tap, your digital twin. Hardware stays on the choker.";
  }

  if (
    q.includes("help") ||
    q.includes("what is") ||
    q.includes("read") ||
    q.includes("sign") ||
    q.includes("menu")
  ) {
    return hasImage
      ? "I have the frame. From here the live model will read the scene and talk you through it. For now: tell me the detail you care about and I'll stay with you."
      : "Show me the scene and ask. I'll read, point, and answer like the choker would — once the model is hooked in.";
  }

  if (hasImage) {
    return q.trim()
      ? `I see the shot. You asked: “${question.trim()}” I'm holding that with you. Next hook is the real vision+voice model — until then I stay on-device as your twin stub.`
      : "Frame captured. I'm looking with you. Ask out loud or type, and I'll keep the loop going — see, ask, answer.";
  }

  return q.trim()
    ? `Heard: “${question.trim()}” Snap what's in front of you and I'll bind the question to the scene. Twin is local until the model hook lands.`
    : "Listening. One tap is enough — I capture, I hear, I answer.";
}

export function stubTwinReply(question: string, hasImage: boolean): TwinReply {
  return {
    answer: pick(question, hasImage),
    stub: true,
    hook: "model hook next",
  };
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
