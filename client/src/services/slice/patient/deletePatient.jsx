import { createSlice } from "@reduxjs/toolkit";
import deletePatient from "../../api/patient/deletePatinet";
const initialState = {
    loading: false,
    data: null,
    error: null
}

const deletePatientSlice = createSlice({
    name: 'deleteUsers',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(deletePatient.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(deletePatient.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(deletePatient.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})
// export const { resetdeletePatients } = deletePatientSlice?.actions
export default deletePatientSlice?.reducer