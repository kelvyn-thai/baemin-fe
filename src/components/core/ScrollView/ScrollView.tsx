import React from "react";

interface IScrollView {
  onEndReached?: () => any;
  threshold?: number;
  className?: string;
}

const ScrollView: React.FC<
  IScrollView &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ children, onEndReached, threshold = 10, className }) => {
  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const {
        currentTarget: { scrollHeight, scrollTop, clientHeight },
      } = e;
      const isBottom = clientHeight + scrollTop + threshold > scrollHeight;
      if (isBottom && typeof onEndReached === "function") {
        onEndReached();
      }
    },
    [onEndReached]
  );

  return (
    <div
      className={`scroll-view overflow-x-hidden overflow-y-scroll ${
        className || ""
      }`}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
};

ScrollView.defaultProps = {
  threshold: 100,
  onEndReached: undefined,
  className: "",
};

export default React.memo(ScrollView);
