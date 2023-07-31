import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  ICommonState,
  initialCommonState,
  PagedData,
} from "../interfaces/common-state.interface";
import { fetchOrdersNextPage } from "./action";
import { Order } from "./types";
import { Status } from "interfaces/statuses";

export const ordersAdapter = createEntityAdapter<Order>({
  selectId: (order) => order.id,
});

type OrderState = {
  ordersMap: { [id: string]: Order };
  allOrderIds: PagedData<string[][]>; // [page][index] -> id
} & ICommonState;

const initialState: OrderState = {
  ordersMap: {},
  allOrderIds: { value: [], hasMore: true },
  ...initialCommonState,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.ordersMap = {};
      state.allOrderIds = { ...initialCommonState, value: [], hasMore: true };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrdersNextPage.pending, (state) => {
        state.status = Status.PENDING;
        state.error = null;
      })
      .addCase(fetchOrdersNextPage.fulfilled, (state, { payload }) => {
        if (!payload) return;

        const { orders, dto } = payload;
        const {
          pagination: { page },
        } = dto;

        state.status = Status.SUCCESS;

        if (state.allOrderIds.value[page - 1] !== undefined) return;

        if (!orders.length) {
          state.allOrderIds.hasMore = false;
          return;
        }

        state.allOrderIds.value[page - 1] = orders.map((order) => order.id);
        for (const order of orders) {
          state.ordersMap[order.id] = order;
        }
      })
      .addCase(fetchOrdersNextPage.rejected, (state, action) => {
        console.error("Error while fetching orders: ", action.error);
        state.status = Status.ERROR;
        state.error = action.error;
        state.allOrderIds.hasMore = false;

        console.error("Error while fetching orders");
      }),
});

export const { resetOrders } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
