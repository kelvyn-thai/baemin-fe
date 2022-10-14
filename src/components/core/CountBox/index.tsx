import React from "react";
import Button from "components/core/Button";
import "./CountBox.styles.scss";

interface IProps {
  min?: number;
  max?: number;
  handleIncrementCount: () => any;
  handleDecrementCount: () => any;
  count: number;
}

const CountBox: React.FC<IProps> = ({
  min,
  max,
  handleIncrementCount,
  handleDecrementCount,
  count,
}) => {
  const disabledDecrementCount = React.useMemo(
    () => min === count,
    [count, min]
  );
  const disabledIncrementCount = React.useMemo(
    () => max === count,
    [count, max]
  );
  return (
    <div className="count-box grid gap-4 items-center">
      <Button
        className="h-6 w-6 p-0 bg-primary-light-gray-1 text-primary-btn font-medium"
        onClick={handleDecrementCount}
        isDisabled={disabledDecrementCount}
      >
        -
      </Button>
      <div className="font-medium">{count}</div>
      <Button
        className="h-6 w-6 p-0 bg-primary-light-gray-1 text-primary-btn font-medium"
        onClick={handleIncrementCount}
        isDisabled={disabledIncrementCount}
      >
        +
      </Button>
    </div>
  );
};

CountBox.defaultProps = {
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
};

export default React.memo(CountBox);
