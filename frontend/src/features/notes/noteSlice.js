import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import noteService from './noteService'

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getNotes = createAsyncThunk('notes/getAll', async (ticket, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.getNotes(ticket, token);
    } catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const addNote = createAsyncThunk('notes/add', async ({noteText, ticketId}, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.addNote(noteText, ticketId, token);
    } catch (e){
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, (state) => {
            state.isLoading = true;
        }).addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.notes = action.payload
        }).addCase(getNotes.rejected, (state, action) => {
            state.isLoading= false;
            state.isError = true;
            state.message = action.payload;
        }).addCase(addNote.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.notes.push(action.payload);
        }).addCase(addNote.rejected, (state, action) => {
            state.isLoading= false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = noteSlice.actions;
export default noteSlice.reducer