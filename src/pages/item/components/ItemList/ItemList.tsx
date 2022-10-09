import Item from "pages/item/components/Item";
import { useSearchParams } from "react-router-dom";
import React from "react";
import FixedBottom from "components/core/FixedBottom";
import Loading from "components/core/Loading";
import "./ItemList.styles.scss";
import { useItemList, useQueryItemList } from "./ItemList.hook";

const ItemList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const merchantId = searchParams.get("merchantId") || "";
  const { isLoading } = useQueryItemList({
    merchantId,
  });
  const items = useItemList({ merchantId });
  return (
    <div className="grid grid-cols-2 gap-4">
      {isLoading && <Loading />}
      {items.map((item) => (
        <Item data={item} key={item.id} />
      ))}
      <FixedBottom>
        <div>sdfasdf</div>
      </FixedBottom>
    </div>
  );
};

export default React.memo(ItemList);
