import React from "react";
import CategoryList from "pages/category/components/CategoryList";
import HomeHeader from "./components/HomeHeader";

import(/* webpackPrefetch: true */ "pages/category/components/CategoryList");

const HomePageCustomer: React.FC = () => (
  <div className="home-page">
    <HomeHeader leftTitle="Topaz City" />
    <CategoryList />
  </div>
);

export default React.memo(HomePageCustomer);
