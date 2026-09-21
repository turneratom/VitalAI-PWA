export function Seal({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "sm" ? 56 : size === "lg" ? 112 : 80;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 112 112"
      aria-hidden="true"
      className="text-seal"
    >
      <circle
        cx="56"
        cy="56"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle
        cx="56"
        cy="56"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <text
        x="56"
        y="64"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-display), serif"
        fontSize="42"
        fontWeight="500"
      >
        T
      </text>
    </svg>
  );
}
