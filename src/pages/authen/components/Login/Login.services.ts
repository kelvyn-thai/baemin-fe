import { UserType } from "pages/user";
import { ENV } from "env";
import HTTP from "http-request";
import { FormLoginType } from "./Login.typings";

const http = new HTTP({ baseURL: `${ENV.REACT_APP_API_DOMAIN_URL}` });

export const apiLogin: ({
  username,
  password,
}: FormLoginType) => Promise<{ data: UserType }> = (data) =>
  http.post("login", data);
