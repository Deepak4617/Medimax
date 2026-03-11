import { createSlice } from "@reduxjs/toolkit";
import updateAppointmentStatus from "../../api/doctor/updateAppoinmentsStatus";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const updateAppointmentStatusSlice = createSlice({
    name: 'updateAppointmentStatus',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(updateAppointmentStatus.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(updateAppointmentStatus.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(updateAppointmentStatus.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default updateAppointmentStatusSlice.reducer