import { ENV } from "env";
import HTTP from "http-request";
import { MerchantResponse } from "./MerchantList.typings";

const http = new HTTP({ baseURL: `${ENV.REACT_APP_API_DOMAIN_URL}/merchant` });

export const apiGetMerchantListByCategoryId: (
  categoryId: string
) => Promise<MerchantResponse> = (categoryId) =>
  http.get(`?categoryId=${categoryId}`);
