import Axios from "../../../networking/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_bill } from "../../../networking/urlEndPoint";

const getAllBills = createAsyncThunk(
  "getAllBills",
  async (_, { rejectWithValue }) => {

    try {

      const response = await Axios.get(get_bill);

      return response.data;

    } catch (error) {

      return rejectWithValue(error?.response?.data);

    }

  }
);

export default getAllBills;