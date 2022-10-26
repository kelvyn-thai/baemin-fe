import { delay } from "utils/delay";

const defaultRequestInit: RequestInit = {
  cache: "no-cache",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

const handleHTTPRequestReject = (reason: any) => {
  throw new Error(reason);
};

const handleHTTPRequestResolve = (value: Response) => value.json();

class HTTP {
  baseURL: string;

  controller: AbortController;

  requestInit: RequestInit;

  accessToken: string;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
    this.controller = new AbortController();
    this.accessToken = "";
    this.requestInit = defaultRequestInit;
  }

  async handleUnAuthorize() {
    await delay(1000);
    this.accessToken = "some_thing_magic";
    this.requestInit.headers = {
      ...defaultRequestInit.headers,
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  async request(params: { url: string; body?: any; method: string }) {
    try {
      const { url, body, method } = params;
      const { signal } = this.controller;
      // handle response
      const response = await fetch(`${this.baseURL}/${url}`, {
        ...this.requestInit,
        method,
        signal,
        body,
      });
      if (response.status === 401) {
        await this.handleUnAuthorize(); // handle authorize
        await this.request(params);
      }
      return handleHTTPRequestResolve(response);
    } catch (error) {
      return handleHTTPRequestReject(error);
    }
  }

  get(url: string) {
    return this.request({ url, method: "GET" });
  }

  post(url: string, data?: any) {
    return this.request({ url, body: data, method: "POST" });
  }

  put(url: string, data?: any) {
    return this.request({ url, body: data, method: "PUT" });
  }

  patch(url: string, data?: any) {
    return this.request({ url, body: data, method: "PATCH" });
  }

  delete(url: string, data?: any) {
    return this.request({ url, body: data, method: "DELETE" });
  }

  abort() {
    this.controller.abort();
  }
}

export default HTTP;
