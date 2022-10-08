import React from "react";
import "./Radio.styles.scss";

export type RadioItem = {
  id: string | any;
  label: string | React.ReactElement | React.ReactNode | any;
  value: string;
  isChecked?: boolean;
  accessory?: string | React.ReactElement | React.ReactNode | any;
};

export interface IRadioInput {
  items: RadioItem[];
  onSelectedItem: (item: RadioItem) => any;
  type?: "checkbox" | "radio";
}

export const RadioInput = ({
  items,
  type = "radio",
  onSelectedItem,
}: IRadioInput) => (
  <div className="radio-input">
    {items.map((i) => {
      const { label, value, accessory, isChecked } = i;
      return (
        <div
          key={value}
          className="radio-item grid gap-3 items-center cursor-pointer"
          onClick={() => onSelectedItem(i)}
        >
          <input
            type={type}
            value={value}
            checked={isChecked}
            name={label}
            onChange={() => onSelectedItem(i)}
            className="w-5 h-5 cursor-pointer relative"
          />
          <label htmlFor={label}>{label}</label>
          {accessory && accessory}
        </div>
      );
    })}
  </div>
);

RadioInput.defaultProps = {
  type: "radio",
};

export default React.memo(RadioInput);
