export function PageHeader({
  kicker,
  title,
  dek,
}: {
  kicker?: string;
  title: string;
  dek?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-14 pb-8 text-center">
      {kicker ? (
        <p className="kicker mb-3 text-seal">{kicker}</p>
      ) : null}
      <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <span className="ornament mx-auto mt-5 block" />
      {dek ? (
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          {dek}
        </p>
      ) : null}
    </header>
  );
}
