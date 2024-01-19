"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./base-query/base-query.config";
const persistConfig = {
  key: "root",
  storage,
  blackList: [baseApi.reducerPath],
};

const rootReducer = combineReducers({ [baseApi.reducerPath]: baseApi.reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

setupListeners(store.dispatch);
