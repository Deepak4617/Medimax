import { createSlice } from "@reduxjs/toolkit";
import getDoctorAppoinments from "../../api/doctor/getDoctorAppoinments";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getDoctorAppoinmentsSlice = createSlice({
    name: 'getDoctorAppointments',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getDoctorAppoinments.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getDoctorAppoinments.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getDoctorAppoinments.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getDoctorAppoinmentsSlice.reducer