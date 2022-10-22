import React from "react";
import OrderHistoryItem, {
  OrderType,
  useUserOrderList,
} from "pages/order/components/Order";
import Header from "components/core/Header";
import "./ManageOrders.styles.scss";
import ScrollView from "components/core/ScrollView";
import { useAuthenStore } from "pages/authen";
import { CustomerRoute } from "components/core/PrivateRoute";

const ManageOrders = () => {
  const { userInfo } = useAuthenStore();
  const { orders = [] } = useUserOrderList({ userId: userInfo?.id });
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
