import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-noto-sans-thai)", "var(--font-noto-sans)"],
      mono: ["var(--font-noto-sans-mono)"],
    },
    extend: {
      colors: {}
    }
  },
  plugins: []
} satisfies Config;
