import Button from "components/core/Button";
import CountBox from "components/core/CountBox";
import { ModalContent } from "components/core/Modal";
import { useCartStore, CartItemType } from "pages/cart/components/Cart";
import React from "react";
import { currencyFormatted } from "utils/currencyFormatted";
import "./Item.styles.scss";
import ItemExtraItems from "./Item.ExtraItems";
import { ItemFormattedType } from "./Item.typings";

interface IProps {
  data: ItemFormattedType;
}

const ItemDetails: React.FC<IProps> = ({ data }) => {
  const { id, imgURL, extraItems, name, priceFormatted, price } = data;
  const [cart, setCart] = React.useState<CartItemType>({
    id,
    quantity: 1,
    extraItems: [],
    note: "",
  });
  const {
    cart: { items },
    actionUpdateCart,
  } = useCartStore();
  const totalPriceFormatted: string = React.useMemo(() => {
    const { quantity } = cart;
    const totalMainPrice = price * quantity;
    const totalSubPrice = cart.extraItems.reduce((prev, key) => {
      const [addedValueKey, subItemKey] = key.split("/");
      return (
        prev +
        (extraItems[addedValueKey].items.find((i) => i.id === subItemKey)
          ?.price || 0)
      );
    }, 0);
    const totalPrice = totalMainPrice + totalSubPrice;
    return currencyFormatted({ value: totalPrice });
  }, [price, cart]);
  const isItemExisted = items.find((i) => i.id === id);
  const handleChangeCountItem = React.useCallback(
    (value: number) => setCart((c) => ({ ...c, quantity: value })),
    [cart, setCart]
  );
  return (
    <ModalContent className="pb-40">
      <div className="flex items-center justify-center h-60">
        <img src={imgURL} alt={name} className="h-[100%]" />
      </div>
      <div className="px-2 py-4">
        <div className="grid gap-2 grid-cols-2 items-center mb-2">
          <div className="text-left font-medium text-xl">{name}</div>
          <div className="text-right">{priceFormatted}</div>
        </div>
        <div className="grid items-center gap-2 note">
          <i className="fa-regular fa-file-lines text-base" />
          <input
            placeholder="Any note for store?"
            value={cart.note}
            onChange={(e) => setCart({ ...cart, note: e.target.value })}
          />
        </div>
      </div>
      <ItemExtraItems {...{ cart, setCart, data: extraItems }} />
      <div className="fixed left-0 w-[100%] bottom-0 p-5 box-shadow bg-primary-light border-solid border-[0.5px]">
        <div className="operation-block grid items-center gap-4">
          <CountBox
            defaultCount={1}
            min={1}
            handleChangeCount={handleChangeCountItem}
          />
          <Button
            title={`${
              isItemExisted ? "Update" : "Add"
            } - ${totalPriceFormatted}`}
            className="w-[100%]"
          />
        </div>
      </div>
    </ModalContent>
  );
};

export default React.memo(ItemDetails);
