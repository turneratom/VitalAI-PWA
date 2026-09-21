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
          Install: tap <span className="text-ivory">Share</span> then{" "}
          <span className="text-ivory">Add to Home Screen</span>. One tap after that.
        </>
      ) : (
        <>
          Install: use your browser menu → <span className="text-ivory">Add to Home Screen</span>{" "}
          / <span className="text-ivory">Install app</span>.
        </>
      )}
    </p>
  );
}
