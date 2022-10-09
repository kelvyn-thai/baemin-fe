import Button from "components/core/Button";
import CountBox from "components/core/CountBox";
import { ModalContent, useModalStore } from "components/core/Modal";
import { useCartStore, CartItemType } from "pages/cart/components/Cart";
import React from "react";
import { currencyFormatted } from "utils/currencyFormatted";
import "./Item.styles.scss";
import FixedBottom from "components/core/FixedBottom";
import ItemExtraItems from "./Item.ExtraItems";
import { ItemFormattedType } from "./Item.typings";

interface IProps {
  data: ItemFormattedType;
}

const ItemDetails: React.FC<IProps> = ({ data }) => {
  const { id, imgURL, extraItems, name, priceFormatted, price } = data;
  const { cart, actionAddItemToCart, actionUpdateItemFromCart } =
    useCartStore();
  const { items } = cart;
  const foundCart = items.find((i) => i.id === id);
  const isItemExisted = !!foundCart?.id;
  const [temporaryCart, setCart] = React.useState<CartItemType>(
    isItemExisted
      ? foundCart
      : {
          id,
          quantity: 1,
          extraItems: [],
          note: "",
        }
  );
  const { actionCloseModal } = useModalStore();
  const totalPriceFormatted: string = React.useMemo(() => {
    const { quantity } = temporaryCart;
    const totalMainPrice = price * quantity;
    const totalSubPrice = temporaryCart.extraItems.reduce((prev, key) => {
      const [addedValueKey, subItemKey] = key.split("/");
      return (
        prev +
        (extraItems[addedValueKey].items.find((i) => i.id === subItemKey)
          ?.price || 0)
      );
    }, 0);
    const totalPrice = totalMainPrice + totalSubPrice;
    return currencyFormatted({ value: totalPrice });
  }, [price, temporaryCart]);
  const handleOperationCart = React.useCallback(() => {
    if (isItemExisted) {
      actionUpdateItemFromCart(temporaryCart);
    } else {
      actionAddItemToCart(temporaryCart);
    }
    actionCloseModal();
  }, [temporaryCart, isItemExisted, actionCloseModal]);
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
            value={temporaryCart.note}
            onChange={(e) =>
              setCart({ ...temporaryCart, note: e.target.value })
            }
          />
        </div>
      </div>
      <ItemExtraItems {...{ cart: temporaryCart, setCart, data: extraItems }} />
      <FixedBottom>
        <div className="operation-block grid items-center gap-4">
          <CountBox
            count={temporaryCart.quantity}
            min={1}
            handleDecrementCount={() =>
              setCart({
                ...temporaryCart,
                quantity: temporaryCart.quantity - 1,
              })
            }
            handleIncrementCount={() =>
              setCart({
                ...temporaryCart,
                quantity: temporaryCart.quantity + 1,
              })
            }
          />
          <Button
            title={`${
              isItemExisted ? "Update" : "Add"
            } - ${totalPriceFormatted}`}
            className="w-[100%]"
            onClick={handleOperationCart}
          />
        </div>
      </FixedBottom>
    </ModalContent>
  );
};

export default React.memo(ItemDetails);
