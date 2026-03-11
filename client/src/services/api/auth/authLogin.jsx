import Cookies from "js-cookie";
import Axios from "../../../networking/interceptor";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth_login } from "../../../networking/urlEndPoint";

const authLogin = createAsyncThunk(
  "authLogin",
  async (userDetail, { rejectWithValue }) => {
    try {
      const requestData = {
        email: userDetail?.email,
        password: userDetail?.password,
      };

      const response = await Axios.post(auth_login, requestData);

      if (!response?.data?.token) {
        return rejectWithValue("Invalid email or password");
      }

      const data = response.data;

      // ✅ Token cookie
      Cookies.set("authToken", data.token, { expires: 7 });

      // ✅ User cookie
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export default authLogin;