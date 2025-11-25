import type { RootState } from "../store";

export const username = (state: RootState) => state.user.user.name;
export const userEmail = (state: RootState) => state.user.user.email;
export const userLoading = (state: RootState) => state.user.isLoading;
export const userLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const userError = (state: RootState) => state.user.error;
export const userIsRefreshing = (state: RootState) => state.user.isRefreshing;
