const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./pages/**/*.tsx", "./components/**/*.tsx", "./content/**/*.mdx"],
  theme: {
    fontFamily: {
      display: "var(--display-font)",
      body: "var(--body-font)",
    },
    extend: {
      colors: {
        primary: colors.orange,
        base: colors.stone,
        info: colors.sky,
        warn: colors.yellow,
        error: colors.red,
        success: colors.green,
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
