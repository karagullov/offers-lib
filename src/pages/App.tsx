import React from "react";
import { OrderListPage } from "./AtomX/order-list";
import { Provider } from "react-redux";
import store from "state";
import ThemeProvider, { ThemedGlobalStyle } from "theme";
import ResetCSS from "theme/ResetCSS";
export * from "../state/order/reducer";

export function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider>
          <ThemedGlobalStyle />
          <ResetCSS />
          {/* <ToastContainer
            theme="dark"
            position="bottom-right"
            limit={5}
            closeOnClick={false}
            newestOnTop
            pauseOnHover
          /> */}
          <OrderListPage />
          <div>Libraryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy erlan</div>
        </ThemeProvider>
      </Provider>
    </div>
  );
}
