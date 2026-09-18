export type QuizOption = {
  id: string;
  label: string;
  hint?: string;
};

export type QuizStep = {
  id: string;
  title: string;
  helper: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: "chaos",
    title: "By 6pm, what’s the chaos level?",
    helper: "Not a mood. The actual pile on a normal weekday.",
    options: [
      { id: "quiet", label: "Quiet", hint: "The day mostly holds." },
      { id: "manageable", label: "Manageable", hint: "Busy, still in control." },
      { id: "crowded", label: "Crowded", hint: "Too many open loops." },
      { id: "loud", label: "Loud", hint: "Everything wants you at once." },
      { id: "on-fire", label: "On fire", hint: "You’re already behind the behind." },
    ],
  },
  {
    id: "role",
    title: "What seat are you in?",
    helper: "We’ll match the close to how your day is actually shaped.",
    options: [
      { id: "founder", label: "Founder / operator" },
      { id: "manager", label: "People manager" },
      { id: "ic", label: "Individual contributor" },
      { id: "freelance", label: "Freelancer / consultant" },
      { id: "caregiver", label: "Caregiver who also works" },
      { id: "other", label: "Something else, still adult and busy" },
    ],
  },
  {
    id: "fail",
    title: "What is usually already dead by 9pm?",
    helper: "Pick the loop that loses most nights. That’s the leak.",
    options: [
      { id: "inbox", label: "Inbox / follow-ups" },
      { id: "body", label: "Workout, walk, or any body care" },
      { id: "deep-work", label: "The one hard thing" },
      { id: "household", label: "Dinner / household close" },
      { id: "family", label: "Kids, partner, or family close" },
      { id: "sleep", label: "Sleep — I keep borrowing from it" },
      { id: "promises", label: "Things I told someone I’d do" },
      { id: "close", label: "Nothing specific — I just never close" },
    ],
  },
  {
    id: "stop",
    title: "When does the workday actually end?",
    helper: "The real one. Not the calendar one.",
    options: [
      { id: "five-six", label: "5–6pm" },
      { id: "seven-eight", label: "7–8pm" },
      { id: "nine-ten", label: "9–10pm" },
      { id: "after-asleep", label: "After everyone else is asleep" },
      { id: "never", label: "It doesn’t" },
    ],
  },
  {
    id: "close-now",
    title: "How do you close the day now?",
    helper: "Be honest. Abandoned systems count.",
    options: [
      { id: "dont", label: "I don’t" },
      { id: "scroll", label: "Scroll until I crash" },
      { id: "rewrite", label: "Rewrite tomorrow’s list" },
      { id: "journal", label: "Journal, when I remember" },
      { id: "abandoned", label: "Another app I already quit" },
    ],
  },
  {
    id: "loops",
    title: "How many unfinished loops are still open at bedtime?",
    helper: "Messages, chores, promises, tabs — all of it.",
    options: [
      { id: "0-1", label: "0–1" },
      { id: "2-3", label: "2–3" },
      { id: "4-6", label: "4–6" },
      { id: "lost", label: "I lose count" },
    ],
  },
  {
    id: "tomorrow",
    title: "What should tomorrow open with?",
    helper: "If you could protect only one move.",
    options: [
      { id: "hard-thing", label: "One hard thing" },
      { id: "person", label: "One person I owe" },
      { id: "body", label: "One body / health move" },
      { id: "house", label: "One household close" },
      { id: "undecided", label: "I never decide until morning" },
    ],
  },
  {
    id: "apps",
    title: "What’s your history with habit apps?",
    helper: "One Win is not a pet, a kid game, or a 40-habit stack.",
    options: [
      { id: "too-many", label: "Too many. None stuck." },
      { id: "punish", label: "Streaks that punish me" },
      { id: "cute", label: "Too cute / gamified for me" },
      { id: "years", label: "Haven’t tried in years" },
      { id: "quiet", label: "I need something quieter" },
    ],
  },
  {
    id: "who",
    title: "Who notices if you don’t close the day?",
    helper: "The cost shows up somewhere.",
    options: [
      { id: "snap", label: "Nobody — until I snap" },
      { id: "partner", label: "My partner" },
      { id: "team", label: "My team" },
      { id: "kids", label: "My kids / family" },
      { id: "1am", label: "Me, at 1am" },
    ],
  },
  {
    id: "time",
    title: "How much time will you actually give a close?",
    helper: "The product is built for under 60 seconds. That’s the point.",
    options: [
      { id: "30s", label: "30 seconds" },
      { id: "60s", label: "Under a minute" },
      { id: "2-3", label: "2–3 minutes" },
      { id: "week", label: "I’ll try a week and see" },
    ],
  },
];

export type QuizAnswers = Record<string, string>;

const QUIZ_KEY = "onewin:quiz";

export function saveQuizAnswers(answers: QuizAnswers) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(QUIZ_KEY, JSON.stringify(answers));
  window.localStorage.setItem(QUIZ_KEY, JSON.stringify(answers));
}

export function loadQuizAnswers(): QuizAnswers {
  if (typeof window === "undefined") return {};
  const raw =
    window.sessionStorage.getItem(QUIZ_KEY) ??
    window.localStorage.getItem(QUIZ_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as QuizAnswers;
    }
  } catch {
    return {};
  }
  return {};
}

export function optionLabel(stepId: string, optionId: string): string {
  const step = QUIZ_STEPS.find((item) => item.id === stepId);
  return step?.options.find((option) => option.id === optionId)?.label ?? optionId;
}

export function processingLines(answers: QuizAnswers): string[] {
  const role = optionLabel("role", answers.role ?? "");
  const fail = optionLabel("fail", answers.fail ?? "");
  const chaos = optionLabel("chaos", answers.chaos ?? "");

  return [
    answers.role
      ? `Reading a close for a ${role.toLowerCase()}.`
      : "Reading how your day actually ends.",
    answers.fail
      ? `Mapping why “${fail.toLowerCase()}” is usually dead by 9pm.`
      : "Mapping what fails by 9pm.",
    answers.chaos
      ? `Cutting a 60-second close that survives ${chaos.toLowerCase()} evenings.`
      : "Cutting the close to 60 seconds.",
    "Building a streak you can keep after a real day.",
  ];
}

export function paywallSummary(answers: QuizAnswers): string {
  const role = answers.role ? optionLabel("role", answers.role) : "busy adult";
  const fail = answers.fail
    ? optionLabel("fail", answers.fail).toLowerCase()
    : "the day";
  const chaos = answers.chaos
    ? optionLabel("chaos", answers.chaos).toLowerCase()
    : "crowded";

  return `You’re a ${role.toLowerCase()} whose ${fail} usually loses by 9pm. Chaos sits at ${chaos}. One Win is a 60-second close — one win, one move, a streak that fits that evening.`;
}
