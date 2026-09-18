"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { markUnlocked } from "@/lib/storage";

export function ThanksView() {
  const router = useRouter();

  useEffect(() => {
    markUnlocked();
    const timer = window.setTimeout(() => {
      router.push("/app");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 pb-24">
        <p className="text-xs tracking-[0.22em] uppercase text-brass-dark">You’re in</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
          The close lives on this device.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          One win today. One move for tomorrow. Under a minute. Your streak is stored in this
          browser — nothing leaves the device in this MVP.
        </p>
        <Link
          href="/app"
          className="mt-8 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Open the app
        </Link>
      </main>
    </div>
  );
}
