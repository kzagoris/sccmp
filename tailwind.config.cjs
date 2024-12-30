/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html",
    "./src/**/*.{vue, js, ts}",
    "./src/helpers/site-settings.ts"
  ],

  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-light": "var(--primary-light-color)",
        secondary: "var(--secondary-color)",
        "drones-orange" : "#F8941C",
        "drones-pink" : "#CF67A6",
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
