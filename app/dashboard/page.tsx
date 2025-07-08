"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  TrendingUp,
  Calendar,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Redirect non-clients to appropriate dashboards
    if (user?.role === "vendor") {
      router.push("/vendor");
      return;
    }
    if (user?.role === "admin") {
      router.push("/admin");
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || user.role !== "client") {
    return null;
  }

  const stats = [
    {
      name: "Total Orders",
      value: "12",
      icon: FileText,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "Active Orders",
      value: "8",
      icon: Calendar,
      change: "+54.02%",
      changeType: "positive",
    },
    {
      name: "Completed",
      value: "24",
      icon: TrendingUp,
      change: "-1.39%",
      changeType: "negative",
    },
    {
      name: "Favorite Vendors",
      value: "3",
      icon: Users,
      change: "+10.18%",
      changeType: "positive",
    },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user.name}!`}
      subtitle="Client Dashboard - Manage your orders and vendors"
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg border"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Orders
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    name: "Premium Package",
                    vendor: "TechVendor Inc",
                    status: "In Progress",
                    progress: 75,
                  },
                  {
                    name: "Basic Service",
                    vendor: "ServicePro",
                    status: "Pending",
                    progress: 25,
                  },
                  {
                    name: "Custom Solution",
                    vendor: "DevCorp",
                    status: "Completed",
                    progress: 100,
                  },
                ].map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {order.name}
                      </p>
                      <p className="text-xs text-gray-500">by {order.vendor}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {order.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    New Order
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    Browse Vendors
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    Order History
                  </span>
                </button>
                <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    Settings
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white shadow-sm rounded-lg border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  action: 'Order "Premium Package" updated by TechVendor Inc',
                  time: "2 hours ago",
                  type: "update",
                },
                {
                  action: "New message from ServicePro vendor",
                  time: "4 hours ago",
                  type: "message",
                },
                {
                  action: 'Order "Custom Solution" completed',
                  time: "1 day ago",
                  type: "completion",
                },
                {
                  action: "Payment processed for Basic Service",
                  time: "2 days ago",
                  type: "payment",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      activity.type === "completion"
                        ? "bg-green-400"
                        : activity.type === "update"
                        ? "bg-blue-400"
                        : activity.type === "message"
                        ? "bg-yellow-400"
                        : "bg-purple-400"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
