import { CustomerRoute } from "components/core/PrivateRoute";
import React from "react";

const PaymentPage = () => <div>Payment page</div>;

export default React.memo(() => (
  <CustomerRoute userRole="customer">
    <PaymentPage />
  </CustomerRoute>
));
