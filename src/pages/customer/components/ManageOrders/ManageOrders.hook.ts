import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuthenStore } from "pages/authen";
import {
  getAllOrders,
  OrderType,
  useMutationUpdateOrder,
} from "pages/order/components/Order";
import React from "react";
import socket from "socket-io";
import { delay } from "utils/delay";
import { randomInRange } from "utils/random";

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

export const useSocketMerchantUpdateOrderStatus = () => {
  const { userInfo } = useAuthenStore();
  const { id: userId } = userInfo;
  const mutationUpdateOrder = useMutationUpdateOrder();
  React.useEffect(() => {
    socket.on(
      `updated-order-status-to-customer-${userId}`,
      async (order: OrderType) => {
        const orderPhase1 = await mutationUpdateOrder.mutateAsync(order);
        await delay(randomInRange(1000, 5000));
        const orderPhase2 = await mutationUpdateOrder.mutateAsync({
          ...orderPhase1,
          status: "DriverAssigned",
          updatedTime: new Date(new Date().toUTCString()).toString(),
        });
        socket.emit("assign-order-to-driver", orderPhase2);
      }
    );
  }, []);
};

export const useSocketDriverUpdateOrderStatus = () => {
  const { userInfo } = useAuthenStore();
  const { id: userId } = userInfo;
  const mutationUpdateOrder = useMutationUpdateOrder();
  React.useEffect(() => {
    socket.on(`driver-delivering-order-${userId}`, async (order: OrderType) => {
      await mutationUpdateOrder.mutateAsync(order);
      await delay(randomInRange(1000, 5000));
      await mutationUpdateOrder.mutateAsync({
        ...order,
        status: "Done",
        updatedTime: new Date(new Date().toUTCString()).toString(),
      });
    });
  }, []);
};
