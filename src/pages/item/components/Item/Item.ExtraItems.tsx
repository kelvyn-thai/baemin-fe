import React from "react";
import { RadioInput, RadioItem } from "components/core/Radio";
import { CartItemType } from "pages/cart/components/Cart";
import { currencyFormatted } from "utils/currencyFormatted";
import { CheckboxInput, CheckboxItem } from "components/core/Checkbox";
import { ExtraItemType } from "./Item.typings";
import "./Item.styles.scss";

const ExtraItems: React.FC<{
  data: {
    [key: string]: ExtraItemType;
  };
  cart: CartItemType;
  setCart: React.Dispatch<React.SetStateAction<CartItemType>>;
}> = ({ data, cart, setCart }) => {
  const handleSelectedItem = React.useCallback(
    (
      subItem: RadioItem | CheckboxItem,
      extraItem: ExtraItemType,
      type: "checkbox" | "radio"
    ) => {
      const key = `${extraItem.id}/${subItem.id}`;
      const isExisted = cart.extraItem.includes(key);
      switch (type) {
        case "checkbox": {
          setCart({
            ...cart,
            extraItem: isExisted
              ? cart.extraItem.filter((i) => i !== key)
              : [...cart.extraItem, key],
          });
          break;
        }
        case "radio": {
          const extraItemIndex = cart.extraItem.findIndex((i) => {
            const [extraItemKey] = i.split("/");
            return extraItemKey === extraItem.id;
          });
          const isExtraItemIndexExisted = extraItemIndex !== -1;
          setCart({
            ...cart,
            extraItem: isExtraItemIndexExisted
              ? [...cart.extraItem].map((i, index) =>
                  index === extraItemIndex ? key : i
                )
              : [...cart.extraItem, key],
          });
          break;
        }
        default:
          break;
      }
    },
    [data, cart]
  );
  return (
    <div>
      {Object.entries(data).map(([, value]) => {
        const { id, name, items, isRequired } = value;
        const type = isRequired ? "radio" : "checkbox";
        return (
          <div key={id} className="extra-container">
            <div className="bg-primary-light-gray p-4">
              <div className="font-medium text-primary-dark">{name}</div>
              {isRequired && (
                <div className="text-xs font-light text-primary-warning mt-1">
                  Must select 1 item(s)
                </div>
              )}
            </div>
            <div className="extra-list">
              {items.map((i) => {
                const key = `${id}/${i.id}`;
                const isChecked = cart.extraItem.includes(key);
                const resource = {
                  id: i.id,
                  label: i.name,
                  value: i.id,
                  accessory: <div>{currencyFormatted({ value: i.price })}</div>,
                  isChecked,
                };
                switch (type) {
                  case "radio":
                    return (
                      <RadioInput
                        key={key}
                        data={resource}
                        onSelectedItem={(dt: RadioItem) =>
                          handleSelectedItem(dt, value, type)
                        }
                      />
                    );
                  case "checkbox":
                    return (
                      <CheckboxInput
                        key={key}
                        data={resource}
                        onSelectedItem={(dt: CheckboxItem) =>
                          handleSelectedItem(dt, value, type)
                        }
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ExtraItems);
