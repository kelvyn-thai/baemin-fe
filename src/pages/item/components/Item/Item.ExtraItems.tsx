import React from "react";
import { RadioInput, RadioItem } from "components/core/Radio";
import { CartItemType } from "pages/cart/components/Cart";
import { currencyFormatted } from "utils/currencyFormatted";
import { ExtraItemsType } from "./Item.typings";

const ExtraItems: React.FC<{
  data: {
    [key: string]: ExtraItemsType;
  };
  cart: CartItemType;
  setCart: React.Dispatch<React.SetStateAction<CartItemType>>;
}> = ({ data, cart, setCart }) => {
  const handleSelectedItem = React.useCallback(
    (
      radioItem: RadioItem,
      addedValueItem: ExtraItemsType,
      type: "checkbox" | "radio"
    ) => {
      const key = `${addedValueItem.id}/${radioItem.id}`;
      const isExisted = cart.extraItems.includes(key);
      switch (type) {
        case "checkbox": {
          setCart({
            ...cart,
            extraItems: isExisted
              ? cart.extraItems.filter((i) => i !== key)
              : [...cart.extraItems, key],
          });
          break;
        }
        case "radio": {
          setCart({ ...cart, extraItems: [key] });
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
          <div key={id} className="added-values">
            <div className="bg-primary-light-gray p-4">
              <div className="font-medium text-primary-dark">{name}</div>
              {isRequired && (
                <div className="text-xs font-light text-primary-warning mt-1">
                  Must select 1 item(s)
                </div>
              )}
            </div>
            <RadioInput
              onSelectedItem={(item: RadioItem) =>
                handleSelectedItem(item, value, type)
              }
              items={items.map((i) => {
                const key = `${id}/${i.id}`;
                const isChecked = cart.extraItems.includes(key);
                return {
                  id: i.id,
                  label: i.name,
                  value: i.id,
                  accessory: <div>{currencyFormatted({ value: i.price })}</div>,
                  isChecked,
                };
              })}
              type={type}
            />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ExtraItems);
