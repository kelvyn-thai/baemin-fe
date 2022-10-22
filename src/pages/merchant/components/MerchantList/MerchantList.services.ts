import { ENV } from "env";
import HTTP from "http-request";
import { MerchantResponse } from "./MerchantList.typings";

const http = new HTTP({ baseURL: `${ENV.REACT_APP_API_DOMAIN_URL}` });

export const apiGetMerchantListByCategoryId: (
  categoryId: string
) => Promise<MerchantResponse> = (categoryId) =>
  http.get(`merchant?categoryId=${categoryId}`);

export const apiGetMerchantList = () => http.get(`merchant-list`);
