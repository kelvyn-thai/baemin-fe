import React from "react";
import { Link } from "react-router-dom";
import { OrderType, useUserOrderList } from "pages/order/components/Order";
import { dateFormatted } from "utils/dateFormatted";
import Header from "components/core/Header";
import { pagination } from "utils/pagination";
import Loading from "components/core/Loading";
import "./ManageOrders.styles.scss";
import throttle from "lodash/throttle";
import { currencyFormatted } from "utils/currencyFormatted";
import { delay } from "utils/delay";
import ScrollView from "components/core/ScrollView";
import { useAuthenStore } from "pages/authen";
import { CustomerRoute } from "components/core/PrivateRoute";

const OrderHistoryItem = React.memo(({ order }: { order: OrderType }) => {
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
      default:
        return <i className="fa-solid fa-spinner" />;
    }
  }, [status]);
  return (
    <Link
      className="order-item bg-primary-light p-4 border-b-[0.5px] grid items-center gap-1"
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
        </div>
      </div>
      <i className="fa-solid fa-chevron-right text-primary-gray" />
    </Link>
  );
});

const MAX_ORDER_PER_PAGE = 10;

const ManageOrders = () => {
  const { userInfo } = useAuthenStore();
  const [page, setPage] = React.useState(1);
  const { orders = [] } = useUserOrderList({ userId: userInfo?.id });
  const { totalPage } = pagination({
    data: orders,
    maxItemsPerPage: MAX_ORDER_PER_PAGE,
  });
  const isOversize = page > totalPage || orders.length < MAX_ORDER_PER_PAGE;
  const onEndReached = React.useCallback(
    throttle(async () => {
      if (isOversize) {
        return;
      }
      await delay(1000);
      setPage(page + 1);
    }, 1000),
    [page, isOversize]
  );
  return (
    <div className="manage-orders bg-primary-light-gray">
      <Header title="My orders" />
      <ScrollView className="order-list " onEndReached={onEndReached}>
        {orders.slice(0, page * MAX_ORDER_PER_PAGE).map((order: OrderType) => (
          <OrderHistoryItem order={order} key={order.id} />
        ))}
        {!isOversize && <Loading />}
      </ScrollView>
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="customer">
    <ManageOrders />
  </CustomerRoute>
));
