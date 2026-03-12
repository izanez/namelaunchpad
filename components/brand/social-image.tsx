type SocialImageProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  chips?: string[];
};

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function SocialImage({ title, subtitle, eyebrow = "NameLaunchpad", chips = [] }: SocialImageProps) {
  return (
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
          gap: 20,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 18,
            border: "2px solid rgba(125,211,252,0.45)",
            background: "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(2,6,23,0.96))",
            boxShadow: "0 0 28px rgba(34,211,238,0.18)",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            color: "#ffffff",
          }}
        >
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #e0f2fe, #7dd3fc, #d8b4fe)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            NL
          </span>
        </div>
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
          {eyebrow}
        </div>
        <div
          style={{
            maxWidth: 880,
            fontSize: 68,
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
            fontWeight: 800,
          }}
        >
          {title}
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
          {subtitle}
        </div>
        {chips.length > 0 ? (
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            {chips.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "rgba(226,232,240,0.92)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
