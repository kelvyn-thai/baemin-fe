import React from "react";
import CategoryList from "pages/category/components/CategoryList";

import(/* webpackPrefetch: true */ "pages/category/components/CategoryList");

const HomePageCustomer: React.FC = () => (
  <div className="home-page">
    <CategoryList />
  </div>
);

export default React.memo(HomePageCustomer);
