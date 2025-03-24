import { configureStore } from "@reduxjs/toolkit";

import { AppApi } from "./Features/AppApi";

export const Store = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
