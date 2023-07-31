import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { orderReducer } from "./order/reducer";

const store = configureStore({
  reducer: {
    order: orderReducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  //   preloadedState: load({
  //     states: PERSISTED_KEYS,
  //     disableWarnings: process.env.NODE_ENV === 'test',
  //   }),
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
