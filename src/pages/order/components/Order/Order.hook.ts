import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useAuthenStore } from "pages/authen";
import { CartType } from "pages/cart/components/Cart";
import { createOrder, getAllOrders } from "./Order.database";
import { apiCreateNewOrder, apiOrderStatusList } from "./Order.services";
import { OrderStatusListType, OrderType } from "./Order.typings";

export const useMutationCreateOrder: () => UseMutationResult<
  OrderType,
  unknown,
  CartType,
  unknown
> = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (cart: CartType) => {
      const response = await apiCreateNewOrder(cart);
      const order = response.data;
      await createOrder(order);
      return order;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["order-history"]);
      },
    }
  );
  return mutation;
};

export const useQueryAllOrders: () => UseQueryResult<
  OrderType[],
  unknown
> = () => {
  const query = useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const orders = await getAllOrders();
      return orders;
    },
  });
  return query;
};

export const useUserOrderList: ({ userId }: { userId: string }) => {
  orders: OrderType[];
} = () => {
  const { userInfo } = useAuthenStore();
  const { data: orders = [] } = useQueryAllOrders();
  const ordersFilterByUserId = orders.filter((o) => o.userId === userInfo.id);
  return {
    orders: ordersFilterByUserId,
  };
};

export const useQueryStatusList: () => UseQueryResult<
  OrderStatusListType,
  unknown
> = () => {
  const query = useQuery({
    queryKey: ["order-status-list"],
    queryFn: async () => {
      const res = await apiOrderStatusList();
      return res.data;
    },
  });
  return query;
};
