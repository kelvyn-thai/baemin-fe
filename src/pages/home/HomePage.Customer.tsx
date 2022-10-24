import React from "react";
import CategoryList from "pages/category/components/CategoryList";
import {
  useSocketDriverUpdateOrderStatus,
  useSocketMerchantUpdateOrderStatus,
} from "pages/customer/components/ManageOrders/ManageOrders.hook";

import(/* webpackPrefetch: true */ "pages/category/components/CategoryList");

const HomePageCustomer: React.FC = () => {
  useSocketMerchantUpdateOrderStatus();
  useSocketDriverUpdateOrderStatus();
  return (
    <div className="home-page">
      <CategoryList />
    </div>
  );
};

export default React.memo(HomePageCustomer);
