export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export interface PasswordStrength {
  valid: boolean;
  score: number;
  issues: string[];
}

export function validatePassword(
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
  } = {}
): PasswordStrength {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = true,
  } = options;

  const issues: string[] = [];
  let score = 0;

  if (password.length >= minLength) score++;
  else issues.push(`Must be at least ${minLength} characters`);

  if (!requireUppercase || /[A-Z]/.test(password)) score++;
  else issues.push("Must contain an uppercase letter");

  if (!requireLowercase || /[a-z]/.test(password)) score++;
  else issues.push("Must contain a lowercase letter");

  if (!requireNumber || /\d/.test(password)) score++;
  else issues.push("Must contain a number");

  if (!requireSpecial || /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    score++;
  else issues.push("Must contain a special character");

  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  return { valid: issues.length === 0, score, issues };
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  return /^\d{10,15}$/.test(cleaned);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isNonEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(color);
}
