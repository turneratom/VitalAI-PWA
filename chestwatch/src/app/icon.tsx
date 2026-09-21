import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
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
            width: 360,
            height: 360,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "22px solid #C9A227",
            background: "#121218",
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
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
