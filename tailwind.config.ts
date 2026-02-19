import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050a14",
        surface: "#0d1628",
        "surface-elevated": "#111d35",
        border: "#1e2d4a",
        "neon-purple": "#8b5cf6",
        "neon-cyan": "#06b6d4",
        "neon-pink": "#ec4899",
        "text-primary": "#f0f4ff",
        "text-secondary": "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        "neon-purple": "0 0 20px rgba(139,92,246,0.4)",
        "neon-cyan": "0 0 20px rgba(6,182,212,0.4)",
        "card-glow": "0 4px 32px rgba(139,92,246,0.12)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
