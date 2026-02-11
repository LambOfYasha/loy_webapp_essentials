export function formatPhone(phone: string, countryCode: string = "US"): string {
  const cleaned = phone.replace(/\D/g, "");
  if (countryCode === "US" && cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (countryCode === "US" && cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  locale: string = "en-US"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat(locale, options).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)}mo ago`;
  return `${Math.floor(diffDay / 365)}y ago`;
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatNumber(
  num: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCompactNumber(
  num: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, { notation: "compact" }).format(num);
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function truncate(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trimEnd() + suffix;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function initials(name: string, maxLength: number = 2): string {
  return name
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, maxLength)
    .join("");
}

export function safeJsonParse<T = unknown>(
  json: string,
  fallback: T
): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const masked =
    local.length <= 2
      ? "*".repeat(local.length)
      : local[0] + "*".repeat(local.length - 2) + local[local.length - 1];
  return `${masked}@${domain}`;
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return phone;
  return "*".repeat(cleaned.length - 4) + cleaned.slice(-4);
}
