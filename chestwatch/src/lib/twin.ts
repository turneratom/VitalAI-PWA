export function isStandalonePwa() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

export function isIos() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export type SpeechHandle = {
  stop: () => void;
};

type RecognitionCtor = new () => {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechResultEvent = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function speechSupported() {
  return recognitionCtor() !== null;
}

export function startListening(options: {
  onText: (text: string, isFinal: boolean) => void;
  onEnd: () => void;
}): SpeechHandle | null {
  const Ctor = recognitionCtor();
  if (!Ctor) return null;

  const rec = new Ctor();
  rec.lang = "en-US";
  rec.continuous = false;
  rec.interimResults = true;

  rec.onresult = (event) => {
    let text = "";
    let isFinal = false;
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const piece = event.results[i];
      text += piece[0].transcript;
      if (piece.isFinal) isFinal = true;
    }
    options.onText(text.trim(), isFinal);
  };

  rec.onerror = () => {
    options.onEnd();
  };

  rec.onend = () => {
    options.onEnd();
  };

  try {
    rec.start();
  } catch {
    return null;
  }

  return {
    stop: () => {
      try {
        rec.stop();
      } catch {
        rec.abort();
      }
    },
  };
}

export async function snapshotFromVideo(video: HTMLVideoElement) {
  const width = video.videoWidth || 720;
  const height = video.videoHeight || 720;
  const max = 480;
  const scale = Math.min(1, max / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.62);
}

export async function fileToDataUrl(file: File) {
  const bitmap = await createImageBitmap(file);
  const max = 480;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.62);
}

export async function queryTwin(input: {
  question: string;
  imageDataUrl?: string;
}) {
  const form = new FormData();
  form.set("question", input.question);
  form.set("hasImage", input.imageDataUrl ? "1" : "0");
  if (input.imageDataUrl) form.set("image", input.imageDataUrl);

  try {
    const res = await fetch("/api/twin", { method: "POST", body: form });
    if (res.ok) {
      return (await res.json()) as { answer: string; stub?: boolean };
    }
  } catch {
    // offline / SW — local stub
  }

  const { stubTwinReply } = await import("@/lib/companion");
  return stubTwinReply(input.question, Boolean(input.imageDataUrl));
}
