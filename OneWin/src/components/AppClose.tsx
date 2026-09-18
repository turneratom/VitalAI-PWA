"use client";

import { useMemo, useState, type FormEvent } from "react";
import { BrandMark } from "@/components/BrandMark";
import { addDaysISO, formatDisplayDate, localDateISO, weekdayLabel } from "@/lib/dates";
import { loadQuizAnswers, optionLabel } from "@/lib/quiz";
import {
  WIN_MAX,
  computeStreak,
  emptyState,
  entryOn,
  lastNDates,
  loadAppState,
  saveAppState,
  upsertToday,
  type AppState,
} from "@/lib/storage";
import { cn } from "@/lib/cn";
import { useIsClient } from "@/lib/use-is-client";

export function AppClose() {
  const isClient = useIsClient();
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AppState>(emptyState);
  const [win, setWin] = useState("");
  const [move, setMove] = useState("");
  const [editing, setEditing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [roleLabel, setRoleLabel] = useState("");

  const today = localDateISO();
  const yesterday = addDaysISO(today, -1);
  const todayEntry = entryOn(state, today);
  const yesterdayEntry = entryOn(state, yesterday);
  const streak = computeStreak(state, today);
  const week = lastNDates(7, today);
  const closedToday = Boolean(todayEntry) && !editing;

  if (isClient && !ready) {
    const loaded = loadAppState();
    const existing = entryOn(loaded, localDateISO());
    const quiz = loadQuizAnswers();
    setState(loaded);
    if (existing) {
      setWin(existing.win);
      setMove(existing.tomorrowMove);
    }
    if (quiz.role) setRoleLabel(optionLabel("role", quiz.role));
    setReady(true);
  }

  function save(event: FormEvent) {
    event.preventDefault();
    if (!win.trim() || !move.trim()) return;
    const next = upsertToday(state, win, move, today);
    setState(next);
    saveAppState(next);
    setEditing(false);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  const greeting = useMemo(() => {
    if (roleLabel) return `Evening close · ${roleLabel.toLowerCase()}`;
    return "Evening close";
  }, [roleLabel]);

  if (!ready) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center">
        <p className="text-sm tracking-[0.18em] uppercase text-muted">Opening today’s close</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <BrandMark href="/app" size="sm" />
        <p className="text-sm text-ink-soft">
          <span className="font-serif text-lg text-ink">{streak}</span>
          <span className="ml-1.5 tracking-[0.14em] uppercase text-muted">
            {streak === 1 ? "day" : "day streak"}
          </span>
        </p>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-5 pb-16">
        <p className="text-xs tracking-[0.22em] uppercase text-brass-dark">{greeting}</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {formatDisplayDate(today)}
        </h1>
        <p className="mt-2 text-sm text-muted">One win. One move. Under 60 seconds.</p>

        <ol className="mt-6 flex gap-2" aria-label="Last seven days">
          {week.map((date) => {
            const closed = Boolean(entryOn(state, date));
            const isToday = date === today;
            return (
              <li key={date} className="flex-1">
                <div
                  className={cn(
                    "flex h-12 flex-col items-center justify-center rounded-xl border text-xs",
                    closed
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-card text-muted",
                    isToday && !closed && "border-brass text-ink",
                  )}
                  title={date}
                >
                  <span className="tracking-wide">{weekdayLabel(date)}</span>
                  {closed ? <span aria-label="Closed">•</span> : <span aria-hidden>–</span>}
                </div>
              </li>
            );
          })}
        </ol>

        {yesterdayEntry ? (
          <aside className="mt-8 rounded-2xl border border-line bg-card px-4 py-4">
            <p className="text-xs tracking-[0.18em] uppercase text-muted">Yesterday asked today to start with</p>
            <p className="mt-2 font-serif text-xl leading-snug text-ink">
              {yesterdayEntry.tomorrowMove}
            </p>
          </aside>
        ) : null}

        {closedToday && todayEntry ? (
          <section className="mt-8 space-y-5">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-muted">Today’s win</p>
              <p className="mt-2 font-serif text-2xl leading-snug text-ink">{todayEntry.win}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-muted">Tomorrow’s move</p>
              <p className="mt-2 font-serif text-2xl leading-snug text-ink">
                {todayEntry.tomorrowMove}
              </p>
            </div>
            {savedFlash ? (
              <p className="text-sm text-olive">Closed. See you tomorrow.</p>
            ) : (
              <p className="text-sm text-muted">Day closed. That’s the whole product.</p>
            )}
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm text-ink underline decoration-line underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70"
            >
              Edit today’s close
            </button>
          </section>
        ) : (
          <form onSubmit={save} className="mt-8 space-y-6">
            <Field
              id="win"
              label="Today’s one win"
              hint="The thing that actually landed. One sentence."
              value={win}
              onChange={setWin}
            />
            <Field
              id="move"
              label="One move for tomorrow"
              hint="The first useful thing tomorrow should open with."
              value={move}
              onChange={setMove}
            />
            <button
              type="submit"
              disabled={!win.trim() || !move.trim()}
              className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-paper disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Close the day
            </button>
            {editing ? (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="w-full text-sm text-muted"
              >
                Cancel
              </button>
            ) : null}
          </form>
        )}

        {state.entries.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xs tracking-[0.18em] uppercase text-muted">Recent closes</h2>
            <ul className="mt-4 space-y-4">
              {[...state.entries]
                .reverse()
                .slice(0, 7)
                .map((entry) => (
                  <li key={entry.date} className="border-t border-line pt-4">
                    <p className="text-xs text-muted">{entry.date}</p>
                    <p className="mt-1 text-sm text-ink">{entry.win}</p>
                    <p className="mt-1 text-sm text-ink-soft">Tomorrow: {entry.tomorrowMove}</p>
                  </li>
                ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <p className="mt-1 text-sm text-muted">{hint}</p>
      <textarea
        id={id}
        value={value}
        maxLength={WIN_MAX}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full resize-none rounded-2xl border border-line bg-card px-4 py-3 text-base leading-relaxed text-ink outline-none focus:border-ink focus:ring-2 focus:ring-brass/40"
      />
      <p className="mt-1 text-right text-xs text-muted">
        {value.length}/{WIN_MAX}
      </p>
    </div>
  );
}
