import { IOption } from "components/core/Dropdown";
import { createStore } from "zustand-store";
import { options } from "./DashboardOrder.constants";

interface State {
  direction: "desc" | "asc";
  merchants: IOption[];
  option: string;
  status: IOption[];
  customer: string;
}

interface Actions {
  actionSetDirection: () => any;
  actionSetMerchant: (merchant: IOption[]) => any;
  actionSetOption: (value: string) => any;
  actionSetStatus: (status: IOption[]) => any;
  actionSetCustomer: (value: string) => any;
}

const initialState: State = {
  direction: "desc",
  merchants: [],
  option: options[0].value,
  status: [],
  customer: "",
};
export const [useDashboardOrder] = createStore<State & Actions>(
  (set, get) => ({
    ...initialState,
    actionSetOption: (option) => set({ option }),
    actionSetDirection: () => {
      set({ direction: get().direction === "desc" ? "asc" : "desc" });
    },
    actionSetMerchant: (merchants) => set({ merchants }),
    actionSetStatus: (status) => set({ status }),
    actionSetCustomer: (customer) => set({ customer }),
  }),
  "useDashboardOrder"
);
