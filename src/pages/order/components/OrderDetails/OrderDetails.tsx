import { CustomerRoute } from "components/core/PrivateRoute";
import React from "react";
import { useSearchParams } from "react-router-dom";

const OrderDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  if (!orderId) {
    return null;
  }
  return (
    <div>
      <div>{orderId}</div>
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole={["admin", "customer", "driver", "merchant"]}>
    <OrderDetails />
  </CustomerRoute>
));
