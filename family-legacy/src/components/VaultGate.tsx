"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Seal } from "./Seal";
import { site } from "@/lib/site";

const STORAGE_KEY = "family-legacy-vault-open";
const EVENT_KEY = "family-legacy-vault";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(EVENT_KEY, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(EVENT_KEY, onStoreChange);
  };
}

function getOpenSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function getClosedSnapshot() {
  return false;
}

function getMountedSnapshot() {
  return true;
}

export function VaultGate({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    getMountedSnapshot,
    getClosedSnapshot,
  );
  const open = useSyncExternalStore(subscribe, getOpenSnapshot, getClosedSnapshot);

  const enter = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event(EVENT_KEY));
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-cream" aria-hidden="true" />;
  }

  if (!open) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-16">
        <Seal size="lg" />
        <p className="kicker mt-8 text-seal">Private family vault</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          {site.vaultTitle}
        </h1>
        <span className="ornament mt-6" />
        <p className="mt-6 max-w-md text-center text-lg leading-relaxed text-ink-soft">
          {site.mission}
        </p>
        <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-ink-soft">
          This room is local-first and unpublished by instinct. No public scrape.
          No invented names. Enter only if you keep the house in good light.
        </p>
        <button
          type="button"
          className="mt-10 border border-seal/70 px-8 py-3 font-display text-lg tracking-wide text-ink transition-colors hover:bg-walnut hover:text-cream"
          onClick={enter}
        >
          I keep this house in good light
        </button>
        <p className="kicker mt-6 text-[0.65rem] text-reserved">
          Vaultkeeper {site.owner} · {site.lock}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
