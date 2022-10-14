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
  data: RadioItem;
  onSelectedItem: (data: RadioItem) => any;
}

export const RadioInput = ({ data, onSelectedItem }: IRadioInput) => {
  const { value, isChecked, accessory, label } = data;
  return (
    <div
      key={value}
      className="radio-container grid gap-3 items-center p-3 border-[0.5px]"
      onClick={() => onSelectedItem(data)}
    >
      <input
        type="radio"
        value={value}
        checked={isChecked}
        name={label}
        onChange={() => onSelectedItem(data)}
        className="w-5 h-5 cursor-pointer relative"
      />
      <label htmlFor={label}>{label}</label>
      {accessory && accessory}
    </div>
  );
};

export default React.memo(RadioInput);
