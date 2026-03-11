import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_register } from "../../../networking/urlEndPoint";

import Axios from "../../../networking/interceptor";

const authRegister = createAsyncThunk('authRegister', async (userData, { rejectWithValue }) => {
    try {
        const requestData = {
            name: userData?.name,
            email: userData?.email,
            phone: userData?.phone,
            password: userData?.password,
            role: userData?.role,
            specialization: userData?.specialization
        };
        const response = await Axios.post(auth_register, requestData);
        const data = response.data;
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export default authRegister;
