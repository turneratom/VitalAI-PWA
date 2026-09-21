"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CheckoutCta } from "@/components/CheckoutCta";
import { InstallHint } from "@/components/InstallHint";
import { saveSession } from "@/lib/store";
import {
  fileToDataUrl,
  queryTwin,
  snapshotFromVideo,
  speechSupported,
  startListening,
  type SpeechHandle,
} from "@/lib/twin";

type Phase = "idle" | "live" | "fallback" | "thinking" | "answer";

export function TwinPad() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const listenRef = useRef<SpeechHandle | null>(null);
  const finishingRef = useRef(false);
  const transcriptRef = useRef("");

  const [phase, setPhase] = useState<Phase>("idle");
  const [transcript, setTranscript] = useState("");
  const [typed, setTyped] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const canSpeak = useSyncExternalStore(
    () => () => undefined,
    speechSupported,
    () => true,
  );

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const stopListen = useCallback(() => {
    listenRef.current?.stop();
    listenRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopListen();
      stopCamera();
    };
  }, [stopCamera, stopListen]);

  const finish = useCallback(
    async (nextQuestion: string, nextImage?: string) => {
      if (finishingRef.current) return;
      finishingRef.current = true;
      stopListen();
      stopCamera();
      setPhase("thinking");
      const question = nextQuestion.trim() || "What am I looking at?";
      const reply = await queryTwin({
        question,
        imageDataUrl: nextImage,
      });
      saveSession({
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        question,
        answer: reply.answer,
        imageDataUrl: nextImage,
      });
      setAnswer(reply.answer);
      setPhase("answer");
      finishingRef.current = false;
    },
    [stopCamera, stopListen],
  );

  const beginListen = useCallback(() => {
    stopListen();
    const handle = startListening({
      onText: (text, isFinal) => {
        transcriptRef.current = text;
        setTranscript(text);
        if (isFinal && text) {
          void (async () => {
            const frame = videoRef.current
              ? await snapshotFromVideo(videoRef.current)
              : undefined;
            if (frame) setImage(frame);
            await finish(text, frame);
          })();
        }
      },
      onEnd: () => {
        listenRef.current = null;
      },
    });
    listenRef.current = handle;
  }, [finish, stopListen]);

  const startCamera = useCallback(async () => {
    setError("");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    streamRef.current = stream;
    const video = videoRef.current;
    if (!video) throw new Error("No video");
    video.srcObject = stream;
    await video.play();
  }, []);

  const onMainTap = async () => {
    if (phase === "thinking") return;

    if (phase === "answer") {
      setAnswer("");
      setTranscript("");
      setTyped("");
      setImage(undefined);
      setPhase("idle");
      return;
    }

    if (phase === "live") {
      const frame = videoRef.current
        ? await snapshotFromVideo(videoRef.current)
        : image;
      setImage(frame);
      await finish(transcript || typed, frame);
      return;
    }

    if (phase === "fallback") {
      await finish(typed || transcript, image);
      return;
    }

    setTranscript("");
    transcriptRef.current = "";
    setTyped("");
    setAnswer("");
    finishingRef.current = false;

    try {
      await startCamera();
      setPhase("live");
      if (speechSupported()) beginListen();
    } catch {
      setPhase("fallback");
      setError("Camera needs a tap in Settings, or use a photo.");
      if (speechSupported()) beginListen();
    }
  };

  const onPickFile = async (file?: File) => {
    if (!file) return;
    const data = await fileToDataUrl(file);
    setImage(data);
    setError("");
  };

  const status = {
    idle: "Tap once. I see. I listen.",
    live: canSpeak ? "Listening — tap again to answer" : "Watching — type below, then tap",
    fallback: "Add a photo, ask, tap again",
    thinking: "Twin is looking…",
    answer: "Tap the lens to go again",
  }[phase];

  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">ChestWatch</p>
          <h1 className="font-display text-3xl leading-none text-ivory">Twin</h1>
        </div>
        <CheckoutCta variant="text" className="pt-1 text-xs" />
      </header>

      {phase === "idle" || phase === "answer" ? (
        <p className="mt-4 max-w-[19rem] text-sm leading-relaxed text-mute">
          Easy iPhone plugin. One tap. Your digital twin.
        </p>
      ) : null}

      <div className="flex flex-1 flex-col items-center justify-center py-6">
        <button
          type="button"
          onClick={onMainTap}
          aria-label={
            phase === "idle"
              ? "Capture camera and ask with voice"
              : phase === "live"
                ? "Send what I see and heard"
                : phase === "answer"
                  ? "Ask again"
                  : "Continue"
          }
          className={`bezel relative aspect-square w-[min(78vw,20.5rem)] overflow-hidden rounded-full transition-transform active:scale-[0.98] ${
            phase === "live" ? "bezel-live" : ""
          }`}
        >
          <video
            ref={videoRef}
            className={`absolute inset-[12%] h-[76%] w-[76%] rounded-full object-cover ${
              phase === "live" ? "opacity-100" : "opacity-0"
            }`}
            playsInline
            muted
            autoPlay
          />
          {image && phase !== "live" ? (
            // Captured still is a local data URL, not a remote asset.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="absolute inset-[12%] h-[76%] w-[76%] rounded-full object-cover"
            />
          ) : null}
          {phase !== "live" && !image ? (
            <span className="lens-core absolute inset-[30%] rounded-full" />
          ) : null}
          {phase === "live" ? <span className="pulse-ring" /> : null}
          <span className="pointer-events-none absolute inset-x-0 bottom-[18%] text-center text-[11px] uppercase tracking-[0.22em] text-gold">
            {phase === "idle"
              ? "Tap"
              : phase === "live"
                ? "Send"
                : phase === "thinking"
                  ? "…"
                  : phase === "answer"
                    ? "Again"
                    : "Go"}
          </span>
        </button>

        <p className="mt-6 text-sm text-ivory/80">{status}</p>
        {phase === "live" ? (
          <div className="mt-3 flex h-6 items-end gap-1" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="wave-bar" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        ) : null}
        {transcript || typed ? (
          <p className="mt-3 max-w-xs text-center text-sm text-gold-soft">
            {transcript || typed}
          </p>
        ) : null}
        {error && phase !== "answer" && phase !== "thinking" ? (
          <p className="mt-3 max-w-xs text-center text-xs text-gold/80">{error}</p>
        ) : null}
      </div>

      {phase === "fallback" || (phase === "live" && !canSpeak) ? (
        <form
          className="mb-4 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            void onMainTap();
          }}
        >
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-ivory"
          >
            {image ? "Photo ready — change" : "Use a photo"}
          </button>
          <input
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            placeholder="Ask your twin…"
            className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-base text-ivory outline-none placeholder:text-mute"
          />
        </form>
      ) : null}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => void onPickFile(event.target.files?.[0])}
      />

      {phase === "answer" ? (
        <article className="mb-4 rounded-3xl border border-white/10 bg-white/4 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
            Twin · model hook next
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ivory">{answer}</p>
        </article>
      ) : null}

      {phase === "idle" || phase === "answer" ? (
        <div className="space-y-4 pb-2">
          <CheckoutCta />
          {phase === "idle" ? <InstallHint /> : null}
        </div>
      ) : null}
    </div>
  );
}
