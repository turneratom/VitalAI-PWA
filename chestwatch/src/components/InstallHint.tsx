"use client";

import { useSyncExternalStore } from "react";
import { isIos, isStandalonePwa } from "@/lib/twin";

export function InstallHint() {
  const ios = useSyncExternalStore(
    () => () => undefined,
    isIos,
    () => false,
  );
  const show = useSyncExternalStore(
    () => () => undefined,
    () => !isStandalonePwa(),
    () => false,
  );

  if (!show) return null;

  return (
    <p className="text-center text-xs leading-relaxed text-mute">
      {ios ? (
        <>
          Easy plugin: tap <span className="text-ivory">Share</span> then{" "}
          <span className="text-ivory">Add to Home Screen</span>. Then one tap.
        </>
      ) : (
        <>
          Easy plugin: browser menu → <span className="text-ivory">Add to Home Screen</span>{" "}
          / <span className="text-ivory">Install app</span>. Then one tap.
        </>
      )}
    </p>
  );
}
