import Cookies from "js-cookie";
import Axios from "../../../networking/interceptor";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { add_doctors } from "../../../networking/urlEndPoint";

const addDoctors = createAsyncThunk(
    "addDoctors",
    async (userDetail, { rejectWithValue }) => {
        try {
            const requestData = {
                name: userDetail?.name,
                email: userDetail?.email,
                phone: userDetail?.phone,
                password: userDetail?.password,
                specialization: userDetail?.specialization
            };

            const response = await Axios.post(add_doctors, requestData);

            const data = response.data;

            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export default addDoctors;