import { ENV } from "env";
import HTTP from "http-request";
import { CategoryResponse } from "./Category.typings";

const http = new HTTP({ baseURL: `${ENV.API_DOMAIN_URL}/category` });

export const apiGetCategories: () => Promise<CategoryResponse> = () =>
  http.get("");
