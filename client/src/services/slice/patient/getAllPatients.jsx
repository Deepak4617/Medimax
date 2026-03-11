import { createSlice } from "@reduxjs/toolkit";
import getAllPatients from "../../api/patient/getAllPatients";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getAllPatientsSlice = createSlice({
    name: 'getAllPatients',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllPatients.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getAllPatients.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getAllPatients.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getAllPatientsSlice.reducer