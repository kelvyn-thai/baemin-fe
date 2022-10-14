import { useQueryMerchantList } from "pages/merchant/components/MerchantList/MerchantList.hook";
import { useSearchParams } from "react-router-dom";
import React from "react";
import Loading from "components/core/Loading";
import MerchantItem from "pages/merchant/components/Merchant";
import "./MerchantList.styles.scss";

const MerchantList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  const { isLoading, data: merchantList = [] } = useQueryMerchantList({
    categoryId,
  });
  return (
    <div className="merchant-page p-2">
      {isLoading && <Loading />}
      {merchantList.map((item) => (
        <MerchantItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default React.memo(MerchantList);
