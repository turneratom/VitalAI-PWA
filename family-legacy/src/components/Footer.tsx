import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-rule/40 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="kicker text-[0.65rem] text-ink-soft">
          {site.vaultTitle} · Vaultkeeper {site.owner} · Root {site.rootName}
        </p>
        <p className="text-sm text-ink-soft">
          {site.covenant}{" "}
          <Link href="/chapters/the-vault" className="underline decoration-rule underline-offset-4">
            Read the covenant
          </Link>
        </p>
      </div>
    </footer>
  );
}
