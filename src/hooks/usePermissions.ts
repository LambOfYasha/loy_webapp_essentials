import { useMemo } from "react";
import { useAuth } from "./useAuth";

export interface UsePermissionsReturn {
  can: (permission: string) => boolean;
  canAny: (permissions: string[]) => boolean;
  canAll: (permissions: string[]) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  isAuthenticated: boolean;
  roles: string[];
  permissions: string[];
}

export function usePermissions(): UsePermissionsReturn {
  const auth = useAuth();

  return useMemo(() => {
    const userRoles = auth.user?.roles ?? [];
    const userPermissions = auth.user?.permissions ?? [];

    return {
      can: (permission: string) => userPermissions.includes(permission),
      canAny: (permissions: string[]) =>
        permissions.some((p) => userPermissions.includes(p)),
      canAll: (permissions: string[]) =>
        permissions.every((p) => userPermissions.includes(p)),
      hasRole: (role: string) => userRoles.includes(role),
      hasAnyRole: (roles: string[]) =>
        roles.some((r) => userRoles.includes(r)),
      hasAllRoles: (roles: string[]) =>
        roles.every((r) => userRoles.includes(r)),
      isAuthenticated: auth.isAuthenticated,
      roles: userRoles,
      permissions: userPermissions,
    };
  }, [auth.user, auth.isAuthenticated]);
}
