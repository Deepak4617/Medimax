import { createSlice } from "@reduxjs/toolkit";
import authLogout from "../../api/auth/authLogout";

const initialState = {
  loading: false,
  data: null,
  error: null
};

const authLogoutSlice = createSlice({
  name: "authLogout",
  initialState,

  extraReducers: (builder) => {

    builder.addCase(authLogout.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    });

    builder.addCase(authLogout.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(authLogout.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    });

  },
});

export default authLogoutSlice.reducer;