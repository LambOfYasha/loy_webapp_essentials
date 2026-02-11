export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: Record<string, unknown>;
}

export interface LoggerConfig {
  level?: LogLevel;
  context?: string;
  enabled?: boolean;
  onLog?: (entry: LogEntry) => void;
  prefix?: string;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[36m",
  info: "\x1b[32m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
};

const RESET = "\x1b[0m";

export function createLogger(config: LoggerConfig = {}) {
  const {
    level: minLevel = "info",
    context,
    enabled = true,
    onLog,
    prefix = "[LOY]",
  } = config;

  function shouldLog(level: LogLevel): boolean {
    return enabled && LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[minLevel];
  }

  function log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
  ) {
    if (!shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
    };

    if (onLog) {
      onLog(entry);
      return;
    }

    const color = LEVEL_COLORS[level];
    const ctx = context ? `[${context}]` : "";
    const tag = `${prefix}${ctx}`;
    const formatted = `${color}${tag} ${level.toUpperCase()}${RESET} ${message}`;

    switch (level) {
      case "debug":
        console.debug(formatted, data ?? "");
        break;
      case "info":
        console.info(formatted, data ?? "");
        break;
      case "warn":
        console.warn(formatted, data ?? "");
        break;
      case "error":
        console.error(formatted, data ?? "");
        break;
    }
  }

  return {
    debug: (message: string, data?: Record<string, unknown>) =>
      log("debug", message, data),
    info: (message: string, data?: Record<string, unknown>) =>
      log("info", message, data),
    warn: (message: string, data?: Record<string, unknown>) =>
      log("warn", message, data),
    error: (message: string, data?: Record<string, unknown>) =>
      log("error", message, data),
    child: (childConfig: Partial<LoggerConfig>) =>
      createLogger({ ...config, ...childConfig }),
  };
}

export type Logger = ReturnType<typeof createLogger>;

// Default logger instance
export const logger = createLogger();

// Event tracking
export interface TrackEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
}

export type EventHandler = (event: TrackEvent) => void;

export function createEventTracker(handlers: EventHandler[] = []) {
  const eventHandlers = [...handlers];

  return {
    track(
      name: string,
      properties?: Record<string, unknown>,
      userId?: string
    ) {
      const event: TrackEvent = {
        name,
        properties,
        timestamp: new Date().toISOString(),
        userId,
      };
      for (const handler of eventHandlers) {
        try {
          handler(event);
        } catch {
          // Don't let tracking errors crash the app
        }
      }
    },

    addHandler(handler: EventHandler) {
      eventHandlers.push(handler);
    },

    removeHandler(handler: EventHandler) {
      const idx = eventHandlers.indexOf(handler);
      if (idx !== -1) eventHandlers.splice(idx, 1);
    },
  };
}

export type EventTracker = ReturnType<typeof createEventTracker>;
