export interface EnvConfig {
  [key: string]: string | undefined;
}

function getEnvSource(): EnvConfig {
  if (typeof process !== "undefined" && process.env) {
    return process.env as EnvConfig;
  }
  return {};
}

export function env(key: string, defaultValue?: string): string {
  const value = getEnvSource()[key];
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}

export function envOptional(key: string): string | undefined {
  return getEnvSource()[key];
}

export function envNumber(key: string, defaultValue?: number): number {
  const raw = getEnvSource()[key];
  if (raw !== undefined) {
    const parsed = Number(raw);
    if (isNaN(parsed)) throw new Error(`Environment variable ${key} is not a valid number: ${raw}`);
    return parsed;
  }
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}

export function envBool(key: string, defaultValue?: boolean): boolean {
  const raw = getEnvSource()[key];
  if (raw !== undefined) {
    return raw === "true" || raw === "1" || raw === "yes";
  }
  if (defaultValue !== undefined) return defaultValue;
  throw new Error(`Missing required environment variable: ${key}`);
}

export function envList(key: string, separator: string = ","): string[] {
  const raw = getEnvSource()[key];
  if (!raw) return [];
  return raw.split(separator).map((s) => s.trim()).filter(Boolean);
}

export function envUrl(key: string, defaultValue?: string): string {
  const value = env(key, defaultValue);
  try {
    new URL(value);
  } catch {
    throw new Error(`Environment variable ${key} is not a valid URL: ${value}`);
  }
  return value.replace(/\/$/, "");
}

// Feature Flags
export interface FeatureFlags {
  [key: string]: boolean;
}

export function createFeatureFlags(
  flags: FeatureFlags = {},
  envPrefix: string = "FEATURE_"
) {
  const resolvedFlags = { ...flags };

  // Override with environment variables
  const envSource = getEnvSource();
  for (const [key, value] of Object.entries(envSource)) {
    if (key.startsWith(envPrefix)) {
      const flagName = key.slice(envPrefix.length).toLowerCase();
      resolvedFlags[flagName] = value === "true" || value === "1";
    }
  }

  return {
    isEnabled(flag: string): boolean {
      return resolvedFlags[flag] === true;
    },

    isDisabled(flag: string): boolean {
      return !this.isEnabled(flag);
    },

    getAll(): FeatureFlags {
      return { ...resolvedFlags };
    },

    set(flag: string, enabled: boolean) {
      resolvedFlags[flag] = enabled;
    },
  };
}

export type FeatureFlagManager = ReturnType<typeof createFeatureFlags>;

// App Constants helper
export function defineConstants<T extends Record<string, unknown>>(constants: T): Readonly<T> {
  return Object.freeze(constants);
}
