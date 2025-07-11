import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ContactData} from "../model/ContactData.ts";
import {backendApi} from "../api.ts";

interface ContactState {
    list: ContactData[]
    error: string | null | undefined
}

const initialState: ContactState = {
    list: [],
    error: null,
}

export const saveContact = createAsyncThunk(
    'contact/save',
    async (data: ContactData) => {
        const response = await backendApi.post("/contact/save", data);
        const message = response.data.message;
        alert(message);
    }
)

const contactSlice = createSlice({
    name:'contact',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(saveContact.pending, () => {
            alert("Sending contact request, please wait...");
        }).addCase(saveContact.fulfilled, () => {
            alert("Contact request sent successfully!");
        }).addCase(saveContact.rejected, (state, action) => {
            state.error = action.error.message;
            alert("Error sending contact request: " + state.error);
        });
    }
});

export const contactReducer = contactSlice.reducer;