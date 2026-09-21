import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 py-24 text-center">
      <p className="kicker text-seal">Missing plate</p>
      <h1 className="mt-3 font-display text-4xl text-ink">This page is not in the vault</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        The room you asked for has not been written. Return to the house and choose a known door.
      </p>
      <Link href="/" className="mt-8 inline-block font-display text-xl text-seal">
        Home
      </Link>
    </div>
  );
}
