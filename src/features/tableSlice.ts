import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from '../utils/axiosInstance';

export interface Table {
    _id: string;
    tableNumber: number;
    isAvailable: boolean;
    qrCode: string;
    seating?: number;
    //   activeBill?: Types.ObjectId | IBill;
}

interface TableState {
    tables: Table[];
    loading: boolean;
    error: Error | null;
    qrCode: string | null;
    success: string | null;

}

const initialState: TableState = {
    tables: [],
    loading: false,
    error: null,
    qrCode: null,
    success: null,
};

export const getTables = createAsyncThunk(
    "table/getTables",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/api/table/list_tables')
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch tables");
        }

    }
)

export const getTableQrCode = createAsyncThunk(
    "table/getTableQrCode",
    async (id: string, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/api/table/${id}/qr`, {
                responseType: "arraybuffer",
            });
            const base64Image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );
            return `data:image/png;base64,${base64Image}`;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch QR code");
        }

    }
)

export const createTable = createAsyncThunk(
    "table/createTable",
    async (data: Table, thunkApi)=>{
        try {
            const response = await axiosInstance.post("/api/table/create_table", data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Failed to create table");
        }

    }
)

export const updateTable = createAsyncThunk(
    "table/updateTable",
  async ({ id, data }: { id: string; data: Table }, thunkApi) => {
        try {
            const response = await axiosInstance.put(`/api/table/update_table/${id}`, data)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Failed to update table");
        }

    }
)

export const deleteable = createAsyncThunk(
    "table/deleteTable",
    async (id: string, thunkApi)=>{
        try {
            const response = await axiosInstance.delete(`/api/table/delete_table/${id}`)
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "Failed to delete table");
        }

    }
)

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTables.pending, (state) => {
                state.loading = true
                state.error = null
                state.tables = []
            })
            .addCase(getTables.fulfilled, (state, action: PayloadAction<Table[]>) => {
                state.loading = false
                state.error = null
                state.tables = action.payload
            })
            .addCase(getTables.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getTableQrCode.pending, (state) => {
                state.error = null;
            })
            .addCase(getTableQrCode.fulfilled, (state, action: PayloadAction<string>) => {
                state.qrCode = action.payload;
            })
            .addCase(getTableQrCode.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
            })
            .addCase(createTable.pending, (state)=>{
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(createTable.fulfilled, (state, action: PayloadAction<any>)=>{
                state.loading = false
                state.error = null
                state.tables.push(action.payload.table)
                state.success = action.payload.message
            })
            .addCase(createTable.rejected, (state, action: PayloadAction<any>)=>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateTable.pending, (state)=>{
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(updateTable.fulfilled, (state, action: PayloadAction<any>)=>{
                state.loading = false
                state.error = null
                state.success = action.payload.message
            })
            .addCase(updateTable.rejected, (state, action: PayloadAction<any>)=>{
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteable.pending, (state)=>{
                state.loading = true
                state.error = null
                state.success = null
            })
            .addCase(deleteable.fulfilled, (state, action: PayloadAction<any>)=>{
                state.loading = false
                state.error = null
                state.success = action.payload.message
            })
            .addCase(deleteable.rejected, (state, action: PayloadAction<any>)=>{
                state.loading = false
                state.error = action.payload
            })
    }
})

export default tableSlice.reducer