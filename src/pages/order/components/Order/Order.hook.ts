import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAuthenStore } from "pages/authen";
import { CartType } from "pages/cart/components/Cart";
import { createOrder, getAllOrders } from "./Order.database";
import { apiCreateNewOrder } from "./Order.services";
import { OrderType } from "./Order.typings";

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
      onSuccess: (order) => {
        // eslint-disable-next-line no-console
        console.log("order here", order);
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
    queryFn: () => getAllOrders(),
  });
  return query;
};

export const useUserOrderList: ({ userId }: { userId: string }) => {
  orders: OrderType[];
} = () => {
  const { userInfo } = useAuthenStore();
  const { data: orders = [] } = useQueryAllOrders();
  const ordersFilterByUserId = orders.filter((o) => o.userId === userInfo.id);
  const ordersSortedByCreatedTime = ordersFilterByUserId.sort((a, b) =>
    dayjs(a.createdTime).isBefore(b.createdTime) ? 1 : -1
  );
  return {
    orders: ordersSortedByCreatedTime,
  };
};
