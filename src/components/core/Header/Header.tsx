import React from "react";
import { useNavigate } from "react-router-dom";

interface IHeader {
  title: string | React.ReactElement | React.ReactNode | any;
  onGoBack?: () => any;
}

const Header: React.FC<IHeader> = ({ title, onGoBack }) => {
  const navigate = useNavigate();
  return (
    <div className="header flex items-center h-8 border-b-[0.5px] relative p-5 border-b-primary-gray bg-primary-light">
      <button
        type="button"
        className=""
        onClick={() => {
          navigate(-1);
          if (typeof onGoBack === "function") {
            onGoBack();
          }
        }}
      >
        <i className="fa-solid fa-arrow-left text-lg" />
      </button>
      <div className="absolute left-[50%] translate-x-[-50%]">{title}</div>
    </div>
  );
};

Header.defaultProps = {
  onGoBack: undefined,
};

export default React.memo(Header);
