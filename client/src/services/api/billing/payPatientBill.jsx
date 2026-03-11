import Axios from "../../../networking/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pay_bill } from "../../../networking/urlEndPoint";

const payPatientBill = createAsyncThunk(
  "payPatientBill",
  async (billId, { rejectWithValue }) => {

    try {

      const response = await Axios.put(`${pay_bill}/${billId}`);

      return response.data;

    } catch (error) {

      return rejectWithValue(error?.response?.data);

    }

  }
);

export default payPatientBill;