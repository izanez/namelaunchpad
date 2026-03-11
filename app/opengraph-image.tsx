import { ImageResponse } from "next/og";

export const alt = "NameLaunchpad social preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 20%, rgba(34,211,238,0.22), transparent 28%), radial-gradient(circle at 82% 18%, rgba(168,85,247,0.28), transparent 26%), radial-gradient(circle at 55% 88%, rgba(59,130,246,0.18), transparent 25%), linear-gradient(160deg, #0f172a, #020617)",
          color: "white",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 36,
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "linear-gradient(135deg, #22d3ee, #3b82f6, #a855f7)",
              boxShadow: "0 0 24px rgba(34,211,238,0.45)",
            }}
          />
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#ffffff" }}>Name</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #67e8f9, #60a5fa, #c084fc)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Launch
            </span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #c084fc, #e879f9, #67e8f9)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              pad
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              border: "1px solid rgba(34,211,238,0.26)",
              background: "rgba(34,211,238,0.08)",
              borderRadius: 999,
              padding: "10px 18px",
              color: "#a5f3fc",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 26,
            }}
          >
            AI Username Platform
          </div>
          <div
            style={{
              maxWidth: 860,
              fontSize: 70,
              lineHeight: 1.02,
              letterSpacing: "-0.05em",
              fontWeight: 800,
            }}
          >
            NameLaunchpad
          </div>
          <div
            style={{
              maxWidth: 760,
              marginTop: 22,
              fontSize: 30,
              lineHeight: 1.3,
              color: "rgba(226,232,240,0.9)",
            }}
          >
            Generate cool usernames for gaming, social media and streaming.
          </div>
        </div>
      </div>
    ),
    size
  );
}
