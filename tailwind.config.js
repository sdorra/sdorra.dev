/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./pages/**/*.tsx", "./components/**/*.tsx", "./content/**/*.mdx"],
  theme: {
    fontFamily: {
      display: "var(--display-font)",
      body: "var(--body-font)",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
