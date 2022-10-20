export const ENV = {
  PUBLIC_URL: process.env.PUBLIC_URL || "",
  ASSETS_PATH: `${process.env.PUBLIC_URL || ""}/assets`,
  REACT_APP_API_DOMAIN_URL:
    process.env.REACT_APP_API_DOMAIN_URL || "http://localhost:3000/api",
  PORT: process.env.PORT || 8080,
  REACT_APP_WS_PATH: process.env.REACT_APP_WS_PATH || "",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  REPORT_WEB_VITALS: process.env.REPORT_WEB_VITALS === "true",
};
