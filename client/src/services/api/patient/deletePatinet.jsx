import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Axios from "../../../networking/interceptor";
import { delete_patient } from "../../../networking/urlEndPoint";

const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (id, { rejectWithValue }) => {
    try {

      const token = Cookies.get("authToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await Axios.delete(`${delete_patient}/${id}`, config);

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error?.response?.data || "Network Error"
      );

    }
  }
);

export default deletePatient;