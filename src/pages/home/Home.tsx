import { ENV } from "env";
import React from "react";

const HomePage: React.FC = () => {
  const [state, setState] = React.useState();
  return (
    <div>
      This is home page
      <div>
        <img src={`${ENV.ASSETS_PATH}/images/banner.png`} alt="banner" />
      </div>
    </div>
  );
};

export default React.memo(HomePage);
