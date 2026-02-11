export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export interface RetryOptions {
  attempts?: number;
  delay?: number;
  backoff?: boolean;
  onRetry?: (error: unknown, attempt: number) => void;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = true, onRetry } = options;

  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < attempts) {
        onRetry?.(err, attempt);
        const waitTime = backoff ? delay * attempt : delay;
        await sleep(waitTime);
      }
    }
  }
  throw lastError;
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message: string = "Operation timed out"
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms)
    ),
  ]);
}

export async function settled<T>(
  promises: Promise<T>[]
): Promise<{ fulfilled: T[]; rejected: unknown[] }> {
  const results = await Promise.allSettled(promises);
  const fulfilled: T[] = [];
  const rejected: unknown[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") fulfilled.push(result.value);
    else rejected.push(result.reason);
  }

  return { fulfilled, rejected };
}
