import React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import FixedBottom from "components/core/FixedBottom";
import { useCartInfo, useCartStore } from "pages/cart/components/Cart";
import Button from "components/core/Button";
import { CustomerRoute } from "components/core/PrivateRoute";
import Header from "components/core/Header";
import { useAuthenStore } from "pages/authen";
import { useMutationCreateOrder } from "pages/order/components/Order/Order.hook";
import socket from "socket-io";
import { OrderType } from "pages/order/components/Order";
import ItemList from "./components/ItemList";
import "./ItemPage.styles.scss";

const CartBlock = React.memo(() => {
  const navigate = useNavigate();
  const { isCartEmpty, totalItem, totalPriceFormatted } = useCartInfo();
  const { cart, actionResetCard } = useCartStore();
  const mutationCreateOrder = useMutationCreateOrder();
  const { isLoading } = mutationCreateOrder;
  const handleCheckout = async () => {
    const order: OrderType = await mutationCreateOrder.mutateAsync(cart);
    socket.emit("customer-create-new-order", order);
    actionResetCard();
    navigate("/");
  };
  if (isCartEmpty) {
    return null;
  }
  return (
    <FixedBottom>
      <div className="grid gap-4 cart-block">
        <Button type="default" className="flex items-center gap-2">
          <i className="fas fa-shopping-cart text-lg" />
          {totalItem}
        </Button>
        <Button onClick={handleCheckout} isDisabled={isLoading}>
          {isLoading ? "Checkout..." : `Checkout - ${totalPriceFormatted}`}
        </Button>
      </div>
    </FixedBottom>
  );
});

const Item: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { actionInitCart } = useCartStore();
  const { userInfo } = useAuthenStore();
  const merchantId = searchParams.get("merchantId") || "";
  const categoryId = searchParams.get("categoryId") || "";
  if (!merchantId || !categoryId || !userInfo) {
    return <Navigate to="/" />;
  }
  React.useEffect(() => {
    actionInitCart({ merchantId, categoryId, userId: userInfo.id });
  }, [merchantId, categoryId]);
  return (
    <div>
      <Header title={merchantId} />
      <div className="p-2">
        <ItemList />
        <CartBlock />
      </div>
    </div>
  );
};

export default React.memo(() => (
  <CustomerRoute userRole="customer">
    <Item />
  </CustomerRoute>
));
