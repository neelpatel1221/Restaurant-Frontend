
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, Users, Bell } from "lucide-react";

const OrderStatus = () => {
  const [orderProgress, setOrderProgress] = useState(25);
  const [currentStatus, setCurrentStatus] = useState("confirmed");

  const orderSteps = [
    { id: "confirmed", label: "Order Confirmed", icon: "✅", completed: true },
    { id: "preparing", label: "Preparing", icon: "👨‍🍳", completed: orderProgress >= 50 },
    { id: "ready", label: "Ready to Serve", icon: "🔔", completed: orderProgress >= 75 },
    { id: "served", label: "Served", icon: "🍽️", completed: orderProgress >= 100 }
  ];

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setOrderProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 5;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (orderProgress >= 75) setCurrentStatus("ready");
    else if (orderProgress >= 50) setCurrentStatus("preparing");
    else if (orderProgress >= 25) setCurrentStatus("confirmed");
  }, [orderProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Order Status</h1>
            <p className="text-sm text-gray-600">Order #12345 • Table 5</p>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Current Status Card */}
        <Card className="animate-slide-up">
          <CardContent className="p-6 text-center">
            <div className="text-6xl mb-4 animate-gentle-bounce">
              {orderSteps.find(step => step.id === currentStatus)?.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {orderSteps.find(step => step.id === currentStatus)?.label}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentStatus === "confirmed" && "We've received your order and it's being prepared with love!"}
              {currentStatus === "preparing" && "Our chefs are working their magic on your delicious meal!"}
              {currentStatus === "ready" && "Your order is ready! A staff member will bring it to your table shortly."}
              {currentStatus === "served" && "Enjoy your meal! Let us know if you need anything else."}
            </p>
            <Progress value={orderProgress} className="h-3 mb-4" />
            <p className="text-sm text-gray-500">
              Estimated time: {currentStatus === "served" ? "Complete!" : "5-10 minutes"}
            </p>
          </CardContent>
        </Card>

        {/* Order Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      step.completed ? "text-green-700" : "text-gray-500"
                    }`}>
                      {step.label}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {step.completed ? "Completed" : "Pending"}
                    </p>
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>2x Crispy Calamari</span>
                <span>$25.98</span>
              </div>
              <div className="flex justify-between">
                <span>1x Grilled Salmon</span>
                <span>$24.99</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>$55.37</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 rounded-xl border-orange-200 hover:bg-orange-50"
          >
            <Users className="w-4 h-4" />
            <span>Call Staff</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 rounded-xl border-green-200 hover:bg-green-50"
          >
            <Bell className="w-4 h-4" />
            <span>Request Bill</span>
          </Button>
        </div>

        {/* Order More */}
        <Card className="bg-gradient-to-r from-orange-100 to-amber-100">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Want to add more?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Browse our menu and add items to your current order
            </p>
            <Link to="/menu">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                Add More Items
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderStatus;
