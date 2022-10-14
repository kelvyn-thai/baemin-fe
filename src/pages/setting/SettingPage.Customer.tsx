import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "components/core/Menu";

const Extra = React.memo(() => {
  const navigate = useNavigate();
  return (
    <div className="extra grid grid-cols-3 h-16 bg-primary-light border-y-[0.5px]">
      {[
        {
          title: "My Orders",
          icon: <i className="fa-regular fa-address-book" />,
          onClickItem: () => navigate("/manage-orders"),
        },
        {
          title: "Favorites Stores",
          icon: <i className="fa-regular fa-address-book" />,
        },
        {
          title: "Saved Places",
          icon: <i className="fa-regular fa-address-book" />,
        },
      ].map(({ title, icon, onClickItem }) => (
        <div
          className="w-[100%] h-[100%] flex items-center justify-center flex-col gap-1 border-r-[0.5px] hover:font-medium"
          key={title}
        >
          {icon}
          <div
            className="cursor-pointer hover:font-medium"
            onClick={() => typeof onClickItem === "function" && onClickItem()}
          >
            {title}
          </div>
        </div>
      ))}
    </div>
  );
});
const SettingPageCustomer: React.FC = () => (
  <>
    <Extra />
    <Menu
      className="mt-5"
      items={[
        {
          key: "coupon-box",
          label: "Coupon box",
        },
        {
          key: "payment-management",
          label: "Payment Management",
        },
        {
          key: "information-sharing",
          label: "Information Sharing",
        },
      ]}
      type="vertical"
    />
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
  </>
);

export default React.memo(SettingPageCustomer);
