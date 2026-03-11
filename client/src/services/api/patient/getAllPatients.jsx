import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_all_patients } from "../../../networking/urlEndPoint";
import Axios from "../../../networking/interceptor";

const getAllPatients = createAsyncThunk('getAllPatients', async (_, { rejectWithValue }) => {
    try {

        const response = await Axios.get(get_all_patients);
        const data = response.data;

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Network Error");
    }
});

export default getAllPatients;