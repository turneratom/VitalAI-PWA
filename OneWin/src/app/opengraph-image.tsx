import { ImageResponse } from "next/og";

export const alt = "One Win — close the day in under a minute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eee4",
          color: "#1c1915",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.28em" }}>
          ONE WIN
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Close the day in under a minute.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#4a453d" }}>
            One win today. One move tomorrow. A streak for adults.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
