import React from "react";
import ReactDOM from "react-dom";
import "./Modal.styles.scss";

const ModalCore = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) =>
  ReactDOM.createPortal(
    <div className="modal-container">{children}</div>,
    document.querySelector("#modal-root") as Element
  );

export default React.memo(ModalCore);
