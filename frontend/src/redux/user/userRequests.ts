import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReturnUser } from "./userTypes";
import axios from "axios";
import api from "../api.config";

export const getMe = createAsyncThunk<
  ReturnUser,
  void,
  { rejectValue: { message: string } }
>("/user/getMe", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`/user/me?_t=${Date.now()}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error);
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
    return rejectWithValue({ message: "Unexpected error occurred" });
  }
});

// export const getMe = createAsyncThunk<
//   ReturnUser,
//   // { isPasswordInclude?: boolean } | void,
//   void,
//   { rejectValue: { message: string } }
// >("/user/getMe", async (_, { rejectWithValue }) => {
//   try {
//     const res = await api.get("/user/me", {
//       params: { isPasswordInclude },
//     });
//     // console.log(res);
//     return res.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // console.log(error);
//       return rejectWithValue({
//         message: error.response?.data?.message || "Signin failed",
//       });
//     }
//     return rejectWithValue({ message: "Unexpected error occurred" });
//   }
// });
