import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { currencyFormatted } from "utils/currencyFormatted";
import { ItemType, ItemFormattedType } from "pages/item/components/Item";
import { apiGetItemListByMerchantId } from "./ItemList.services";

export const useQueryItemList: ({
  merchantId,
}: {
  merchantId: string | undefined;
}) => UseQueryResult<ItemType[], unknown> = ({ merchantId }) => {
  const query = useQuery({
    queryFn: async () => {
      if (!merchantId) {
        return [];
      }
      const res = await apiGetItemListByMerchantId(merchantId);
      return res.data;
    },
    queryKey: ["items", merchantId],
    enabled: !!merchantId,
  });
  return query;
};

export const useItemList: ({
  merchantId,
}: {
  merchantId: string;
}) => ItemFormattedType[] = ({ merchantId }) => {
  const query = useQueryItemList({ merchantId });
  const { data: items = [] } = query;
  return items.map((item) => ({
    ...item,
    priceFormatted: currencyFormatted({
      value: item.price,
    }),
  }));
};
