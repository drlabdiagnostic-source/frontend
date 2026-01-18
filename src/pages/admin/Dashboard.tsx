import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/adminData";
import {
  ShoppingCart,
  IndianRupee,
  Users,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<ReturnType<typeof getDashboardStats> | null>(null);

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  if (!stats) return null;

  const statCards = [
    { title: "Total Bookings", value: stats.totalBookings, icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Active Users", value: stats.activeUsers, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Pending Reports", value: stats.pendingReports, icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Order Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Order Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status === "completed" ? "bg-green-500" :
                      status === "pending" ? "bg-yellow-500" :
                      status === "cancelled" ? "bg-red-500" :
                      "bg-blue-500"
                    }`} />
                    <span className="capitalize">{status.replace("_", " ")}</span>
                  </div>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{order.testName}</p>
                    <p className="text-sm text-muted-foreground">{order.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "completed" ? "bg-green-500/10 text-green-500" :
                      order.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
