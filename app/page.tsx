"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Route based on user role
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
          router.push("/dashboard");
      }
    } else {
      router.push("/auth/login");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
