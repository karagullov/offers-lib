import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderAPI } from "pages/AtomX/api/order";
import { GetAllOrdersDto } from "pages/AtomX/api/order/types";
import { AppState } from "state";
import { ORDERS_PAGE_LIMIT } from "./constants";
import { OrdersFilterParams } from "./types";

let isLoadingFetchOrdersNextPage = false;

export const fetchOrdersNextPage = createAsyncThunk(
  "order/fetchOrdersNextPage",
  async (
    { filter }: { filter: OrdersFilterParams },
    { getState, rejectWithValue }
  ) => {
    try {
      const { order } = getState() as AppState;
      const { allOrderIds } = order;

      if (isLoadingFetchOrdersNextPage || !allOrderIds.hasMore) return;
      isLoadingFetchOrdersNextPage = true;

      const dto: GetAllOrdersDto = {
        pagination: {
          page: allOrderIds.value.length + 1,
          limit: ORDERS_PAGE_LIMIT,
        },
        filter,
      };

      const { getAllOrders } = orderAPI;
      const orders = await getAllOrders(dto);
      return { orders, dto };
    } catch (e) {
      return rejectWithValue({ error: e });
    } finally {
      isLoadingFetchOrdersNextPage = false;
    }
  }
);
