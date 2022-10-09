import { currencyFormatted } from "utils/currencyFormatted";
import { useCartStore } from "./Cart.zustand";

export const useCartInfo: () => {
  totalItem: number;
  isCartEmpty: boolean;
  totalPrice: number;
  totalPriceFormatted: string;
} = () => {
  const { cart } = useCartStore();
  const { items } = cart;
  const isCartEmpty = items.length === 0;
  const totalItem = items.reduce((prev, item) => prev + item.quantity, 0);
  const totalPrice = items.reduce(
    (prev, item) => prev + (item?.totalPrice || 0),
    0
  );
  const totalPriceFormatted = currencyFormatted({ value: totalPrice });
  return {
    totalItem,
    totalPrice,
    isCartEmpty,
    totalPriceFormatted,
  };
};
