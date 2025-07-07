"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-full overflow-hidden">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={user.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-600" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Dashboard
          </h2>
          <p className="text-gray-600">
            You have successfully logged in! This is your dashboard where you
            can manage your account and access various features.
          </p>
          {user.picture && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Profile Picture:</p>
              <Image
                src={user.picture}
                alt={user.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
