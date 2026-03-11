import { createSlice } from "@reduxjs/toolkit";
import createBilling from "../../api/billing/createBilling";

const initialState = {
  loading: false,
  data: null,
  error: null
};

const createBillingSlice = createSlice({
  name: "createBilling",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(createBilling.pending, (state) => {
      return {
        ...state,
        loading: true,
        data: null,
        error: null
      };
    });

    builder.addCase(createBilling.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    });

    builder.addCase(createBilling.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      };
    });

  }
});

export default createBillingSlice.reducer;