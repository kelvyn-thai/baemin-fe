import React from "react";
import { createStore } from "zustand-store";

interface ModalState {
  isVisible: boolean;
  content?: React.ReactNode | React.ReactElement | any;
  data?: any;
}

interface ModalActions {
  actionOpenModal: ({
    content,
    data,
  }: {
    content?: React.ReactNode | React.ReactElement | any;
    data?: any;
  }) => void;
  actionCloseModal: () => any;
}

const initialState: ModalState = {
  isVisible: false,
  content: null,
  data: {},
};
export const [useModalStore] = createStore<ModalState & ModalActions>(
  (set) => ({
    ...initialState,
    actionOpenModal: ({ content, data }) =>
      set({ data, content, isVisible: true }),
    actionCloseModal: () => set({ ...initialState }),
  }),
  "useModalStore"
);
