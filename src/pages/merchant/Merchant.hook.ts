import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Merchant } from "./Merchant.typings";
import { apiGetMerchantListByCategoryId } from "./Merchant.services";

export const useQueryMerchantList: ({
  categoryId,
}: {
  categoryId: string | undefined;
}) => UseQueryResult<Merchant[], unknown> = ({ categoryId }) => {
  const query = useQuery({
    queryFn: async () => {
      if (!categoryId) {
        return [];
      }
      const res = await apiGetMerchantListByCategoryId(categoryId);
      return res.data;
    },
    queryKey: ["categories"],
    enabled: !!categoryId,
  });
  return query;
};
