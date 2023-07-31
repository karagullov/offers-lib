import {
  OrdersFilterParams,
  PaginationParams,
  SwapInfo,
} from "state/order/types";

export type GetOrderDto = {
  id: string;
};

export type GetAllOrdersDto = {
  pagination: PaginationParams;
  filter?: OrdersFilterParams;
};

export type GetAccountOrdersDto = Omit<GetAllOrdersDto, "pagination"> & {
  pagination?: PaginationParams;

  signature: string; //signed { account }
  account: string;
};

export type CreateOrderDto = {
  signature: string; //signed { owner, sell, buy }

  owner: string;
  sell: SwapInfo;
  buy: SwapInfo;
};
export type UpdateOrderDto = {
  signature: string; // signed { id }

  id: string;

  sell?: Partial<SwapInfo>;
  buy?: Partial<SwapInfo>;
};
export type DeleteOrderDto = {
  signature: string; // signed { id }

  id: string;
};
