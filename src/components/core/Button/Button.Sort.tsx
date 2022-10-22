import React from "react";
import Button from "./Button";

const SortBtn = ({
  direction,
  setDirection,
}: {
  direction: "asc" | "desc";
  setDirection: () => any;
}) => (
  <Button
    className="w-10 h-10 bg-primary-color flex items-center justify-center"
    onClick={setDirection}
  >
    {direction === "desc" ? (
      <i className="fa-solid fa-arrow-down" />
    ) : (
      <i className="fa-solid fa-arrow-up" />
    )}
  </Button>
);

export default React.memo(SortBtn);
