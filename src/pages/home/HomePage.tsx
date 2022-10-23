import { CustomerRoute } from "components/core/PrivateRoute";
import { useAuthenStore } from "pages/authen";
import React from "react";
import HomeHeader from "./components/HomeHeader";
import HomePageAdmin from "./HomePage.Admin";
import HomePageCustomer from "./HomePage.Customer";
import HomePageDriver from "./HomePage.Driver";
import HomePageMerchant from "./HomePage.Merchant";
import "./HomePage.styles.scss";

const HomePageGuest: React.FC = () => <div>Welcome to baemin!</div>;

const HomePage: React.FC = () => {
  const {
    userInfo: { role, username },
  } = useAuthenStore();
  const Comp = React.useMemo(() => {
    switch (role) {
      case "customer":
        return <HomePageCustomer />;
      case "admin":
        return <HomePageAdmin />;
      case "merchant":
        return <HomePageMerchant />;
      case "driver":
        return <HomePageDriver />;
      default:
        return <HomePageGuest />;
    }
  }, [role]);
  return (
    <div>
      <HomeHeader leftTitle={`${role}-${username}`} />
      {Comp}
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="customer">
    <HomePage />
  </CustomerRoute>
));
