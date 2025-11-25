import { type PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isLoading: boolean;
  error: null | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const handleLoading = <S extends IState>(state: S) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = <
  S extends IState,
  P extends { message?: string } | undefined = undefined
>(
  state: S,
  action: PayloadAction<P>
) => {
  state.isLoading = false;
  state.error =
    action.payload?.message ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (action as any).error?.message ||
    "Unknown error occurred";
};
