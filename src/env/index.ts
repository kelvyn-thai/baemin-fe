export const ENV = {
  PUBLIC_URL: process.env.PUBLIC_URL || "",
  ASSETS_PATH: `${process.env.PUBLIC_URL || ""}/assets`,
  API_DOMAIN_URL:
    process.env.REACT_APP_DOMAIN_URL || "http://localhost:8080/api",
  WS_PATH: process.env.REACT_APP_WS_PATH || "http://localhost:8080",
};
