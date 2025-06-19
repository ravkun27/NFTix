/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
        body: ["Rajdhani", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        text: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
