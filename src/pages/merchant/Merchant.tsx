import Header from "components/core/Header";
import { CustomerRoute } from "components/core/PrivateRoute";
import React from "react";
import { useSearchParams } from "react-router-dom";
import MerchantList from "./components/MerchantList";

const MerchantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  return (
    <div>
      <Header title={categoryId} />
      <MerchantList />
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="customer">
    <MerchantPage />
  </CustomerRoute>
));
