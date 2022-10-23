import React from "react";
import OrderHistoryItem, {
  OrderType,
  useMutationUpdateOrder,
  useUserOrderList,
} from "pages/order/components/Order";
import Header from "components/core/Header";
import "./ManageOrders.styles.scss";
import ScrollView from "components/core/ScrollView";
import { useAuthenStore } from "pages/authen";
import { CustomerRoute } from "components/core/PrivateRoute";
import socket from "socket-io";
import { delay } from "utils/delay";
import { randomInRange } from "utils/random";

const ManageOrders = () => {
  const { userInfo } = useAuthenStore();
  const { id: userId } = userInfo;
  const { orders = [] } = useUserOrderList({ userId: userInfo?.id });
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
  return (
    <div className="manage-orders bg-primary-light-gray">
      <Header title="My orders" />
      <ScrollView
        className="order-list"
        data={orders}
        renderItem={(order: OrderType) => (
          <OrderHistoryItem order={order} key={order.id} />
        )}
      />
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="customer">
    <ManageOrders />
  </CustomerRoute>
));
