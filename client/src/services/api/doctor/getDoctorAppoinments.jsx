import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../networking/interceptor";
import { get_doctor_appoinmet } from "../../../networking/urlEndPoint";
import Cookies from "js-cookie";

const getDoctorAppoinments = createAsyncThunk(
    "getDoctorAppoinments",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken"); // make sure this is set

            const response = await Axios.get(get_doctor_appoinmet, {
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

export default getDoctorAppoinments;