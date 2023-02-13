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
        primary: colors.cyan,
        base: colors.zinc,
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
