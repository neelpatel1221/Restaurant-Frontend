
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, DollarSign, CreditCard, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminOrders = () => {
  const [orders] = useState([
    {
      id: "12345",
      table: 5,
      items: ["2x Crispy Calamari", "1x Grilled Salmon"],
      total: 55.37,
      status: "preparing",
      paymentMethod: "online",
      paymentStatus: "paid",
      time: "2 mins ago",
      specialInstructions: "Medium rare salmon"
    },
    {
      id: "12346",
      table: 3,
      items: ["1x Ribeye Steak", "1x Chocolate Lava Cake"],
      total: 41.98,
      status: "ready",
      paymentMethod: "cash",
      paymentStatus: "pending",
      time: "5 mins ago",
      specialInstructions: ""
    },
    {
      id: "12347",
      table: 8,
      items: ["3x Truffle Arancini", "2x Grilled Salmon"],
      total: 94.96,
      status: "confirmed",
      paymentMethod: "online",
      paymentStatus: "paid",
      time: "8 mins ago",
      specialInstructions: "Extra sauce on the side"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-green-100 text-green-800";
      case "served": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center space-x-4 max-w-6xl mx-auto">
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Order Management</h1>
            <p className="text-sm text-gray-600">Track and manage all orders</p>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-6xl mx-auto">
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl">
            <TabsTrigger value="active" className="rounded-lg">Active Orders</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg">Completed</TabsTrigger>
            <TabsTrigger value="payments" className="rounded-lg">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {orders.filter(order => order.status !== 'served').map((order) => (
                <Card key={order.id} className="animate-slide-up">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <Badge className={`rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                        <Badge className={`rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {order.paymentMethod === 'online' ? (
                          <CreditCard className="w-4 h-4" />
                        ) : (
                          <Wallet className="w-4 h-4" />
                        )}
                        <span className="capitalize">{order.paymentMethod}</span>
                        <span>•</span>
                        <span>Table {order.table}</span>
                        <span>•</span>
                        <span>{order.time}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Items:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {order.specialInstructions && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Special Instructions:</h4>
                          <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                            {order.specialInstructions}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-lg">${order.total}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "preparing")}
                            className="rounded-full"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            Preparing
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                            className="rounded-full bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Ready
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No completed orders yet</h3>
                <p className="text-gray-600">Completed orders will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id} className="animate-slide-up">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {order.paymentMethod === 'online' ? (
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Wallet className="w-5 h-5 text-green-600" />
                          )}
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">Table {order.table} • {order.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <p className="text-sm text-gray-600 capitalize">{order.paymentMethod}</p>
                        </div>
                        <Badge className={`rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Payment Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Today's Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">$150.31</p>
                    <p className="text-sm text-gray-600">Online Payments</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">$89.45</p>
                    <p className="text-sm text-gray-600">Cash/Card</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">$239.76</p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminOrders;
