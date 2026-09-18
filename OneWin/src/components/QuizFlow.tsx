"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { SiteHeader } from "@/components/SiteHeader";
import { QUIZ_STEPS, saveQuizAnswers, type QuizAnswers } from "@/lib/quiz";
import { cn } from "@/lib/cn";

export function QuizFlow() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const step = QUIZ_STEPS[stepIndex];
  const selected = answers[step.id];
  const isLast = stepIndex === QUIZ_STEPS.length - 1;

  const progressLabel = useMemo(
    () => `Question ${stepIndex + 1} of ${QUIZ_STEPS.length}`,
    [stepIndex],
  );

  function choose(optionId: string) {
    setAnswers((current) => ({ ...current, [step.id]: optionId }));
  }

  function back() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function next() {
    if (!selected) return;
    if (isLast) {
      const complete = { ...answers, [step.id]: selected };
      saveQuizAnswers(complete);
      router.push("/processing");
      return;
    }
    setStepIndex((index) => index + 1);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pb-16 sm:px-6">
        <ProgressBar
          current={stepIndex + 1}
          total={QUIZ_STEPS.length}
          label={progressLabel}
        />

        <div key={step.id} className="rise mt-10 space-y-3">
          <p className="text-xs tracking-[0.22em] uppercase text-brass-dark">
            {step.id === "chaos"
              ? "Chaos"
              : step.id === "role"
                ? "Seat"
                : step.id === "fail"
                  ? "By 9pm"
                  : "Close"}
          </p>
          <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {step.title}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-ink-soft">{step.helper}</p>
        </div>

        <ul className="mt-8 space-y-2.5" role="listbox" aria-label={step.title}>
          {step.options.map((option) => {
            const active = selected === option.id;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => choose(option.id)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-3.5 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-card text-ink hover:border-ink/40",
                  )}
                >
                  <span className="block text-[15px] font-medium">{option.label}</span>
                  {option.hint ? (
                    <span
                      className={cn(
                        "mt-0.5 block text-sm",
                        active ? "text-paper/70" : "text-muted",
                      )}
                    >
                      {option.hint}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex === 0}
            className="rounded-full px-4 py-2 text-sm text-ink-soft disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!selected}
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            {isLast ? "See your close" : "Continue"}
          </button>
        </div>
      </main>
    </div>
  );
}
