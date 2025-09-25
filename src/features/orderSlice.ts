import { createSlice } from '@reduxjs/toolkit'
const initialOrderState = {
    orders: []
}
export const orderSlice = createSlice({
    name: 'orders',
    initialState: initialOrderState,
    reducers: {

    }
})