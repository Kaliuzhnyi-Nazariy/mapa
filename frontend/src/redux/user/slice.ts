import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { signin, signout, signup } from "./authRequests";

interface UserInitialState {
  user: {
    name: string | null;
    email: string | null;
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: UserInitialState = {
  user: {
    name: null,
    email: null,
  },
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const pendingHandler = (state: UserInitialState) => {
  state.error = null;
  state.isLoading = true;
};

const rejectionHandler = (
  state: UserInitialState,
  action: PayloadAction<{ message: string } | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload?.message ?? "Unexpected error occurred";
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signup.pending, pendingHandler)
      .addCase(
        signup.fulfilled,
        (
          state: UserInitialState,
          action: PayloadAction<{ name: string; email: string }>
        ) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      )
      .addCase(signup.rejected, rejectionHandler)

      .addCase(signin.pending, pendingHandler)
      .addCase(
        signin.fulfilled,
        (
          state: UserInitialState,
          action: PayloadAction<{ name: string; email: string }>
        ) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload;
        }
      )
      .addCase(signin.rejected, rejectionHandler)

      .addCase(signout.pending, pendingHandler)
      .addCase(signout.fulfilled, (state: UserInitialState) => {
        state.user = initialState.user;
        state.isLoading = initialState.isLoading;
        state.isLoggedIn = initialState.isLoggedIn;
      })
      .addCase(signout.rejected, rejectionHandler);
  },
});

export const userReducer = userSlice.reducer;
