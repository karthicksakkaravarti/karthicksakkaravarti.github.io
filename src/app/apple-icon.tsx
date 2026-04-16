import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          borderRadius: 36,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "Arial, sans-serif",
            letterSpacing: -2,
          }}
        >
          KS
        </span>
      </div>
    ),
    { ...size }
  );
}
