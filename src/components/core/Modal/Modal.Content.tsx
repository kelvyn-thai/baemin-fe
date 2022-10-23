import React from "react";
import "./Modal.styles.scss";
import { useModalStore } from "./Modal.zustand";

const Content: React.FC<
  {
    children: React.ReactNode | React.ReactElement | any;
    className?: string | undefined;
    hasBtnCloseModal?: boolean;
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = (props) => {
  const { children, className, hasBtnCloseModal } = props;
  const { actionCloseModal } = useModalStore();
  return (
    <div
      className={`modal-content box-shadow shadow-black left-0 top-5 right-0 h-[100%] border-solid border-[1px] rounded-xl absolute bg-white text-black overflow-x-hidden overflow-y-scroll ${
        className && className
      }`}
    >
      {hasBtnCloseModal && (
        <div className="text-right flex justify-start h-8 items-center mb-1">
          <i
            className="cursor-pointer text-right fa-solid fa-circle-xmark fa-2xl text-primary-gray"
            onClick={actionCloseModal}
          />
        </div>
      )}

      {children}
    </div>
  );
};

Content.defaultProps = {
  className: "",
  hasBtnCloseModal: true,
};

export default React.memo(Content);
