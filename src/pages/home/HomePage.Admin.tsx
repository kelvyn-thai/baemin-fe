import DashboardOrder from "pages/admin/components/DashboardOrder";
import React from "react";
import HomeHeader from "./components/HomeHeader";

const HomePageAdmin: React.FC = () => (
  <div>
    <HomeHeader leftTitle="Admin page" />
    <DashboardOrder />
  </div>
);

export default React.memo(HomePageAdmin);
