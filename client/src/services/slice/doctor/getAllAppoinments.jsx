import { createSlice } from "@reduxjs/toolkit";
import getAllAppointments from "../../api/doctor/getAllAppoinments";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getAllAppointmentsSlice = createSlice({
    name: 'getAllAppointments',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllAppointments.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getAllAppointments.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getAllAppointments.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getAllAppointmentsSlice.reducer