import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useCartStore } from "pages/cart/components/Cart";
import ItemList from "./components/ItemList";

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
    </div>
  );
};

export default React.memo(Item);
