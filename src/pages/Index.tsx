
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { QrCode, Menu, Users, Clock, Sparkles, Heart, Zap } from "lucide-react";

const Index = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30 animate-gentle-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-gentle-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-amber-200 rounded-full opacity-35 animate-gentle-bounce" style={{animationDelay: '2s'}}></div>

      {/* Header */}
      <header className="p-8 text-center relative z-10">
        <div className="animate-gentle-bounce inline-block mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-warm-glow">
            <span className="text-4xl">🍽️</span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Cozy Kitchen
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2 leading-relaxed">
            Your delightful dining experience starts here! 
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg text-orange-600">
            <Heart className="w-5 h-5 fill-current" />
            <span>Scan, order, and enjoy with love</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Actions */}
      <div className="px-6 max-w-lg mx-auto space-y-6 relative z-10">
        <Card className="animate-slide-up hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg">
                <QrCode className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800 mb-1">Scan Table QR</h3>
                <p className="text-gray-600 leading-relaxed">Quick access to your table's menu</p>
              </div>
            </div>
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setShowQRScanner(true)}
            >
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR Code
            </Button>
          </CardContent>
        </Card>

        <Card className="animate-slide-up hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-lg">
                <Menu className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800 mb-1">Browse Menu</h3>
                <p className="text-gray-600 leading-relaxed">Explore our delicious offerings</p>
              </div>
            </div>
            <Link to="/menu">
              <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Menu className="w-5 h-5 mr-2" />
                View Menu
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="animate-slide-up hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-800 mb-1">Order Status</h3>
                <p className="text-gray-600 leading-relaxed">Track your current orders</p>
              </div>
            </div>
            <Link to="/order-status">
              <Button variant="outline" className="w-full mt-6 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl py-6 text-lg font-semibold transition-all duration-300">
                <Clock className="w-5 h-5 mr-2" />
                Check Status
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="px-6 mt-16 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why You'll Love Dining With Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Zap className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">Order in seconds, not minutes</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Heart className="w-10 h-10 text-green-500 fill-current" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3">Made with Love</h3>
            <p className="text-gray-600 leading-relaxed">Every dish crafted with care</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-3">Real-time Updates</h3>
            <p className="text-gray-600 leading-relaxed">Know exactly when your food is ready</p>
          </div>
        </div>
      </div>

      {/* Admin Access */}
      <div className="fixed bottom-6 right-6 z-20">
        <Link to="/login">
          <Button variant="outline" className="rounded-full shadow-xl bg-white/90 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Users className="w-4 h-4 mr-2" />
            Staff
          </Button>
        </Link>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-56 h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <div className="text-gray-400">
                    <QrCode className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-sm">QR Scanner would appear here</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Point your camera at the table's QR code
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      setShowQRScanner(false);
                      setTimeout(() => {
                        window.location.href = '/menu?table=5';
                      }, 500);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Simulate Scan (Table 5)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowQRScanner(false)}
                    className="w-full py-3 rounded-xl border-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
