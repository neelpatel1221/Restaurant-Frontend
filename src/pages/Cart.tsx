

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Wallet, Heart, Sparkles } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";

// Cart utilities to match Menu component
const getCartFromStorage = () => {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (cart: any[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Load cart from localStorage on component mount
  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  const updateQuantity = (id: number, change: number) => {
    const newItems = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0);
    
    setCartItems(newItems);
    saveCartToStorage(newItems);
  };

  const removeItem = (id: number) => {
    const newItems = cartItems.filter(item => item.id !== id);
    setCartItems(newItems);
    saveCartToStorage(newItems);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    console.log("Order placed:", { cartItems, specialInstructions, paymentMethod, total });
    
    // Clear cart after checkout
    setCartItems([]);
    saveCartToStorage([]);
    
    if (paymentMethod === 'online') {
      alert("Redirecting to secure payment gateway...");
      setTimeout(() => {
        navigate("/order-status");
      }, 2000);
    } else {
      navigate("/order-status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-gentle-bounce"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-green-200 rounded-full opacity-25 animate-gentle-bounce" style={{animationDelay: '1s'}}></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-orange-100 p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-4 max-w-4xl mx-auto">
          <Link to="/menu">
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-orange-50">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-500 fill-current" />
              Your Order
            </h1>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Table 5 • Review & Checkout
            </p>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto relative z-10">
        {cartItems.length === 0 ? (
          <Card className="text-center p-12 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent>
              <div className="text-8xl mb-4 animate-gentle-bounce">🍽️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-6 text-lg">Add some delicious items to get started!</p>
              <Link to="/menu">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Browse Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-orange-500" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price} each</p>
                      {item.notes && (
                        <p className="text-sm text-orange-600 mt-2 bg-orange-100 px-3 py-1 rounded-lg inline-block">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="rounded-full w-10 h-10 p-0 hover:bg-orange-50 border-2"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="rounded-full w-10 h-10 p-0 hover:bg-orange-50 border-2"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-10 h-10 p-0 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-green-200">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center space-x-4 cursor-pointer flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Pay at Table</p>
                        <p className="text-sm text-gray-600">Cash or card with server</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-blue-200">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex items-center space-x-4 cursor-pointer flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Pay Online</p>
                        <p className="text-sm text-gray-600">Secure payment via card</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-pink-500 fill-current" />
                  Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special requests for your order? (allergies, preferences, etc.)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="rounded-2xl border-2 border-orange-200 focus:border-orange-400 min-h-24 text-lg"
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-amber-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-2xl text-gray-800">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                {paymentMethod === 'online' && (
                  <p className="text-sm text-gray-500 mt-3 flex items-center">
                    <span className="text-green-500 mr-2">🔒</span>
                    Secure payment processing via SSL encryption
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className={`w-full text-white text-xl py-8 rounded-2xl shadow-2xl animate-warm-glow font-bold transition-all duration-300 hover:scale-105 ${
                paymentMethod === 'online' 
                  ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800' 
                  : 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800'
              }`}
            >
              {paymentMethod === 'online' ? (
                <>
                  <CreditCard className="w-6 h-6 mr-2" />
                  Pay Online • ₹{total.toFixed(2)}
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 mr-2 fill-current" />
                  Place Order • ₹{total.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

