import Cookies from "js-cookie";
import Axios from "../../../networking/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_logout } from "../../../networking/urlEndPoint";

const authLogout = createAsyncThunk(
  "authLogout",
  async (_, { rejectWithValue }) => {
    try {

      const response = await Axios.post(auth_logout);

      // remove cookies
      Cookies.remove("authToken");
      Cookies.remove("user");

      return response.data;

    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export default authLogout;