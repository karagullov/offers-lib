import React from "react";
import { OrderListPage } from "./AtomX/order-list";
import { Provider } from "react-redux";
import store from "state";
import ThemeProvider, { ThemedGlobalStyle } from "theme";
import ResetCSS from "theme/ResetCSS";
export * from "../state/order/reducer";

export function AtomxOffers() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <ResetCSS />
          <OrderListPage />
        </ThemeProvider>
      </Provider>
    </div>
  );
}
