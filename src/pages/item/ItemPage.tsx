import React from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import FixedBottom from "components/core/FixedBottom";
import { useCartInfo, useCartStore } from "pages/cart/components/Cart";
import Button from "components/core/Button";
import { useAuthenStore } from "pages/authen";
import { useMutationCreateOrder } from "pages/order/components/Order/Order.hook";
import ItemList from "./components/ItemList";
import "./ItemPage.styles.scss";

const CartBlock = React.memo(() => {
  const navigate = useNavigate();
  const { isCartEmpty, totalItem, totalPriceFormatted } = useCartInfo();
  const { cart, actionResetCard } = useCartStore();
  const mutationCreateOrder = useMutationCreateOrder();
  const { isLoading } = mutationCreateOrder;
  const handleCheckout = async () => {
    await mutationCreateOrder.mutateAsync(cart);
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
    <div className="p-2">
      <ItemList />
      <CartBlock />
    </div>
  );
};

export default React.memo(Item);
