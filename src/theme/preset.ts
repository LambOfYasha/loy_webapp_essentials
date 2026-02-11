import { colors, typography, borderRadius, shadows, animation } from "./tokens";

export const loyTailwindPreset = {
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
          foreground: "var(--color-card-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize as Record<string, unknown>,
      borderRadius: borderRadius,
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
        "spin-slow": `spin-slow 3s linear infinite`,
      },
    },
  },
};
