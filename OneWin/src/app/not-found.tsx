import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="px-5 py-5 sm:px-8">
        <BrandMark />
      </header>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-5 pb-24">
        <h1 className="font-serif text-4xl text-ink">That page isn’t here.</h1>
        <p className="mt-3 text-ink-soft">Head back to the close.</p>
        <Link
          href="/"
          className="mt-8 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm text-paper"
        >
          Home
        </Link>
      </main>
    </div>
  );
}
