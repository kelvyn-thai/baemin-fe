import { CartItemType } from "pages/cart/components/Cart";

export type OrderType = {
  id: string;
  orderName: string;
  status:
    | "Created"
    | "Accepted"
    | "DriverAssigned"
    | "Delivering"
    | "Done"
    | "Canceled";
  riderName: string;
  merchantId: string;
  merchantName: string;
  merchantAddress: string;
  totalPrice: number;
  dishes: CartItemType[];
  createdTime: string;
  updatedTime: string;
  paymentMethod: string;
  totalSubItem: number;

  customerAddress: string;
  customerName: string;
  userId: string;
};

export type OrderStatusListType = {
  [key: string]: string;
};

export type CreateOrderResponseType = {
  data: OrderType;
};

export type UpdateOrderResponseType = {
  data: OrderType;
};

export type OrderStatusListResponseType = {
  data: OrderStatusListType;
};
