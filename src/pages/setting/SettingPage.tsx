import Header from "components/core/Header";
import { useAuthenStore } from "pages/authen";
import React from "react";
import Button from "components/core/Button";
import { useNavigate } from "react-router-dom";
import SettingPageCustomer from "./SettingPage.Customer";
import SettingPageAdmin from "./SettingPage.Admin";

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
            <Button
              title="Logout"
              onClick={handleLogOut}
              className="w-[100%] mt-5"
            />
          </>
        );
      default:
        return null;
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
