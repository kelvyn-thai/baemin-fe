import React from "react";
import { createStore } from "zustand-store";

interface FixedBottomState {
  isVisible: boolean;
  content?: React.ReactNode | React.ReactElement | any;
  data?: any;
}

interface FixedBottomActions {
  actionOpenFixedBottom: ({
    content,
    data,
  }: {
    content?: React.ReactNode | React.ReactElement | any;
    data?: any;
  }) => void;
  actionCloseFixedBottom: () => any;
}

const initialState: FixedBottomState = {
  isVisible: false,
  content: null,
  data: {},
};
export const [useFixedBottomStore] = createStore<
  FixedBottomState & FixedBottomActions
>(
  (set) => ({
    ...initialState,
    actionOpenFixedBottom: ({ content, data }) =>
      set({ data, content, isVisible: true }),
    actionCloseFixedBottom: () => set({ ...initialState }),
  }),
  "useFixedBottomStore"
);
