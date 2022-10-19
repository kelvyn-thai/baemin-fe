import { CustomerRoute } from "components/core/PrivateRoute";
import { useQueryAllOrders } from "pages/order/components/Order";
import React from "react";

const DashboardOrderPage: React.FC = () => {
  const { data: orders = [] } = useQueryAllOrders();
  return (
    <div>
      {orders.map((order) => (
        <div>{order.customerName}</div>
      ))}
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="admin">
    <DashboardOrderPage />
  </CustomerRoute>
));
