import Cookies from "js-cookie";
import Axios from "../../../networking/interceptor";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { appoinment_create } from "../../../networking/urlEndPoint";

const appoinmentCreate = createAsyncThunk(
  "appoinmentCreate",
  async (userDetail, { rejectWithValue }) => {
    try {
      const requestData = {
        doctor: userDetail?.doctor,
        date: userDetail?.date,
        time: userDetail?.time
      };

      const response = await Axios.post(appoinment_create, requestData);

      const data = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export default appoinmentCreate;