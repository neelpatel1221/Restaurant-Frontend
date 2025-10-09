import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance';

export interface MenuItem {
    itemName: string;
    _id: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable?: boolean;
    categoryId?:  Category | string;
}
export interface Category {
    _id: string;
    categoryName: string;
    description: string;
    isActive: boolean;
}

interface MenuState {
    menuItems: MenuItem[] | null;
    menu: any[];
    categories: Category[] | null;
    loading: boolean;
    error: Error | null;
    success: string | null;
}

const initialState: MenuState = {
    menuItems: [],
    menu: [],
    categories: [],
    loading: false,
    error: null,
    success: null,
};

export const getMenuCategorys = createAsyncThunk(
    "menu/getMenuCategorys",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/menu/list_categories")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Categorys");
        }
    }
)
export const createCategory = createAsyncThunk(
    "menu/createCategory",
    async (data: Category, thunkApi) => {
        try {
            const response = await axiosInstance.post(`/menu/create_category`, data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Create Category")
        }
    }
)

export const updateCategory = createAsyncThunk(
    "menu/updateCategory",
    async ({ id, data }: { id: string, data: Category }, thunkApi) => {
        try {
            const response = await axiosInstance.put(`/menu/update_category/${id}`, data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Update Category")
        }
    }
)
export const deleteCategory = createAsyncThunk(
    "menu/deleteCategory",
    async (id: string, thunkApi) => {
        try {
            const response = await axiosInstance.delete(`/menu/delete_category/${id}`)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Delete Category")
        }
    }
)

export const createMenuItem = createAsyncThunk(
    "menu/createMenuItem",
    async (data: any, thunkApi) => {
        try {

            const response = await axiosInstance.post(`/menu/create_menu_item`, data, {headers: {'Content-Type': 'multipart/form-data'}})
            return response.data

        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Create Menu Item")
        }
    }
)

export const getMenuItems = createAsyncThunk(
    "menu/getMenuItems",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/menu/list_menu_items")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Menu Items");
        }
    }
)

export const getMenu = createAsyncThunk(
    "menu/getMenu",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/menu")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Menu");
        }
    }
)

export const updateMenuItem = createAsyncThunk(
    "menu/updateMenuItem",
    async ({ id, data }: { id: string, data: any }, thunkApi) => {
        try {
            const response = await axiosInstance.put(`/menu/update_menu_item/${id}`, data, {headers: {'Content-Type': 'multipart/form-data'}})
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Update Menu Item")
        }
    }
)

export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id: string, thunkApi) => {
        try {
            const response = await axiosInstance.delete(`/menu/delete_menu_item/${id}`)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Fail to Delete Menu Item")
        }
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMenuCategorys.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(getMenuCategorys.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.categories = action.payload.categories
                state.loading = false
            })
            .addCase(getMenuCategorys.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
            .addCase(createCategory.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.categories.push(action.payload.category)
                state.loading = false
            })
            .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
            .addCase(updateCategory.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.error = null
                state.loading = false
            })
            .addCase(updateCategory.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
            .addCase(deleteCategory.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.error = null
                state.loading = false
            })
            .addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })

            // Menu Item

            .addCase(getMenuItems.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(getMenuItems.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.menuItems = action.payload.menuItems
                state.loading = false
            })
            .addCase(getMenuItems.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
            .addCase(getMenu.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(getMenu.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.menu = action.payload
                state.loading = false
            })
            .addCase(getMenu.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })

            .addCase(createMenuItem.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(createMenuItem.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.menuItems?.push(action.payload.menuItem)
                state.error = null
                state.loading = false
            })
            .addCase(createMenuItem.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
            .addCase(updateMenuItem.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(updateMenuItem.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.error = null
                state.loading = false
            })
            .addCase(updateMenuItem.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
            .addCase(deleteMenuItem.pending, (state) => {
                state.error = null
                state.success = null
                state.loading = true
            })
            .addCase(deleteMenuItem.fulfilled, (state, action: PayloadAction<any>) => {
                state.success = action.payload.message
                state.error = null
                state.loading = false
            })
            .addCase(deleteMenuItem.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload
                state.success = null
                state.loading = false
            })
    }
})


export default menuSlice.reducer