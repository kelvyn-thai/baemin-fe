const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.jsx",
    ],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: {
        dark: "#000000",
        gray: "#4D4D4D",

        light: "#FFFFFF",
        "light-gray": "#f5f6fa",
        "light-gray-1": "#eaeff5",

        warning: "#fba172",
        btn: "#39c5ca",
        color: "#39c5ca",
      },
    },
  },
  plugins: [],
};
