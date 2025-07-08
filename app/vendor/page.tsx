"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  Star,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function VendorDashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Redirect non-vendors to appropriate dashboards
    if (user?.role === "client") {
      router.push("/dashboard");
      return;
    }
    if (user?.role === "admin") {
      router.push("/admin");
      return;
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || user.role !== "vendor") {
    return null;
  }

  const stats = [
    {
      name: "Total Sales",
      value: "$12,450",
      icon: DollarSign,
      change: "+15.3%",
      changeType: "positive",
    },
    {
      name: "Active Orders",
      value: "23",
      icon: ShoppingCart,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      name: "Products Listed",
      value: "156",
      icon: Package,
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Customer Rating",
      value: "4.8",
      icon: Star,
      change: "+0.2",
      changeType: "positive",
    },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user.name}!`}
      subtitle="Vendor Dashboard - Manage your products and orders"
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
                    <stat.icon className="h-8 w-8 text-green-600" />
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
                    id: "#ORD-001",
                    customer: "John Doe",
                    product: "Premium Package",
                    amount: "$299",
                    status: "Processing",
                  },
                  {
                    id: "#ORD-002",
                    customer: "Jane Smith",
                    product: "Basic Service",
                    amount: "$99",
                    status: "Shipped",
                  },
                  {
                    id: "#ORD-003",
                    customer: "Mike Johnson",
                    product: "Custom Solution",
                    amount: "$599",
                    status: "Completed",
                  },
                ].map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {order.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customer} • {order.product}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {order.amount}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Top Products
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    name: "Premium Package",
                    sales: 45,
                    revenue: "$13,455",
                    trend: "up",
                  },
                  {
                    name: "Basic Service",
                    sales: 32,
                    revenue: "$3,168",
                    trend: "up",
                  },
                  {
                    name: "Custom Solution",
                    sales: 18,
                    revenue: "$10,782",
                    trend: "down",
                  },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.revenue}
                      </p>
                      <div className="flex items-center">
                        <TrendingUp
                          className={`h-3 w-3 ${
                            product.trend === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                        <span
                          className={`text-xs ml-1 ${
                            product.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.trend === "up" ? "+12%" : "-5%"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Actions */}
        <div className="bg-white shadow-sm rounded-lg border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Vendor Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Add Product
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingCart className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Manage Orders
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Analytics
                </span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Customers
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sales Activity */}
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
                  action: "New order received from John Doe",
                  time: "1 hour ago",
                  type: "order",
                },
                {
                  action: 'Product "Premium Package" updated',
                  time: "3 hours ago",
                  type: "product",
                },
                {
                  action: "Payment received for order #ORD-002",
                  time: "5 hours ago",
                  type: "payment",
                },
                {
                  action: "New customer review: 5 stars",
                  time: "1 day ago",
                  type: "review",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      activity.type === "order"
                        ? "bg-blue-400"
                        : activity.type === "product"
                        ? "bg-green-400"
                        : activity.type === "payment"
                        ? "bg-purple-400"
                        : "bg-yellow-400"
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
