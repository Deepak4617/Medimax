import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../networking/interceptor";
import { get_all_appoinments } from "../../../networking/urlEndPoint";
import Cookies from "js-cookie";

const getAllAppointments = createAsyncThunk(
    "getAllAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // make sure this is set

            const response = await Axios.get(get_all_appoinments, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Network Error");
        }
    }
);

export default getAllAppointments;