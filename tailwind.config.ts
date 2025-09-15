// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-mono)"]
      },
      colors: {
        accent: {
          DEFAULT: "#6EE7F9",
          hover: "#22D3EE"
        },
        muted: "#8b8b94"
      },
      boxShadow: {
        brutalLight: "6px 6px 0 0 rgba(0,0,0,1)",
        brutalDark: "6px 6px 0 0 rgba(255,255,255,1)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate")
  ]
};

export default config;
