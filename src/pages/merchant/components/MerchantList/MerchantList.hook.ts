import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MerchantType } from "pages/merchant/components/Merchant";
import { apiGetMerchantListByCategoryId } from "./MerchantList.services";

export const useQueryMerchantList: ({
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
