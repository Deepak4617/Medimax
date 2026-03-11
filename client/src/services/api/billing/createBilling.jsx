import Axios from "../../../networking/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { billing_create } from "../../../networking/urlEndPoint";

const createBilling = createAsyncThunk(
    "createBilling",
    async (billingData, { rejectWithValue }) => {
        try {
            const requestData = {
                patientId: billingData?.patientId,
                doctorId: billingData?.doctorId,
                items: billingData?.items
            };

            const response = await Axios.post(
                billing_create,
                requestData
            );

            return response.data;

        } catch (error) {

            return rejectWithValue(
                error?.response?.data || "Something went wrong"
            );

        }
    }
);

export default createBilling;