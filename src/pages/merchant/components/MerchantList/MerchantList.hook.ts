import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MerchantType } from "pages/merchant/components/Merchant";
import {
  apiGetMerchantListByCategoryId,
  apiGetMerchantList,
} from "./MerchantList.services";

export const useQueryMerchantListByCategoryId: ({
  categoryId,
}: {
  categoryId: string | undefined;
}) => UseQueryResult<MerchantType[], unknown> = ({ categoryId }) => {
  const query = useQuery({
    queryFn: async () => {
      if (!categoryId) {
        return [];
      }
      const res = await apiGetMerchantListByCategoryId(categoryId);
      return res.data;
    },
    queryKey: ["merchant", categoryId],
    enabled: !!categoryId,
  });
  return query;
};

export const useQueryMerchantList: () => UseQueryResult<
  MerchantType[],
  unknown
> = () => {
  const query = useQuery({
    queryFn: async () => {
      const res = await apiGetMerchantList();
      return res.data;
    },
    queryKey: ["merchant-list"],
  });
  return query;
};
