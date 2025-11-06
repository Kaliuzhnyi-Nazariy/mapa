import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.config";
import axios from "axios";

export interface ReturnUser {
  name: string;
  email: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface SignUpUser extends SignInUser {
  name: string;
}

export const signup = createAsyncThunk<
  ReturnUser,
  SignUpUser,
  { rejectValue: { message: string } }
>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/signup", data);
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

export const signin = createAsyncThunk<
  ReturnUser,
  SignInUser,
  { rejectValue: { message: string } }
>("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/signin", data, { withCredentials: true });
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

export const signout = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>("auth/signout", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/signout", { withCredentials: true });
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
