import { createSlice } from "@reduxjs/toolkit";
import deleteDoctor from "../../api/doctor/deleteDoctor";
const initialState = {
    loading: false,
    data: null,
    error: null
}

const deleteDoctorSlice = createSlice({
    name: 'deleteUsers',
    initialState,

    // reducers: {
    //     resetDeleteContacts: () => initialState
    // },

    extraReducers: (builder) => {
        builder.addCase(deleteDoctor.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(deleteDoctor.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(deleteDoctor.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})
// export const { resetdeleteDoctors } = deleteDoctorSlice?.actions
export default deleteDoctorSlice?.reducer