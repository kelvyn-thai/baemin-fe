import { ENV } from "env";
import HTTP from "http-request";
import { CategoryResponse } from "./CategoryList.typings";

const http = new HTTP({ baseURL: `${ENV.REACT_APP_API_DOMAIN_URL}/category` });

export const apiGetCategories: () => Promise<CategoryResponse> = () =>
  http.get("");
