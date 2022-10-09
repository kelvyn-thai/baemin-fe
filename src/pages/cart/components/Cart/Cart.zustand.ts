import { createStore } from "zustand-store";
import { CartItemType, CartType } from "./Cart.typings";

interface State {
  cart: CartType;
}

interface Actions {
  actionAddItemToCart: (item: CartItemType) => any;
  actionUpdateItemFromCart: (item: CartItemType) => any;
  actionRemoveItemFromCart: (itemId: string) => any;
  actionInitCart: ({
    merchantId,
    categoryId,
  }: {
    merchantId: string;
    categoryId: string;
  }) => void;
}

const initialState: State = {
  cart: {
    items: [],
    categoryId: "",
    merchantId: "",
  },
};
export const [useCartStore] = createStore<State & Actions>(
  (set, get) => ({
    ...initialState,
    actionAddItemToCart: (item: CartItemType) => {
      const { cart } = get();
      const { items } = cart;
      const newCart = { ...cart, items: [...items, item] };
      set({ cart: newCart });
    },
    actionUpdateItemFromCart: (item: CartItemType) => {
      const { cart } = get();
      const { items } = cart;
      set({
        cart: {
          ...cart,
          items: items.map((i) => (i.id === item.id ? item : i)),
        },
      });
    },
    actionRemoveItemFromCart: (itemId: string) => {
      const { cart } = get();
      const { items } = cart;
      set({
        cart: {
          ...cart,
          items: items.filter((i) => i.id !== itemId),
        },
      });
    },
    actionInitCart: ({ merchantId, categoryId }) =>
      set({ cart: { ...get().cart, categoryId, merchantId } }),
  }),
  "useCartStore"
);
