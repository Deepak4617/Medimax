import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../networking/interceptor";
import { get_my_appoinment } from "../../../networking/urlEndPoint";
import Cookies from "js-cookie";

const getMyAppointments = createAsyncThunk(
    "getMyAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // make sure this is set

            const response = await Axios.get(get_my_appoinment, {
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

export default getMyAppointments;