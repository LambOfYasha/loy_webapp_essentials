export interface User {
  id: string;
  email?: string;
  name?: string;
  roles: string[];
  permissions?: string[];
  [key: string]: unknown;
}

export function hasRole(user: User | null | undefined, role: string): boolean {
  if (!user) return false;
  return user.roles.includes(role);
}

export function hasAnyRole(
  user: User | null | undefined,
  roles: string[]
): boolean {
  if (!user) return false;
  return roles.some((role) => user.roles.includes(role));
}

export function hasAllRoles(
  user: User | null | undefined,
  roles: string[]
): boolean {
  if (!user) return false;
  return roles.every((role) => user.roles.includes(role));
}

export function can(
  user: User | null | undefined,
  permission: string
): boolean {
  if (!user) return false;
  if (user.permissions) {
    return user.permissions.includes(permission);
  }
  return user.roles.includes(permission);
}

export function canAny(
  user: User | null | undefined,
  permissions: string[]
): boolean {
  if (!user) return false;
  return permissions.some((p) => can(user, p));
}

export function canAll(
  user: User | null | undefined,
  permissions: string[]
): boolean {
  if (!user) return false;
  return permissions.every((p) => can(user, p));
}

export function isAuthenticated(user: User | null | undefined): user is User {
  return user !== null && user !== undefined && !!user.id;
}

export type GuardResult =
  | { allowed: true }
  | { allowed: false; reason: string; redirectTo?: string };

export function guard(
  user: User | null | undefined,
  options: {
    requireAuth?: boolean;
    requireRoles?: string[];
    requirePermissions?: string[];
    redirectTo?: string;
  } = {}
): GuardResult {
  const {
    requireAuth = true,
    requireRoles,
    requirePermissions,
    redirectTo,
  } = options;

  if (requireAuth && !isAuthenticated(user)) {
    return {
      allowed: false,
      reason: "Authentication required",
      redirectTo: redirectTo ?? "/login",
    };
  }

  if (requireRoles && !hasAnyRole(user, requireRoles)) {
    return {
      allowed: false,
      reason: `Required roles: ${requireRoles.join(", ")}`,
      redirectTo: redirectTo ?? "/unauthorized",
    };
  }

  if (requirePermissions && !canAll(user, requirePermissions)) {
    return {
      allowed: false,
      reason: `Required permissions: ${requirePermissions.join(", ")}`,
      redirectTo: redirectTo ?? "/unauthorized",
    };
  }

  return { allowed: true };
}
