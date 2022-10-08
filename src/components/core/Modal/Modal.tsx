import React from "react";
import { useModalStore } from "./Modal.zustand";
import "./Modal.styles.scss";
import ModalCore from "./Modal.core";

const BaseModal = () => {
  const { isVisible, content } = useModalStore();
  if (!isVisible) {
    return null;
  }
  return <ModalCore>{content}</ModalCore>;
};
export default React.memo(BaseModal);
