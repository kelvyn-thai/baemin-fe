import { ENV } from "env";
import HTTP from "http-request";
import { ItemListResponseType } from "./ItemList.typings";

const http = new HTTP({ baseURL: `${ENV.API_DOMAIN_URL}/items` });

export const apiGetItemListByMerchantId: (
  merchantId: string
) => Promise<ItemListResponseType> = (merchantId) =>
  http.get(`?merchantId=${merchantId}`);
