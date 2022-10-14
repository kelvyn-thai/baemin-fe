import React from "react";
import HomeHeader from "./components/HomeHeader";

const HomePageAdmin: React.FC = () => (
  <div>
    <HomeHeader leftTitle="Admin page" />
  </div>
);

export default React.memo(HomePageAdmin);
