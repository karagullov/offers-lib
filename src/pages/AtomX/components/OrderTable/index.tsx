import { TokenInfo } from "@uniswap/token-lists/src/types";
import { Order } from "state/order/types";

import { OrderRow, OrderRowPlaceholder } from "./OrderRow";
import { OrderTableWrapper, OrderTh } from "./styles";

type OrderListProps = {
  orders: Order[];
  isLoadingMore: boolean;
  map: { [chainId: number]: { [tokenAddress: string]: TokenInfo } };
};

export function OrderTable({ orders, isLoadingMore, map }: OrderListProps) {
  return (
    <OrderTableWrapper>
      <thead>
        <tr>
          <OrderTh>You sell</OrderTh>
          <OrderTh>You buy</OrderTh>
          <OrderTh>Telegram</OrderTh>
          <OrderTh> </OrderTh>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} map={map} />
        ))}

        {isLoadingMore && (
          <>
            <OrderRowPlaceholder />
            <OrderRowPlaceholder />
            <OrderRowPlaceholder />
            <OrderRowPlaceholder />
          </>
        )}
      </tbody>
    </OrderTableWrapper>
  );
}
