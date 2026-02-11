import { colors } from "./tokens";

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;
}

export const lightTheme: ThemeColors = {
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
  infoForeground: "#ffffff",
};

export const darkTheme: ThemeColors = {
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
  infoForeground: "#ffffff",
};

export function themeToCssVariables(theme: ThemeColors): Record<string, string> {
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
    "--color-info-foreground": theme.infoForeground,
  };
}

export function generateCssVariablesString(theme: ThemeColors): string {
  const vars = themeToCssVariables(theme);
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

export function generateThemeStylesheet(): string {
  return `:root {\n${generateCssVariablesString(lightTheme)}\n}\n\n.dark {\n${generateCssVariablesString(darkTheme)}\n}`;
}
