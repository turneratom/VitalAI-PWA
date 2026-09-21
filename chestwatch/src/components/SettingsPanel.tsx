"use client";

import { useState, useSyncExternalStore } from "react";
import { CheckoutCta } from "@/components/CheckoutCta";
import { InstallHint } from "@/components/InstallHint";
import { isChokerPaired, setChokerPaired, subscribePair } from "@/lib/store";
import { PRICE_LABEL } from "@/lib/checkout";

type Perm = "unknown" | "granted" | "denied" | "prompt";

export function SettingsPanel() {
  const paired = useSyncExternalStore(
    subscribePair,
    isChokerPaired,
    () => false,
  );
  const [pairing, setPairing] = useState(false);
  const [camera, setCamera] = useState<Perm>("unknown");
  const [mic, setMic] = useState<Perm>("unknown");

  async function pair() {
    setPairing(true);
    await new Promise((r) => setTimeout(r, 1100));
    setChokerPaired(true);
    setPairing(false);
  }

  async function enableCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      stream.getTracks().forEach((track) => track.stop());
      setCamera("granted");
    } catch {
      setCamera("denied");
    }
  }

  async function enableMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMic("granted");
    } catch {
      setMic("denied");
    }
  }

  return (
    <div>
      <header>
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">ChestWatch</p>
        <h1 className="font-display text-3xl leading-none text-ivory">Settings</h1>
      </header>
      <p className="mt-4 text-sm text-mute">Connect the choker. Allow camera and mic. That&apos;s it.</p>

      <section className="mt-8 space-y-3">
        <Row
          title="Choker"
          detail={paired ? "Paired · twin linked" : "Not paired"}
          action={
            paired ? (
              <button
                type="button"
                className="text-xs text-mute"
                onClick={() => {
                  setChokerPaired(false);
                }}
              >
                Disconnect
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void pair()}
                disabled={pairing}
                className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink"
              >
                {pairing ? "Finding…" : "Connect"}
              </button>
            )
          }
        />
        <Row
          title="Camera"
          detail={labelFor(camera)}
          action={
            camera === "granted" ? null : (
              <button
                type="button"
                onClick={() => void enableCamera()}
                className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold"
              >
                Allow
              </button>
            )
          }
        />
        <Row
          title="Microphone"
          detail={labelFor(mic)}
          action={
            mic === "granted" ? null : (
              <button
                type="button"
                onClick={() => void enableMic()}
                className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold"
              >
                Allow
              </button>
            )
          }
        />
      </section>

      <section className="mt-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Twin plan</p>
        <CheckoutCta variant="bar" />
        <p className="text-xs text-mute">
          Monthly subscription {PRICE_LABEL}. Hardware is the choker; this PWA is the iPhone twin.
          App Store later.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Install</p>
        <InstallHint />
      </section>
    </div>
  );
}

function labelFor(perm: Perm) {
  if (perm === "granted") return "On";
  if (perm === "denied") return "Blocked — enable in iPhone Settings";
  if (perm === "prompt") return "Not allowed yet";
  return "Tap Allow";
}

function Row({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/4 px-4 py-4">
      <div>
        <p className="text-sm text-ivory">{title}</p>
        <p className="text-xs text-mute">{detail}</p>
      </div>
      {action}
    </div>
  );
}
