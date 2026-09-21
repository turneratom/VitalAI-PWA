import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07070A",
        }}
      >
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "10px solid #C9A227",
            background: "#121218",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "#C9A227",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
