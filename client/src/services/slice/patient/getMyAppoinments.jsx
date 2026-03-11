import { createSlice } from "@reduxjs/toolkit";
import getMyAppointments from "../../api/patient/getMyAppoinments";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getMyAppointmentsSlice = createSlice({
    name: 'getMyAppointments',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getMyAppointments.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getMyAppointments.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getMyAppointments.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getMyAppointmentsSlice.reducer