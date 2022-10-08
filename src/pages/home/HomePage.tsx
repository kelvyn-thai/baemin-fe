import { ENV } from "env";
import CategoryList from "pages/category/components/CategoryList";
import React from "react";

const HomePage: React.FC = () => {
  const [state, setState] = React.useState();
  return (
    <div>
      <div>
        <img src={`${ENV.ASSETS_PATH}/images/banner.png`} alt="banner" />
      </div>
      <CategoryList />
    </div>
  );
};

export default React.memo(HomePage);
