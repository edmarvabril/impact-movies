/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#0f172a",
        "secondary-bg": "#1f2937",
        "primary-text": "#ffffff",
        "accent-yellow": "#facc15",
        "accent-cyan": "#22d3ee",
        "button-bg": "#22d3ee",
        "tab-icon-active": "#facc15",
        "tab-icon-inactive": "#1f2937",
      },
    },
  },
  plugins: [],
};
