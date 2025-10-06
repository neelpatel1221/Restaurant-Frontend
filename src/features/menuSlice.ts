import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

export interface Menu {
  _id: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable?: boolean;
  categoryId?: string;
}

interface MenuState {
  menus: Menu[] | null;
  loading: boolean;
  error: Error | null;
  success: string | null;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
  success: null,
};

export const getMenuCategorys = createAsyncThunk(
    "menu/getMenuCategorys",
    async (_, thunkAPI)=>{
        try {
            const response = await axiosInstance.get("/api/menu/list_categories")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Categorys");
        }
    }
)
export const createCategory = createAsyncThunk(
    "menu/createCategory",
    async (data: Menu, thunkApi)=>{
        try {
            const response = await axiosInstance.post(`/api/menu/create_menu`, data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Create Category")
        }
    }
)

export const updateCategory = createAsyncThunk(
    "menu/updateCategory",
    async ({id, data}: {id: string, data: Menu}, thunkApi)=>{
        try {
            const response = await axiosInstance.put(`/api/menu/update_menu/${id}`, data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Update Category")
        }
    }
)
export const deleteCategory = createAsyncThunk(
    "menu/updateCategory",
    async (id: string, thunkApi)=>{
        try {
            const response = await axiosInstance.delete(`/api/menu/delete_menu/${id}`)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Delete Category")
        }
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getMenuCategorys.pending, (state)=>{
            state.error = null
            state.success = null
            state.loading = true
        })
        .addCase(getMenuCategorys.fulfilled, (state, action: PayloadAction<any>)=>{
            state.success = action.payload.message
            state.menus = action.payload.categories
            state.loading = false
        })
        .addCase(getMenuCategorys.rejected, (state, action: PayloadAction<any>)=>{
            state.error = action.payload
            state.success = null
            state.loading = false
        })
        .addCase(createCategory.pending, (state)=>{
            state.error = null
            state.success = null
            state.loading = true
        })
        .addCase(createCategory.fulfilled, (state, action: PayloadAction<any>)=>{
            state.success = action.payload.message
            state.menus.push(action.payload.menuCategory)
            // state.menus = action.payload.menu
            state.loading = false
        })
        .addCase(createCategory.rejected, (state, action: PayloadAction<any>)=>{
            state.error = action.payload
            state.success = null
            state.loading = false
        })
    }
})


export default menuSlice.reducer