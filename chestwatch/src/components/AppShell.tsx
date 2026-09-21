"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Twin", icon: TwinIcon },
  { href: "/history", label: "Answers", icon: HistoryIcon },
  { href: "/settings", label: "Settings", icon: GearIcon },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <div className="flex-1">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/8 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-md grid-cols-3 px-4 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2">
          {tabs.map((tab) => {
            const active =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] tracking-wide ${
                  active ? "text-gold" : "text-mute"
                }`}
              >
                <tab.icon active={active} />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function TwinIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke={active ? "#C9A227" : "#8A8680"} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill={active ? "#C9A227" : "#8A8680"} />
    </svg>
  );
}

function HistoryIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 7.5h14M5 12h14M5 16.5h9"
        stroke={active ? "#C9A227" : "#8A8680"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.4" stroke={active ? "#C9A227" : "#8A8680"} strokeWidth="1.6" />
      <path
        d="M12 4.5v2.2M12 17.3V19.5M4.5 12h2.2M17.3 12H19.5M6.6 6.6l1.6 1.6M15.8 15.8l1.6 1.6M17.4 6.6l-1.6 1.6M8.2 15.8l-1.6 1.6"
        stroke={active ? "#C9A227" : "#8A8680"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
