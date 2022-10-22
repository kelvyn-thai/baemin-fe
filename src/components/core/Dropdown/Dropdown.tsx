import useOutsideRef from "hooks/useDetectClickOutside";
import React from "react";
import "./Dropdown.styles.scss";

export interface IOption {
  value: string;
}

interface IDropdown {
  options: IOption[];
  onSelectOption: (value: string) => any;
  defaultSelected: string;
  dropdownContainerClassName?: string;
}

const Dropdown: React.FC<IDropdown> = ({
  options,
  onSelectOption,
  defaultSelected,
  dropdownContainerClassName,
}: IDropdown) => {
  const [toggle, setToggle] = React.useState(false);
  const ref = React.useRef(null);
  useOutsideRef(ref, () => {
    if (toggle) {
      setToggle(false);
    }
  });
  return (
    <div
      ref={ref}
      className={`dropdown-container w-fit ${dropdownContainerClassName}`}
    >
      <div
        className="flex border-none relative cursor-pointer items-center pl-2 h-10 min-w-[150px] text-white bg-primary-color font-normal capitalize w-fit rounded"
        onClick={() => setToggle(!toggle)}
      >
        <span className="text-sm">{defaultSelected}</span>
        {toggle && (
          <div className="dropdown-menu absolute top-[100%] left-0 w-[100%] z-10">
            {options.map(({ value }) => (
              <div
                className="flex pl-2 border-t-orange-100 items-center h-10 min-w-[150px] text-white bg-primary-color font-medium capitalize w-fit hover:bg-primary-light-gray-1 hover:text-primary-dark hover:font-medium border-solid border-t-[0.5px] text-sm"
                key={value}
                onClick={() => {
                  onSelectOption(value);
                }}
              >
                {value}
              </div>
            ))}
          </div>
        )}
        <div className={`${toggle ? "toggle-visible" : "toggle-disabled"}`} />
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  dropdownContainerClassName: "",
};

export default React.memo(Dropdown);
