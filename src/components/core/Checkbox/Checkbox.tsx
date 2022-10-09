import React from "react";
import "./Checkbox.styles.scss";

export type CheckboxItem = {
  id: string | any;
  label: string | React.ReactElement | React.ReactNode | any;
  value: string;
  isChecked?: boolean;
  accessory?: string | React.ReactElement | React.ReactNode | any;
};

export interface ICheckboxInput {
  data: CheckboxItem;
  onSelectedItem: (data: CheckboxItem) => any;
}

export const CheckboxInput = ({ data, onSelectedItem }: ICheckboxInput) => {
  const { value, isChecked, label, accessory } = data;
  return (
    <div
      key={value}
      className="checkbox-container grid gap-3 items-center cursor-pointer p-3 border-[0.5px]"
      onClick={() => onSelectedItem(data)}
    >
      <div className="checkbox-input relative w-6 h-6">
        <input
          type="checkbox"
          value={value}
          checked={isChecked}
          name={label}
          onChange={() => onSelectedItem(data)}
          className="hidden"
        />
        <span className="checkmark absolute left-0 top-0 w-[100%] h-[100%] rounded border-[1px]" />
      </div>
      <label htmlFor={label}>{label}</label>
      {accessory && accessory}
    </div>
  );
};

export default React.memo(CheckboxInput);
