import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAllOrders, OrderType } from "pages/order/components/Order";

export const useQueryOrderHistory: () => UseQueryResult<
  OrderType[],
  unknown
> = () => {
  const query = useQuery({
    queryKey: ["order-history"],
    queryFn: () => getAllOrders(),
  });
  return query;
};
