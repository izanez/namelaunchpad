import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#020617",
        neonPurple: "#a855f7",
        neonCyan: "#22d3ee",
        neonBlue: "#3b82f6",
      },
      boxShadow: {
        neon: "0 0 20px rgba(59,130,246,0.35), 0 0 35px rgba(168,85,247,0.25)",
        card: "0 12px 40px rgba(2,6,23,0.6)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(34,211,238,0.2)" },
          "50%": { boxShadow: "0 0 24px rgba(34,211,238,0.45)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
