import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getMe, signin, signup } from "./userRequests";
import { handleLoading } from "../sliceHelpers";
import type { ReturnUser, ReturnUserAuth } from "./userTypes";

export interface UserInitialState {
  user: {
    name: string | null;
    email: string | null;
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  isRefreshing: boolean;
  token: null | string;
}

const initialState: UserInitialState = {
  user: {
    name: null,
    email: null,
  },
  isLoading: false,
  isLoggedIn: false,
  error: null,
  isRefreshing: true,
  token: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logOut: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, handleLoading)
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<ReturnUserAuth>) => {
          state.token = action.payload.token;
          state.user.name = action.payload.name;
          state.isLoggedIn = true;
          state.isLoading = false;
        },
      )
      .addCase(
        signup.rejected,
        (state, action: PayloadAction<{ message: string } | undefined>) => {
          state.isLoggedIn = false;
          state.isRefreshing = false;
          state.error = action.payload?.message ?? "Error occured";
          state.isLoading = false;
        },
      )

      .addCase(signin.pending, handleLoading)
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<ReturnUserAuth>) => {
          state.token = action.payload.token;
          state.user.name = action.payload.name;
          state.isLoggedIn = true;
          state.isLoading = false;
        },
      )
      .addCase(
        signin.rejected,
        (state, action: PayloadAction<{ message: string } | undefined>) => {
          state.isLoggedIn = false;
          state.isRefreshing = false;
          state.error = action.payload?.message ?? "Error occured";
          state.isLoading = false;
        },
      )

      .addCase(getMe.pending, handleLoading)
      .addCase(getMe.fulfilled, (state, action: PayloadAction<ReturnUser>) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(
        getMe.rejected,
        (state, action: PayloadAction<{ message: string } | undefined>) => {
          state.isLoggedIn = false;
          state.isRefreshing = false;
          state.error = action.payload?.message ?? "Error occured";
          state.isLoading = false;
        },
      );
  },
});

export const { logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
