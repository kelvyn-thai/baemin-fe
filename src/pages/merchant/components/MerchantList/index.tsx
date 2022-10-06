import { useQueryMerchantList } from "pages/merchant/Merchant.hook";
import { useParams } from "react-router-dom";
import React from "react";

const MerchantList: React.FC = () => {
  const { categoryId } = useParams();
  const { isLoading, data: merchantList = [] } = useQueryMerchantList({
    categoryId,
  });
  return (
    <div>
      {merchantList.map(({ id }) => (
        <div>{id}</div>
      ))}
    </div>
  );
};

export default React.memo(MerchantList);
