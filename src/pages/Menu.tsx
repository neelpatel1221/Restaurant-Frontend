import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ShoppingCart, Search, ArrowLeft, Star, Plus, Minus } from "lucide-react";
import { Input } from "../components/ui/input";

const menuCategories = [
  {
    name: "Appetizers",
    emoji: "🥗",
    items: [
      {
        id: 1,
        name: "Crispy Calamari",
        description: "Golden rings with tangy marinara sauce",
        price: 12.99,
        image: "photo-1618160702438-9b02ab6515c9",
        popular: true,
        rating: 4.8,
        veg: false
      },
      {
        id: 2,
        name: "Truffle Arancini",
        description: "Creamy risotto balls with black truffle",
        price: 14.99,
        image: "photo-1618160702438-9b02ab6515c9",
        rating: 4.6,
        veg: true
      }
    ]
  },
  {
    name: "Main Courses",
    emoji: "🍽️",
    items: [
      {
        id: 3,
        name: "Grilled Salmon",
        description: "Atlantic salmon with herb butter and seasonal vegetables",
        price: 24.99,
        image: "photo-1618160702438-9b02ab6515c9",
        popular: true,
        rating: 4.9,
        veg: false
      },
      {
        id: 4,
        name: "Ribeye Steak",
        description: "12oz prime cut with garlic mashed potatoes",
        price: 32.99,
        image: "photo-1618160702438-9b02ab6515c9",
        rating: 4.7,
        veg: false
      },
      {
        id: 5,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, basil, and tomato sauce on wood-fired crust",
        price: 18.99,
        image: "photo-1618160702438-9b02ab6515c9",
        rating: 4.5,
        veg: true
      }
    ]
  },
  {
    name: "Desserts",
    emoji: "🍰",
    items: [
      {
        id: 6,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with vanilla ice cream",
        price: 8.99,
        image: "photo-1618160702438-9b02ab6515c9",
        rating: 4.5,
        veg: true
      },
      {
        id: 7,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee and mascarpone",
        price: 9.99,
        image: "photo-1618160702438-9b02ab6515c9",
        rating: 4.7,
        veg: true
      }
    ]
  }
];

// Cart context to share state between components
const getCartFromStorage = () => {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (cart: any[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<any[]>(getCartFromStorage());
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});

  const addToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    const newCart = [...cart];
    const existingItemIndex = newCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      newCart[existingItemIndex].quantity += quantity;
    } else {
      newCart.push({ ...item, quantity });
    }
    
    setCart(newCart);
    saveCartToStorage(newCart);
    
    // Reset quantity selector to 1 after adding
    setQuantities(prev => ({
      ...prev,
      [item.id]: 1
    }));
  };

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  const allItems = menuCategories.flatMap(cat => 
    cat.items.map(item => ({...item, category: cat.name}))
  );

  const filteredItems = selectedCategory === "All" 
    ? allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : menuCategories
        .find(cat => cat.name === selectedCategory)
        ?.items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

  const categories = ["All", ...menuCategories.map(cat => cat.name)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-orange-100 p-2 md:p-3 sticky top-0 z-10">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-orange-50 p-1">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Menu</h1>
              <p className="text-xs text-gray-600">Cozy Kitchen • Table 5</p>
            </div>
          </div>
          <Link to="/cart">
            <Button className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-lg p-2">
              <ShoppingCart className="w-4 h-4" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </header>

      {/* Search */}
      <div className="p-2 md:p-3 bg-white/90 backdrop-blur-sm border-b border-orange-100">
        <div className="relative w-full px-2">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 border-gray-200 focus:border-orange-400 rounded-xl bg-gray-50 focus:bg-white transition-all h-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-2 md:p-3 bg-white/90 backdrop-blur-sm border-b border-orange-100">
        <div className="w-full px-2">
          <div className="flex space-x-1 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg" 
                    : "text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-200"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="w-full pb-24">
        <div className="">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 border-0 border-b border-gray-100 hover:border-orange-200 rounded-none">
              <CardContent className="p-0">
                <div className="flex w-full">
                  {/* Image */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 relative m-1">
                    <img
                      src={`https://images.unsplash.com/${item.image}?w=300&h=300&fit=crop`}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                    {item.popular && (
                      <Badge className="absolute -top-0.5 -left-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[8px] px-1 py-0">
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-1 flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-0.5">
                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded border ${item.veg ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500'}`}>
                          <div className={`w-0.5 h-0.5 md:w-1 md:h-1 rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'} m-0.25`}></div>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-xs md:text-sm leading-tight">{item.name}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600 fill-current" />
                          <span className="text-[10px] md:text-xs font-medium text-gray-700 ml-0.5">{item.rating}</span>
                        </div>
                        <p className="font-bold text-xs md:text-sm text-gray-900">₹{item.price}</p>
                      </div>
                    </div>

                    {/* Controls - Made same height as ADD button */}
                    <div className="flex items-center space-x-2 ml-2 mr-3">
                      <div className="flex items-center border border-orange-200 rounded-md bg-white/80 h-8">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-full w-8 p-0 hover:bg-orange-50 rounded-l-md rounded-r-none"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 py-0.5 text-xs font-medium min-w-[24px] text-center">
                          {quantities[item.id] || 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-full w-8 p-0 hover:bg-orange-50 rounded-r-md rounded-l-none"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button 
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 md:px-6 h-8 rounded-md font-medium text-xs shadow-md hover:shadow-lg transition-all"
                      >
                        ADD
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-2 left-2 right-2 z-20 w-full">
          <Link to="/cart">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-2xl py-2.5 md:py-3 flex items-center justify-between backdrop-blur-sm border border-orange-200 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-sm">
                  ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </span>
                <span className="ml-2 text-sm">VIEW CART</span>
              </div>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
