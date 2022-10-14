import React from "react";
import { Link } from "react-router-dom";

const SettingIcon = () => (
  <Link to="/setting">
    <i className="fa-solid fa-bars text-lg" />
  </Link>
);

export default React.memo(SettingIcon);
