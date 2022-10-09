import React from "react";
import ReactDOM from "react-dom";
import "./FixedBottom.styles.scss";

const FixedBottomCore = ({
  children,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) =>
  ReactDOM.createPortal(
    <div className="fixed-bottom-container">{children}</div>,
    document.querySelector("#fixed-bottom-root") as Element
  );

export default React.memo(FixedBottomCore);
