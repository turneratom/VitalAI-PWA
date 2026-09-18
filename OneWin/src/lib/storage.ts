import { addDaysISO, localDateISO } from "./dates";

export const APP_STORAGE_KEY = "onewin:app";
export const UNLOCKED_KEY = "onewin:unlocked";
export const WIN_MAX = 160;

export type WinEntry = {
  date: string;
  win: string;
  tomorrowMove: string;
  closedAt: string;
};

export type AppState = {
  entries: WinEntry[];
};

export const emptyState: AppState = { entries: [] };

export function loadAppState(): AppState {
  if (typeof window === "undefined") return emptyState;
  const raw = window.localStorage.getItem(APP_STORAGE_KEY);
  if (!raw) return emptyState;
  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (!parsed || !Array.isArray(parsed.entries)) return emptyState;
    return {
      entries: parsed.entries.filter(
        (entry): entry is WinEntry =>
          !!entry &&
          typeof entry.date === "string" &&
          typeof entry.win === "string" &&
          typeof entry.tomorrowMove === "string",
      ),
    };
  } catch {
    return emptyState;
  }
}

export function saveAppState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
}

export function upsertToday(
  state: AppState,
  win: string,
  tomorrowMove: string,
  today = localDateISO(),
): AppState {
  const entry: WinEntry = {
    date: today,
    win: win.trim(),
    tomorrowMove: tomorrowMove.trim(),
    closedAt: new Date().toISOString(),
  };
  const entries = state.entries.filter((item) => item.date !== today);
  entries.push(entry);
  entries.sort((a, b) => a.date.localeCompare(b.date));
  return { entries };
}

export function entryOn(state: AppState, date: string): WinEntry | undefined {
  return state.entries.find((entry) => entry.date === date);
}

export function computeStreak(state: AppState, today = localDateISO()): number {
  const dates = new Set(state.entries.map((entry) => entry.date));
  let cursor = dates.has(today) ? today : addDaysISO(today, -1);
  let streak = 0;
  while (dates.has(cursor)) {
    streak += 1;
    cursor = addDaysISO(cursor, -1);
  }
  return streak;
}

export function lastNDates(n: number, today = localDateISO()): string[] {
  return Array.from({ length: n }, (_, index) => addDaysISO(today, index - (n - 1)));
}

export function markUnlocked() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(UNLOCKED_KEY, "1");
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(UNLOCKED_KEY) === "1";
}
