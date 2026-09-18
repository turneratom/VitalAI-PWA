"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { loadQuizAnswers, processingLines } from "@/lib/quiz";
import { useIsClient } from "@/lib/use-is-client";

const DURATION_MS = 10000;

export function ProcessingTheater() {
  const router = useRouter();
  const isClient = useIsClient();
  const [tick, setTick] = useState(0);
  const [lines, setLines] = useState(processingLines({}));
  const active = Math.min(lines.length - 1, Math.floor((tick / DURATION_MS) * lines.length));

  if (isClient) {
    const next = processingLines(loadQuizAnswers());
    if (next.join("\n") !== lines.join("\n")) setLines(next);
  }

  useEffect(() => {
    const started = Date.now();
    const interval = window.setInterval(() => {
      setTick(Date.now() - started);
    }, 80);

    const done = window.setTimeout(() => {
      router.push("/paywall");
    }, DURATION_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(done);
    };
  }, [router]);

  const progress = Math.min(100, (tick / DURATION_MS) * 100);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="px-5 py-5 sm:px-8">
        <BrandMark href="/" />
      </header>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 pb-24">
        <p className="text-xs tracking-[0.22em] uppercase text-brass-dark">Building your close</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          Ten seconds. Then the ritual.
        </h1>
        <ul className="mt-10 space-y-4">
          {lines.map((line, index) => (
            <li
              key={line}
              className={
                index === active
                  ? "font-medium text-ink"
                  : index < active
                    ? "text-ink-soft"
                    : "text-muted/70"
              }
            >
              {line}
            </li>
          ))}
        </ul>
        <div className="mt-12 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div
            className="h-full bg-ink transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-muted">This is not a diagnosis. It’s a 60-second close.</p>
      </main>
    </div>
  );
}
