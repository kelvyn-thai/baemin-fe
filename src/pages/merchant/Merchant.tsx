import React from "react";
import MerchantList from "./components/MerchantList";

const MerchantPage: React.FC = () => (
  <div>
    <MerchantList />
  </div>
);

export default React.memo(MerchantPage);
