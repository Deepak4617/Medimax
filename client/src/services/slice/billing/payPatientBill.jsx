import { createSlice } from "@reduxjs/toolkit";
import payPatientBill from "../../api/billing/payPatientBill";

const initialState = {
  loading: false,
  data: null,
  error: null
};

const payPatientBillSlice = createSlice({
  name: "payPatientBill",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(payPatientBill.pending, (state) => {
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      };
    });

    builder.addCase(payPatientBill.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    });

    builder.addCase(payPatientBill.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      };
    });

  }

});

export default payPatientBillSlice.reducer;