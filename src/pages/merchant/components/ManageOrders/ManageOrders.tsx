import Button from "components/core/Button";
import { ModalContent, useModalStore } from "components/core/Modal";
import ScrollView from "components/core/ScrollView";
import { useAuthenStore } from "pages/authen";
import OrderHistoryItem, { OrderType } from "pages/order/components/Order";
import React from "react";
import socket from "socket-io";
import { useMerchantManageOrdersStore } from "./ManageOrders.zustand";

const ModalConfirmOrder = ({ order }: { order: OrderType }) => {
  const { actionCloseModal } = useModalStore();
  const { actionAcceptOrder } = useMerchantManageOrdersStore();
  const handleAcceptOrder = React.useCallback(() => {
    socket.emit(`merchant-accepted-order`, order);
    actionAcceptOrder(order);
    actionCloseModal();
  }, [order]);
  return (
    <ModalContent
      className="h-48 left-5 right-5 translate-y-[-50%] top-[50%] flex items-center justify-center"
      hasBtnCloseModal={false}
    >
      <div>
        <div className="text-center">
          <i className="fa-solid fa-circle-info text-lg mr-2" />
          <span className="text-base font-medium">
            Are you want to accept <br />
            this order?
          </span>
        </div>
        <span className="text-xs text-primary-gray">({order.id})</span>
        <div className="grid grid-cols-2 gap-2 px-2 mt-4">
          <Button type="default" title="Cancel" onClick={actionCloseModal} />
          <Button title="OK" onClick={handleAcceptOrder} />
        </div>
      </div>
    </ModalContent>
  );
};

const ManageOrders = () => {
  const { userInfo } = useAuthenStore();
  const { username } = userInfo;
  const { actionOpenModal } = useModalStore();
  const { orders, actionHasNewOrder } = useMerchantManageOrdersStore();
  React.useEffect(() => {
    socket.on(`send-order-to-merchant-${username}`, (order: OrderType) => {
      actionHasNewOrder(order);
    });
  }, []);
  return (
    <div>
      <div className="pl-4 font-medium text-base">
        <i className="fa-solid fa-caravan mr-2" />
        <span>New orders</span>
      </div>
      <ScrollView
        data={orders}
        renderItem={(order) => (
          <OrderHistoryItem
            key={order.id}
            order={order}
            onClickOrderItem={(d: OrderType) => {
              actionOpenModal({ content: <ModalConfirmOrder order={d} /> });
            }}
          />
        )}
      />
    </div>
  );
};

export default React.memo(ManageOrders);
