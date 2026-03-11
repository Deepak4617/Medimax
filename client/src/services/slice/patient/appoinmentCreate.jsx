import { createSlice } from "@reduxjs/toolkit";
import appoinmentCreate from "../../api/patient/appoinmentCreate";

const initialState = {
    loading: false,
    data: null,
    error: null
}

const appoinmentCreateSlice = createSlice({
    name: 'appoinmentCreate',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(appoinmentCreate.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(appoinmentCreate.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(appoinmentCreate.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default appoinmentCreateSlice.reducer