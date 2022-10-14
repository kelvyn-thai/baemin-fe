import React from "react";
import CategoryList from "pages/category/components/CategoryList";
import HomeHeader from "./components/HomeHeader";

const HomePageCustomer: React.FC = () => (
  <div className="home-page">
    <HomeHeader leftTitle="Topaz City" />
    <CategoryList />
  </div>
);

export default React.memo(HomePageCustomer);
