import useOutsideRef from "hooks/useDetectClickOutside";
import React from "react";
import "./Dropdown.styles.scss";

export interface IOption {
  value: string;
}

export interface IDropdownBox {
  options: IOption[];
  title?: string;
  dropdownBoxContainerClassName?: string;
  selected: IOption[];
  setSelected: (selected: IOption[]) => any;
}

const DropdownBox: React.FC<IDropdownBox> = ({
  options,
  title = "",
  dropdownBoxContainerClassName,
  selected,
  setSelected,
}: IDropdownBox) => {
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
      className={`dropdownBox-container w-fit ${dropdownBoxContainerClassName}`}
    >
      <div className="flex border-none relative cursor-pointer items-center h-10 min-w-[150px] text-white bg-primary-color font-normal capitalize w-fit rounded">
        <div
          className="absolute left-1 right-4 top-0 h-[100%] flex items-center"
          onClick={() => setToggle(!toggle)}
        >
          <div className="text-sm">
            {title || `Selected (${selected.length})`}
          </div>
        </div>
        {toggle && (
          <div className="dropdownBox-menu absolute top-[100%] left-0 w-[100%] z-10 max-h-[200px] overflow-y-scroll bg-primary-color">
            {options.map((option) => {
              const { value } = option;
              const isExisted =
                selected.findIndex((i) => i.value === value) > -1;
              const current = isExisted
                ? selected.filter((i) => i.value !== value)
                : [...selected, option];
              return (
                <div
                  className="grid gap-1 items-center min-h-[40px] min-w-[150px] border-t-orange-100 p-1 hover:bg-primary-light-gray-1 hover:text-primary-dark border-solid border-t-[0.5px] w-fit"
                  style={{
                    gridTemplateColumns: `20px fit-content(100%)`,
                  }}
                  key={value}
                  onClick={() => {
                    setSelected(current);
                  }}
                >
                  <i
                    className={`fa-regular ${
                      isExisted ? "fa-square-check" : "fa-square"
                    } `}
                  />
                  <span className="text-sm hover:text-primary-dark hover:font-medium capitalize">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <div className={`${toggle ? "toggle-visible" : "toggle-disabled"}`} />
      </div>
    </div>
  );
};

DropdownBox.defaultProps = {
  dropdownBoxContainerClassName: "",
  title: "",
};

export default React.memo(DropdownBox);
