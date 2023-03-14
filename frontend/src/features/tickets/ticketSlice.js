import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from './ticketService';

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
//create new ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticket, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        console.log(ticket, token)
        return await ticketService.createTicket(ticket, token);
    } catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder => {
        builder.addCase(createTicket.pending, (state) => {
            state.isLoading = true;
        }).addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        }).addCase(createTicket.rejected, (state, action) => {
            state.isLoading= false;
            state.isError = true;
            state.message = action.payload;
        })
    })
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer