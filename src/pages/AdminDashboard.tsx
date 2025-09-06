
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Menu, 
  ShoppingCart, 
  Clock, 
  TrendingUp, 
  Bell,
  ArrowRight 
} from "lucide-react";

const AdminDashboard = () => {
  const stats = {
    activeOrders: 12,
    completedToday: 45,
    revenue: 1250.75,
    avgOrderValue: 27.85
  };

  const recentOrders = [
    { id: "12345", table: 5, items: 3, status: "preparing", time: "5 min ago", total: 55.37 },
    { id: "12346", table: 2, items: 2, status: "ready", time: "8 min ago", total: 32.50 },
    { id: "12347", table: 8, items: 4, status: "confirmed", time: "12 min ago", total: 68.25 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-500";
      case "preparing": return "bg-yellow-500";
      case "ready": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Cozy Kitchen Management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              <Badge className="ml-2 bg-red-500 text-white">3</Badge>
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm">
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Orders</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.activeOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedToday}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">${stats.revenue}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <p className="text-3xl font-bold text-purple-600">${stats.avgOrderValue}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link to="/admin/orders">
                <Button variant="outline" size="sm" className="rounded-full">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">Table {order.table}</p>
                        <p className="text-xs text-gray-500">#{order.id}</p>
                      </div>
                      <div>
                        <p className="font-medium">{order.items} items • ${order.total}</p>
                        <p className="text-sm text-gray-500">{order.time}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/menu">
                <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                  <Menu className="w-4 h-4 mr-3" />
                  Manage Menu
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button className="w-full justify-start bg-green-500 hover:bg-green-600 text-white rounded-xl">
                  <ShoppingCart className="w-4 h-4 mr-3" />
                  View Orders
                </Button>
              </Link>
              <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                <Users className="w-4 h-4 mr-3" />
                Table Management
              </Button>
              <Button className="w-full justify-start bg-purple-500 hover:bg-purple-600 text-white rounded-xl">
                <TrendingUp className="w-4 h-4 mr-3" />
                Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
