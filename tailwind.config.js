/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dusk: {
          950: "#0F1826",
          900: "#141F33",
          800: "#1B2A45",
          700: "#233657",
          600: "#2E4470",
        },
        cloud: {
          50: "#F7F9FC",
          100: "#ECF1F8",
          200: "#D9E2F0",
        },
        mist: "#8FA3C4",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
