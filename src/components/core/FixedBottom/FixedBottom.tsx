import React from "react";
import "./FixedBottom.styles.scss";
import FixedBottomCore from "./FixedBottom.core";

interface Props {
  children: React.ReactElement | React.ReactNode | any;
}

const BaseFixedBottom: React.FC<Props> = ({ children }) => (
  <FixedBottomCore>{children}</FixedBottomCore>
);
export default React.memo(BaseFixedBottom);
