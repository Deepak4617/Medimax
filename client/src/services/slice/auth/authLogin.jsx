import { createSlice } from "@reduxjs/toolkit";
import authLogin from "../../api/auth/authLogin";

const initialState = {
    loading: false,
    data: null,
    error: null
}

const authLoginSlice = createSlice({
    name: 'auth',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state) => {
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            }
        })

        builder.addCase(authLogin.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            }
        })

        builder.addCase(authLogin.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                data: null,
                error: action.payload
            }
        })
    }

})

export default authLoginSlice.reducer