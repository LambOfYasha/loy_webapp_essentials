// Standalone Tailwind preset file for use in tailwind.config.js
// Usage: presets: [require('loy-webapp-essentials/tailwind-preset')]

const colors = {
  primary: {
    50: "#f0f4ff", 100: "#dbe4ff", 200: "#bac8ff", 300: "#91a7ff",
    400: "#748ffc", 500: "#5c7cfa", 600: "#4c6ef5", 700: "#4263eb",
    800: "#3b5bdb", 900: "#364fc7", 950: "#2b3fa0",
  },
  secondary: {
    50: "#f3f0ff", 100: "#e5dbff", 200: "#d0bfff", 300: "#b197fc",
    400: "#9775fa", 500: "#845ef7", 600: "#7950f2", 700: "#7048e8",
    800: "#6741d9", 900: "#5f3dc4", 950: "#4c2fa3",
  },
  success: {
    50: "#ebfbee", 100: "#d3f9d8", 200: "#b2f2bb", 300: "#8ce99a",
    400: "#69db7c", 500: "#51cf66", 600: "#40c057", 700: "#37b24d",
    800: "#2f9e44", 900: "#2b8a3e", 950: "#1e7a32",
  },
  danger: {
    50: "#fff5f5", 100: "#ffe3e3", 200: "#ffc9c9", 300: "#ffa8a8",
    400: "#ff8787", 500: "#ff6b6b", 600: "#fa5252", 700: "#f03e3e",
    800: "#e03131", 900: "#c92a2a", 950: "#a51d1d",
  },
  warning: {
    50: "#fff9db", 100: "#fff3bf", 200: "#ffec99", 300: "#ffe066",
    400: "#ffd43b", 500: "#fcc419", 600: "#fab005", 700: "#f59f00",
    800: "#f08c00", 900: "#e67700", 950: "#c45e00",
  },
  info: {
    50: "#e7f5ff", 100: "#d0ebff", 200: "#a5d8ff", 300: "#74c0fc",
    400: "#4dabf7", 500: "#339af0", 600: "#228be6", 700: "#1c7ed6",
    800: "#1971c2", 900: "#1864ab", 950: "#124d8a",
  },
  neutral: {
    50: "#f8f9fa", 100: "#f1f3f5", 200: "#e9ecef", 300: "#dee2e6",
    400: "#ced4da", 500: "#adb5bd", 600: "#868e96", 700: "#495057",
    800: "#343a40", 900: "#212529", 950: "#0d1117",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: { DEFAULT: "var(--color-card)", foreground: "var(--color-card-foreground)" },
        muted: { DEFAULT: "var(--color-muted)", foreground: "var(--color-muted-foreground)" },
        accent: { DEFAULT: "var(--color-accent)", foreground: "var(--color-accent-foreground)" },
        destructive: { DEFAULT: "var(--color-destructive)", foreground: "var(--color-destructive-foreground)" },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        none: "0", sm: "0.25rem", md: "0.375rem", lg: "0.5rem",
        xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "0 0 #0000",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-out": { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
        "slide-in-from-top": { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(0)" } },
        "slide-in-from-bottom": { "0%": { transform: "translateY(100%)" }, "100%": { transform: "translateY(0)" } },
        "scale-in": { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out",
        "fade-out": "fade-out 250ms ease-in",
        "slide-in-from-top": "slide-in-from-top 250ms ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 250ms ease-out",
        "scale-in": "scale-in 250ms ease-out",
      },
    },
  },
};
