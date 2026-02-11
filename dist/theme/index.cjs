"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/theme/index.ts
var theme_exports = {};
__export(theme_exports, {
  animation: () => animation,
  borderRadius: () => borderRadius,
  colors: () => colors,
  darkTheme: () => darkTheme,
  generateCssVariablesString: () => generateCssVariablesString,
  generateThemeStylesheet: () => generateThemeStylesheet,
  lightTheme: () => lightTheme,
  loyTailwindPreset: () => loyTailwindPreset,
  shadows: () => shadows,
  spacing: () => spacing,
  themeToCssVariables: () => themeToCssVariables,
  typography: () => typography
});
module.exports = __toCommonJS(theme_exports);

// src/theme/tokens.ts
var colors = {
  // Brand
  primary: {
    50: "#f0f4ff",
    100: "#dbe4ff",
    200: "#bac8ff",
    300: "#91a7ff",
    400: "#748ffc",
    500: "#5c7cfa",
    600: "#4c6ef5",
    700: "#4263eb",
    800: "#3b5bdb",
    900: "#364fc7",
    950: "#2b3fa0"
  },
  secondary: {
    50: "#f3f0ff",
    100: "#e5dbff",
    200: "#d0bfff",
    300: "#b197fc",
    400: "#9775fa",
    500: "#845ef7",
    600: "#7950f2",
    700: "#7048e8",
    800: "#6741d9",
    900: "#5f3dc4",
    950: "#4c2fa3"
  },
  success: {
    50: "#ebfbee",
    100: "#d3f9d8",
    200: "#b2f2bb",
    300: "#8ce99a",
    400: "#69db7c",
    500: "#51cf66",
    600: "#40c057",
    700: "#37b24d",
    800: "#2f9e44",
    900: "#2b8a3e",
    950: "#1e7a32"
  },
  danger: {
    50: "#fff5f5",
    100: "#ffe3e3",
    200: "#ffc9c9",
    300: "#ffa8a8",
    400: "#ff8787",
    500: "#ff6b6b",
    600: "#fa5252",
    700: "#f03e3e",
    800: "#e03131",
    900: "#c92a2a",
    950: "#a51d1d"
  },
  warning: {
    50: "#fff9db",
    100: "#fff3bf",
    200: "#ffec99",
    300: "#ffe066",
    400: "#ffd43b",
    500: "#fcc419",
    600: "#fab005",
    700: "#f59f00",
    800: "#f08c00",
    900: "#e67700",
    950: "#c45e00"
  },
  info: {
    50: "#e7f5ff",
    100: "#d0ebff",
    200: "#a5d8ff",
    300: "#74c0fc",
    400: "#4dabf7",
    500: "#339af0",
    600: "#228be6",
    700: "#1c7ed6",
    800: "#1971c2",
    900: "#1864ab",
    950: "#124d8a"
  },
  neutral: {
    50: "#f8f9fa",
    100: "#f1f3f5",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#868e96",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
    950: "#0d1117"
  }
};
var typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    mono: ["JetBrains Mono", "Fira Code", "monospace"]
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }]
  }
};
var spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem"
};
var borderRadius = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
var shadows = {
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000"
};
var animation = {
  keyframes: {
    "fade-in": {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" }
    },
    "fade-out": {
      "0%": { opacity: "1" },
      "100%": { opacity: "0" }
    },
    "slide-in-from-top": {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(0)" }
    },
    "slide-in-from-bottom": {
      "0%": { transform: "translateY(100%)" },
      "100%": { transform: "translateY(0)" }
    },
    "slide-in-from-left": {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(0)" }
    },
    "slide-in-from-right": {
      "0%": { transform: "translateX(100%)" },
      "100%": { transform: "translateX(0)" }
    },
    "scale-in": {
      "0%": { transform: "scale(0.95)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" }
    },
    "spin-slow": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" }
    }
  },
  durations: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms"
  }
};

// src/theme/preset.ts
var loyTailwindPreset = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        danger: colors.danger,
        warning: colors.warning,
        info: colors.info,
        neutral: colors.neutral,
        // CSS variable-based semantic colors (for shadcn/ui compatibility)
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)"
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)"
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)"
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)"
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      borderRadius,
      boxShadow: shadows,
      keyframes: animation.keyframes,
      animation: {
        "fade-in": `fade-in ${animation.durations.normal} ease-out`,
        "fade-out": `fade-out ${animation.durations.normal} ease-in`,
        "slide-in-from-top": `slide-in-from-top ${animation.durations.normal} ease-out`,
        "slide-in-from-bottom": `slide-in-from-bottom ${animation.durations.normal} ease-out`,
        "slide-in-from-left": `slide-in-from-left ${animation.durations.normal} ease-out`,
        "slide-in-from-right": `slide-in-from-right ${animation.durations.normal} ease-out`,
        "scale-in": `scale-in ${animation.durations.normal} ease-out`,
        "spin-slow": `spin-slow 3s linear infinite`
      }
    }
  }
};

// src/theme/css-variables.ts
var lightTheme = {
  primary: colors.primary[600],
  primaryForeground: "#ffffff",
  secondary: colors.secondary[600],
  secondaryForeground: "#ffffff",
  background: "#ffffff",
  foreground: colors.neutral[900],
  card: "#ffffff",
  cardForeground: colors.neutral[900],
  muted: colors.neutral[100],
  mutedForeground: colors.neutral[600],
  accent: colors.neutral[100],
  accentForeground: colors.neutral[900],
  destructive: colors.danger[600],
  destructiveForeground: "#ffffff",
  border: colors.neutral[200],
  input: colors.neutral[200],
  ring: colors.primary[500],
  success: colors.success[600],
  successForeground: "#ffffff",
  warning: colors.warning[600],
  warningForeground: colors.neutral[900],
  info: colors.info[600],
  infoForeground: "#ffffff"
};
var darkTheme = {
  primary: colors.primary[500],
  primaryForeground: "#ffffff",
  secondary: colors.secondary[400],
  secondaryForeground: "#ffffff",
  background: colors.neutral[950],
  foreground: colors.neutral[50],
  card: colors.neutral[900],
  cardForeground: colors.neutral[50],
  muted: colors.neutral[800],
  mutedForeground: colors.neutral[400],
  accent: colors.neutral[800],
  accentForeground: colors.neutral[50],
  destructive: colors.danger[500],
  destructiveForeground: "#ffffff",
  border: colors.neutral[800],
  input: colors.neutral[800],
  ring: colors.primary[400],
  success: colors.success[500],
  successForeground: "#ffffff",
  warning: colors.warning[500],
  warningForeground: colors.neutral[900],
  info: colors.info[400],
  infoForeground: "#ffffff"
};
function themeToCssVariables(theme) {
  return {
    "--color-primary": theme.primary,
    "--color-primary-foreground": theme.primaryForeground,
    "--color-secondary": theme.secondary,
    "--color-secondary-foreground": theme.secondaryForeground,
    "--color-background": theme.background,
    "--color-foreground": theme.foreground,
    "--color-card": theme.card,
    "--color-card-foreground": theme.cardForeground,
    "--color-muted": theme.muted,
    "--color-muted-foreground": theme.mutedForeground,
    "--color-accent": theme.accent,
    "--color-accent-foreground": theme.accentForeground,
    "--color-destructive": theme.destructive,
    "--color-destructive-foreground": theme.destructiveForeground,
    "--color-border": theme.border,
    "--color-input": theme.input,
    "--color-ring": theme.ring,
    "--color-success": theme.success,
    "--color-success-foreground": theme.successForeground,
    "--color-warning": theme.warning,
    "--color-warning-foreground": theme.warningForeground,
    "--color-info": theme.info,
    "--color-info-foreground": theme.infoForeground
  };
}
function generateCssVariablesString(theme) {
  const vars = themeToCssVariables(theme);
  return Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`).join("\n");
}
function generateThemeStylesheet() {
  return `:root {
${generateCssVariablesString(lightTheme)}
}

.dark {
${generateCssVariablesString(darkTheme)}
}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  animation,
  borderRadius,
  colors,
  darkTheme,
  generateCssVariablesString,
  generateThemeStylesheet,
  lightTheme,
  loyTailwindPreset,
  shadows,
  spacing,
  themeToCssVariables,
  typography
});
//# sourceMappingURL=index.cjs.map