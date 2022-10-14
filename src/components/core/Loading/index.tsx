import React from "react";

const Loading: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    className?: string;
    isCenterAbsolute?: boolean;
  }
> = ({ className, isCenterAbsolute, ...rest }) => (
  <div
    className={`${
      isCenterAbsolute && "h-8 flex items-center justify-center"
    } ${className}`}
    {...rest}
  >
    <i className="fa-solid fa-spinner fa-spin-pulse fa-xl text-primary-color" />
  </div>
);
Loading.defaultProps = {
  className: "",
  isCenterAbsolute: true,
};

export default React.memo(Loading);
