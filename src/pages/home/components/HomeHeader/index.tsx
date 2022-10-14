import SettingIcon from "components/core/Icons/SettingIcon";
import React from "react";
import { Link } from "react-router-dom";

const HomeHeader = React.memo(({ leftTitle }: { leftTitle: string }) => (
  <div className="flex gap-4 p-2 justify-between items-center">
    <div className="grid gap-2 items-center location">
      <i className="fa-solid fa-location-dot text-primary-color text-base" />
      <div className="text-base font-medium">{leftTitle}</div>
    </div>
    <div className="grid gap-4 grid-cols-2">
      <Link to="/message">
        <i className="fa-regular fa-envelope text-lg" />
      </Link>
      <SettingIcon />
    </div>
  </div>
));

export default HomeHeader;
