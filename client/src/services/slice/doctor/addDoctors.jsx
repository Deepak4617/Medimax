import { createSlice } from "@reduxjs/toolkit";
import addDoctors from "../../api/doctor/addDoctors";

const initialState = {
    loading: false,
    data: null,
    error: null
}

const addDoctorsSlice = createSlice({
    name: 'addDoctors',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(addDoctors.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(addDoctors.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(addDoctors.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default addDoctorsSlice.reducer