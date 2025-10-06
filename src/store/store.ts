import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../features/authSlice"
import tableReducer from "../features/tableSlice"
import menuReducer from "../features/menuSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tables: tableReducer,
        menu: menuReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch