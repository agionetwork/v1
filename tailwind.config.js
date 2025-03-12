/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(0, 0%, 100%)", // White background
        foreground: "hsl(220, 60%, 10%)", // Very dark blue, almost black for text
        primary: {
          DEFAULT: "hsl(228, 100%, 66%)", // AGIO blue (#5271FF)
          foreground: "hsl(0, 0%, 100%)", // White text on primary background
        },
        secondary: {
          DEFAULT: "hsl(220, 100%, 85%)", // Light blue
          foreground: "hsl(228, 100%, 66%)", // AGIO blue
        },
        muted: {
          DEFAULT: "hsl(220, 60%, 96%)", // Very light grayish blue
          foreground: "hsl(220, 60%, 40%)", // Medium blue for muted text
        },
        accent: {
          DEFAULT: "hsl(228, 100%, 66%)", // AGIO blue
          foreground: "hsl(0, 0%, 100%)", // White text on accent
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)", // White
          foreground: "hsl(220, 60%, 10%)", // Very dark blue for text in cards
        },
        agio: {
          DEFAULT: "hsl(228, 100%, 66%)", // AGIO blue (#5271FF)
          light: "hsl(228, 100%, 85%)",
          dark: "hsl(228, 100%, 45%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

