export type TwinSession = {
  id: string;
  createdAt: number;
  question: string;
  answer: string;
  imageDataUrl?: string;
};

const SESSIONS_KEY = "chestwatch.sessions.v1";
const PAIR_KEY = "chestwatch.choker.paired";
const MAX_SESSIONS = 40;

function canUseStorage() {
  return typeof window !== "undefined";
}

export function loadSessions(): TwinSession[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TwinSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSession(session: TwinSession) {
  if (!canUseStorage()) return;
  const next = [session, ...loadSessions()].slice(0, MAX_SESSIONS);
  window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("chestwatch-sessions"));
}

export function clearSessions() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSIONS_KEY);
  window.dispatchEvent(new Event("chestwatch-sessions"));
}

export function subscribeSessions(onStoreChange: () => void) {
  if (!canUseStorage()) return () => undefined;
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("chestwatch-sessions", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("chestwatch-sessions", onStoreChange);
  };
}

const EMPTY_SESSIONS: TwinSession[] = [];
let sessionsCacheRaw = "";
let sessionsCache: TwinSession[] = EMPTY_SESSIONS;

export function getSessionsSnapshot(): TwinSession[] {
  if (!canUseStorage()) return EMPTY_SESSIONS;
  const raw = window.localStorage.getItem(SESSIONS_KEY) ?? "";
  if (raw === sessionsCacheRaw) return sessionsCache;
  sessionsCacheRaw = raw;
  try {
    const parsed = JSON.parse(raw) as TwinSession[];
    sessionsCache = Array.isArray(parsed) ? parsed : EMPTY_SESSIONS;
  } catch {
    sessionsCache = EMPTY_SESSIONS;
  }
  return sessionsCache;
}

export function getSessionsServerSnapshot(): TwinSession[] {
  return EMPTY_SESSIONS;
}

export function isChokerPaired() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(PAIR_KEY) === "1";
}

export function setChokerPaired(paired: boolean) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PAIR_KEY, paired ? "1" : "0");
  window.dispatchEvent(new Event("chestwatch-pair"));
}

export function subscribePair(onStoreChange: () => void) {
  if (!canUseStorage()) return () => undefined;
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("chestwatch-pair", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("chestwatch-pair", onStoreChange);
  };
}
