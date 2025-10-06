import axiosInstance from '../utils/axiosInstance';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ( credentials: any, thunkApi)=>{
        try {
            console.warn("calliong api");
            
            const response = await axiosInstance.post('/api/auth/login', {
                email: credentials.email,
                password: credentials.password,
            })
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Login failed");
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending, (state)=>{
            state.loading = true
            state.error = null
            state.isAuthenticated = false
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);

        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading = false;     
            state.error = (action.payload as Error) || new Error("Login failed");
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        })
    }
})

export const {logout} = authSlice.actions

export default authSlice.reducer