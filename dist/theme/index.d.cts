declare const colors: {
    readonly primary: {
        readonly 50: "#f0f4ff";
        readonly 100: "#dbe4ff";
        readonly 200: "#bac8ff";
        readonly 300: "#91a7ff";
        readonly 400: "#748ffc";
        readonly 500: "#5c7cfa";
        readonly 600: "#4c6ef5";
        readonly 700: "#4263eb";
        readonly 800: "#3b5bdb";
        readonly 900: "#364fc7";
        readonly 950: "#2b3fa0";
    };
    readonly secondary: {
        readonly 50: "#f3f0ff";
        readonly 100: "#e5dbff";
        readonly 200: "#d0bfff";
        readonly 300: "#b197fc";
        readonly 400: "#9775fa";
        readonly 500: "#845ef7";
        readonly 600: "#7950f2";
        readonly 700: "#7048e8";
        readonly 800: "#6741d9";
        readonly 900: "#5f3dc4";
        readonly 950: "#4c2fa3";
    };
    readonly success: {
        readonly 50: "#ebfbee";
        readonly 100: "#d3f9d8";
        readonly 200: "#b2f2bb";
        readonly 300: "#8ce99a";
        readonly 400: "#69db7c";
        readonly 500: "#51cf66";
        readonly 600: "#40c057";
        readonly 700: "#37b24d";
        readonly 800: "#2f9e44";
        readonly 900: "#2b8a3e";
        readonly 950: "#1e7a32";
    };
    readonly danger: {
        readonly 50: "#fff5f5";
        readonly 100: "#ffe3e3";
        readonly 200: "#ffc9c9";
        readonly 300: "#ffa8a8";
        readonly 400: "#ff8787";
        readonly 500: "#ff6b6b";
        readonly 600: "#fa5252";
        readonly 700: "#f03e3e";
        readonly 800: "#e03131";
        readonly 900: "#c92a2a";
        readonly 950: "#a51d1d";
    };
    readonly warning: {
        readonly 50: "#fff9db";
        readonly 100: "#fff3bf";
        readonly 200: "#ffec99";
        readonly 300: "#ffe066";
        readonly 400: "#ffd43b";
        readonly 500: "#fcc419";
        readonly 600: "#fab005";
        readonly 700: "#f59f00";
        readonly 800: "#f08c00";
        readonly 900: "#e67700";
        readonly 950: "#c45e00";
    };
    readonly info: {
        readonly 50: "#e7f5ff";
        readonly 100: "#d0ebff";
        readonly 200: "#a5d8ff";
        readonly 300: "#74c0fc";
        readonly 400: "#4dabf7";
        readonly 500: "#339af0";
        readonly 600: "#228be6";
        readonly 700: "#1c7ed6";
        readonly 800: "#1971c2";
        readonly 900: "#1864ab";
        readonly 950: "#124d8a";
    };
    readonly neutral: {
        readonly 50: "#f8f9fa";
        readonly 100: "#f1f3f5";
        readonly 200: "#e9ecef";
        readonly 300: "#dee2e6";
        readonly 400: "#ced4da";
        readonly 500: "#adb5bd";
        readonly 600: "#868e96";
        readonly 700: "#495057";
        readonly 800: "#343a40";
        readonly 900: "#212529";
        readonly 950: "#0d1117";
    };
};
declare const typography: {
    readonly fontFamily: {
        readonly sans: readonly ["Inter", "system-ui", "-apple-system", "sans-serif"];
        readonly mono: readonly ["JetBrains Mono", "Fira Code", "monospace"];
    };
    readonly fontSize: {
        readonly xs: readonly ["0.75rem", {
            readonly lineHeight: "1rem";
        }];
        readonly sm: readonly ["0.875rem", {
            readonly lineHeight: "1.25rem";
        }];
        readonly base: readonly ["1rem", {
            readonly lineHeight: "1.5rem";
        }];
        readonly lg: readonly ["1.125rem", {
            readonly lineHeight: "1.75rem";
        }];
        readonly xl: readonly ["1.25rem", {
            readonly lineHeight: "1.75rem";
        }];
        readonly "2xl": readonly ["1.5rem", {
            readonly lineHeight: "2rem";
        }];
        readonly "3xl": readonly ["1.875rem", {
            readonly lineHeight: "2.25rem";
        }];
        readonly "4xl": readonly ["2.25rem", {
            readonly lineHeight: "2.5rem";
        }];
        readonly "5xl": readonly ["3rem", {
            readonly lineHeight: "1";
        }];
    };
};
declare const spacing: {
    readonly px: "1px";
    readonly 0: "0";
    readonly 0.5: "0.125rem";
    readonly 1: "0.25rem";
    readonly 1.5: "0.375rem";
    readonly 2: "0.5rem";
    readonly 2.5: "0.625rem";
    readonly 3: "0.75rem";
    readonly 4: "1rem";
    readonly 5: "1.25rem";
    readonly 6: "1.5rem";
    readonly 8: "2rem";
    readonly 10: "2.5rem";
    readonly 12: "3rem";
    readonly 16: "4rem";
    readonly 20: "5rem";
    readonly 24: "6rem";
    readonly 32: "8rem";
};
declare const borderRadius: {
    readonly none: "0";
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly "2xl": "1rem";
    readonly "3xl": "1.5rem";
    readonly full: "9999px";
};
declare const shadows: {
    readonly xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
    readonly sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
    readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
    readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
    readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
    readonly "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)";
    readonly inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";
    readonly none: "0 0 #0000";
};
declare const animation: {
    readonly keyframes: {
        readonly "fade-in": {
            readonly "0%": {
                readonly opacity: "0";
            };
            readonly "100%": {
                readonly opacity: "1";
            };
        };
        readonly "fade-out": {
            readonly "0%": {
                readonly opacity: "1";
            };
            readonly "100%": {
                readonly opacity: "0";
            };
        };
        readonly "slide-in-from-top": {
            readonly "0%": {
                readonly transform: "translateY(-100%)";
            };
            readonly "100%": {
                readonly transform: "translateY(0)";
            };
        };
        readonly "slide-in-from-bottom": {
            readonly "0%": {
                readonly transform: "translateY(100%)";
            };
            readonly "100%": {
                readonly transform: "translateY(0)";
            };
        };
        readonly "slide-in-from-left": {
            readonly "0%": {
                readonly transform: "translateX(-100%)";
            };
            readonly "100%": {
                readonly transform: "translateX(0)";
            };
        };
        readonly "slide-in-from-right": {
            readonly "0%": {
                readonly transform: "translateX(100%)";
            };
            readonly "100%": {
                readonly transform: "translateX(0)";
            };
        };
        readonly "scale-in": {
            readonly "0%": {
                readonly transform: "scale(0.95)";
                readonly opacity: "0";
            };
            readonly "100%": {
                readonly transform: "scale(1)";
                readonly opacity: "1";
            };
        };
        readonly "spin-slow": {
            readonly "0%": {
                readonly transform: "rotate(0deg)";
            };
            readonly "100%": {
                readonly transform: "rotate(360deg)";
            };
        };
    };
    readonly durations: {
        readonly fast: "150ms";
        readonly normal: "250ms";
        readonly slow: "350ms";
        readonly slower: "500ms";
    };
};

declare const loyTailwindPreset: {
    theme: {
        extend: {
            colors: {
                primary: {
                    readonly 50: "#f0f4ff";
                    readonly 100: "#dbe4ff";
                    readonly 200: "#bac8ff";
                    readonly 300: "#91a7ff";
                    readonly 400: "#748ffc";
                    readonly 500: "#5c7cfa";
                    readonly 600: "#4c6ef5";
                    readonly 700: "#4263eb";
                    readonly 800: "#3b5bdb";
                    readonly 900: "#364fc7";
                    readonly 950: "#2b3fa0";
                };
                secondary: {
                    readonly 50: "#f3f0ff";
                    readonly 100: "#e5dbff";
                    readonly 200: "#d0bfff";
                    readonly 300: "#b197fc";
                    readonly 400: "#9775fa";
                    readonly 500: "#845ef7";
                    readonly 600: "#7950f2";
                    readonly 700: "#7048e8";
                    readonly 800: "#6741d9";
                    readonly 900: "#5f3dc4";
                    readonly 950: "#4c2fa3";
                };
                success: {
                    readonly 50: "#ebfbee";
                    readonly 100: "#d3f9d8";
                    readonly 200: "#b2f2bb";
                    readonly 300: "#8ce99a";
                    readonly 400: "#69db7c";
                    readonly 500: "#51cf66";
                    readonly 600: "#40c057";
                    readonly 700: "#37b24d";
                    readonly 800: "#2f9e44";
                    readonly 900: "#2b8a3e";
                    readonly 950: "#1e7a32";
                };
                danger: {
                    readonly 50: "#fff5f5";
                    readonly 100: "#ffe3e3";
                    readonly 200: "#ffc9c9";
                    readonly 300: "#ffa8a8";
                    readonly 400: "#ff8787";
                    readonly 500: "#ff6b6b";
                    readonly 600: "#fa5252";
                    readonly 700: "#f03e3e";
                    readonly 800: "#e03131";
                    readonly 900: "#c92a2a";
                    readonly 950: "#a51d1d";
                };
                warning: {
                    readonly 50: "#fff9db";
                    readonly 100: "#fff3bf";
                    readonly 200: "#ffec99";
                    readonly 300: "#ffe066";
                    readonly 400: "#ffd43b";
                    readonly 500: "#fcc419";
                    readonly 600: "#fab005";
                    readonly 700: "#f59f00";
                    readonly 800: "#f08c00";
                    readonly 900: "#e67700";
                    readonly 950: "#c45e00";
                };
                info: {
                    readonly 50: "#e7f5ff";
                    readonly 100: "#d0ebff";
                    readonly 200: "#a5d8ff";
                    readonly 300: "#74c0fc";
                    readonly 400: "#4dabf7";
                    readonly 500: "#339af0";
                    readonly 600: "#228be6";
                    readonly 700: "#1c7ed6";
                    readonly 800: "#1971c2";
                    readonly 900: "#1864ab";
                    readonly 950: "#124d8a";
                };
                neutral: {
                    readonly 50: "#f8f9fa";
                    readonly 100: "#f1f3f5";
                    readonly 200: "#e9ecef";
                    readonly 300: "#dee2e6";
                    readonly 400: "#ced4da";
                    readonly 500: "#adb5bd";
                    readonly 600: "#868e96";
                    readonly 700: "#495057";
                    readonly 800: "#343a40";
                    readonly 900: "#212529";
                    readonly 950: "#0d1117";
                };
                background: string;
                foreground: string;
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                border: string;
                input: string;
                ring: string;
            };
            fontFamily: {
                readonly sans: readonly ["Inter", "system-ui", "-apple-system", "sans-serif"];
                readonly mono: readonly ["JetBrains Mono", "Fira Code", "monospace"];
            };
            fontSize: Record<string, unknown>;
            borderRadius: {
                readonly none: "0";
                readonly sm: "0.25rem";
                readonly md: "0.375rem";
                readonly lg: "0.5rem";
                readonly xl: "0.75rem";
                readonly "2xl": "1rem";
                readonly "3xl": "1.5rem";
                readonly full: "9999px";
            };
            boxShadow: {
                readonly xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)";
                readonly sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)";
                readonly md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
                readonly lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
                readonly xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)";
                readonly "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)";
                readonly inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";
                readonly none: "0 0 #0000";
            };
            keyframes: {
                readonly "fade-in": {
                    readonly "0%": {
                        readonly opacity: "0";
                    };
                    readonly "100%": {
                        readonly opacity: "1";
                    };
                };
                readonly "fade-out": {
                    readonly "0%": {
                        readonly opacity: "1";
                    };
                    readonly "100%": {
                        readonly opacity: "0";
                    };
                };
                readonly "slide-in-from-top": {
                    readonly "0%": {
                        readonly transform: "translateY(-100%)";
                    };
                    readonly "100%": {
                        readonly transform: "translateY(0)";
                    };
                };
                readonly "slide-in-from-bottom": {
                    readonly "0%": {
                        readonly transform: "translateY(100%)";
                    };
                    readonly "100%": {
                        readonly transform: "translateY(0)";
                    };
                };
                readonly "slide-in-from-left": {
                    readonly "0%": {
                        readonly transform: "translateX(-100%)";
                    };
                    readonly "100%": {
                        readonly transform: "translateX(0)";
                    };
                };
                readonly "slide-in-from-right": {
                    readonly "0%": {
                        readonly transform: "translateX(100%)";
                    };
                    readonly "100%": {
                        readonly transform: "translateX(0)";
                    };
                };
                readonly "scale-in": {
                    readonly "0%": {
                        readonly transform: "scale(0.95)";
                        readonly opacity: "0";
                    };
                    readonly "100%": {
                        readonly transform: "scale(1)";
                        readonly opacity: "1";
                    };
                };
                readonly "spin-slow": {
                    readonly "0%": {
                        readonly transform: "rotate(0deg)";
                    };
                    readonly "100%": {
                        readonly transform: "rotate(360deg)";
                    };
                };
            };
            animation: {
                "fade-in": string;
                "fade-out": string;
                "slide-in-from-top": string;
                "slide-in-from-bottom": string;
                "slide-in-from-left": string;
                "slide-in-from-right": string;
                "scale-in": string;
                "spin-slow": string;
            };
        };
    };
};

interface ThemeColors {
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
declare const lightTheme: ThemeColors;
declare const darkTheme: ThemeColors;
declare function themeToCssVariables(theme: ThemeColors): Record<string, string>;
declare function generateCssVariablesString(theme: ThemeColors): string;
declare function generateThemeStylesheet(): string;

export { type ThemeColors, animation, borderRadius, colors, darkTheme, generateCssVariablesString, generateThemeStylesheet, lightTheme, loyTailwindPreset, shadows, spacing, themeToCssVariables, typography };
