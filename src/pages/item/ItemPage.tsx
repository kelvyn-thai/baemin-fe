import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import FixedBottom from "components/core/FixedBottom";
import { useCartInfo, useCartStore } from "pages/cart/components/Cart";
import Button from "components/core/Button";
import ItemList from "./components/ItemList";
import "./ItemPage.styles.scss";

const CartBlock = React.memo(() => {
  const { isCartEmpty, totalItem, totalPriceFormatted } = useCartInfo();
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
        <Button>{`Checkout - ${totalPriceFormatted}`}</Button>
      </div>
    </FixedBottom>
  );
});

const Item: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { actionInitCart } = useCartStore();
  const merchantId = searchParams.get("merchantId") || "";
  const categoryId = searchParams.get("categoryId") || "";
  if (!merchantId || !categoryId) {
    return <Navigate to="/" />;
  }
  React.useEffect(() => {
    actionInitCart({ merchantId, categoryId });
  }, [merchantId, categoryId]);
  return (
    <div>
      <ItemList />
      <CartBlock />
    </div>
  );
};

export default React.memo(Item);
