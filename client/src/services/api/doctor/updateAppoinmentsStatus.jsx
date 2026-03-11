import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../../networking/interceptor";
import { update_appoinments_status } from "../../../networking/urlEndPoint";

const updateAppointmentStatus = createAsyncThunk(
  "updateAppointmentStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // append ID dynamically using backticks
      const response = await Axios.put(
        `${update_appoinments_status}/${id}`, // <-- matches your controller
        { status }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network Error");
    }
  }
);

export default updateAppointmentStatus;