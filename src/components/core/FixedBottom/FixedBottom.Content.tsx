import React from "react";
import "./FixedBottom.styles.scss";
import { useFixedBottomStore } from "./FixedBottom.zustand";

const Content: React.FC<
  {
    children: React.ReactNode | React.ReactElement | any;
    className?: string | undefined;
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = (props) => {
  const { children, className } = props;
  const { actionCloseFixedBottom } = useFixedBottomStore();
  return (
    <div
      className={`fixed-bottom-content box-shadow shadow-black left-0 top-5 right-0 h-[100%] border-solid border-[1px] rounded-xl absolute bg-white text-black overflow-x-hidden overflow-y-scroll ${
        className && className
      }`}
    >
      <div className="text-right flex justify-start h-8 items-center mb-1">
        <i
          className="cursor-pointer text-right fa-solid fa-circle-xmark fa-2xl text-primary-gray"
          onClick={actionCloseFixedBottom}
        />
      </div>
      {children}
    </div>
  );
};

Content.defaultProps = {
  className: "",
};

export default React.memo(Content);
