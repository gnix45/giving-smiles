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
        primary: "#00616c",
        "primary-container": "#007c89",
        secondary: "#38656a",
        tertiary: "#7b4f00",
        surface: "#f8fafb",
        "surface-container": "#eceeef",
        "surface-container-low": "#f2f4f5",
        "surface-container-highest": "#ffffff",
        "on-surface": "#191c1d",
        "on-surface-variant": "#3e494a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        headline: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
