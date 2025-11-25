import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/slice";
import { markerReducer } from "./marker/slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    markers: markerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
