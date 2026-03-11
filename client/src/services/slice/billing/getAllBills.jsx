import { createSlice } from "@reduxjs/toolkit";
import getAllBills from "../../api/billing/getAllBills";

const initialState = {
    loading: false,
    data: null,
    error: null
}

 const getAllBillsSlice = createSlice({
    name: 'getAllBills',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getAllBills.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(getAllBills.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(getAllBills.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default getAllBillsSlice.reducer