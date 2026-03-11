import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_all_doctors } from "../../../networking/urlEndPoint";
import Axios from "../../../networking/interceptor";

const getAllDoctors = createAsyncThunk('getServicesData', async (_, { rejectWithValue }) => {
    try {

        const response = await Axios.get(get_all_doctors);
        const data = response.data;

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default getAllDoctors;