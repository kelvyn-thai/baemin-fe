import uniqBy from "lodash/uniqBy";
import { OrderType } from "pages/order/components/Order";
import { createPersistStore } from "zustand-store";

interface AuthenState {
  orders: OrderType[];
}

interface AuthenActions {
  actionAcceptOrder: (order: OrderType) => any;
  actionHasNewOrder: (order: OrderType) => any;
}

const initialState: AuthenState = {
  orders: [],
};

export const [useMerchantManageOrdersStore] = createPersistStore<
  AuthenState & AuthenActions
>(
  (set, get) => ({
    ...initialState,
    actionHasNewOrder: (order) =>
      set({ orders: uniqBy([...get().orders, order], (o) => o.id) }),
    actionAcceptOrder: (order) =>
      set({ orders: get().orders.filter((o) => o.id !== order.id) }),
  }),
  "useMerchantManageOrdersStore"
);
