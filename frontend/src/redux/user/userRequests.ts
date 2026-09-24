import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  SignInUser,
  ReturnUser,
  SignUpUser,
  ReturnUserAuth,
} from "./userTypes";
import api, { setAuthToken } from "../api.config";
import type { RootState } from "../store";

export const signup = createAsyncThunk<
  ReturnUserAuth,
  SignUpUser,
  { rejectValue: { message: string } }
>("user/signup", async (credentials, thunkAPI) => {
  try {
    const response = await api.post<ReturnUserAuth>(
      "/auth/signup",
      credentials,
    );
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export const signin = createAsyncThunk<
  ReturnUserAuth,
  SignInUser,
  { rejectValue: { message: string } }
>("user/signin", async (credentials, thunkAPI) => {
  try {
    const response = await api.post("/auth/signin", credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export const getMe = createAsyncThunk<
  ReturnUser,
  void,
  { rejectValue: { message: string }; state: RootState }
>("user/getMe", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const persistToken = state.user.token;

  if (persistToken === null) {
    return rejectWithValue({ message: "Unauthorized!" });
  }

  try {
    setAuthToken(persistToken);
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Authorization failed",
      });
    }
    return rejectWithValue({ message: "Unexpected error occurred" });
  }
});
