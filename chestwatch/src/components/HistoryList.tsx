"use client";

import { useSyncExternalStore } from "react";
import { CheckoutCta } from "@/components/CheckoutCta";
import {
  clearSessions,
  getSessionsServerSnapshot,
  getSessionsSnapshot,
  subscribeSessions,
} from "@/lib/store";

export function HistoryList() {
  const sessions = useSyncExternalStore(
    subscribeSessions,
    getSessionsSnapshot,
    getSessionsServerSnapshot,
  );

  return (
    <div>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">ChestWatch</p>
          <h1 className="font-display text-3xl leading-none text-ivory">Answers</h1>
        </div>
        {sessions.length ? (
          <button
            type="button"
            className="pt-1 text-xs text-mute"
            onClick={() => {
              clearSessions();
            }}
          >
            Clear
          </button>
        ) : null}
      </header>
      <p className="mt-4 text-sm text-mute">See → ask → answer, kept on this phone.</p>

      {sessions.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-sm text-mute">No answers yet. One tap on Twin starts the loop.</p>
          <div className="mt-8">
            <CheckoutCta />
          </div>
        </div>
      ) : (
        <ol className="mt-6 space-y-3">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="rounded-3xl border border-white/10 bg-white/4 p-3"
            >
              <div className="flex gap-3">
                {session.imageDataUrl ? (
                  // Local JPEG still from the twin capture loop.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.imageDataUrl}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-gold/15" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm text-ivory">{session.question}</p>
                  <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-mute">
                    {session.answer}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-gold/80">
                    {new Date(session.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
