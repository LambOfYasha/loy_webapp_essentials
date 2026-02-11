const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

export function sanitizeHtml(input: string): string {
  return input.replace(/[&<>"'/]/g, (char) => HTML_ENTITIES[char] || char);
}

export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T
): T {
  const result = { ...obj } as Record<string, unknown>;
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === "string") {
      result[key] = sanitizeHtml(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  return result as T;
}

export function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export interface RateLimitState {
  count: number;
  resetAt: number;
}

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const store = new Map<string, RateLimitState>();

  function cleanup() {
    const now = Date.now();
    for (const [key, state] of store) {
      if (state.resetAt <= now) store.delete(key);
    }
  }

  return {
    check(key: string): { allowed: boolean; remaining: number; resetAt: number } {
      cleanup();
      const now = Date.now();
      const state = store.get(key);

      if (!state || state.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
      }

      if (state.count >= maxRequests) {
        return { allowed: false, remaining: 0, resetAt: state.resetAt };
      }

      state.count++;
      return {
        allowed: true,
        remaining: maxRequests - state.count,
        resetAt: state.resetAt,
      };
    },

    reset(key: string) {
      store.delete(key);
    },

    resetAll() {
      store.clear();
    },
  };
}

export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
