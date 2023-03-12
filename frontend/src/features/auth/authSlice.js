import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer