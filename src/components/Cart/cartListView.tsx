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
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getBill, placeOrder } from "@/features/orderSlice"
import toast from "react-hot-toast"

export function CartListView() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: cart } = useSelector((state: RootState) => state.cart)
  const { bill, error } = useSelector((state: RootState) => state.orders)
  let { id: tableNo } = useParams()
  const [showModal, setShowModal] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  useEffect(() => {
    if (localStorage.getItem("billId")) {
      dispatch(getBill(localStorage.getItem("billId")!))
    }
  }, [])

  useEffect(() => {
    if (error) toast.error(error.message || "Something went wrong")
  }, [error])

  const handlePlaceOrder = () => {
    if (!tableNo) {
      setShowModal(true)
      return
    }

    const items = cart.map((item) => ({
      _id: item.itemId,
      quantity: item.quantity,
    }))

    const billId = localStorage.getItem("billId") || ""
    const data = {
      tableNo: Number(tableNo),
      items,
      billId: billId || null,
    }

    dispatch(placeOrder(data))
      .unwrap()
      .then((res) => {
        dispatch(clearCart())
        toast.success("Order placed successfully!")
      })
      .catch(() => toast.error("Failed to place order"))
  }

  return (
    <>
      <Sheet>
        {/* TRIGGER BUTTON */}
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

        {/* CART SIDESHEET */}
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <SheetHeader className="border-b border-orange-100 px-4 py-3">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              Your Orders & Cart
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="h-[75vh] px-4 space-y-6 py-4">

            {bill && bill.orders?.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2 border-b border-orange-200 pb-1">
                  Ordered Items
                </h3>

                {bill.orders[0].items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-gray-100 rounded-md p-2 mb-2 bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">
                      ₹{item.total.toFixed(2)}
                    </p>
                  </div>
                ))}
                {bill.orders.length > 0 && (
                  <div className="w-full space-y-3">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>Total Items:</span>
                      <span>{bill.orders[0].items.length}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-900">
                      <span>Total:</span>
                      <span>₹{bill.totalAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between gap-2 pt-2">
                      <Button
                        // onClick={handlePlaceOrder}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md"
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>

            )}


            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 border-b border-orange-200 pb-1">
                Cart Items
              </h3>

              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <ShoppingCart className="w-8 h-8 text-orange-400 mb-1" />
                  <p>No items in your cart</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.itemId}
                      className="flex items-center gap-3 border border-orange-100 rounded-lg p-2 hover:shadow-sm transition-all"
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

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
            </div>
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

                <div className="flex justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-100"
                    onClick={() => dispatch(clearCart())}
                  >
                    <Trash className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md"
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </SheetFooter>

          {/* DIALOG */}
          {showModal && (
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Enter Table No</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="Enter table number"
                  value={tableNo}
                  onChange={(e) => (tableNo = e.target.value)}
                />
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowModal(false)
                      handlePlaceOrder()
                    }}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
