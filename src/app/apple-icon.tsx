import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
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
          background: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)",
          borderRadius: "40px",
          color: "white",
          fontSize: "72px",
          fontWeight: 700,
          letterSpacing: "-3px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        KS
      </div>
    ),
    {
      ...size,
    }
  );
}
