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
        background: "#0B0B0F",
        foreground: "#FFFFFF",
        f1: {
          red: "#E10600",
          dark: "#0B0B0F",
          card: "#15151E",
          gray: "#E5E7EB",
          light: "#F3F3F3",
        },
      },
      fontFamily: {
        f1: ["var(--font-f1)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "f1-glow": "radial-gradient(circle at center, rgba(225, 6, 0, 0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
