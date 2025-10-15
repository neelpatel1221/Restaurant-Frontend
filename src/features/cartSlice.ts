import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  itemId: string
  name: string
  price: number
  imageUrl?: string
  itemDescription?: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const getCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem("cart")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveCartToStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

const initialState: CartState = {
  items: getCartFromStorage(),
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(i => i.itemId === action.payload.itemId)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      saveCartToStorage(state.items)
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.itemId === action.payload)
      if (item) {
        item.quantity += 1
        saveCartToStorage(state.items)
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.itemId === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(i => i.itemId !== action.payload)
        }
        saveCartToStorage(state.items)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.itemId !== action.payload)
      saveCartToStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      saveCartToStorage([])
    },
  },
})

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer
