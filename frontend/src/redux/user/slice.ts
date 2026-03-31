import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { signin, signout, signup } from "./authRequests";
import { getMe } from "./userRequests";

interface UserInitialState {
  user: {
    name: string | null;
    email: string | null;
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  isRefreshing: boolean;
}

const initialState: UserInitialState = {
  user: {
    name: null,
    email: null,
  },
  isLoading: false,
  isLoggedIn: false,
  error: null,
  isRefreshing: false,
};

// const pendingHandler = (state: UserInitialState) => {
//   state.error = null;
//   state.isLoading = true;
// };

// const rejectionHandler = (
//   state: UserInitialState,
//   action: PayloadAction<{ message: string } | undefined>,
// ) => {
//   state.isLoading = false;
//   state.error = action.payload?.message ?? "Unexpected error occurred";
// };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(signup.pending, pendingHandler)
      // .addCase(
      //   signup.fulfilled,
      //   (
      //     state: UserInitialState,
      //     action: PayloadAction<{ name: string; email: string }>
      //   ) => {
      //     state.isLoading = false;
      //     state.isLoggedIn = true;
      //     state.user = action.payload;
      //   }
      // )
      // .addCase(signup.rejected, rejectionHandler)

      // .addCase(signin.pending, pendingHandler)
      // .addCase(
      //   signin.fulfilled,
      //   (
      //     state: UserInitialState,
      //     action: PayloadAction<{ name: string; email: string }>
      //   ) => {
      //     state.isLoading = false;
      //     state.isLoggedIn = true;
      //     state.user = action.payload;
      //   }
      // )
      // .addCase(signin.rejected, rejectionHandler)

      // .addCase(signout.pending, pendingHandler)
      // .addCase(signout.fulfilled, (state: UserInitialState) => {
      //   state.user = initialState.user;
      //   state.isLoading = initialState.isLoading;
      //   state.isLoggedIn = initialState.isLoggedIn;
      // })
      // .addCase(signout.rejected, rejectionHandler)

      .addCase(getMe.pending, (state: UserInitialState) => {
        state.isRefreshing = true;
      })
      .addCase(
        getMe.fulfilled,
        (
          state: UserInitialState,
          action: PayloadAction<{ name: string; email: string }>,
        ) => {
          // console.log(action.payload);
          state.user = action.payload;
          state.isRefreshing = false;
          state.isLoggedIn = true;
        },
      )
      .addCase(
        getMe.rejected,
        (
          state: UserInitialState,
          action: PayloadAction<{ message: string } | undefined>,
        ) => {
          state.isRefreshing = false;
          state.error = action.payload?.message ?? "Unexpected error occurred";
        },
      );
  },
});

export const userReducer = userSlice.reducer;
