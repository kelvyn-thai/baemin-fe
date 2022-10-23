import Header from "components/core/Header";
import { useAuthenStore } from "pages/authen";
import React from "react";
import Button from "components/core/Button";
import { useNavigate } from "react-router-dom";
import Menu from "components/core/Menu";
import SettingPageCustomer from "./SettingPage.Customer";
import SettingPageAdmin from "./SettingPage.Admin";

const DefaultMenu = React.memo(() => (
  <Menu
    className="mt-5"
    items={[
      {
        key: "rate-baemin",
        label: "Rate Baemin",
      },
      {
        key: "notification",
        label: "Notification",
      },
      {
        key: "help-sharing",
        label: "Help Sharing",
      },
      {
        key: "terms-and-condition",
        label: "Terms and Conditions",
      },
    ]}
    type="vertical"
  />
));

const SettingPage: React.FC = () => {
  const {
    userInfo: { role },
  } = useAuthenStore();
  const { actionLogout } = useAuthenStore();
  const navigate = useNavigate();
  const handleLogOut = React.useCallback(() => {
    actionLogout();
    navigate("/login");
  }, []);
  const mainContent = React.useMemo(() => {
    switch (role) {
      case "customer":
        return (
          <>
            <SettingPageCustomer />
            <DefaultMenu />
            <Button
              title="Logout"
              onClick={handleLogOut}
              className="w-[100%] mt-5"
            />
          </>
        );
      case "admin":
        return (
          <>
            <SettingPageAdmin />
            <DefaultMenu />
            <Button
              title="Logout"
              onClick={handleLogOut}
              className="w-[100%] mt-5"
            />
          </>
        );
      default:
        return (
          <Button
            title="Logout"
            onClick={handleLogOut}
            className="w-[100%] mt-5"
          />
        );
    }
  }, [role]);
  return (
    <div className="bg-primary-light-gray">
      <Header title="My Page" />
      {mainContent}
    </div>
  );
};

export default React.memo(SettingPage);
