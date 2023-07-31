import { ChainId } from "constants/chains";

export type SwapInfo = {
  chainId: ChainId;
  token: string; //address
  amount: string; //big number
};

export type Order = {
  id: string;
  telegram: string;
  owner: string;
  sell: SwapInfo;
  buy: SwapInfo;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type OrdersFilterParams = {
  sell: {
    chainId?: number;
    token?: string;
  };
  buy: {
    chainId?: number;
    token?: string;
  };
};

export type SortableColumn = "sell" | "buy";
