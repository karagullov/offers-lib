import { Order } from "state/order/types";

import { prefixedRequests } from "../agent";
import { orderPrefix } from "./constants";
import {
  CreateOrderDto,
  DeleteOrderDto,
  GetAccountOrdersDto,
  GetAllOrdersDto,
  UpdateOrderDto,
} from "./types";

const { get, post, put, del } = prefixedRequests(orderPrefix);

export const orderAPI = {
  getOrder: (id: string) => get<Order>(`/${id}`),
  getAllOrders: (dto?: GetAllOrdersDto) => post<Order[]>("/all", dto),
  getAccountOrders: (dto: GetAccountOrdersDto) =>
    post<Order[]>("/account", dto),
  createOrder: (dto: CreateOrderDto) => post("/", dto),
  updateOrder: (dto: UpdateOrderDto) => put("/", dto),
  deleteOrder: (dto: DeleteOrderDto) => del("/", dto),
};
