import { createStore } from "zustand-store";
import { CartType } from "./Cart.typings";

interface State {
  cart: CartType;
}

interface Actions {
  actionUpdateCart: () => any;
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
    actionUpdateCart: () => set({}),
    actionInitCart: ({ merchantId, categoryId }) =>
      set({ cart: { ...get().cart, categoryId, merchantId } }),
  }),
  "useCartStore"
);
