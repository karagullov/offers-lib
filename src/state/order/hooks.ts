import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { AppState } from "../index";
import { fetchOrdersNextPage } from "./action";
import { resetOrders } from "./reducer";
import { OrdersFilterParams } from "./types";

export type FilterQueryParams = {
  buyChainId: string | undefined;
  sellChainId: string | undefined;
};

export function useFetchedOrders() {
  const {
    ordersMap,
    allOrderIds: { value: orderIds, hasMore },
    status,
  } = useAppSelector((state: AppState) => state.order);
  const dispatch = useAppDispatch();

  const fetchNextPage = useCallback(
    (filter: OrdersFilterParams) => {
      dispatch(fetchOrdersNextPage({ filter }));
    },
    [dispatch]
  );

  const refetchOrders = useCallback(
    (filter: OrdersFilterParams) => {
      dispatch(resetOrders());
      dispatch(fetchOrdersNextPage({ filter }));
    },
    [dispatch, fetchNextPage]
  );

  return {
    orders: orderIds
      .reduce((prev, cur) => [...prev, ...cur], [])
      .map((id) => ordersMap[id]),
    status,
    refetchOrders,
    fetchNextPage,
    hasMore,
  };
}
