import { createSlice } from "@reduxjs/toolkit";
import getAllDoctors from "../../api/doctor/getAllDoctors";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getAllDoctorsSlice = createSlice({
    name: 'getAllDoctors',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllDoctors.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getAllDoctors.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getAllDoctors.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getAllDoctorsSlice.reducer