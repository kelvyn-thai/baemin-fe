import React from "react";

export interface ICoreButtonProps {
  title?: string;
  className?: string;
  useToUploadFile?: boolean;
  onHandleUploadFile?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  isDisabled?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any | undefined;
  type?: "primary" | "default";
}

const CoreButton: React.FC<
  ICoreButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({
  title,
  children,
  className,
  useToUploadFile,
  onHandleUploadFile,
  isDisabled,
  onClick,
  type,
  ...rest
}) => {
  const refInputFile: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef(null);
  const btnClassName: string = React.useMemo(() => {
    let defaultClass = ``;
    switch (type) {
      case "primary":
        defaultClass += `text-primary-light bg-primary-color border-transparent`;
        break;
      case "default":
        defaultClass += `text-primary-dark bg-primary-light border-primary-color`;
        break;
      default:
        break;
    }
    if (isDisabled) {
      defaultClass += ` cursor-not-allowed bg-primary-gray`;
    }
    return defaultClass;
  }, [type, isDisabled]);
  return (
    <button
      type="button"
      className={`h-10 p-2 rounded border-[0.5px] ${btnClassName} ${className}`}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isDisabled) {
          return;
        }
        if (useToUploadFile && refInputFile.current) {
          refInputFile.current.value = "";
          refInputFile.current.click();
        }
        if (typeof onClick === "function") {
          onClick(event);
        }
      }}
      {...rest}
    >
      {title && <div className="font-normal text-base leading-5">{title}</div>}
      {children}
      <input
        ref={refInputFile}
        type="file"
        className="hidden"
        onChange={async (e) => {
          e.preventDefault();
          if (typeof onHandleUploadFile === "function") {
            onHandleUploadFile(e);
          }
        }}
      />
    </button>
  );
};

CoreButton.defaultProps = {
  title: "",
  className: "",
  useToUploadFile: false,
  onHandleUploadFile: undefined,
  isDisabled: false,
  onClick: undefined,
  type: "primary",
};

export default React.memo(CoreButton);
