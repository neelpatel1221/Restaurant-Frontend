import axiosInstance from '../utils/axiosInstance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearCart } from './cartSlice';

export interface OrderItem {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export enum OrderStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export interface Order {
    customerId?: string;
    tableId: string;
    billId: string;
    items: OrderItem[];
    status: OrderStatus;
    isActive: boolean;
    totalAmount: number;
}

export interface Bill {
    _id: string
    tableId: string;
    orders: Order[];
    status: string;
    totalAmount: number;
    paidAmount: number;
    isClosed: boolean;
    paymentStatus: string;

}
const initialOrderState = {
    orders: [],
    bill: {} as Bill,
    loading: false,
    error: null,
    success: null,
}

export const placeOrder = createAsyncThunk(
    "/order/placeOrder",
    async (data: any, thunkApi) => {
        try {
            const response = await axiosInstance.post("/order/place_order", data)
            thunkApi.dispatch(clearCart());
            localStorage.removeItem("cart")
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Create Menu Item")
        }
    }
)

export const getBill = createAsyncThunk(
    "/order/getBill",
    async (billId: string, thunkApi) => {
        try {
            const response = await axiosInstance.get(`/order/get_bill/${billId}`, )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Get Bill")
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialOrderState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getBill.pending, (state, action) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(getBill.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.message
                state.bill = action.payload.bill
            })
            .addCase(getBill.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(placeOrder.pending, (state, action) => {
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false
                state.success = action.payload.message
                state.orders.push(action.payload.order)
                state.bill = action.payload.bill
                if (state.bill._id) {
                    localStorage.setItem("billId", state.bill._id);
                }
                state.bill = action.payload.bill
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})


export default orderSlice.reducer