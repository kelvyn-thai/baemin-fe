import React from "react";

const HomePage: React.FC = () => {
  const [state, setState] = React.useState();
  return (
    <div>
      <div>
        <img src="images/banner.png" alt="banner" />
      </div>
    </div>
  );
};

export default React.memo(HomePage);
