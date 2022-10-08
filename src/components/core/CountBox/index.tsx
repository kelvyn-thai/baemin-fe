import React from "react";
import Button from "components/core/Button";
import "./CountBox.styles.scss";

interface IProps {
  defaultCount?: number;
  min?: number;
  max?: number;
  handleChangeCount?: (count: number) => any;
}

const CountBox: React.FC<IProps> = ({
  defaultCount,
  min,
  max,
  handleChangeCount,
}) => {
  const [count, setCount] = React.useState(defaultCount || 0);
  const disabledDecrementCount = React.useMemo(
    () => min === count,
    [count, min]
  );
  const disabledIncrementCount = React.useMemo(
    () => max === count,
    [count, max]
  );
  const handleIncrementCount = React.useCallback(() => {
    setCount((prevCount) => {
      const curCount = prevCount + 1;
      if (typeof handleChangeCount === "function") {
        handleChangeCount(curCount);
      }
      return curCount;
    });
  }, [count]);
  const handleDecrementCount = React.useCallback(() => {
    setCount((prevCount) => {
      const curCount = prevCount - 1;
      if (typeof handleChangeCount === "function") {
        handleChangeCount(curCount);
      }
      return curCount;
    });
  }, [count, handleChangeCount]);
  return (
    <div className="count-box grid gap-4 items-center">
      <Button
        className="h-6 w-6 p-0 bg-primary-light-gray-1 text-primary-btn font-medium"
        onClick={() => {
          handleDecrementCount();
        }}
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
  defaultCount: 0,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  handleChangeCount: undefined,
};

export default React.memo(CountBox);
