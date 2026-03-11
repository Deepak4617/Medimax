import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Axios from "../../../networking/interceptor";
import { delete_doctor } from "../../../networking/urlEndPoint";

const deleteDoctor = createAsyncThunk(
  "doctor/deleteDoctor",
  async (id, { rejectWithValue }) => {
    try {

      const token = Cookies.get("authToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await Axios.delete(`${delete_doctor}/${id}`, config);

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error?.response?.data || "Network Error"
      );

    }
  }
);

export default deleteDoctor;