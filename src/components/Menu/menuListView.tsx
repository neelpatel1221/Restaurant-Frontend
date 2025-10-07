import { getMenu } from "@/features/menuSlice"
import { AppDispatch, RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

const getCartFromStorage = () => {
    const stored = localStorage.getItem('restaurant-cart');
    return stored ? JSON.parse(stored) : [];
};
const saveCartToStorage = (cart: any[]) => {
    localStorage.setItem('restaurant-cart', JSON.stringify(cart));
};
export function MenuListView() {
    const dispatch = useDispatch<AppDispatch>()
    const { menu, error } = useSelector((state: RootState) => state.menu)
    const [cart, setCart] = useState<any[]>(getCartFromStorage());

    useEffect(() => {
        dispatch(getMenu())
    }, [])





    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">

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
                <div className="p-4 space-y-6">
        {menu.map((category) => (
          <div key={category.categoryId}>
            <h2 className="text-xl font-bold text-gray-800 mb-3 capitalize">
              {category.categoryName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <Card
                  key={item.itemId}
                  className="overflow-hidden hover:shadow-md transition-shadow bg-white"
                >
                  {/* IMAGE PLACEHOLDER */}
                  <div className="h-40 w-full bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
                    <img
                      src={`${item.imageUrl}`}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.itemDescription}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{item.price}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    //   onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
            </div>
        </>
    )
}