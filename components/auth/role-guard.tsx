"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: ("vendor" | "admin" | "client")[];
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
}: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      // Redirect based on user role
      switch (user.role) {
        case "vendor":
          router.push("/vendor");
          break;
        case "admin":
          router.push("/admin");
          break;
        case "client":
          router.push("/dashboard");
          break;
        default:
          router.push(redirectTo);
      }
    }
  }, [isAuthenticated, user, allowedRoles, router, redirectTo]);

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
