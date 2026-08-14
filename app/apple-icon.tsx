import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Generated from the brand tokens at build time. */
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
          backgroundColor: "#0a0d12",
        }}
      >
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: "50%",
            border: "9px solid #00a8f0",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
