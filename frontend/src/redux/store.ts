import { configureStore } from "@reduxjs/toolkit";
import { userReducer, type UserInitialState } from "./user/slice";
import { markerReducer } from "./marker/slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    user: persistReducer<UserInitialState>(userPersistConfig, userReducer),
    markers: markerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
