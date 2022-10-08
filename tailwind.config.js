/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: {
        dark: "#000000",
        gray: "#8a8b99",
        
        light: "#FFFFFF",
        "light-gray": "#f5f6fa",
        "light-gray-1": "#eaeff5",

        warning: "#fba172",
        btn: "#39c5ca",
      },
    },
  },
  plugins: [],
};
