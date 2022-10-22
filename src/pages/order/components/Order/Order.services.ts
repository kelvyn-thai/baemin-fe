import { ENV } from "env";
import HTTP from "http-request";
import { CartType } from "pages/cart/components/Cart";
import {
  CreateOrderResponseType,
  OrderStatusListResponseType,
  UpdateOrderResponseType,
} from "./Order.typings";

const http = new HTTP({ baseURL: `${ENV.REACT_APP_API_DOMAIN_URL}/order` });

export const apiCreateNewOrder: (
  cart: CartType
) => Promise<CreateOrderResponseType> = (cart) => http.put("", cart);

export const apiUpdateOrder: (
  orderId: string,
  orderInfo: any
) => Promise<UpdateOrderResponseType> = (orderId, orderInfo) =>
  http.patch("", { orderId, orderInfo });

export const apiOrderStatusList: () => Promise<OrderStatusListResponseType> =
  () => http.get("status-list");
