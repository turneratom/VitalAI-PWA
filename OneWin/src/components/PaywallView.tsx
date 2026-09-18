"use client";

import Link from "next/link";
import { useState } from "react";
import { useIsClient } from "@/lib/use-is-client";
import { SiteHeader } from "@/components/SiteHeader";
import {
  MONTHLY_PRICE,
  YEARLY_PER_MONTH,
  YEARLY_PRICE,
  checkoutUrl,
  isExternalUrl,
} from "@/lib/checkout";
import { loadQuizAnswers, paywallSummary } from "@/lib/quiz";
import { cn } from "@/lib/cn";

const DEFAULT_SUMMARY =
  "One Win is a 60-second close: one win today, one move tomorrow, a streak that survives a real evening.";

export function PaywallView() {
  const isClient = useIsClient();
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);
  const monthly = checkoutUrl("monthly");
  const yearly = checkoutUrl("yearly");

  if (isClient) {
    const next = paywallSummary(loadQuizAnswers());
    if (next !== summary) setSummary(next);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-xl flex-1 px-5 pb-20 sm:px-6">
        <p className="mt-4 text-xs tracking-[0.22em] uppercase text-brass-dark">Membership</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-[2.7rem]">
          Keep the close.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{summary}</p>

        <div className="mt-8 grid gap-3">
          <PlanCard
            href={yearly}
            eyebrow="Yearly"
            price={YEARLY_PRICE}
            cadence="per year"
            note={`${YEARLY_PER_MONTH}/mo billed once a year. Lower cost than paying monthly.`}
            featured
          />
          <PlanCard
            href={monthly}
            eyebrow="Monthly"
            price={MONTHLY_PRICE}
            cadence="per month"
            note="Cancel from your checkout provider. No countdown. No fake social proof."
          />
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted">
          Checkout uses <code className="text-ink-soft">NEXT_PUBLIC_CHECKOUT_MONTHLY</code> and{" "}
          <code className="text-ink-soft">NEXT_PUBLIC_CHECKOUT_YEARLY</code> (Whop payment links by
          default). This app does not process cards itself. After checkout, return to{" "}
          <code className="text-ink-soft">/thanks</code>.
        </p>

        <p className="mt-6 text-sm text-muted">
          Already through checkout?{" "}
          <Link href="/thanks" className="text-ink underline decoration-line underline-offset-4">
            Open the app
          </Link>
          .
        </p>
      </main>
    </div>
  );
}

function PlanCard({
  href,
  eyebrow,
  price,
  cadence,
  note,
  featured = false,
}: {
  href: string;
  eyebrow: string;
  price: string;
  cadence: string;
  note: string;
  featured?: boolean;
}) {
  const className = cn(
    "block rounded-3xl border p-5 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    featured ? "border-ink bg-ink text-paper" : "border-line bg-card text-ink hover:border-ink/40",
  );

  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "text-xs tracking-[0.2em] uppercase",
              featured ? "text-paper/70" : "text-muted",
            )}
          >
            {eyebrow}
          </p>
          <p className="mt-2 font-serif text-4xl">
            {price}{" "}
            <span className={cn("text-lg", featured ? "text-paper/70" : "text-muted")}>
              {cadence}
            </span>
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs",
            featured ? "bg-paper/10 text-paper" : "bg-paper-deep text-ink-soft",
          )}
        >
          Continue
        </span>
      </div>
      <p className={cn("mt-4 text-sm leading-relaxed", featured ? "text-paper/75" : "text-muted")}>
        {note}
      </p>
    </>
  );

  if (isExternalUrl(href)) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
