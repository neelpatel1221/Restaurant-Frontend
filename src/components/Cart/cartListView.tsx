import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash, Minus, Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "@/features/cartSlice"

export function CartListView() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: cart } = useSelector((state: RootState) => state.cart)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Sheet>
      {/* 🛒 CART TRIGGER BUTTON */}
      <SheetTrigger asChild>
        <Button className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl shadow-lg p-2">
          <ShoppingCart className="w-4 h-4" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 animate-bounce">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      {/* 🧾 CART SIDESHEET */}
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="border-b border-orange-100 px-4 py-3">
          <SheetTitle className="text-lg font-semibold text-gray-900">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {/* SCROLLABLE CART CONTENT */}
        <ScrollArea className="h-[75vh] px-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-20">
              <ShoppingCart className="w-12 h-12 text-orange-400 mb-2" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.itemId}
                  className="flex items-center gap-3 border border-orange-100 rounded-lg p-2 hover:shadow-sm transition-all"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 bg-orange-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch(decrementQuantity(item.itemId))}
                      className="rounded-full hover:bg-orange-100"
                    >
                      <Minus className="w-3 h-3 text-orange-600" />
                    </Button>
                    <span className="text-sm font-medium w-5 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch(incrementQuantity(item.itemId))}
                      className="rounded-full hover:bg-orange-100"
                    >
                      <Plus className="w-3 h-3 text-orange-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.itemId))}
                      className="rounded-full hover:bg-red-100 ml-1"
                    >
                      <Trash className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* FOOTER */}
        <SheetFooter className="border-t border-orange-100 p-4">
          {cart.length > 0 && (
            <div className="w-full space-y-3">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => dispatch(clearCart())}
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Clear
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md">
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
