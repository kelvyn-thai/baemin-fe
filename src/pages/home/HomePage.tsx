import { useAuthenStore } from "pages/authen";
import React from "react";
import HomePageAdmin from "./HomePage.Admin";
import HomePageCustomer from "./HomePage.Customer";
import "./HomePage.styles.scss";

const HomePageGuest: React.FC = () => <div>Welcome to baemin!</div>;

const HomePage: React.FC = () => {
  const {
    userInfo: { role },
  } = useAuthenStore();
  switch (role) {
    case "customer":
      return <HomePageCustomer />;
    case "admin":
      return <HomePageAdmin />;
    default:
      return <HomePageGuest />;
  }
};

export default React.memo(HomePage);
