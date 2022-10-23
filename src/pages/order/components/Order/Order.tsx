import React from "react";
import { ellipsisCenter } from "utils/ellipsis";
import { currencyFormatted } from "utils/currencyFormatted";
import { dateFormatted } from "utils/dateFormatted";
import { Link } from "react-router-dom";
import { OrderType } from "./Order.typings";
import "./Order.styles.scss";

interface IProps {
  order: OrderType;
  onClickOrderItem?: (order: OrderType) => any;
}

const OrderHistoryItem: React.FC<IProps> = ({ order, onClickOrderItem }) => {
  const {
    id,
    orderName,
    status,
    createdTime,
    totalPrice,
    paymentMethod,
    dishes,
  } = order;
  const iconStatus = React.useMemo(() => {
    switch (status) {
      case "Done":
        return <i className="fa-solid fa-circle-check" />;
      case "Canceled":
        return <i className="fa-solid fa-triangle-exclamation" />;
      case "Accepted":
        return <i className="fa-solid fa-spinner fa-spin" />;
      default:
        return <i className="fa-solid fa-spinner fa-spin" />;
    }
  }, [status]);
  return (
    <Link
      className="order-item bg-primary-light p-4 border-b-[0.5px] grid items-center gap-1"
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClickOrderItem === "function") {
          onClickOrderItem(order);
        }
      }}
      to={`/order?orderId=${id}`}
    >
      <div className="block-info">
        <div className="block-status grid gap-2 items-center text-xs mb-1 text-primary-gray">
          {iconStatus}
          <span className="font-medium">{status}</span>
          <span>{dateFormatted(createdTime)}</span>
        </div>
        <div className="mb-2">{orderName}</div>
        <div className="block-payment text-xs text-primary-gray">
          <span>{currencyFormatted({ value: totalPrice })}</span>
          <span className="mx-1">({paymentMethod})</span>
          <span>{dishes.length} Items</span>
          <span className="ml-1 font-medium">
            #{ellipsisCenter({ str: id, limit: 5 })}
          </span>
        </div>
      </div>
      <i className="fa-solid fa-chevron-right text-primary-gray" />
    </Link>
  );
};

OrderHistoryItem.defaultProps = {
  onClickOrderItem: undefined,
};

export default React.memo(OrderHistoryItem);
